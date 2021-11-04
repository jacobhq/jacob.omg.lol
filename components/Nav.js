import {
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

export default function Nav() {
    const variant = useBreakpointValue({ base: "blur", lg: "no-blur" })
    const menuRef = useRef()

    return (
        <>
            <Menu ref={menuRef} />
            <InView>
                {({ inView, ref, entry }) => (
                    <>
                        <HStack ref={ref}>
                            <Tooltip label="G H" aria-label="Press g and h to go home">
                                <IconButton variant="ghost" size="lg" icon={<Icon as={Home} boxSize={6} />} onClick={() => router.push('/')} />
                            </Tooltip>
                            <Tooltip label="CTRL K" aria-label="Press ctrl and k to open the command menu">
                                <IconButton variant="ghost" size="lg" icon={<Icon as={Command} boxSize={6} />} onClick={() => menuRef.current.openModal()} aria-label="Open the command menu" />
                            </Tooltip>
                        </HStack>
                        <HStack hidden={inView} position="fixed" left={0} top={0} width="100vw" paddingTop="15px" paddingBottom="15px" paddingLeft="15px" className={variant}>
                            <Tooltip label="G H" aria-label="Press g and h to go home">
                                <IconButton variant="ghost" size="lg" icon={<Icon as={Home} boxSize={6} />} onClick={() => router.push('/')} />
                            </Tooltip>
                            <Tooltip label="CTRL K" aria-label="Press ctrl and k to open the command menu">
                                <IconButton variant="ghost" size="lg" icon={<Icon as={Command} boxSize={6} />} onClick={() => menuRef.current.openModal()} aria-label="Open the command menu" />
                            </Tooltip>
                        </HStack>
                    </>
                )}
            </InView>
        </>
    )
}