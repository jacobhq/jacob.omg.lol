import { ChakraProvider } from "@chakra-ui/react"
import '../styles/globals.css'
import search from '../styles/Search.module.css'
import { useHotkeys } from "react-hotkeys-hook"
import { useRouter } from 'next/router'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Icon,
  IconButton,
  Tooltip,
  Input,
  InputGroup,
  InputRightElement,
  Divider,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  SimpleGrid,
  Text,
  Hstack,
  VStack,
  ButtonGroup
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import { Home, Eye, Command } from 'react-feather'
import useArrowKeyNavigationHook from "react-arrow-key-navigation-hook";

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isThemesOpen, onThemesOpen, onThemesClose } = useDisclosure()
  const parentRef = useArrowKeyNavigationHook({ selectors: "[data-cmd]" });

  const itemsGlobal = [{ name: 'Themes', icon: <Eye />, go: onThemesOpen }, { name: 'Go home', icon: <Home />, go: () => router.push('/') }]

  useHotkeys('ctrl+k', (e) => { e.preventDefault(); onOpen() })
  useHotkeys('G+H', () => router.push('/'))

  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={onClose} className={search.modal}>
        <ModalOverlay />
        <ModalContent className={search.modal}>
          <ModalBody className={search.modal} ref={parentRef}>
            <Input className={search.input} placeholder="Search" variant="unstyled" data-cmd />
            <VStack align="start">
              {itemsGlobal.map((item, i) => <a key={i} className={search.item} href="#" onClick={item.go} data-cmd>
                <ButtonGroup>
                  <IconButton className={search.icon, search.noFocus} icon={item.icon} onClick={item.go} variant="unstyled" tabIndex="-1" />
                  <Button className={search.noFocus} variant="unstyled" padding="0" isFullWidth tabIndex="-1">{item.name}</Button>
                </ButtonGroup>
              </a>)}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isThemesOpen} onClose={onThemesClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Hoi
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onThemesClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <main>
        <HStack>
          <Tooltip label="G H" aria-label="Press g and h to go home">
            <IconButton variant="ghost" size="lg" icon={<Icon as={Home} boxSize={6} />} />
          </Tooltip>
          <Tooltip label="CTRL K" aria-label="Press ctrl and k to open the command menu">
            <IconButton variant="ghost" size="lg" icon={<Icon as={Command} boxSize={6} />} onClick={() => onOpen()} aria-label="Open the command menu" />
          </Tooltip>
        </HStack>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  )
}

export default MyApp