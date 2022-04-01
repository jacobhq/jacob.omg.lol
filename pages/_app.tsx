import { ChakraProvider } from "@chakra-ui/react"
import {
  extendTheme
} from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css'
import NProgress from '../components/nprogress';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <UserProvider>
      <ChakraProvider>
        <Component {...pageProps} />
        <NProgress />
      </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp
