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
  Skeleton,
  SimpleGrid,
  Spinner,
  Center,
  ButtonGroup,
  Icon,
  SkeletonText,
  SkeletonCircle,
  useDisclosure,
  Collapse,
  CSSReset
} from "@chakra-ui/react"
import { ChevronRight, Heart } from 'react-feather'
import Head from 'next/head'
import Layout from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Date from '../components/date'
import useSWR from 'swr'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'

const theme = {
  p: props => {
    const { children } = props;
    return (<Text>
      {children}
    </Text>)
  },
};


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
  const { data: tweets, error: tweetsErr } = useSWR("/api/get-tweets", fetcher);

  const { isOpen: streamVisible, onOpen: makeStreamVisible } = useDisclosure()

  useEffect(() => {
    if (data) {
      if (data.err !== "No current streams") makeStreamVisible()
    }
  }, [data])

  return (
    <>
      <Head>
        <title>Welcome to JacobHQ</title>
      </Head>
      <Layout>
        <Box as="section" pb={6}>
          <Box mb={4}>
            <Heading className={styles.h1}>Welcome to JacobHQ</Heading>
            <Collapse in={streamVisible} animateOpacity>
              <Badge colorScheme="red" mt={2}>Live now</Badge>
            </Collapse>
          </Box>
          <Text>Greetings, I’m Jacob, a human from planet earth. I’m a developer, creating open source software. Talk with me on Twitter, and code with me on GitHub. I’m coffee powered, so why not buy me a coffee.</Text>
          <Collapse in={streamVisible} animateOpacity>
            <Box bg={accent} p={6} borderRadius={6} mt={3}>
              <Flex justifyContent="space-between">
                <Box>
                  <Heading size="sm">I'm live now!</Heading>
                  <Text>Watch my current live stream.</Text>
                </Box>
                <Link href="/stream">
                  <Button colorScheme="red">Watch now</Button>
                </Link>
              </Flex>
            </Box>
          </Collapse>
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
        <Box as="section" py={6}>
          <Heading size="lg" mb={4}>Recent tweets</Heading>
          <SimpleGrid columns={[1, null, 2]} spacing={3}>
            {tweets ? tweets.data.map((tweet) =>
              <Box p="5" borderWidth="1px" rounded="md" height="100%" display="flex" justifyContent="space-between" flexDir="column">
                <HStack>
                  <CSSReset />
                  <ReactMarkdown components={ChakraUIRenderer(theme)} remarkPlugins={[remarkGfm]}>
                    {tweet.text}
                  </ReactMarkdown>
                </HStack>
                <Flex justifyContent="space-between" marginTop={4}>
                  <HStack>
                    <Avatar name="Jacob Marshall" src="https://pbs.twimg.com/profile_images/1505274218518401030/y12F8yt-_400x400.png" size="xs" />
                    <Text>Jacob Marshall</Text>
                  </HStack>
                  <Flex alignItems="end">
                    <ButtonGroup size="sm" variant="ghost">
                      <a href={`https://twitter.com/intent/like?tweet_id=${tweet.id}`} target="_blank" rel="noopener noreferrer">
                        <IconButton icon={<Icon as={Heart} />} aria-label="Like on twitter" />
                      </a>
                      <a href={`https://twitter.com/jhqcat/status/${tweet.id}`} target="_blank" rel="noopener noreferrer">
                        <IconButton icon={<ExternalLinkIcon />} aria-label="Read on twitter" />
                      </a>
                    </ButtonGroup>
                  </Flex>
                </Flex>
              </Box>
              // @ts-expect-error ts-migrate(2569) FIXME: Type 'IterableIterator<number>' is not an array ty... Remove this comment to see the full error message
            ) : [...Array(2).keys()].map((i) =>
              <Box key={i} p="5" borderWidth="1px" rounded="md" height="100%" display="flex" justifyContent="space-between" flexDir="column">
                <HStack>
                  <SkeletonText noOfLines={6}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </SkeletonText>
                </HStack>
                <Flex justifyContent="space-between" marginTop={4}>
                  <HStack>
                    <SkeletonCircle>
                      <Avatar name="Jacob Marshall" src="https://pbs.twimg.com/profile_images/1505274218518401030/y12F8yt-_400x400.png" size="xs" />
                    </SkeletonCircle>
                    <Skeleton>
                      <Text>Jacob Marshall</Text>
                    </Skeleton>
                  </HStack>
                  <Flex alignItems="end">
                    <ButtonGroup size="sm" variant="ghost">
                      <Skeleton>
                        <IconButton icon={<Icon as={Heart} />} aria-label="Like on twitter" />
                      </Skeleton>
                      <Skeleton>
                        <IconButton icon={<ExternalLinkIcon />} aria-label="Read on twitter" />
                      </Skeleton>
                    </ButtonGroup>
                  </Flex>
                </Flex>
              </Box>)}
          </SimpleGrid>
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
