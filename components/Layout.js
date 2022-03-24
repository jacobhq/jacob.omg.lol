import Nav from './Nav'
import Stream from './Stream'

export default function Layout ({ children }) {
    return (
        <main>
            <Stream />
            <Nav />
            {children}
        </main>
    )
}