import Head from 'next/head'
import Link from 'next/link'
import { allMarketings } from 'contentlayer/generated'
import { Marketing } from 'contentlayer/generated'
import { Heading, HStack, Avatar, Button, Text, useDisclosure, Tooltip, VStack, Divider, Box, Center, Container, ButtonGroup } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'
import styles from '../../styles/Marketing.module.css'
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
            <MarketingLayout title={marketing.title} theme='dark'>
                <article>
                    <Box as="header" h="90vh">
                        <Center h="full">
                            <Container maxW="container.md">
                                <VStack>
                                    <Heading className={styles.heading} size="4xl" textAlign="center">{marketing.bannerTitle}</Heading>
                                    <Text className={styles.tagline} pt={4} textAlign="center">{marketing.description}</Text>
                                    <ButtonGroup className={styles.cta} pt={6}>
                                        <a href={marketing.ctaHref} target="_blank" rel="noopener noreferrer">
                                            <Button colorScheme="blue">{marketing.ctaBtn}</Button>
                                        </a>
                                        <a href="https://buymeacoffee.com/jem" target="_blank" rel="noopener noreferrer">
                                            <Button>Buy me a coffee</Button>
                                        </a>
                                    </ButtonGroup>
                                </VStack>
                            </Container>
                        </Center>
                    </Box>
                    <Center w="full" pb={2}>
                        <Text className={styles.scroller} color="gray.300">Scroll down</Text>
                    </Center>
                    <Divider my={4} mb={6} />
                    <ReactMarkdown
                        components={ChakraUIRenderer()}
                        children={marketing.body.raw}
                    />
                </article>
            </MarketingLayout>
        </>
    )
}

export default MarketingPage