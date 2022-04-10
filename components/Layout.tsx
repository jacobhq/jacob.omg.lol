import Nav from './Nav'
import NewsletterCard from './Newsletter'
import Stream from './Stream'

export default function Layout ({ children }) {
    return (
        <main>
            <Stream />
            <Nav />
            {children}
            <NewsletterCard />
        </main>
    )
}