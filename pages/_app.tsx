import { ChakraProvider } from "@chakra-ui/react"
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css'
import NProgress from '../components/nprogress';
import { extendTheme } from '@chakra-ui/react'
import { withProse } from '@nikolovlazar/chakra-ui-prose'
import { Toaster } from 'react-hot-toast';

const theme = extendTheme(
  {
    // your own theme
  },
  withProse(),
)

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <UserProvider>
      <ChakraProvider>
        <Component {...pageProps} />
        <NProgress />
        <Toaster />
      </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp
