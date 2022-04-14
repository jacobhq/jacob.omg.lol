import search from "../styles/Search.module.css";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/router";
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
  HStack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Home,
  Eye,
  Moon,
  Sun,
  ArrowLeft,
  PenTool,
  Book,
  Code,
  Film,
  Archive,
} from "react-feather";
import useArrowKeyNavigationHook from "react-arrow-key-navigation-hook";
import useSearch from "react-hook-search";
import { forwardRef, useImperativeHandle } from "react";
import SiteNav from "./SiteNav";
import { allMarketings } from "contentlayer/generated";

const Menu = forwardRef((props, ref) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  useImperativeHandle(ref, () => ({
    openModal() {
      onOpen();
    },
  }));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isThemesOpen,
    onOpen: onThemesOpen,
    onClose: onThemesClose,
  } = useDisclosure();
  const {
    isOpen: isProjectsOpen,
    onOpen: onProjectsOpen,
    onClose: onProjectsClose,
  } = useDisclosure();
  const parentRef = useArrowKeyNavigationHook({ selectors: "[data-cmd]" });
  const themeRef = useArrowKeyNavigationHook({ selectors: "[data-cmd]" });
  const projectRef = useArrowKeyNavigationHook({ selectors: "[data-cmd]" });

  const itemsGlobal = [
    {
      name: "Writing",
      icon: <PenTool />,
      kbd: "G+B",
      go: () => {
        router.push("/blog");
        onClose();
      },
    },
    {
      name: "Newsletter archive",
      icon: <Archive />,
      kbd: "G+A",
      go: () => {
        router.push("/archive");
        onClose();
      },
    },
    {
      name: "Guestbook",
      icon: <Book />,
      kbd: "L+M",
      go: () => {
        router.push("/guestbook");
        onClose();
      },
    },
    {
      name: "Watch stream",
      icon: <Film />,
      kbd: "G+S",
      go: () => {
        router.push("/stream");
        onClose();
      },
    },
    { name: "Projects", icon: <Code />, kbd: "P", go: goProjects },
    { name: "Themes", icon: <Eye />, kbd: "T", go: goThemes },
    {
      name: "Go home",
      icon: <Home />,
      kbd: "G+H",
      go: () => {
        router.push("/");
        onClose();
      },
    },
  ];
  const itemsGlobalAttrs = ["name", "icon"];
  const [filteredItems, globalSearch, setGlobalSearch] = useSearch(
    itemsGlobal,
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string[]' is not assignable to p... Remove this comment to see the full error message
    itemsGlobalAttrs
  );
  const themes = [
    { name: "Dark", icon: <Moon />, go: toggleColorMode },
    { name: "Light", icon: <Sun />, go: toggleColorMode },
    { name: "Back", icon: <ArrowLeft />, go: goBack },
  ];
  const themesAttrs = ["name", "icon"];
  const [filteredThemes, themesSearch, setThemesSearch] = useSearch(
    themes,
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string[]' is not assignable to p... Remove this comment to see the full error message
    themesAttrs
  );
  const projects = allMarketings.sort(
    (a, b) => {
      return Number(new Date(b.date)) - Number(new Date(a.date))
    });
  const projectsAttrs = ["title", "description", "tagline"];
  const [filteredProjects, projectsSearch, setProjectsSearch] = useSearch(
    projects,
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string[]' is not assignable to p... Remove this comment to see the full error message
    projectsAttrs
  );

  // Keybinds
  // Open menu
  useHotkeys("ctrl+k", (e) => {
    e.preventDefault();
    onOpen();
  });
  // Open themes modal
  useHotkeys("T", (e) => {
    e.preventDefault();
    onThemesOpen();
  });
  useHotkeys("P", (e) => {
    e.preventDefault();
    onProjectsOpen();
  });

  function goThemes() {
    onClose();
    onThemesOpen();
  }

  function goProjects() {
    onClose();
    onProjectsOpen();
  }

  function goBack() {
    onThemesClose();
    onProjectsClose();
    onOpen();
  }

  const hoverColor = useColorModeValue(
    "var(--chakra-colors-blackAlpha-300)",
    "var(--chakra-colors-whiteAlpha-300)"
  );

  return (
    <>
      <SiteNav />
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element[]; isOpen: boolean; onCl... Remove this comment to see the full error message */}
      <Modal isOpen={isOpen} onClose={onClose} className={search.modal}>
        <ModalOverlay />
        <ModalContent className={search.modal}>
          <ModalBody className={search.modal} ref={parentRef}>
            <Input
              className={search.input}
              value={globalSearch}
              onChange={setGlobalSearch}
              placeholder="Search"
              variant="unstyled"
              data-cmd
            />
            <VStack align="start">
              {filteredItems.map((item, i) => (
                <Box
                  as="a"
                  key={i}
                  className={search.item}
                  href="#"
                  // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: MouseEvent<HTMLDivElement, MouseEvent>) ... Remove this comment to see the full error message
                  onClick={(e) => {
                    e.preventDefault();
                    item.go();
                  }}
                  _hover={{ backgroundColor: hoverColor }}
                  _focus={{ backgroundColor: hoverColor }}
                  data-cmd
                >
                  <ButtonGroup className={search.itemWrapper} width="100%">
                    <IconButton
                      className={(search.icon, search.noFocus)}
                      icon={item.icon}
                      onClick={item.go}
                      variant="unstyled"
                      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
                      tabIndex="-1"
                    />
                    <Button
                      className={search.noFocus}
                      variant="unstyled"
                      padding="0"
                      isFullWidth
                      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
                      tabIndex="-1"
                      width="100%"
                    >
                      <HStack width="100%" justify="space-between">
                        <b className={search.p}>{item.name}</b>
                        <Kbd className={search.kbd} align="end">
                          {item.kbd}
                        </Kbd>
                      </HStack>
                    </Button>
                  </ButtonGroup>
                </Box>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isThemesOpen} onClose={onThemesClose}>
        <ModalOverlay />
        <ModalContent className={search.modal}>
          <ModalBody className={search.modal} ref={themeRef}>
            <Input
              className={search.input}
              value={themesSearch}
              onChange={setThemesSearch}
              placeholder="Choose a theme"
              variant="unstyled"
              data-cmd
            />
            <VStack align="start">
              {filteredThemes.map((item, i) => (
                <Box
                  as="a"
                  key={i}
                  className={search.item}
                  href="#"
                  // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: MouseEvent<HTMLDivElement, MouseEvent>) ... Remove this comment to see the full error message
                  onClick={(e) => {
                    e.preventDefault();
                    item.go();
                  }}
                  _hover={{ backgroundColor: hoverColor }}
                  _focus={{ backgroundColor: hoverColor }}
                  data-cmd
                >
                  <ButtonGroup>
                    <IconButton
                      className={(search.icon, search.noFocus)}
                      icon={item.icon}
                      onClick={item.go}
                      variant="unstyled"
                      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
                      tabIndex="-1"
                    />
                    <Button
                      className={search.noFocus}
                      variant="unstyled"
                      padding="0"
                      isFullWidth
                      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
                      tabIndex="-1"
                    >
                      {item.name}
                    </Button>
                  </ButtonGroup>
                </Box>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isProjectsOpen} onClose={onProjectsClose}>
        <ModalOverlay />
        <ModalContent className={search.modal}>
          <ModalBody className={search.modal} ref={projectRef}>
            <Input
              className={search.input}
              value={projectsSearch}
              onChange={setProjectsSearch}
              placeholder="Search my projects"
              variant="unstyled"
              data-cmd
            />
            <VStack align="start">
              {filteredProjects.map((item, i) => (
                <Box
                  as="a"
                  key={i}
                  className={search.item}
                  href="#"
                  // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: MouseEvent<HTMLDivElement, MouseEvent>) ... Remove this comment to see the full error message
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/marketing/${item.slug}`)
                  }}
                  _hover={{ backgroundColor: hoverColor }}
                  _focus={{ backgroundColor: hoverColor }}
                  data-cmd
                >
                  <ButtonGroup>
                    <IconButton
                      className={(search.icon, search.noFocus)}
                      icon={<Code />}
                      onClick={() => router.push(`/marketing/${item.slug}`)}
                      variant="unstyled"
                      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
                      tabIndex="-1"
                    />
                    <Button
                      className={search.noFocus}
                      variant="unstyled"
                      padding="0"
                      isFullWidth
                      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
                      tabIndex="-1"
                    >
                      {item.title}
                    </Button>
                  </ButtonGroup>
                </Box>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

export default Menu;
