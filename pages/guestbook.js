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
  PopoverArrow,
  PopoverCloseButton,
  useToken,
  InputGroup,
  Input,
  InputRightElement,
  Tooltip
} from "@chakra-ui/react"
import Head from 'next/head'
import { QuestionIcon } from '@chakra-ui/icons'
import { PrismaClient } from '@prisma/client'
import format from 'date-fns/format'
import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link'
import prisma from '../utils/prisma';
import Router from 'next/router'

const isDev = process.env.NODE_ENV === 'development'

async function sendMsg(msg, author) {
  const res = await fetch('/api/sign', {
    body: JSON.stringify({ msg: msg, author: author }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

export default function HomePage({ messages }) {
  const [gray300, gray400, gray500] = useToken("colors", ["gray.300", "gray.400", "gray.500"])
  const { user: session, error, isLoading: isUserLoading } = useUser();
  const [messageValue, setMessage] = useState("")
  let [isLoading, setIsLoading] = useState(false)

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
          {!session ? <Box p="5" borderWidth="1px" rounded="md">
            <Heading size="md" mb="10px">Sign in to leave a message</Heading>
            <Text mb="20px">Use your GitHub account to authenticate securely.</Text>
            <HStack mb="5px">
              <Tooltip label="I'm still building this feature">
                <Link href="/api/auth/login">
                  <Button variant="outline" isLoading={isUserLoading}>Log in with GitHub</Button>
                </Link>
              </Tooltip>
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
          </Box> : <Box p="5" borderWidth="1px" rounded="md">
            <Heading size="md" mb="10px">Leave a message</Heading>
            <InputGroup>
              <Input placeholder="Sign the guestbook" onChange={(e) => setMessage(e.target.value)} />
              <InputRightElement width="4.5rem">
                <Button onClick={() => {sendMsg(messageValue, session.sub.includes('github|') ? session.nickname : session.username); setIsLoading(true); Router.reload()}} isLoading={isLoading} h="1.75rem" size="sm">Send</Button>
              </InputRightElement>
            </InputGroup>
          </Box>}
          <br />
          <Box as="section" padding="5">
            {messages.reverse().map(msg => (
              <Box key={msg.id} mb={6}>
                <Heading fontSize="lg">{msg.title}</Heading>
                <Text color={gray500}>{msg.author.toString()} • {format(new Date(msg.updatedAt), "d MMM yyyy 'at' h:mm bb")}</Text>
              </Box>
            ))}
          </Box>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = async ({ req }) => {
  const messages = await prisma.message.findMany()
  return { props: { messages } }
}
