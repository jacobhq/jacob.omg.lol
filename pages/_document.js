import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import theme from "../utils/theme"
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel='manifest' href='/manifest.json' />
        </Head>
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}