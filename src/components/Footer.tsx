import { TwitterLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export default function Footer() {
  return (
    <div className="w-full  bg-gray-300 flex gap-2 items-center justify-end p-1 text-xs px-4">
      <Link
        href="https://dub.sh/Q2C8qzz"
        target="_blank"
        className="hover:underline">
        3 click feedback
      </Link>
      <Link href="https://x.com/dogfrogfog" target="_blank">
        <TwitterLogoIcon />
      </Link>
    </div>
  )
}
