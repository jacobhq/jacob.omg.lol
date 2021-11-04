import { ChakraProvider } from "@chakra-ui/react"
import '../styles/globals.css'
import {
  HStack,
  Icon,
  IconButton,
  Tooltip,
  useColorMode,
  extendTheme,
  Heading,
  useBreakpointValue
} from '@chakra-ui/react'
import { Home, Command, Moon, Sun } from 'react-feather'
import Menu from "../components/Menu"
import { useRef } from "react"
import { InView } from 'react-intersection-observer';
import Nav from "../components/Nav"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

function MyApp({ Component, pageProps }) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <ChakraProvider theme={theme}>
      <main>
        <Nav />
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  )
}

export default MyApp
