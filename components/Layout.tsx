import { useMyPresence, useOthers } from 'liveblocks.config'
import Cursor from './Cursor'
import Nav from './Nav'
import NewsletterCard from './Newsletter'

type LayoutProps = {
    children: any
    hasNewsletterCard?: boolean
}

const COLORS = [
    "#E57373",
    "#9575CD",
    "#4FC3F7",
    "#81C784",
    "#FFF176",
    "#FF8A65",
    "#F06292",
    "#7986CB",
];

export default function Layout({ children, hasNewsletterCard }: LayoutProps) {
    const [{ cursor }, updateMyPresence] = useMyPresence()
    const others = useOthers()
    return (
        <main onPointerMove={(event) =>
            // Update the user cursor position on every pointer move
            updateMyPresence({
                cursor: {
                    x: Math.round(event.clientX),
                    y: Math.round(event.clientY),
                },
            })
        }
            onPointerLeave={() =>
                // When the pointer goes out, set cursor to null
                updateMyPresence({
                    cursor: null,
                })
            }>
            <Nav />
            {children}
            {hasNewsletterCard !== false && <NewsletterCard />}
            {
                /**
                 * Iterate over other users and display a cursor based on their presence
                 */
                others.map(({ connectionId, presence }) => {
                    if (presence == null || presence.cursor == null) {
                        return null;
                    }

                    return (
                        <Cursor
                            key={`cursor-${connectionId}`}
                            // connectionId is an integer that is incremented at every new connections
                            // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
                            color={COLORS[connectionId % COLORS.length]}
                            x={presence.cursor.x}
                            y={presence.cursor.y}
                        />
                    );
                })
            }
        </main>
    )
}

export async function getStaticProps() {
    const API_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY;
    const API_KEY_WARNING = process.env.CODESANDBOX_SSE
      ? `Add your public key from https://liveblocks.io/dashboard/apikeys as the \`NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY\` secret in CodeSandbox.\n` +
        `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-live-cursors#codesandbox.`
      : `Create an \`.env.local\` file and add your public key from https://liveblocks.io/dashboard/apikeys as the \`NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY\` environment variable.\n` +
        `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-live-cursors#getting-started.`;
  
    if (!API_KEY) {
      console.warn(API_KEY_WARNING);
    }
  
    return { props: {} };
  }