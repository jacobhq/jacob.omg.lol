import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";
import toast from "react-hot-toast";

let last = +new Date();
function run() {
    const now = +new Date();
    if (now - last > 5000) { // 5 seconds
        last = now;
        toast("Good morning to you too")
        console.log("You found easter egg #1 - GM")
    }
}

export default function SiteNav() {
    const router = useRouter()
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    useHotkeys("G+H", () => router.push("/"));
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    useHotkeys("G+B", () => router.push("/blog"));
    // @ts-ignore
    useHotkeys("G+A", () => router.push("/archive"));
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    useHotkeys("G+S", () => router.push("/stream"));
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    useHotkeys("L+M", () => router.push("/guestbook"));
    // @ts-ignore
    useHotkeys("G+M", () => {
        run()
    })

    return null
}