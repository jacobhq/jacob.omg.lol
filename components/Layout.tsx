import Nav from './Nav'
import NewsletterCard from './Newsletter'
import Stream from './Stream'

export default function Layout ({ children }) {
    return (
        <main>
            <Nav />
            {children}
            <NewsletterCard />
        </main>
    )
}