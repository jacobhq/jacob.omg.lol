import { Button, ButtonGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'

const Stream = () => {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR('/api/get-stream', fetcher)
    let [hasOpened, setOpened] = useState(false)

    const { isOpen, onClose, onOpen } = useDisclosure()

    useEffect(() => {
        if (data && !hasOpened) {
            if (data.err !== "No current streams") {
                onOpen()
                setOpened(true)
            }
        }
    })

    return <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Live stream happening now
                </ModalHeader>
                <ModalBody>
                    <Text>You&apos;re just in time for one of my live streams! Tune in from the comfort of my website to watch the stream live.</Text>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <Button variant="ghost" onClick={onClose}>Close</Button>
                        <Link href="/stream">
                            <Button colorScheme="red">Watch stream</Button>
                        </Link>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}

export default Stream