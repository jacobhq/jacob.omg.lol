import { ChakraProvider } from "@chakra-ui/react"
import {
  extendTheme
} from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <UserProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp
