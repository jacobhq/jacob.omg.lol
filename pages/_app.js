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
  Hstack
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import { Home, Eye } from 'react-feather'
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  useCommand
} from 'colist'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isThemesOpen, onThemesOpen, onThemesClose } = useDisclosure()
  const commandProps = useCommand()

  const itemsGlobal = [['Themes', Eye, onThemesOpen], ['Go home'], Home, () => router.push('/')]

  useHotkeys('ctrl+k', (e) => { e.preventDefault(); onOpen() })
  useHotkeys('G+H', () => router.push('/'))

  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={onClose} className={search.modal}>
        <ModalOverlay />
        <ModalContent className={search.modal}>
          <ModalBody className={search.modal}>
            <Command
              aria-label="Command menu"
              dialog={false}
              {...commandProps}
            >
              <CommandInput placeholder="Search for something" className={search.input} />
              <CommandList className={search.list}>
                {itemsGlobal.map((item) =>
                  <CommandItem value={item[0]} callback={item[2]}>
                    <HStack>
                      <Icon as={item[1]} />
                      <Text>{item[0]}</Text>
                    </HStack>
                  </CommandItem>
                )}
              </CommandList>
            </Command>
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
            <IconButton variant="ghost" size="lg" icon={<Icon as={Home} boxSize={6} />} onClick={() => onOpen()} aria-label="Open the command menu" />
          </Tooltip>
        </HStack>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  )
}

export default MyApp