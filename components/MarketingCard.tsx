import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

type MarketingCardTypes = {
    title: string
    children: any
}

export default function MarketingCard({ title, children }: MarketingCardTypes) {
    const bg = useColorModeValue("gray.100", "gray.700")
    return (
        <Box p={5} borderRadius={8} borderWidth="1px" mb={4} bg={bg}>
            <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' size="lg" bgClip='text'>{title}</Heading>
            {children}
        </Box>
    )
}