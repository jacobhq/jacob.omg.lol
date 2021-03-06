import Router from 'next/router'
import styles from '../styles/Home.module.css'
import {
    Code,
    Heading,
    Text,
    Button
} from "@chakra-ui/react"
import { useState } from 'react'
import Head from "next/head"
import Layout from '../components/Layout'

export default function HomePage() {
    let [loading, setLoading] = useState(false)

    function reload () {
        setLoading(true)
        Router.reload()
    }

    return (
        <>
        <Head>
            <title>Offline | JacobHQ</title>
        </Head>
        <div>
            <Layout>
                <Heading className={styles.h1}>You are offline</Heading>
                <Text>It looks like this page hasn't been cached to your device yet. Try visiting when you are online, or reloading this page.</Text>
                <br />
                <Code>ERR_INTERNET_DISCONNECTED</Code>
                <br />
                <br />
                    <Button variant="outline" isLoading={loading} isDisabled={loading} onClick={reload}>Reload</Button>
            </Layout>
        </div>
        </>
    )
}
