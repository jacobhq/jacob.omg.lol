import {
    Heading,
    HStack,
    Icon,
    IconButton,
    Tooltip,
    useBreakpointValue
} from '@chakra-ui/react'
import { Home, Command } from 'react-feather'
import { InView } from 'react-intersection-observer';
import { useRef } from 'react';
import Menu from './Menu';
import router from 'next/router';
import styles from '../styles/Nav.module.css'

export default function Nav() {
    const variant = useBreakpointValue({ base: "blur", lg: "no-blur" })
    const menuRef = useRef()

    return (
        <>
            <Menu ref={menuRef} />
            {/* @ts-ignore */}
            <InView>
                {({ inView, ref, entry }) => (
                    <>
                        <HStack ref={ref} className={styles.nav}>
                            <Tooltip label="G H" aria-label="Press g and h to go home">
                                <IconButton variant="ghost" size="lg" icon={<Icon as={Home} boxSize={6} />} onClick={() => router.push('/')} aria-label="Go home" />
                            </Tooltip>
                            <Tooltip label="CTRL K" aria-label="Press ctrl and k to open the command menu">
                                {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
                                <IconButton variant="ghost" size="lg" icon={<Icon as={Command} boxSize={6} />} onClick={() => menuRef.current.openModal()} aria-label="Open the command menu" />
                            </Tooltip>
                        </HStack>
                        <HStack hidden={inView} position="fixed" left={0} top={0} width="100vw" paddingTop="15px" paddingBottom="15px" paddingLeft="15px" className={`${variant} ${styles.nav}`}>
                            <Tooltip label="G H" aria-label="Press g and h to go home">
                                <IconButton variant="ghost" size="lg" icon={<Icon as={Home} boxSize={6} />} onClick={() => router.push('/')} aria-label="Go home" />
                            </Tooltip>
                            <Tooltip label="CTRL K" aria-label="Press ctrl and k to open the command menu">
                                {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
                                <IconButton variant="ghost" size="lg" icon={<Icon as={Command} boxSize={6} />} onClick={() => menuRef.current.openModal()} aria-label="Open the command menu" />
                            </Tooltip>
                        </HStack>
                    </>
                )}
            </InView>
        </>
    )
}

type MarketingNavProps = {
    title: string
}

export function MarketingNav({ title }: MarketingNavProps) {
    const variant = useBreakpointValue({ base: "blur", lg: "no-blur" })
    const menuRef = useRef()

    return (
        <>
            <Menu ref={menuRef} />
            <HStack justifyContent="space-between" left={0} top={0} width="calc(100% - 15px)" paddingTop="15px" paddingBottom="15px" paddingLeft="15px" className={`${styles.nav}`}>
                <HStack>
                    <Tooltip label="G H" aria-label="Press g and h to go home">
                        <IconButton variant="ghost" size="lg" icon={<Icon as={Home} boxSize={6} />} onClick={() => router.push('/')} aria-label="Go home" />
                    </Tooltip>
                    <Tooltip label="CTRL K" aria-label="Press ctrl and k to open the command menu">
                        {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
                        <IconButton variant="ghost" size="lg" icon={<Icon as={Command} boxSize={6} />} onClick={() => menuRef.current.openModal()} aria-label="Open the command menu" />
                    </Tooltip>
                </HStack>
                <Heading size="sm">Project: {title}</Heading>
            </HStack>
        </>
    )
}