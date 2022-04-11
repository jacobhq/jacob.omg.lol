import { ListItem, UnorderedList, Heading, Text, Box, Link as ChakraLink } from "@chakra-ui/react";
import Layout from "components/Layout";
import NewsletterCard from "components/Newsletter";
import { allNewsletters } from "contentlayer/generated";
import { Newsletter } from 'contentlayer/generated'
import styles from '../../styles/Home.module.css'
import Link from "next/link";

export default function ArchivePage({ newsletters }: { newsletters: Newsletter[] }) {
    return (
        <Layout hasNewsletterCard={false}>
            <Heading className={styles.h1}>Newsletter archive</Heading>
            <Text>This is my newsletter, where I right about what I've been up to in the JS world. You'll get early access to any new blog posts that I write, along with links to anything interesting that I have read recently.</Text>
            <Box my={6}>
                <NewsletterCard hasBorder={true} />
            </Box>
            <Heading size="md" mb={3}>Archive</Heading>
            <UnorderedList>
                {newsletters.map((i: Newsletter) => (
                    <ListItem key={i.slug}>
                        <ChakraLink as={Link} href={`/archive/${i.slug}`}>
                            {i.title}
                        </ChakraLink>
                    </ListItem>
                ))}
            </UnorderedList>
        </Layout>
    )
}

export async function getStaticProps() {
    const newsletters = allNewsletters.sort(
        (a, b) => {
            return Number(new Date(b.date)) - Number(new Date(a.date))
        });
    return { props: { newsletters } }
}