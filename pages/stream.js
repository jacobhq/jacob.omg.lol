import { Button, ButtonGroup, Center, DarkMode, Box, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import useSWR from 'swr'
import Link from 'next/link'

const Stream = () => {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR('/api/get-stream', fetcher)
  let [hasOpened, setOpened] = useState(false)

  const router = useRouter()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const initialRef = useRef()

  useEffect(() => {
    if (data && !hasOpened) {
      onOpen()
      setOpened(true)
    }
  })

  return <Box bg="gray.800">
    <DarkMode>
      <Box h="100vh" maxW="100vw">
        <Center h="100%" w="100%">
          {data ? <YouTube ref={initialRef} videoId={data.videoID} containerClassName="full" opts={{ width: "100%", height: "100%", playerVars: { autoplay: 1 } }} /> : <Spinner color='white' size="xl" />}
        </Center>
      </Box>
      <Box p={8}>
        <ButtonGroup color="white">
          <Link href="/">
            <Button colorScheme="red">Go home</Button>
          </Link>
          {data ? <Link href={`https://youtu.be/${data.videoID}`}>
            <Button variant="ghost">Watch on YouTube</Button>
          </Link> : <Button variant="outline" isLoading>Watch on YouTube</Button>}
        </ButtonGroup>
      </Box>
    </DarkMode>
  </Box>
}

export default Stream