import Head from 'next/head'
import Link from 'next/link'
import { allNewsletters } from 'contentlayer/generated'
import { Newsletter } from 'contentlayer/generated'
import { Heading, HStack, Avatar, Button, Text, useDisclosure, Tooltip, VStack, Divider } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'
import title from '../../styles/Home.module.css'
import Date from 'components/date'
import Layout from 'components/Layout'

export async function getStaticPaths() {
  const paths = allNewsletters.map((p) => ({ params: { slug: p.slug } }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const letter = allNewsletters.find((post) => post.slug === params.slug)
  return {
    props: {
      letter
    }
  }
}

const PostLayout = ({ letter }: { letter: Newsletter }) => {
  let { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Head>
        <title>{letter.title} - Blog | JacobHQ</title>
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
          <ReactMarkdown
            components={ChakraUIRenderer()}
            children={letter.body.raw}
          />
          <Link href="/archive">
            <Button variant="ghost" marginTop="50px">&larr; Back to archive</Button>
          </Link>
        </article>
      </Layout>
    </>
  )
}

export default PostLayout