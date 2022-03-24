import { Button, Center, DarkMode, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import useSWR from 'swr'
import Nav from '../components/Nav'

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

  return <>
    <DarkMode>
      <Center h="100%">
        {data ? <YouTube ref={initialRef} videoId={data.videoID} containerClassName="full" opts={{ width: "100%", height: "100%", playerVars: { autoplay: 1 } }} /> : <Spinner color='white' size="xl" />}
      </Center>
    </DarkMode>
  </>
}

export default Stream