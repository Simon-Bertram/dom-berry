import { Aperture } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Aperture className="size-8 lg:size-10" />
      <div className="flex flex-col items-start">
        <span className="font-bold text-2xl">Dom Berry</span>
        <span className="text-foreground/70 text-md">
          Professional filmmaking services
        </span>
      </div>
    </div>
  );
}
