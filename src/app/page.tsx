"use client";

import { useState } from "react";
import { ActionButtons } from "@/components/sections/ActionButtons";
import { HeaderSection } from "@/components/sections/HeaderSection";
import { LeadFormModal } from "@/components/forms/LeadFormModal";
import { siteConfig } from "@/config/siteConfig";

export default function HomePage() {
  const [isLeadOpen, setIsLeadOpen] = useState(false);

  return (
    <div className="desktop-atmosphere min-h-screen">
      <main className="mx-auto min-h-screen w-full max-w-[440px] border-neutral-200 px-4 py-6 sm:my-8 sm:min-h-[auto] sm:rounded-3xl sm:border sm:px-5 sm:py-8 sm:shadow-2xl dark:border-neutral-800 mobile-card">
        <div className="space-y-7">
          <HeaderSection />
          <ActionButtons onOpenLeadForm={() => setIsLeadOpen(true)} />

          <section
            id="portfolio"
            aria-label="Каталог"
            className="space-y-3 border-t border-stone-200 pt-6 dark:border-zinc-800"
          >
            <h2 className="font-display text-lg font-semibold text-stone-900 dark:text-zinc-50">
              Каталог мягкой мебели
            </h2>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">
              Реальные фото шкафов и кроватей с @mebel_almaty2016 — поиск и
              быстрый заказ в WhatsApp.
            </p>
            <a
              href="http://localhost:3002"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-emerald-600/20 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 active:scale-[0.98] dark:border-emerald-400/20 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
            >
              Открыть каталог
            </a>
          </section>

          <footer className="space-y-3 border-t border-stone-200 pt-5 text-center dark:border-zinc-800">
            {siteConfig.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm font-medium text-emerald-700 transition-colors duration-200 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                {social.name}
              </a>
            ))}
            <p className="text-xs text-stone-500 dark:text-zinc-500">
              {siteConfig.statusShort}
            </p>
          </footer>
        </div>
      </main>

      <LeadFormModal isOpen={isLeadOpen} onClose={() => setIsLeadOpen(false)} />
    </div>
  );
}
