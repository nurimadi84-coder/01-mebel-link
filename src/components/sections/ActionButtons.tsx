import { BedDouble, Images, MessageCircle, Send, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/siteConfig";
import type { ActionButtonsProps } from "@/types";

interface CtaLinkProps {
  href: string;
  label: string;
  description: string;
  icon: ReactNode;
  className: string;
  external?: boolean;
}

function CtaLink({
  href,
  label,
  description,
  icon,
  className,
  external = true,
}: CtaLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group flex w-full items-start gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200 active:scale-[0.98] ${className}`}
    >
      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
        {icon}
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-[15px] font-semibold leading-snug">
          {label}
        </span>
        <span className="mt-0.5 block text-sm opacity-85">{description}</span>
      </span>
    </a>
  );
}

export function ActionButtons({ onOpenLeadForm }: ActionButtonsProps) {
  return (
    <section aria-label="Быстрые действия" className="space-y-3">
      <CtaLink
        href="http://localhost:3001"
        label="Калькулятор кровати"
        description="Размер, ткань, изголовье — цена за 1 минуту"
        icon={<BedDouble className="h-5 w-5" aria-hidden />}
        className="bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500"
        external={false}
      />

      <CtaLink
        href={siteConfig.whatsappUrl}
        label="Мгновенный расчёт в WhatsApp"
        description={siteConfig.responseTime}
        icon={<MessageCircle className="h-5 w-5" aria-hidden />}
        className="bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-500"
      />

      <button
        type="button"
        onClick={onOpenLeadForm}
        className="group flex w-full items-start gap-3 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-600 px-4 py-3.5 text-white shadow-lg shadow-amber-700/20 transition-all duration-200 hover:from-amber-600 hover:to-amber-500 active:scale-[0.98]"
      >
        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
          <Sparkles className="h-5 w-5" aria-hidden />
        </span>
        <span className="min-w-0 text-left">
          <span className="block text-[15px] font-semibold leading-snug">
            Оставить заявку / Получить консультацию
          </span>
          <span className="mt-0.5 block text-sm text-amber-50/90">
            Вилка цены за минуту — без звонков «посчитайте примерно»
          </span>
        </span>
      </button>

      <CtaLink
        href={siteConfig.telegramUrl}
        label="Написать в Telegram"
        description="Быстрая переписка и фото проектов"
        icon={<Send className="h-5 w-5" aria-hidden />}
        className="border border-sky-500/20 bg-sky-600 text-white shadow-md shadow-sky-600/20 hover:bg-sky-500"
      />

      <CtaLink
        href={siteConfig.catalogUrl}
        label="Смотреть каталог мебели"
        description="Кровати, диваны, панели — быстрый заказ"
        icon={<Images className="h-5 w-5" aria-hidden />}
        className="border border-stone-200 bg-stone-100 text-stone-900 hover:bg-stone-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        external={false}
      />
    </section>
  );
}
