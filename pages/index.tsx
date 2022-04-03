import styles from '../styles/Home.module.css'
import {
  Heading,
  Text,
  Box,
  Flex,
  Button,
  Badge,
  Avatar,
  HStack,
  Stack,
  useBreakpointValue,
  IconButton,
  useColorModeValue,
  Skeleton
} from "@chakra-ui/react"
import { ChevronRight } from 'react-feather'
import Head from 'next/head'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Date from '../components/date'
import useSWR from 'swr'

export default function HomePage({ allPostsData }) {
  const router = useRouter()
  let [isNav, setNav] = useState(false)

  function goPost(url) {
    setNav(true)
    router.push(url)
  }
  const variant = useBreakpointValue({ base: "100%", md: "50%" })
  const accent = useColorModeValue("blackAlpha.100", "whiteAlpha.100")

  // @ts-expect-error ts-migrate(2556) FIXME: Expected 1-2 arguments, but got 0 or more.
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/get-countdown", fetcher);

  return (
    <>
      <Head>
        <title>Welcome to JacobHQ</title>
      </Head>
      <Layout>
        <Box as="section" pb={6}>
          <Box mb={4}>
            <Heading className={styles.h1}>Welcome to JacobHQ</Heading>
            {data ? data.err !== "No current streams" ? <Badge colorScheme="red" mt={2}>Live now</Badge> : null : <Skeleton>
              <Badge colorScheme="red" mt={2}>Live now</Badge>
            </Skeleton>}
          </Box>
          <Text>Greetings, I’m Jacob, a human from planet earth. I’m a developer, creating open source software. Talk with me on Twitter, and code with me on GitHub. I’m coffee powered, so why not buy me a coffee.</Text>
          {data ? data.err !== "No current streams" ? <Box bg={accent} p={6} borderRadius={6} mt={3}>
            <Flex justifyContent="space-between">
              <Box>
                <Heading size="sm">I'm live now!</Heading>
                <Text>Watch my current live stream.</Text>
              </Box>
              <Button colorScheme="red">Watch now</Button>
            </Flex>
          </Box> : null : <Skeleton>
            <Box bg={accent} p={6} borderRadius={6} mt={3}>
              <Flex justifyContent="space-between">
                <Box>
                  <Heading size="sm">I'm live now!</Heading>
                  <Text>Watch my current live stream.</Text>
                </Box>
                <Button colorScheme="red">Watch now</Button>
              </Flex>
            </Box>
          </Skeleton>}
        </Box>
        <Box as="section" py={6}>
          <Heading size="lg" mb={4}>From the blog</Heading>
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
                  {/* @ts-expect-error ts-migrate(2741) FIXME: Property '"aria-label"' is missing in type '{ vari... Remove this comment to see the full error message */}
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
