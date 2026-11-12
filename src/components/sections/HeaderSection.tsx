import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function HeaderSection() {
  return (
    <header className="relative space-y-5 pt-2 text-center">
      <ThemeToggle className="absolute right-0 top-0" />

      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="rounded-full bg-gradient-to-br from-emerald-400/40 via-amber-300/30 to-stone-400/20 p-[3px] shadow-[0_0_24px_rgba(16,185,129,0.25)]">
            <Image
              src={siteConfig.avatarUrl}
              alt={`${siteConfig.title} — логотип`}
              width={96}
              height={96}
              priority
              unoptimized
              className="h-24 w-24 rounded-full border-2 border-white object-cover ring-2 ring-emerald-500/50 dark:border-zinc-900"
            />
          </div>
        </div>

        <StatusBadge label={siteConfig.status} />

        <div className="space-y-2 px-1">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-stone-900 dark:text-zinc-50 sm:text-[2rem]">
            {siteConfig.title}
          </h1>
          <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">
            {siteConfig.offer}
          </p>
        </div>
      </div>
    </header>
  );
}
