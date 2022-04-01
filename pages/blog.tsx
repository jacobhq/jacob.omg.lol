import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import styles from '../styles/Home.module.css'
import {
  Heading, Box, Text, HStack, Stack, Avatar, IconButton, useBreakpointValue, Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'
import { ChevronRight } from 'react-feather'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Date from '../components/date'
import Layout from '../components/Layout'

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
      <Layout>
        <section>
          <Heading className={styles.h1}>Blog</Heading>
          <Stack direction={["column", "row"]} className={styles.featured} justifyItems="start" align="start">
            {allPostsData.slice(0, 2).map(({ id, date, title, description, author, avatar }) => (
              <Box as="div" maxW={variant} p="5" borderWidth="1px" rounded="md" key={id} height="100%">
                <Box as="time" dateTime={date}></Box>
                <HStack>
                  <Heading size="md" my="2" cursor="pointer">
                    <p onClick={() => goPost(`/posts/${id}`)}>
                      {title}
                    </p>
                  </Heading>
                  <IconButton variant="ghost" icon={<ChevronRight />} isLoading={isNav} onClick={() => goPost(`/posts/${id}`)} className={styles.goBtn} />
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
        <Box as="section" marginTop="35px" marginBottom="100px" className={styles.tableAll}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Post name</Th>
                <Th>Description</Th>
                <Th>Author</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {allPostsData.map(({ id, date, title, description, author, avatar }) => (
                <Link key={id} href={`/posts/${id}`}>
                  <Tr cursor="pointer">
                    <Td>{title}</Td>
                    <Td>{description}</Td>
                    <Td>{author}</Td>
                    <Td>
                      <IconButton variant="ghost" icon={<ChevronRight />} isLoading={isNav} onClick={() => goPost(`/posts/${id}`)} className={styles.goBtn} />
                    </Td>
                  </Tr>
                </Link>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Layout>
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