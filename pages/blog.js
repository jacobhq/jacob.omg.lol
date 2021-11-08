import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import styles from '../styles/Home.module.css'
import { Heading, Box, Text, HStack, Stack, Avatar, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { ChevronRight } from 'react-feather'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Date from '../components/date'

export default function Home({ allPostsData }) {
  const router = useRouter()
  let [isNav, setNav] = useState(false)

  function goPost(url) {
    setNav(true)
    router.push(url)
  }

  const variant = useBreakpointValue({ base: "100%", md: "50%" })

  return (
    <>
      <Head>
        <title>Blog | JacobHQ</title>
      </Head>
      <section>
        <Heading className={styles.h1}>Blog</Heading>
        <Stack direction={["column", "row"]} className={styles.featured} justifyItems="start" align="start">
          {allPostsData.map(({ id, date, title, description, author, avatar }) => (
            <Box as="div" maxW={variant} p="5" borderWidth="1px" rounded="md" key={id} height="100%">
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
                <Text>{author} • <Date dateString={date} /></Text>
              </HStack>
            </Box>
          ))}
        </Stack>
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