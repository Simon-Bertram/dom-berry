import { Aperture } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="flex items-center gap-2 no-underline" href="/">
      <Aperture className="size-8 lg:size-10" />
      <div className="flex flex-col items-start">
        <span className="font-bold text-2xl">Dom Berry</span>
        <span className="text-foreground/70 text-md">
          Professional filmmaking services
        </span>
      </div>
    </Link>
  );
}
