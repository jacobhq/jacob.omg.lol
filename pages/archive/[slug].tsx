import Head from 'next/head'
import Link from 'next/link'
import { allNewsletters } from 'contentlayer/generated'
import { Newsletter } from 'contentlayer/generated'
import { Heading, HStack, Avatar, Button, Text, useDisclosure, Tooltip, VStack, Divider } from '@chakra-ui/react'
import title from '../../styles/Home.module.css'
import Date from 'components/date'
import Layout from 'components/Layout'
import { MDXRemote } from 'next-mdx-remote'
import components from 'components/MDXComponents';
import { serialize } from 'next-mdx-remote/serialize'

export async function getStaticPaths() {
  const paths = allNewsletters.map((p) => ({ params: { slug: p.slug } }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const letter = allNewsletters.find((post) => post.slug === params.slug)
  const mdx = await serialize(letter.body.raw)
  return {
    props: {
      letter, mdx
    }
  }
}

const PostLayout = ({ letter, mdx }: { letter: Newsletter, mdx: any }) => {
  let { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Head>
        <title>{letter.title} - Archive | JacobHQ</title>
        <meta name="author" content={letter.author} />
      </Head>
      <Layout>
        <article>
          <Heading className={title.h1}>{letter.title}</Heading>
          <HStack justifyContent="space-between" pt={4}>
            <HStack>
              <Avatar name={letter.author} src={letter.avatar} size="sm" />
              <VStack spacing={0} alignItems="start">
                <Text as="strong">
                  {letter.author}
                </Text>
                <Text as="small">
                  <Date dateString={letter.date} />
                </Text>
              </VStack>
            </HStack>
            <Tooltip label={!isOpen ? "Show wordcount" : "Show reading time"}>
              <Button onClick={onToggle} variant="ghost" size="sm">{!isOpen ? letter.readingTime.text : `${letter.readingTime.words} words`}</Button>
            </Tooltip>
          </HStack>
          <Divider my={4} mb={6} />
          <MDXRemote {...mdx} components={components} />
          <Link href="/archive">
            <Button variant="ghost" marginTop="50px">&larr; Back to archive</Button>
          </Link>
        </article>
      </Layout>
    </>
  )
}

export default PostLayout