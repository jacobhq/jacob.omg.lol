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

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

function MyApp({ Component, pageProps }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const menuRef = useRef()

  const className = useBreakpointValue({ base: "ghost", md: "outline" })

  return (
    <ChakraProvider theme={theme}>
      <Menu ref={menuRef} />
      <main>
        <InView>
          {({ inView, ref, entry }) => (
            <>
            <HStack ref={ref}>
              <Tooltip label="G H" aria-label="Press g and h to go home">
                <IconButton variant="ghost" size="lg" icon={<Icon as={Home} boxSize={6} />} />
              </Tooltip>
              <Tooltip label="CTRL K" aria-label="Press ctrl and k to open the command menu">
                <IconButton variant="ghost" size="lg" icon={<Icon as={Command} boxSize={6} />} onClick={() => menuRef.current.openModal()} aria-label="Open the command menu" />
              </Tooltip>
            </HStack>
            <HStack hidden={inView} position="fixed" left={10} top={2} width="100vw" className={className}>
            <Tooltip label="G H" aria-label="Press g and h to go home">
              <IconButton variant="ghost" size="lg" icon={<Icon as={Home} boxSize={6} />} />
            </Tooltip>
            <Tooltip label="CTRL K" aria-label="Press ctrl and k to open the command menu">
              <IconButton variant="ghost" size="lg" icon={<Icon as={Command} boxSize={6} />} onClick={() => menuRef.current.openModal()} aria-label="Open the command menu" />
            </Tooltip>
          </HStack>
          </>
          )}
        </InView>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  )
}

export default MyApp
