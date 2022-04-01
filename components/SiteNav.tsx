import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";

export default function SiteNav() {
    const router = useRouter()
    useHotkeys("G+H", () => router.push("/"));
    useHotkeys("G+B", () => router.push("/blog"));
    useHotkeys("G+S", () => router.push("/stream"));
    useHotkeys("L+M", () => router.push("/guestbook"));

    return null
}