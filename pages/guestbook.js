import styles from '../styles/Home.module.css'
import {
  Heading,
  Text,
  Box,
  Button,
  IconButton,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useToken
} from "@chakra-ui/react"
import Head from 'next/head'
import { QuestionIcon } from '@chakra-ui/icons'

export default function HomePage() {
  const [gray300, gray400, gray500] = useToken("colors", ["gray.300", "gray.400", "gray.500"])

  return (
    <>
      <Head>
        <title>Guestbook | JacobHQ</title>
      </Head>
      <div>
        <main>
          <Heading className={styles.h1}>Guestbook</Heading>
          <Text>Leave me (and everyone who visits the site) a nice message...</Text>
          <br />
          <br />
          <Box p="5" borderWidth="1px" rounded="md">
            <Heading size="md" mb="10px">Sign in to leave a message</Heading>
            <Text mb="20px">Use your GitHub account to authenticate securly.</Text>
            <HStack mb="5px">
              <Button variant="outline">Log in with GitHub</Button>
              <Popover>
                <PopoverTrigger>
                  <IconButton icon={<QuestionIcon />} variant="ghost" />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Infomation</PopoverHeader>
                  <PopoverBody>Only public infomation, and your email will be used. Your email will not be shared.</PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
            <br />
            <Text fontSize="xs" as="i">Only public infomation, and your email will be used</Text>
          </Box>
          <Box as="section" padding="5">
            <Box>
              <Heading fontSize="lg">Lorem ipsum</Heading>
              <Text color={gray500}>Jacob Marshall • 8 October 2020</Text>
            </Box>
          </Box>
        </main>
      </div>
    </>
  )
}
