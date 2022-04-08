import Head from 'next/head'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import type { Post } from 'contentlayer/generated'
import { Heading, HStack, Avatar, Button, Text } from '@chakra-ui/react'
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
      post,
    },
  }
}

const PostLayout = ({ post, params }: Post) => {
  console.log(params)
  return (
    <>
      <Head>
        <title> - Blog | JacobHQ</title>
        <meta name="author" content={post.author} />
      </Head>
      <Layout>
        <article>
          <Heading className={title.h1}>{post.title}</Heading>
          <HStack>
            <Avatar name={post.author} src={post.avatar} size="xs" />
            <Text>
              {post.author} • <Date dateString={post.date} />
            </Text>
          </HStack>
          <br />
          <br />
          <ReactMarkdown
            components={ChakraUIRenderer()}
            children={post.body.raw}
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ components: any; children: any; escapeHtml... Remove this comment to see the full error message
            escapeHtml={false}
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