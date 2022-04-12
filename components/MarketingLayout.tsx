import { MarketingNav } from './Nav'

type LayoutProps = {
    children: any
}

export default function MarketingLayout ({ children }: LayoutProps) {
    return (
        <main>
            <MarketingNav />
            {children}
        </main>
    )
}