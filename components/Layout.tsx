import Nav from './Nav'
import NewsletterCard from './Newsletter'

type LayoutProps = {
    children: any
    hasNewsletterCard?: boolean
}

export default function Layout ({ children, hasNewsletterCard }: LayoutProps) {
    return (
        <main>
            <Nav />
            {children}
            {hasNewsletterCard !== false && <NewsletterCard />}
        </main>
    )
}