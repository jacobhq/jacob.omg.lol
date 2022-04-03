import styles from '../styles/Home.module.css'
import {
  Heading,
  Text
} from "@chakra-ui/react"
import Head from 'next/head'
import Layout from '../components/Layout'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Welcome to JacobHQ</title>
      </Head>
      <Layout>
        <Heading className={styles.h1}>Welcome to JacobHQ</Heading>
        <Text>Greetings, I’m Jacob, a human from planet earth. I’m a developer, creating open source software. Talk with me on Twitter, and code with me on GitHub. I’m coffee powered, so why not buy me a coffee.</Text>
      </Layout>
    </>
  )
}
