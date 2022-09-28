import { HStack, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaMap, FaClock } from "react-icons/fa";
import NowPlaying from "./NowPlaying";
import styles from "styles/widgetBar.module.css"

export default function WudgetBar() {
    let [time, setTime] = useState(null)

    let options = {
        timeZone: 'Europe/London',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    },
        // @ts-expect-error
        myDate = new Intl.DateTimeFormat([], options);

    setInterval(() => {
        setTime(myDate.format(new Date()));
    }, 1000);

    return (
        <HStack overflow="auto" spacing={6} whiteSpace="nowrap" className={styles.widgetBar}>
            <NowPlaying />
            <Stack direction="row" alignItems="center" mb={4} mt={4}>
                <FaMap />
                <Text>London, UK</Text>
            </Stack>
            <Stack direction="row" alignItems="center" mb={4} mt={4}>
                <FaClock />
                <Text>{time}</Text>
            </Stack>
        </HStack>
    )
}