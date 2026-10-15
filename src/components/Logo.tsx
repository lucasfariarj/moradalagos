import { HomeIcon } from "./icons";

export function Logo() {
  return (
    <span className="flex items-center gap-3 text-white">
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/60">
        <HomeIcon className="size-4" />
      </span>
      <span className="font-serif text-2xl leading-none tracking-tight whitespace-nowrap">morada lagos</span>
    </span>
  );
}
