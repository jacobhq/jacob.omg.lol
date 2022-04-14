import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

type MarketingCardTypes = {
    title: string
    children: any
}

export default function MarketingCard({ title, children }: MarketingCardTypes) {
    const bg = useColorModeValue("gray.100", "gray.700")
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
        >
            <Box p={5} borderRadius={8} borderWidth="1px" mb={4} bg={bg}>
                <Heading mb={2} w="fit-content" bgGradient='linear(to-l, #777dff, #497ce2, #37bdde, #777dff, #f154ff, #f0357c)' size="lg" bgClip='text'>{title}</Heading>
                {children}
            </Box>
        </motion.div>
    )
}