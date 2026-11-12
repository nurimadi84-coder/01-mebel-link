"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { leadCategories, siteConfig } from "@/config/siteConfig";
import { formatPhoneInput, isValidKzPhone, toE164 } from "@/lib/phone";
import type {
  LeadCategory,
  LeadFormData,
  LeadFormErrors,
  LeadFormModalProps,
} from "@/types";

const initialForm: LeadFormData = {
  name: "",
  phone: "",
  category: "wardrobe",
};

export function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const [form, setForm] = useState<LeadFormData>(initialForm);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetAndClose = (): void => {
    onClose();
    window.setTimeout(() => {
      setForm(initialForm);
      setErrors({});
      setIsSubmitting(false);
      setIsSuccess(false);
    }, 200);
  };

  const validate = (): LeadFormErrors => {
    const nextErrors: LeadFormErrors = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = "Укажите имя (минимум 2 символа)";
    }

    if (!isValidKzPhone(form.phone)) {
      nextErrors.phone = "Введите номер в формате +7 (7XX) XXX-XX-XX";
    }

    if (!form.category) {
      nextErrors.category = "Выберите категорию";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    // Demo submit — replace with API / CRM webhook when ready
    await new Promise((resolve) => window.setTimeout(resolve, 900));

    console.info("Lead submitted", {
      ...form,
      phone: toE164(form.phone),
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetAndClose}
      title={isSuccess ? "Заявка отправлена" : "Получить расчёт"}
    >
      {isSuccess ? (
        <div className="space-y-4 py-2 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-7 w-7" aria-hidden />
          </div>
          <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-300">
            {siteConfig.leadSuccessMessage}
          </p>
          <button
            type="button"
            onClick={resetAndClose}
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-500 active:scale-[0.98]"
          >
            Закрыть
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <label
              htmlFor="lead-name"
              className="block text-sm font-medium text-stone-700 dark:text-zinc-300"
            >
              Имя
            </label>
            <input
              id="lead-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Ваше имя"
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-3 text-sm text-stone-900 outline-none transition-all duration-200 placeholder:text-stone-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            />
            {errors.name ? (
              <p className="text-xs text-red-600 dark:text-red-400">{errors.name}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="lead-phone"
              className="block text-sm font-medium text-stone-700 dark:text-zinc-300"
            >
              Телефон
            </label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 (7XX) XXX-XX-XX"
              value={form.phone}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  phone: formatPhoneInput(event.target.value),
                }))
              }
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-3 text-sm text-stone-900 outline-none transition-all duration-200 placeholder:text-stone-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            />
            {errors.phone ? (
              <p className="text-xs text-red-600 dark:text-red-400">{errors.phone}</p>
            ) : null}
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-stone-700 dark:text-zinc-300">
              Что вас интересует?
            </legend>
            <div className="grid gap-2">
              {leadCategories.map((option) => {
                const selected = form.category === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-sm transition-all duration-200 active:scale-[0.99] ${
                      selected
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200"
                        : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={option.value}
                      checked={selected}
                      onChange={() =>
                        setForm((prev) => ({
                          ...prev,
                          category: option.value as LeadCategory,
                        }))
                      }
                      className="h-4 w-4 accent-emerald-600"
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
            {errors.category ? (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.category}
              </p>
            ) : null}
          </fieldset>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Отправляем…
              </>
            ) : (
              "Получить расчет стоимости"
            )}
          </button>
        </form>
      )}
    </Modal>
  );
}
