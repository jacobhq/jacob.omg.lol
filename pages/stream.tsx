import {
  Button,
  ButtonGroup,
  Center,
  DarkMode,
  Box,
  Heading,
  Text,
  Spinner,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import useSWR from "swr";
import Link from "next/link";
import SiteNav from "../components/SiteNav";

const Stream = () => {
  // @ts-expect-error ts-migrate(2556) FIXME: Expected 1-2 arguments, but got 0 or more.
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/get-countdown", fetcher);
  let [hasOpened, setOpened] = useState(false);

  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const initialRef = useRef();

  useEffect(() => {
    if (data && !hasOpened) {
      onOpen();
      setOpened(true);
    }
  });

  console.log(data ? `${data}, ${error}` : error);

  return (
    <Box bg="gray.800">
      <SiteNav />
      <DarkMode>
        <Box h="100vh" maxW="100vw">
          <Center h="100%" w="100%">
            {data ? (
              data.err !== "No current streams" ? (
                <YouTube
                  ref={initialRef}
                  videoId={data.videoID}
                  containerClassName="full"
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: { autoplay: 1 },
                  }}
                />
              ) : (
                <Container textAlign="center" py={10} px={6}>
                  <Heading as="h2" size="xl" mt={6} mb={2} color="white">
                    It&apos;s oh so quiet
                  </Heading>
                  <Text color={"gray.500"}>
                    I'm not streaming right now, but a stream will be posted
                    here when I start!
                  </Text>
                  <ButtonGroup mt={8}>
                    <Link href="https://www.youtube.com/channel/UChXCa0OuD-HYr3QAESK434g">
                      <Button colorScheme="red">Subscribe on YouTube</Button>
                    </Link>
                    <Link href="/">
                      <Button variant="ghost">Go home</Button>
                    </Link>
                  </ButtonGroup>
                </Container>
              )
            ) : (
              <Spinner color="white" size="xl" />
            )}
          </Center>
        </Box>
        <Box p={8}>
          <ButtonGroup color="white">
            <Link href="https://www.youtube.com/channel/UChXCa0OuD-HYr3QAESK434g">
              <Button colorScheme="red">Subscribe on YouTube</Button>
            </Link>
            {data ? (
              data.err !== "No current streams" ? (
                <Link href={`https://youtu.be/${data && data.videoID}`}>
                  <Button variant="outline">Watch on YouTube</Button>
                </Link>
              ) : (
                <Button variant="outline" isDisabled>
                  Watch on YouTube
                </Button>
              )
            ) : (
              <Button variant="outline" isLoading>
                Watch on YouTube
              </Button>
            )}
            <Link href="/">
              <Button variant="outline">Go home</Button>
            </Link>
          </ButtonGroup>
        </Box>
      </DarkMode>
    </Box>
  );
};

export default Stream;
