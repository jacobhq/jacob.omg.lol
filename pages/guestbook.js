import styles from "../styles/Home.module.css";
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
  Tooltip,
  useToast,
  Spinner,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import Head from "next/head";
import { QuestionIcon } from "@chakra-ui/icons";
import format from "date-fns/format";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import useSWR, { mutate } from 'swr'

const isDev = process.env.NODE_ENV === "development";

async function sendMsg(msg, author) {
  const res = await fetch("/api/sign", {
    body: JSON.stringify({ msg: msg, author: author }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  mutate('/api/guestbook')
}

export default function HomePage() {
  const [gray300, gray400, gray500] = useToken("colors", [
    "gray.300",
    "gray.400",
    "gray.500",
  ]);
  const { user: session, error, isLoading: isUserLoading } = useUser();
  const [messageValue, setMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: messages, error: msgErr } = useSWR('/api/guestbook', fetcher, { refreshInterval: 10000 })

  return (
    <>
      <Head>
        <title>Guestbook | JacobHQ</title>
      </Head>
      <div>
        <main>
          <Heading className={styles.h1}>Guestbook</Heading>
          <Text>
            Leave me (and everyone who visits the site) a nice message...
          </Text>
          <br />
          {!session ? (
            <Box p="5" borderWidth="1px" rounded="md">
              <Heading size="md" mb="10px">
                Sign in to leave a message
              </Heading>
              <Text mb="20px">
                Use your GitHub account to authenticate securely.
              </Text>
              <HStack mb="5px">
                <Tooltip label="I'm still building this feature">
                  <Link href="/api/auth/login?returnTo=/guestbook">
                    <Button variant="outline" isLoading={isUserLoading}>
                      Continue with JHQ ID
                    </Button>
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
                    <PopoverBody>
                      Only public infomation, and your email will be used. Your
                      email will not be shared.
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </HStack>
              <br />
              <Text fontSize="xs" as="i">
                Only public infomation, and your email will be used
              </Text>
            </Box>
          ) : (
            <Box p="5" borderWidth="1px" rounded="md">
              <Heading size="md" mb="10px">
                Leave a message
              </Heading>
              <InputGroup>
                <Input
                  placeholder="Sign the guestbook"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    onClick={() => { sendMsg(messageValue, session.name ? session.name : session.nickname); setIsLoading(true); setTimeout(() => setIsLoading(false), 3000); }}
                    isLoading={isLoading}
                    h="1.75rem"
                    size="sm"
                  >
                    Send
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          )}
          <br />
          <Box as="section" padding="5">
            {messages ? messages.map((msg) => (
              <Box key={msg.id} mb={6}>
                <Heading fontSize="lg">{msg.title}</Heading>
                <Text color={gray500}>
                  {msg.author.toString()} •{" "}
                  {format(new Date(msg.updatedAt), "d MMM yyyy 'at' h:mm bb")}
                </Text>
              </Box>
            )) : [...Array(5).keys()].map((i) => (
              <Box key={i} mb={6}>
                <Skeleton h={2}>
                  <Heading fontSize="lg">Lorem ipsum dolor sit amet</Heading>
                </Skeleton>
                <SkeletonText>
                  <Text color={gray500}>
                    Excepteur sint occaecat cupidatat non proident
                  </Text>
                </SkeletonText>
              </Box>
            ))}
          </Box>
        </main>
      </div>
    </>
  );
}
