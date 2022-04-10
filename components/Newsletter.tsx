import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import useSWR from "swr";

export default function NewsletterCard() {
    function validateEmail(value) {
        let error
        if (!value) {
            error = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Invalid email address';
        }
        return error
    }

    // @ts-ignore
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR('/api/newsletter/list-subscribers', fetcher, { refreshInterval: 10000 })

    return (
        <Box p="5" borderWidth="1px" rounded="md">
            <Heading size="md" mb="10px">Subscribe to my newsletter</Heading>
            <Text mb="20px">Get updates about what I'm working on.</Text>
            <Formik
                initialValues={{ email: '' }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        actions.setSubmitting(false)
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
                                        >
                                            Subscribe
                                        </Button>
                                    </HStack>
                                </FormControl>
                            )}
                        </Field>
                    </Form>
                )}
            </Formik>
            <Text as="small">Join {data ? data.count : "some"} other {data ? data.count === 1 ? "person" : "people" : "people"} in reading my newsletter</Text>
        </Box>
    )
}