import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
  Code,
  Heading,
  Text,
  Button,
  useColorMode
} from "@chakra-ui/react"
import { useHotkeys } from 'react-hotkeys-hook'

export default function HomePage() {
  const {toggleColorMode} = useColorMode()

  return (
    <div>
      <main>
        <Heading className={styles.h1}>Welcome to JacobHQ</Heading>
        <Text>Greetings, I’m Jacob, a human from planet earth. I’m a developer, creating open source software. Talk with me on Twitter, and code with me on GitHub. I’m coffee powered, so why not buy me a coffee.</Text>
      </main>
    </div>
  )
}
