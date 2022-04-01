import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";

export default function SiteNav() {
    const router = useRouter()
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    useHotkeys("G+H", () => router.push("/"));
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    useHotkeys("G+B", () => router.push("/blog"));
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    useHotkeys("G+S", () => router.push("/stream"));
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    useHotkeys("L+M", () => router.push("/guestbook"));

    return null
}