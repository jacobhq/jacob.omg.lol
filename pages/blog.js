import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import styles from '../styles/Home.module.css'
import { Heading, Box, Text, HStack, Avatar, IconButton } from '@chakra-ui/react'
import { ChevronRight } from 'react-feather'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home({ allPostsData }) {
  const router = useRouter()
  let [isNav, setNav] = useState(false)

  function goPost(url) {
    setNav(true)
    router.push(url)
  }

  return (
    <>
      <Head>
        <title>Blog | JacobHQ</title>
      </Head>
      <section>
        <Heading className={styles.h1}>Blog</Heading>
        <HStack className={styles.featured}>
          {allPostsData.map(({ id, date, title, description, author, avatar }) => (
              <Box as="article" maxW="sm" p="5" borderWidth="1px" rounded="md" key={id}>
                <Box as="time" dateTime={date}></Box>
                <HStack>
                <Heading size="md" my="2" cursor="pointer">
                  <p onClick={() => goPost(`/posts/${id}`)}>
                    {title}
                  </p>
                </Heading>
                <IconButton variant="ghost" icon={<ChevronRight />} isLoading={isNav} onClick={() => goPost(`/posts/${id}`)} />
                </HStack>
                <Text>{description}</Text>
                <HStack marginTop="15px">
                  <Avatar name={author} src={avatar} size="xs" />
                  <Text>{author}</Text>
                </HStack>
              </Box>
          ))}
        </HStack>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}