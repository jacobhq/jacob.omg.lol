import { Divider, Text, UnorderedList, OrderedList, Checkbox, ListItem, Image, Heading, chakra, Table, Thead, Tbody, Tr, Td, Th, Code, Link } from "@chakra-ui/react";
import MarketingCard from "./MarketingCard";
import { Components } from 'react-markdown';

function MCard(props) {
    return (
        <MarketingCard title={props.title}>{props.children}</MarketingCard>
    )
}

type GetCoreProps = {
    children?: any;
    'data-sourcepos'?: any;
};

function getCoreProps(props: GetCoreProps): any {
    return props['data-sourcepos']
        ? { 'data-sourcepos': props['data-sourcepos'] }
        : {};
}

interface Defaults extends Components {
    heading?: Components['h1'];
}

export const defaults: Defaults = {
    p: props => {
        const { children } = props;
        return <Text mb={2}>{children}</Text>;
    },
    em: props => {
        const { children } = props;
        return <Text as="em">{children}</Text>;
    },
    blockquote: props => {
        const { children } = props;
        return (
            <Code as="blockquote" p={2}>
                {children}
            </Code>
        );
    },
    code: props => {
        const { inline, children, className } = props;

        if (inline) {
            return <Code p={2} display="inline" children={children} />;
        }

        return (
            <Code
                className={className}
                whiteSpace="break-spaces"
                d="inline"
                w="full"
                p={2}
                children={children}
            />
        );
    },
    del: props => {
        const { children } = props;
        return <Text as="del">{children}</Text>;
    },
    hr: props => {
        return <Divider py={2} />;
    },
    a: Link,
    img: Image,
    text: props => {
        const { children } = props;
        return <Text as="span">{children}</Text>;
    },
    ul: props => {
        const { ordered, children, depth } = props;
        const attrs = getCoreProps(props);
        let Element = UnorderedList;
        let styleType = 'disc';
        if (ordered) {
            Element = OrderedList;
            styleType = 'decimal';
        }
        if (depth === 1) styleType = 'circle';
        return (
            <Element
                spacing={2}
                as={ordered ? 'ol' : 'ul'}
                styleType={styleType}
                pl={4}
                {...attrs}
            >
                {children}
            </Element>
        );
    },
    ol: props => {
        const { ordered, children, depth } = props;
        const attrs = getCoreProps(props);
        let Element = UnorderedList;
        let styleType = 'disc';
        if (ordered) {
            Element = OrderedList;
            styleType = 'decimal';
        }
        if (depth === 1) styleType = 'circle';
        return (
            <Element
                spacing={2}
                as={ordered ? 'ol' : 'ul'}
                styleType={styleType}
                pl={4}
                {...attrs}
            >
                {children}
            </Element>
        );
    },
    li: props => {
        const { children, checked } = props;
        let checkbox = null;
        if (checked !== null && checked !== undefined) {
            checkbox = (
                <Checkbox isChecked={checked} isReadOnly>
                    {children}
                </Checkbox>
            );
        }
        return (
            <ListItem
                {...getCoreProps(props)}
                listStyleType={checked !== null ? 'none' : 'inherit'}
            >
                {checkbox || children}
            </ListItem>
        );
    },
    heading: props => {
        const { level, children } = props;
        const sizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
        return (
            <Heading
                pt={6}
                pb={4}
                as={`h2`}
                size={sizes[`${level - 1}`]}
                {...getCoreProps(props)}
            >
                {children}
            </Heading>
        );
    },
    pre: props => {
        const { children } = props;
        return <chakra.pre {...getCoreProps(props)}>{children}</chakra.pre>;
    },
    table: Table,
    thead: Thead,
    tbody: Tbody,
    tr: props => <Tr>{props.children}</Tr>,
    td: props => <Td>{props.children}</Td>,
    th: props => <Th>{props.children}</Th>,
};

const elements = {
    p: defaults.p,
    em: defaults.em,
    blockquote: defaults.blockquote,
    code: defaults.code,
    del: defaults.del,
    hr: defaults.hr,
    a: defaults.a,
    img: defaults.img,
    text: defaults.text,
    ul: defaults.ul,
    ol: defaults.ol,
    li: defaults.li,
    h1: defaults.heading,
    h2: defaults.heading,
    h3: defaults.heading,
    h4: defaults.heading,
    h5: defaults.heading,
    h6: defaults.heading,
    pre: defaults.pre,
    table: defaults.table,
    thead: defaults.thead,
    tbody: defaults.tbody,
    tr: defaults.tr,
    td: defaults.td,
    th: defaults.th,
    MarketingCard: MCard,
};

export default elements;
