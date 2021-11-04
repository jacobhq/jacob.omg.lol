import styles from '../styles/Home.module.css'
import {
  Heading,
  Text
} from "@chakra-ui/react"

export default function HomePage() {
  return (
    <div>
      <main>
        <Heading className={styles.h1}>Welcome to JacobHQ</Heading>
        <Text>Greetings, I’m Jacob, a human from planet earth. I’m a developer, creating open source software. Talk with me on Twitter, and code with me on GitHub. I’m coffee powered, so why not buy me a coffee.</Text>
      </main>
    </div>
  )
}
