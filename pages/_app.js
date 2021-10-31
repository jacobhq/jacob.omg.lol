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
  ButtonGroup,
  useColorMode,
  extendTheme
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import { Home, Eye, Command, Moon, Sun, Monitor, ArrowLeft } from 'react-feather'
import useArrowKeyNavigationHook from "react-arrow-key-navigation-hook";
import theme from '../utils/theme'
import useSearch from 'react-hook-search';

function MyApp({ Component, pageProps }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isThemesOpen, onOpen: onThemesOpen, onClose: onThemesClose } = useDisclosure()
  const parentRef = useArrowKeyNavigationHook({ selectors: "[data-cmd]" });
  const themeRef = useArrowKeyNavigationHook({ selectors: "[data-cmd]" });

  const itemsGlobal = [{ name: 'Themes', icon: <Eye />, go: goThemes }, { name: 'Go home', icon: <Home />, go: () => router.push('/') }]
  const itemsGlobalAttrs = ['name', 'icon']
  const [filteredItems, globalSearch, setGlobalSearch] = useSearch(itemsGlobal, itemsGlobalAttrs);
  const themes = [{ name: 'Dark', icon: <Moon />, go: toggleColorMode }, { name: 'Light', icon: <Sun />, go: toggleColorMode }, { name: 'Back', icon: <ArrowLeft />, go: onThemesClose }]
  const themesAttrs = ['name', 'icon']
  const [filteredThemes, themesSearch, setThemesSearch] = useSearch(themes, themesAttrs);

  useHotkeys('ctrl+k', (e) => { e.preventDefault(); onOpen() })
  useHotkeys('G+H', () => router.push('/'))
  useHotkeys('T', () => toggleColorMode)

  function goThemes() {
    onClose()
    onThemesOpen()
  }

  return (
    <ChakraProvider theme={theme}>
      <Modal isOpen={isOpen} onClose={onClose} className={search.modal}>
        <ModalOverlay />
        <ModalContent className={search.modal}>
          <ModalBody className={search.modal} ref={parentRef}>
            <Input className={search.input} value={globalSearch} onChange={setGlobalSearch} placeholder="Search" variant="unstyled" data-cmd />
            <VStack align="start">
              {filteredItems.map((item, i) => <a key={i} className={search.item} href="#" onClick={item.go} data-cmd>
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
        <ModalContent className={search.modal}>
          <ModalBody className={search.modal} ref={themeRef}>
            <Input className={search.input} value={themesSearch} onChange={setThemesSearch} placeholder="Choose a theme" variant="unstyled" data-cmd />
            <VStack align="start">
              {filteredThemes.map((item, i) => <a key={i} className={search.item} href="#" onClick={toggleColorMode} data-cmd>
                <ButtonGroup>
                  <IconButton className={search.icon, search.noFocus} icon={item.icon} onClick={item.go} variant="unstyled" tabIndex="-1" />
                  <Button className={search.noFocus} variant="unstyled" padding="0" isFullWidth tabIndex="-1">{item.name}</Button>
                </ButtonGroup>
              </a>)}
            </VStack>
          </ModalBody>
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
          <Tooltip label="T" aria-label="Press ctrl and k to open the command menu">
            <IconButton variant="ghost" size="lg" icon={<Icon as={colorMode === "light" ? Moon : Sun} boxSize={6} />} onClick={toggleColorMode} aria-label="Open the command menu" />
          </Tooltip>
        </HStack>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  )
}

export default MyApp