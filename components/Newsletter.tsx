import { useUser } from "@auth0/nextjs-auth0";
import { Box, Button, Divider, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import useSWR from "swr";

type Props = {
    hasBorder?: boolean
}

export default function NewsletterCard({ hasBorder }: Props) {
    function validateEmail(value) {
        let error
        if (!value) {
            error = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Invalid email address';
        }
        return error
    }

    const { user: session, error: userErr, isLoading: isUserLoading } = useUser();

    // @ts-ignore
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR('/api/newsletter/list-subscribers', fetcher, { refreshInterval: 10000 })

    const toast = useToast()

    return (
        <>
            {!hasBorder && <Divider />}
            <Box p="5" rounded="md" borderWidth={hasBorder ? "1px" : 0} mb={8}>
                <Heading size="md" mb="10px">Subscribe to my newsletter</Heading>
                <Text mb="20px">Join {data ? `the ${data.count}` : "some"} other {data ? data.count === 1 ? "person" : "people" : "people"} who get updates on what I'm working on. Prefer not to get anymore emails? <Link href="/archive">View the archive</Link>.</Text>
                <Formik
                    initialValues={{ email: session ? session.email : '' }}
                    onSubmit={(values, actions) => {
                        setTimeout(async () => {
                            actions.setSubmitting(true)
                            await axios.post('/api/newsletter/subscribe', {
                                email: values.email
                            }).then((response) => {
                                if (response.status === 201) {
                                    toast({
                                        title: "Successfully subscribed",
                                        description: "You'll recieve an email shortly",
                                        status: "success"
                                    })
                                    actions.setSubmitting(false)
                                }
                            }).catch(() => {
                                toast({
                                    title: "Error subscribing",
                                    description: "Check you're not already subscribed",
                                    status: "error"
                                })
                                actions.setSubmitting(false)
                            })
                        }, 1000)
                    }}
                >
                    {(props) => (
                        <Form>
                            <Field name='email' validate={validateEmail}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <HStack>
                                            <Input {...field} placeholder='jacob@omg.lol' />
                                            <Button
                                                mt={4}
                                                colorScheme='blue'
                                                isLoading={props.isSubmitting}
                                                type='submit'
                                                isDisabled={form.errors.email}
                                            >
                                                Subscribe
                                            </Button>
                                        </HStack>
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        {form.errors.email ? true : false && session ? !session.email : true && <FormHelperText>There are currently {data ? `the ${data.count}` : "Some"} subscribers {session && session.email === field.value ? "and your email was prefilled from your JHQ ID" : null}</FormHelperText>}
                                    </FormControl>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
            </Box>
        </>
    )
}