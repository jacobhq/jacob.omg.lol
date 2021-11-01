import { ChakraProvider } from "@chakra-ui/react"
import '../styles/globals.css'
import {
  HStack,
  Icon,
  IconButton,
  Tooltip,
  useColorMode,
  extendTheme
} from '@chakra-ui/react'
import { Home, Command, Moon, Sun } from 'react-feather'
import Menu from "../components/Menu"
import { useRef } from "react"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

function MyApp({ Component, pageProps }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const menuRef = useRef()

  return (
    <ChakraProvider theme={theme}>
      <Menu ref={menuRef} />
      <main>
        <HStack>
          <Tooltip label="G H" aria-label="Press g and h to go home">
            <IconButton variant="ghost" size="lg" icon={<Icon as={Home} boxSize={6} />} />
          </Tooltip>
          <Tooltip label="CTRL K" aria-label="Press ctrl and k to open the command menu">
            <IconButton variant="ghost" size="lg" icon={<Icon as={Command} boxSize={6} />} onClick={() => menuRef.current.openModal()} aria-label="Open the command menu" />
          </Tooltip>
        </HStack>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  )
}

export default MyApp