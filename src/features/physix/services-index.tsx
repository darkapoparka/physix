"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import s from "./services.module.css";

type Locale = "en" | "bg";
type ServiceId = "sports" | "manual";
type Filter = "all" | ServiceId;

type BookingService = {
  id: ServiceId;
  image: string;
  title: Record<Locale, string>;
  text: Record<Locale, string>;
};

const services: BookingService[] = [
  {
    id: "sports",
    image: "/physix-preview/website-art/sports-reference.webp",
    title: { en: "Sports Rehab", bg: "Спортна рехабилитация" },
    text: {
      en: "Get back to the movement you love.",
      bg: "Върни се към движението, което обичаш.",
    },
  },
  {
    id: "manual",
    image: "/physix-preview/website-art/manual-reference.webp",
    title: { en: "Manual Therapy", bg: "Мануална терапия" },
    text: {
      en: "Hands-on care for easier movement.",
      bg: "Практична грижа за по-свободно движение.",
    },
  },
];

const labels = {
  en: {
    back: "Back",
    eyebrow: "BOOK A VISIT",
    title: "Choose your service",
    subtitle: "Start with the type of visit you need.",
    search: "Search services",
    all: "All",
    sportsFilter: "Sports",
    manualFilter: "Manual",
    select: "Select service",
    selected: "Selected",
    continue: "Continue",
    choose: "Choose a service",
    unavailable: "Appointment times are not published yet",
    unavailableText:
      "Your service choice is saved only on this screen. No appointment has been created.",
    note: "Illustrative imagery · Booking not yet live",
  },
  bg: {
    back: "Назад",
    eyebrow: "ЗАПАЗИ ЧАС",
    title: "Избери услуга",
    subtitle: "Започни с вида посещение, от който имаш нужда.",
    search: "Търси услуги",
    all: "Всички",
    sportsFilter: "Спорт",
    manualFilter: "Мануална",
    select: "Избери услуга",
    selected: "Избрано",
    continue: "Продължи",
    choose: "Избери услуга",
    unavailable: "Часовете още не са публикувани",
    unavailableText:
      "Изборът е запазен само на този екран. Реален час не е създаден.",
    note: "Примерни изображения · Записването още не е активно",
  },
} as const;
export function BrandMark() {
  return (
    <span className={s.brand}>
      <svg viewBox="0 0 60 65" aria-hidden="true">
        <path d="M29 63C7 61 0 50 1 32c18 1 28 12 28 31" fill="#5aaf99" />
        <path d="M30 48C9 39 6 26 9 15c16 3 23 14 21 33" fill="#91cdbc" />
        <path d="M31 33C21 18 28 6 40 1c6 14 0 23-9 32" fill="#3d9d82" />
        <path d="M34 63c-2-23 9-39 25-42 4 24-6 37-25 42" fill="#63b29b" />
      </svg>
      <span>
        <strong>PhysiX</strong>
        <small>PHYSIOTHERAPY</small>
      </span>
    </span>
  );
}

export function BookingServiceStep({ locale, initialService }: { locale: Locale; initialService?: ServiceId }) {
  const t = labels[locale];
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<ServiceId | null>(initialService ?? null);

  const normalized = query.trim().toLocaleLowerCase(locale);
  const visible = useMemo(
    () => services.filter(item => {
      const matchesFilter = filter === "all" || filter === item.id;
      const haystack = `${item.title[locale]} ${item.text[locale]}`.toLocaleLowerCase(locale);
      return matchesFilter && (!normalized || haystack.includes(normalized));
    }),
    [filter, locale, normalized],
  );
  const filterOptions: Array<{ id: Filter; label: string }> = [
    { id: "all", label: t.all },
    { id: "sports", label: t.sportsFilter },
    { id: "manual", label: t.manualFilter },
  ];

  function selectService(id: ServiceId) {
    setSelected(id);
  }

  function continueBooking() {
    if (!selected) return;
    router.push(`/${locale}/book/time?service=${selected}`);
  }

  const selectedService = services.find(item => item.id === selected);

  return (
    <div className={s.page} lang={locale} data-booking-service-step>
      <div className={s.frame}>
        <header className={s.bookingHeader}>
          <Link className={s.backButton} href={`/${locale}`} aria-label={t.back}>
            <ArrowLeft aria-hidden="true" />
          </Link>
          <Link className={s.brandLink} href={`/${locale}`} aria-label="PhysiX">
            <BrandMark />
          </Link>
          <Link
            className={s.language}
            href={`/${locale === "en" ? "bg" : "en"}/book${selected ? `?service=${selected}` : ""}`}
            aria-label={locale === "en" ? "Switch to Bulgarian" : "Switch to English"}
          >
            {locale === "en" ? "БГ" : "EN"}
          </Link>
        </header>

        <main className={s.bookingMain}>
          <section className={s.bookingIntro} aria-labelledby="booking-title">
            <span className={s.eyebrow}>{t.eyebrow}</span>
            <h1 id="booking-title">{t.title}</h1>
            <p>{t.subtitle}</p>
          </section>
          <section className={s.discovery} aria-label={t.title}>
            <form
              className={s.search}
              role="search"
              onSubmit={event => event.preventDefault()}
            >
              <Search aria-hidden="true" />
              <label className={s.srOnly} htmlFor="booking-service-search">
                {t.search}
              </label>
              <input
                id="booking-service-search"
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder={t.search}
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={locale === "en" ? "Clear search" : "Изчисти търсенето"}
                >
                  <X aria-hidden="true" />
                </button>
              )}
            </form>
            <div className={s.chips} aria-label={locale === "en" ? "Service filters" : "Филтри за услуги"}>
              {filterOptions.map(option => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={filter === option.id}
                  onClick={() => setFilter(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className={s.serviceList}>
              {visible.map(item => {
                const active = selected === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={s.serviceRow}
                    data-selected={active}
                    onClick={() => selectService(item.id)}
                    aria-pressed={active}
                  >
                    <span className={s.serviceThumb} aria-hidden="true">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="112px"
                        priority={item.id === "sports"}
                        unoptimized
                      />
                    </span>
                    <span className={s.serviceText}>
                      <strong>{item.title[locale]}</strong>
                      <span>{item.text[locale]}</span>
                    </span>
                    <span className={s.selectState} aria-hidden="true">
                      {active ? <Check /> : <ChevronRight />}
                    </span>
                  </button>
                );
              })}
            </div>

            {!visible.length && (
              <div className={s.empty}>
                <Search aria-hidden="true" />
                <strong>{locale === "en" ? "No matching services" : "Няма намерени услуги"}</strong>
                <button type="button" onClick={() => { setQuery(""); setFilter("all"); }}>
                  {t.all}
                </button>
              </div>
            )}

            <p className={s.note}>{t.note}</p>
          </section>
        </main>
      </div>
      <div className={s.bookingBar}>
        <div className={s.bookingSelection}>
          <span>{selectedService ? t.selected : t.select}</span>
          <strong>{selectedService ? selectedService.title[locale] : t.choose}</strong>
        </div>
        <button
          className={s.continueButton}
          type="button"
          disabled={!selected}
          onClick={continueBooking}
        >
          {t.continue}
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
