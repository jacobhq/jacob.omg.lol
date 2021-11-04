import search from '../styles/Search.module.css'
import { useHotkeys } from "react-hotkeys-hook"
import { useRouter } from 'next/router'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
    IconButton,
    Input,
    VStack,
    ButtonGroup,
    useColorMode,
    Kbd,
    HStack
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import { Home, Eye, Moon, Sun, ArrowLeft, PenTool } from 'react-feather'
import useArrowKeyNavigationHook from "react-arrow-key-navigation-hook";
import useSearch from 'react-hook-search';
import { forwardRef, useImperativeHandle } from 'react'

const Menu = forwardRef((props, ref) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const router = useRouter()
    useImperativeHandle(ref, () => ({

        openModal() {
            onOpen()
        }

    }));
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isThemesOpen, onOpen: onThemesOpen, onClose: onThemesClose } = useDisclosure()
    const parentRef = useArrowKeyNavigationHook({ selectors: "[data-cmd]" });
    const themeRef = useArrowKeyNavigationHook({ selectors: "[data-cmd]" });

    const itemsGlobal = [{ name: 'Writing', icon: <PenTool />, kbd: "G+B", go: () => { router.push('/blog'); onClose() } }, { name: 'Themes', icon: <Eye />, kbd: "G+T", go: goThemes }, { name: 'Go home', icon: <Home />, kbd: "G+H", go: () => { router.push('/'); onClose() } }]
    const itemsGlobalAttrs = ['name', 'icon']
    const [filteredItems, globalSearch, setGlobalSearch] = useSearch(itemsGlobal, itemsGlobalAttrs);
    const themes = [{ name: 'Dark', icon: <Moon />, go: toggleColorMode }, { name: 'Light', icon: <Sun />, go: toggleColorMode }, { name: 'Back', icon: <ArrowLeft />, go: goBack }]
    const themesAttrs = ['name', 'icon']
    const [filteredThemes, themesSearch, setThemesSearch] = useSearch(themes, themesAttrs);

    // Keybinds
    // Open menu
    useHotkeys('ctrl+k', (e) => { e.preventDefault(); onOpen() })
    // Site navigation
    useHotkeys('G+H', () => router.push('/'))
    useHotkeys('G+B', () => router.push('/blog'))
    // Open themes modal
    useHotkeys('G+T', () => onThemesOpen())

    function goThemes() {
        onClose()
        onThemesOpen()
    }

    function goBack() {
        onThemesClose()
        onOpen()
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} className={search.modal}>
                <ModalOverlay />
                <ModalContent className={search.modal}>
                    <ModalBody className={search.modal} ref={parentRef}>
                        <Input className={search.input} value={globalSearch} onChange={setGlobalSearch} placeholder="Search" variant="unstyled" data-cmd />
                        <VStack align="start">
                            {filteredItems.map((item, i) => <a key={i} className={search.item} href="#" onClick={(e) => { e.preventDefault(); item.go() }} data-cmd>
                                <ButtonGroup className={search.itemWrapper} width="100%">
                                    <IconButton className={search.icon, search.noFocus} icon={item.icon} onClick={item.go} variant="unstyled" tabIndex="-1" />
                                    <Button className={search.noFocus} variant="unstyled" padding="0" isFullWidth tabIndex="-1" width="100%">
                                        <HStack width="100%" justify="space-between">
                                            <b className={search.p}>{item.name}</b>
                                            <Kbd className={search.kbd} align="end">{item.kbd}</Kbd>
                                        </HStack>
                                    </Button>
                                </ButtonGroup>
                            </a>)}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={isThemesOpen} onClose={onThemesClose}>
                <ModalOverlay />
                <ModalContent className={search.modal}>
                    <ModalBody className={search.modal} ref={themeRef}>
                        <Input className={search.input} value={themesSearch} onChange={setThemesSearch} placeholder="Choose a theme" variant="unstyled" data-cmd />
                        <VStack align="start">
                            {filteredThemes.map((item, i) => <a key={i} className={search.item} href="#" onClick={(e) => { e.preventDefault(); item.go() }} data-cmd>
                                <ButtonGroup>
                                    <IconButton className={search.icon, search.noFocus} icon={item.icon} onClick={item.go} variant="unstyled" tabIndex="-1" />
                                    <Button className={search.noFocus} variant="unstyled" padding="0" isFullWidth tabIndex="-1">{item.name}</Button>
                                </ButtonGroup>
                            </a>)}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
})

export default Menu;