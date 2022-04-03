import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import theme from "../utils/theme"
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" sizes="57x57" href="/ios/57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/ios/60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/ios/72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/ios/76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/ios/114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/ios/120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/ios/144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/ios/152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
          <link rel='manifest' href='/manifest.json' />

          <meta name="theme-color" content="#ffffff" />
          <meta name="description" content="Greetings, I’m Jacob, a human from planet earth. I’m a developer, creating open source software. Talk with me on Twitter, and code with me on GitHub. I’m coffee powered, so why not buy me a coffee." />
        </Head>
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <script async data-api="/_hive" src="/bee.js"></script>
          <NextScript />
        </body>
      </Html>
    )
  }
}