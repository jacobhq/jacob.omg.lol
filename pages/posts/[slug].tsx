import Head from 'next/head'
import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { Post } from 'contentlayer/generated'
import { Heading, HStack, Avatar, Button, Text, useDisclosure, Tooltip, VStack, Divider } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'
import title from '../../styles/Home.module.css'
import Date from 'components/date'
import Layout from 'components/Layout'

export async function getStaticPaths() {
  const paths = allPosts.map((p) => ({ params: { slug: p.slug } }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = allPosts.find((post) => post.slug === params.slug)
  return {
    props: {
      post
    }
  }
}

const PostLayout = ({ post }: { post: Post }) => {
  let { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Head>
        <title>{post.title} - Blog | JacobHQ</title>
        <meta name="author" content={post.author} />
      </Head>
      <Layout>
        <article>
          <Heading className={title.h1}>{post.title}</Heading>
          <HStack justifyContent="space-between" pt={4}>
            <HStack>
              <Avatar name={post.author} src={post.avatar} size="sm" />
              <VStack spacing={0} alignItems="start">
                <Text as="strong">
                  {post.author}
                </Text>
                <Text as="small">
                  <Date dateString={post.date} />
                </Text>
              </VStack>
            </HStack>
            <Tooltip label={!isOpen ? "Show wordcount" : "Show reading time"}>
              <Button onClick={onToggle} variant="ghost" size="sm">{!isOpen ? post.readingTime.text : `${post.readingTime.words} words`}</Button>
            </Tooltip>
          </HStack>
          <Divider my={4} mb={6} />
          <ReactMarkdown
            components={ChakraUIRenderer()}
            children={post.body.raw}
          />
          <Link href="/">
            <Button variant="ghost" marginTop="50px">Go home →</Button>
          </Link>
        </article>
      </Layout>
    </>
  )
}

export default PostLayout