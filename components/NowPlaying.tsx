import useSWR from 'swr';
import { FaSpotify } from "react-icons/fa"
import fetcher from 'lib/fetcher';
import { Box, HStack, Link, Stack, Text } from '@chakra-ui/react';
import styles from 'styles/nowplaying.module.css'

export type NowPlayingSong = {
    album: string;
    albumImageUrl: string;
    artist: string;
    isPlaying: boolean;
    songUrl: string;
    title: string;
};


export default function NowPlaying() {
    const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher);

    return (
        <Stack direction="row" alignItems="center" mb={4} mt={4}>
            {data?.songUrl ? (
                <div className={styles.icon}>
                    <span />
                    <span />
                    <span />
                </div>
            ) : (
                <FaSpotify />
            )}
            <HStack>
                {data?.songUrl ? (
                    <Link
                        className="capsize text-gray-800 dark:text-gray-200 font-medium  max-w-max truncate"
                        href={data.songUrl}
                        isExternal
                        rel="noopener noreferrer"
                    >
                        {data.title}
                    </Link>
                ) : (
                    <Text>
                        Not Playing
                    </Text>
                )}
                <Text>
                    {' – '}
                </Text>
                <Text className="capsize text-gray-500 dark:text-gray-300 max-w-max truncate">
                    {data?.artist ?? 'Spotify'}
                </Text>
            </HStack>
        </Stack>
    );
}