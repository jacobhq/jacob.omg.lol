import { useColorMode } from '@chakra-ui/react'
import { ReactNode, useEffect } from 'react'
import { MarketingNav } from './Nav'

type LayoutProps = {
    children: ReactNode
    theme?: "light" | "dark",
    title: string
}

export default function MarketingLayout({ children, theme, title }: LayoutProps) {
    let { setColorMode } = useColorMode()

    useEffect(() => {
        console.log(theme)
        setColorMode(theme)
    }, [])

    return (
        <main>
            <MarketingNav title={title} />
            {children}
        </main>
    )
}