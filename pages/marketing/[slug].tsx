import Head from 'next/head'
import Link from 'next/link'
import { allMarketings } from 'contentlayer/generated'
import { Marketing } from 'contentlayer/generated'
import { Heading, HStack, Avatar, Button, Text, useDisclosure, Tooltip, VStack, Divider, Box, Center, Container } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'
import title from '../../styles/Home.module.css'
import Date from 'components/date'
import Layout from 'components/Layout'
import MarketingLayout from 'components/MarketingLayout'

export async function getStaticPaths() {
    const paths = allMarketings.map((p) => ({ params: { slug: p.slug } }))
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const marketing = allMarketings.find((post) => post.slug === params.slug)
    return {
        props: {
            marketing
        }
    }
}

const MarketingPage = ({ marketing }: { marketing: Marketing }) => {
    let { isOpen, onToggle } = useDisclosure()
    return (
        <>
            <Head>
                <title>{marketing.title} - JacobHQ</title>
                <meta name="author" content={marketing.author} />
            </Head>
            <MarketingLayout>
                <article>
                    <Box as="header" h="95vh">
                        <Center h="full">
                            <Container>
                                <VStack>
                                    <Heading size="4xl">{marketing.title}</Heading>
                                    <Text pt={4} textAlign="center">{marketing.description}</Text>
                                </VStack>
                            </Container>
                        </Center>
                    </Box>
                    <Divider my={4} mb={6} />
                    <ReactMarkdown
                        components={ChakraUIRenderer()}
                        children={marketing.body.raw}
                    />
                    <Link href="/blog">
                        <Button variant="ghost" marginTop="50px">&larr; Back to blog</Button>
                    </Link>
                </article>
            </MarketingLayout>
        </>
    )
}

export default MarketingPage