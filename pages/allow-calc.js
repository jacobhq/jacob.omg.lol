import styles from '../styles/Home.module.css'
import {
    Heading,
    Text,
    Avatar,
    HStack
} from "@chakra-ui/react"
import Head from 'next/head'
import logo from '../public/logo.png'

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Welcome to JacobHQ</title>
            </Head>
            <div>
                <main>
                    <Heading className={styles.h1}>Hegarty allow calculator</Heading>
                    <HStack mt="10px" mb="20px">
                        <Avatar name="Jacob Marshall" src='/logo.png' size="xs" />
                        <HStack pt="10px">
                            <Text pb="5px">Jacob Marshall • A chrome extension to always allow calculator on hegartymaths.</Text>
                        </HStack>
                    </HStack>
                    <hr />
                    <Text></Text>
                </main>
            </div>
        </>
    )
}
