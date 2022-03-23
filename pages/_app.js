import { ChakraProvider } from "@chakra-ui/react"
import '../styles/globals.css'
import {
  useColorMode,
  extendTheme} from '@chakra-ui/react'
import Nav from "../components/Nav"
import { UserProvider } from '@auth0/nextjs-auth0';

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <main>
          <Nav />
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp
