# Отчёт проверок — MebelExpress Link-in-bio MVP

**Проект:** `01-mebel-link/`  
**Идея №1 (банк идей):** Мгновенная цена — вилка стоимости за 1 минуту  
**Бренд:** MebelExpress  
**Стек:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Lucide · next-themes  
**Дата отчёта:** 2026-11-08  
**Локальный URL:** http://localhost:3000

---

## 1. Итоговый вердикт

| Этап | Результат |
|------|-----------|
| Самоконтроль (агент разработки) | Пройден после исправления 3 багов |
| Независимый аудит #1 | **FAIL** → найдены lint / phone / modal a11y |
| Исправления | Применены |
| Независимый аудит #2 (re-verify) | **FAIL** → regression ввода телефона |
| Исправление phone typing | Применено |
| Независимый аудит #3 (full evidence) | **PASS** |
| Повторный live-прогон (этот отчёт) | **PASS** (`lint=0`, `build=0`, `HTTP=200`, `PHONE_SUITE_OK=true`) |

**Финальный статус продукта:** готов к демонстрации MVP.

---

## 2. Чек-лист приёмки визитки

| # | Критерий | Статус | Доказательство |
|---|----------|--------|----------------|
| 1 | Мобильный контейнер 420–480px, центр на desktop | ✅ | `src/app/page.tsx` → `max-w-[440px]` |
| 2 | Шапка: логотип, название, статус, продающее био | ✅ | `HeaderSection` + `siteConfig` (MebelExpress, «Расчёт за 1 минуту») |
| 3 | WhatsApp с приветствием, Telegram, соцсети | ✅ | `wa.me/77078274377?text=…`, `t.me/mebel_almaty`, Instagram |
| 4 | Форма лидов + валидация телефона + success UI | ✅ | `LeadFormModal.tsx` + `src/lib/phone.ts` |
| 5 | Переключение светлой/тёмной темы | ✅ | `next-themes` `attribute="class"`, `ThemeToggle` |
| 6 | Самоконтроль + независимый аудит | ✅ | См. §4–§5 |

---

## 3. Структура проекта

```
src/
├── app/           layout.tsx, page.tsx, globals.css, providers.tsx
├── components/
│   ├── ui/        ThemeToggle, StatusBadge, Modal
│   ├── sections/  HeaderSection, ActionButtons
│   └── forms/     LeadFormModal
├── config/        siteConfig.ts
├── hooks/         useTheme.ts
├── lib/           phone.ts
└── types/         index.ts
```

Grep `any` в `src/`: совпадений нет.  
Иконки: только `lucide-react`.

---

## 4. Логи самоконтроля (этот прогон)

### 4.1. ESLint

```text
> mebel-link@0.1.0 lint
> eslint

LINT_EXIT:0
```

### 4.2. Production build

```text
> mebel-link@0.1.0 build
> next build

▲ Next.js 16.4.5 (Turbopack)
✓ Compiled successfully in 3.2s
  Finished TypeScript in 5.2s ...
✓ Generating static pages using 3 workers (4/4) in 454ms

Route (app)
┌ ○ /
└ ○ /_not-found

○  (Static)  prerendered as static content

BUILD_EXIT:0
```

### 4.3. Валидация телефона (suite)

Логика: `src/lib/phone.ts` (`toNationalDigits`, `formatPhoneInput`, `isValidKzPhone`).

```json
{
  "finalTyped": "+7 (700) 123-45-67",
  "typingValid": true,
  "pastes": [
    { "input": "7001234567", "formatted": "+7 (700) 123-45-67", "valid": true },
    { "input": "87001234567", "formatted": "+7 (700) 123-45-67", "valid": true },
    { "input": "77001234567", "formatted": "+7 (700) 123-45-67", "valid": true },
    { "input": "+7 (000) 123-45-67", "formatted": "+7 (000) 123-45-67", "valid": false },
    { "input": "7771234567", "formatted": "+7 (777) 123-45-67", "valid": true }
  ],
  "PHONE_SUITE_OK": true
}
```

### 4.4. Live smoke (`npm run start` → GET /)

```text
HTTP:200
CONTAINS[MebelExpress]:True
CONTAINS[WhatsApp]:True
CONTAINS[wa.me/77078274377]:True
CONTAINS[Оставить заявку]:True
CONTAINS[Онлайн]:True
```

---

## 5. Независимый аудит (субагенты Cursor)

### 5.1. Аудит #1 — FAIL

**Agent ID:** `1536cdb5-68fb-483f-bb57-132611dab89f`  
**Фокус:** полное соответствие ТЗ, надёжность, a11y, lint/build

**Найденные проблемы:**

1. **Lint bug** — `src/hooks/useTheme.ts`: `setMounted(true)` внутри `useEffect` → `react-hooks/set-state-in-effect`, `npm run lint` exit 1  
2. **Phone bug** — 10-значный локальный номер и отсутствие жёсткой проверки `7XX`  
3. **Modal a11y gap** — нет initial focus / focus trap / restore focus

**Исправления:**
- `useSyncExternalStore` для `mounted`
- нормализация телефона + валидация `/^7\d{9}$/` (национальная часть)
- Modal: Escape, Tab-trap, focus close, restore focus, `aria-modal`

### 5.2. Аудит #2 (re-verify) — FAIL

**Тот же agent (resume)**

**Проблема:** при посимвольном вводе `77001234567` на 10-й цифре происходил double-prepend `7` → маска ломалась (`+7 (770)…`).

**Исправление:** `toNationalDigits()` с маркером country markup (`+` / `(`), чтобы paste локального 10-значного и typing через маску не конфликтовали.

### 5.3. Аудит #3 — full evidence — PASS

**Agent ID:** `39583ee5-8832-476a-a380-db9a67976d58`  
**Описание задачи:** `[checking my work] full evidence audit`

**Выводы аудитора (сжато):**

- Структура `src/` соответствует ТЗ  
- Контейнер, шапка, CTA, форма, тема, `siteConfig` — реализованы  
- `npm run lint` → 0, `npm run build` → 0  
- Phone typing + paste suite — OK  
- Grep `any` — пусто; иконки только Lucide  
- Modal: Escape, trap, restore focus подтверждены по исходникам  
- ThemeProvider `attribute="class"` + `useSyncExternalStore`  
- Live HTTP 200 + ключевые строки на странице  

**Цитата вердикта:**

```text
VERDICT: PASS
```

### 5.4. Финальный re-verify phone — PASS

**Resume того же аудитора после фикса typing regression**

```text
type 77001234567 → +7 (700) 123-45-67 valid
paste 7001234567 / 8… / 77… → OK
paste +7 (000)… → invalid
lint PASS · build PASS
VERDICT: PASS
```

---

## 6. Исправленные дефекты (история)

| ID | Severity | Файл | Суть | Статус |
|----|----------|------|------|--------|
| I1 | bug | `hooks/useTheme.ts` | setState в effect → lint fail | Исправлено |
| I2 | bug | `lib/phone.ts` | локальные 10 цифр / `7XX` | Исправлено |
| I3 | gap | `ui/Modal.tsx` | focus management | Исправлено |
| I4 | bug | `lib/phone.ts` | double-prepend при typing | Исправлено |

---

## 7. Конфиг продукта (на момент отчёта)

Источник: `src/config/siteConfig.ts`

| Поле | Значение |
|------|----------|
| title | MebelExpress |
| phone | +77078274377 |
| whatsapp | https://wa.me/77078274377?text=…мгновенный расчёт… |
| telegram | https://t.me/mebel_almaty |
| social | Instagram mebel_almaty2016 |
| killer-feature | мгновенная цена ±5…15% |

---

## 8. Как воспроизвести проверки

```bash
cd mebel-link
npm run lint
npm run build
npm run start
# затем открыть http://localhost:3000
```

Проверка телефона (логика `phone.ts`): посимвольный ввод `77001234567` → `+7 (700) 123-45-67`; paste `+7 (000) 123-45-67` → invalid.

---

## 9. Заключение

MVP микро-сервиса визитки под идею №1 («Мгновенная цена») **прошёл** самоконтроль и независимый аудит после цикла исправлений. Production-сборка стабильна, страница отдаётся с HTTP 200, ключевые CTA и форма лидов работают по спецификации.

**Итоговый вердикт отчёта: PASS**
