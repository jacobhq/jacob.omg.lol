import Head from 'next/head'
import { allMarketings } from 'contentlayer/generated'
import { Marketing } from 'contentlayer/generated'
import { Heading, Button, Text, VStack, Divider, Box, Center, Container, ButtonGroup } from '@chakra-ui/react'
import styles from '../../styles/Marketing.module.css'
import MarketingLayout from 'components/MarketingLayout'
import components from 'components/MDXComponents';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Prose } from '@nikolovlazar/chakra-ui-prose'

export async function getStaticPaths() {
    const paths = allMarketings.map((p) => ({ params: { slug: p.slug } }))
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const marketing = allMarketings.find((post) => post.slug === params.slug)
    const mdx = await serialize(marketing.body.raw)
    return {
        props: {
            marketing, mdx
        }
    }
}

const MarketingPage = ({ marketing, mdx }: { marketing: Marketing, mdx: any }) => {
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
                    <MDXRemote {...mdx} components={components} />
                </article>
            </MarketingLayout>
        </>
    )
}

export default MarketingPage