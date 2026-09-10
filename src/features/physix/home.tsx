"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowRight, CalendarDays, Check, Home, Menu, Search, UserRound, Video, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import base from "./home.module.css";
import s from "./shop-home.module.css";
type Locale = "en" | "bg";

export const copy = {
  en: {
    preview: "Homepage preview · Illustrative content",
    home: "Home",
    book: "Book",
    online: "Online",
    account: "Account",
    headline: "Expert care for a stronger you.",
    subhead: "Book online or in clinic.",
    search: "Search pain area or service",
    searchHint: "Find care or a service",
    seeLess: "Show less",
    bookVisit: "Book visit",
    onlineConsult: "Online consult",
    issues: "Common issues",
    seeAll: "See all",
    services: "Our services",
    viewAll: "View all",
    back: "Back",
    neck: "Neck",
    shoulder: "Shoulder",
    knee: "Knee",
    posture: "Posture",
    all: "All services",
    sports: "Sports Rehab",
    sportsText: "Get back to what you love.",
    manual: "Manual Therapy",
    manualText: "Hands-on care for real life.",
    recovery: "Recovery Plans",
    recoveryText: "Move better for a brighter you.",
    meet: "Meet your physiotherapist",
    hello: "Hi, I’m Charlie",
    introduction: "I help people move better and do more of what they love.",
    about: "Meet Charlie",
    stories: "Patient stories",
    storyText: "Care that makes a difference.",
    plansText: "Guided movement. At home or on the go.",
    explore: "Explore plans",
    soon: "Coming soon",
    footer: "Move better. Every day.",
    close: "Close",
    menu: "Menu",
    clear: "Clear search",
    empty: "No matching services",
    emptyText: "Try another search or browse all services.",
    results: "Search results",
    servicesFor: "Services for",
    previewLabel: "Design preview",
    bookingTitle: "Your next step, feeling better.",
    bookingText:
      "This is the homepage design preview. Appointment selection and booking are the next screens to build. No appointment is being made here.",
    onlineTitle: "Care, wherever you are.",
    onlineText:
      "The online consultation screen will use the same booking journey. Availability and service details still need confirmation from the clinic.",
    plansTitle: "Your recovery, one step at a time.",
    plansInfo:
      "This area will introduce recovery programmes. The catalogue, course content and access model are still to be defined.",
    therapistText:
      "This portrait and name come from the selected design reference. We will fit the clinic’s real practitioner photos, introduction and credentials into this same layout.",
    storyInfo:
      "This space is reserved for a real, approved patient story. The preview does not include invented ratings or testimonials.",
    accountTitle: "Your care, in one place.",
    accountInfo:
      "The existing Gymaf interface is retained for the private account. You can inspect its original sample-data view; Physix sign-in and care records are not connected yet.",
    accountAction: "Open account reference",
    serviceInfo:
      "Service-detail layout and clinic-approved descriptions come next. The homepage cards currently demonstrate the selected visual direction.",
    browse: "Browse services",
  },
  bg: {
    preview: "Преглед на дизайна · Примерно съдържание",
    home: "Начало",
    book: "Запази час",
    online: "Онлайн",
    account: "Профил",
    headline: "Експертна грижа за по-силно тяло.",
    subhead: "Запази час онлайн или в клиниката.",
    search: "Търси зона на болка или услуга",
    searchHint: "Потърси услуга",
    seeLess: "По-малко",
    bookVisit: "Запази час",
    onlineConsult: "Онлайн преглед",
    issues: "Чести проблеми",
    seeAll: "Виж всички",
    services: "Нашите услуги",
    viewAll: "Всички",
    back: "Гръб",
    neck: "Врат",
    shoulder: "Рамо",
    knee: "Коляно",
    posture: "Стойка",
    all: "Всички услуги",
    sports: "Спортна рехабилитация",
    sportsText: "Върни се към любимото движение.",
    manual: "Мануална терапия",
    manualText: "Грижа за повече свобода в движението.",
    recovery: "Възстановителни програми",
    recoveryText: "Движи се по-добре всеки ден.",
    meet: "Твоят физиотерапевт",
    hello: "Здравей, аз съм Чарли",
    introduction:
      "Помагам на хората да се движат по-добре и да правят повече от това, което обичат.",
    about: "Запознай се с Чарли",
    stories: "Истории на пациенти",
    storyText: "Грижа, която променя ежедневието.",
    plansText: "Движение с насоки. У дома или навън.",
    explore: "Виж програмите",
    soon: "Очаквай скоро",
    footer: "Движи се по-добре. Всеки ден.",
    close: "Затвори",
    menu: "Меню",
    clear: "Изчисти търсенето",
    empty: "Няма намерени услуги",
    emptyText: "Опитай друго търсене или разгледай всички услуги.",
    results: "Резултати",
    servicesFor: "Услуги за",
    previewLabel: "Преглед на дизайна",
    bookingTitle: "Следващата стъпка към по-добро движение.",
    bookingText:
      "Това е преглед на началната страница. Изборът на час и записването са следващите екрани за изработка. Тук не се запазва реален час.",
    onlineTitle: "Грижа, където и да си.",
    onlineText:
      "Онлайн консултацията ще използва същия процес за записване. Наличността и подробностите за услугата предстои да бъдат потвърдени от клиниката.",
    plansTitle: "Възстановяване, стъпка по стъпка.",
    plansInfo:
      "Тук ще представим възстановителни програми. Каталогът, съдържанието и начинът за достъп предстои да бъдат уточнени.",
    therapistText:
      "Портретът и името са от избрания дизайн. Тук ще поставим реалните снимки, представяне и квалификации на физиотерапевта от клиниката.",
    storyInfo:
      "Това място е за реална, одобрена история на пациент. Прегледът не включва измислени оценки или отзиви.",
    accountTitle: "Твоята грижа, на едно място.",
    accountInfo:
      "Съществуващият интерфейс на Gymaf е запазен за личния профил. Можеш да разгледаш оригиналния изглед с примерни данни. Входът и реалните данни за Physix още не са свързани.",
    accountAction: "Разгледай примерния профил",
    serviceInfo:
      "Подробната страница и одобрените описания на услугите предстоят. Картите показват избраната визуална посока.",
    browse: "Разгледай услугите",
  },
} as const;

// Non-destructive CSS crops of the supplied design artwork. All words and controls are HTML.
export function Art({
  crop,
  board = false,
  className = "",
}: {
  crop: [number, number, number, number];
  board?: boolean;
  className?: string;
}) {
  const [x, y, w, h] = crop;
  const [width, height] = board ? [1536, 1024] : [941, 1672];
  return (
    <div
      aria-hidden="true"
      className={`${base.art} ${className}`}
      style={
        {
          aspectRatio: `${w}/${h}`,
          backgroundImage: `url(/physix-preview/${board ? "home-board" : "selected-home"}.png)`,
          backgroundSize: `${(width / w) * 100}% ${(height / h) * 100}%`,
          backgroundPosition: `${(x / (width - w)) * 100}% ${(y / (height - h)) * 100}%`,
        } as CSSProperties
      }
    />
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`${base.brand} ${compact ? base.brandCompact : ""}`}>
      <svg viewBox="0 0 60 65" aria-hidden="true">
        <path d="M29 63C7 61 0 50 1 32c18 1 28 12 28 31" fill="#5aaf99" />
        <path d="M30 48C9 39 6 26 9 15c16 3 23 14 21 33" fill="#91cdbc" />
        <path d="M31 33C21 18 28 6 40 1c6 14 0 23-9 32" fill="#3d9d82" />
        <path d="M34 63c-2-23 9-39 25-42 4 24-6 37-25 42" fill="#63b29b" />
      </svg>
      <span>
        <strong>PhysiX</strong>
        {!compact && <small>PHYSIOTHERAPY</small>}
      </span>
    </span>
  );
}

type WebsiteArtKind = "hero" | "charlie" | "sports" | "manual" | "recovery" | "back" | "neck" | "shoulder" | "knee" | "posture";
function WebsiteArt({ kind, className = "" }: { kind: WebsiteArtKind; className?: string }) {
  if (["back", "neck", "shoulder", "knee", "posture"].includes(kind)) return <Image src={`/physix-preview/website-art/anatomy/${kind}.webp`} alt="" width={60} height={86} unoptimized className={className} />;
  const [width, height] = kind === "hero" ? [306, 302] : kind === "charlie" ? [205, 175] : ["sports", "manual", "recovery"].includes(kind) ? [255, 202] : [145, 110];
  return <Image src={`/physix-preview/website-art/${kind === "hero" ? "hero-cutout" : kind === "charlie" ? kind : `${kind}-reference`}.webp`} alt="" width={width} height={height} unoptimized loading={kind === "hero" ? "eager" : "lazy"} className={className} />;
}
export function PhysixHome({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const bg = locale === "bg";
  const say = (en: string, bulgarian: string) => bg ? bulgarian : en;
  const [panel, setPanel] = useState<"menu" | "therapist" | null>(null);
  const [query, setQuery] = useState("");
  const [issue, setIssue] = useState<string | null>(null);
  const [allIssues, setAllIssues] = useState(false);
  const [allServices, setAllServices] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const dialogTrigger = useRef<HTMLElement | null>(null);
  const serviceSection = useRef<HTMLElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!panel) return;
    const previousFocus = dialogTrigger.current ?? (document.activeElement as HTMLElement | null);
    const previousOverflow = document.body.style.overflow;
    const element = dialog.current;
    element?.showModal(); document.body.style.overflow = "hidden";
    return () => { element?.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus({ preventScroll: true }); };
  }, [panel]);
  const issues = (["back", "neck", "shoulder", "knee", "posture"] as const).map(id => ({ id, label: t[id] }));
  const services = [
    { id: "sports" as const, title: t.sports, text: t.sportsText, tags: ["knee", "shoulder", "posture", "sports", "спорт"] },
    { id: "manual" as const, title: t.manual, text: t.manualText, tags: ["back", "neck", "shoulder", "manual", "терапия"] },
    { id: "recovery" as const, title: t.recovery, text: t.recoveryText, tags: ["back", "knee", "posture", "recovery", "програм"] },
  ];  const normalized = query.trim().toLocaleLowerCase(locale);
  const visible = services.filter(item => (!issue || item.tags.includes(issue)) && (!normalized || `${item.title} ${item.text} ${item.tags.join(" ")} ${issues.filter(i => item.tags.includes(i.id)).map(i => i.label).join(" ")}`.toLocaleLowerCase(locale).includes(normalized)));
  const displayed = allServices || normalized || issue ? visible : visible.slice(0, 2);
  function browse() { serviceSection.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }); }
  function search(event: FormEvent) { event.preventDefault(); setIssue(null); searchInput.current?.blur(); browse(); }
  function closeAndGo(id: string) { setPanel(null); requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView()); }
  const faqs = [
    { id: "booking", question: say("How do I book a visit?", "Как да запазя час?"),
      answer: say("Choose a service, then select Book visit. Online booking is not available yet. Appointment times will appear when the clinic opens its schedule.", "Избери услуга, след това Запази час. Онлайн записването още не е налично. Часовете ще се появят, когато клиниката публикува графика си."),
      href: "#services", action: say("Explore services", "Разгледай услугите") },
    { id: "online", question: say("Can I have an online consultation?", "Предлагате ли онлайн консултация?"),
      answer: say("Online consult is a video visit with a physiotherapist. The clinic is still confirming the service details and availability.", "Онлайн консултацията е видео разговор с физиотерапевт. Клиниката все още уточнява условията и наличността на услугата."),
      href: `/${locale}/online`, action: t.onlineConsult },
    { id: "courses", question: say("Where are my courses and programmes?", "Къде са моите курсове и програми?"),
      answer: say("Open My account to enter the member app. You can browse this website without signing in.", "Отвори Моят профил, за да влезеш в приложението. Можеш да разглеждаш този сайт без вход."),
      href: "/account", action: say("My account", "Моят профил") },
  ];
  return <div className={s.page} lang={locale} data-physix-website>
    <a className={s.skip} href="#physix-content">{say("Skip to content", "Към съдържанието")}</a>
    <div className={s.frame}>
      <header className={s.header}>
        <Link href={`/${locale}`} aria-label={`PhysiX · ${t.home}`} className={s.logo}><Brand /></Link>
        <nav className={s.desktopNav} aria-label={t.menu}>
          <a href="#services">{t.services}</a><Link href={`/${locale}/about`}>{say("About", "За нас")}</Link><Link href={`/${locale}/first-visit`}>{say("Your first visit", "Първо посещение")}</Link>
          <Link href="/account"><UserRound aria-hidden="true" />{say("My account", "Моят профил")}</Link>
          <Link className={s.primary} href={`/${locale}/book`}>{t.bookVisit}<ArrowRight aria-hidden="true" /></Link>
        </nav>
        <div className={s.headerTools}>
          <Link className={s.language} href={`/${bg ? "en" : "bg"}`} aria-label={bg ? "Switch to English" : "Switch to Bulgarian"}>
            <span>{bg ? "EN" : "БГ"}</span>
          </Link>
          <button className={s.menuButton} onClick={event => { dialogTrigger.current = event.currentTarget; setPanel("menu"); }} aria-label={t.menu} aria-haspopup="dialog" aria-expanded={panel === "menu"}><Menu /></button>
        </div>
      </header>
      <main id="physix-content">
        <section className={s.hero} aria-labelledby="hero-title">
          <div className={s.heroVisual}><div className={s.heroCopy}>
            <h1 id="hero-title"><span>{say("Expert care for", "Експертна грижа")}</span><span>{say("a stronger you.", "за по-силно тяло.")}</span></h1>
            <p>{t.subhead}</p></div><div className={s.heroPortrait} aria-hidden="true"><WebsiteArt kind="hero" className={s.heroArt} /></div></div>          <div className={s.finder}>
            <form className={s.search} onSubmit={search} role="search" data-filled={Boolean(query)} data-physix-search>
              <span className={s.searchLeading} aria-hidden="true"><Search /></span>
              <label className={s.srOnly} htmlFor="service-search">{t.search}</label>
              <span className={s.searchField}>
                <input ref={searchInput} id="service-search" type="search" value={query} onChange={e => { setQuery(e.target.value); setIssue(null); }} placeholder={t.search} autoComplete="off" autoCapitalize="none" spellCheck={false} enterKeyHint="search" onKeyDown={e => { if(e.key === "Escape") { setQuery(""); setIssue(null); } }} />
                <button type="button" className={s.searchClear} hidden={!query} onClick={() => { setQuery(""); setIssue(null); searchInput.current?.focus(); }} aria-label={t.clear}><X aria-hidden="true" /></button>
              </span>
              <button type="submit" className={s.searchSubmit} aria-label={t.results}><ArrowRight aria-hidden="true" /></button>
            </form>
            <div className={s.heroActions}><Link className={s.primary} href={`/${locale}/book`}><CalendarDays aria-hidden="true" /><span>{t.bookVisit}</span><ArrowRight aria-hidden="true" /></Link><Link className={s.secondary} href={`/${locale}/online`}><Video aria-hidden="true" /><span>{t.onlineConsult}</span><ArrowRight aria-hidden="true" /></Link></div>
          </div>
        </section>
        <section className={s.issues} aria-labelledby="issues-title">
          <div className={s.sectionHeading}><h2 id="issues-title">{t.issues}</h2><button onClick={() => setAllIssues(v => !v)} aria-expanded={allIssues} aria-controls="issue-list">{allIssues ? t.seeLess : t.seeAll}<ArrowRight aria-hidden="true" /></button></div>
          <div id="issue-list" className={`${s.issueRail} ${allIssues ? s.issueGrid : ""}`}>
            {issues.map(item => <button key={item.id} className={s.issue} aria-pressed={issue === item.id} onClick={() => { setIssue(current => current === item.id ? null : item.id); setQuery(""); browse(); }}><span className={s.issuePicture}><WebsiteArt kind={item.id} />{issue === item.id && <Check className={s.issueCheck} />}</span><span>{item.label}</span></button>)}
          </div>
        </section>
        <section className={s.services} ref={serviceSection} id="services" aria-labelledby="services-title">
          <div className={s.sectionHeading}><div><h2 id="services-title">{normalized ? t.results : issue ? `${t.servicesFor} ${issues.find(i => i.id === issue)?.label.toLocaleLowerCase(locale)}` : t.services}</h2></div>
            <button onClick={() => { if (normalized || issue) { setQuery(""); setIssue(null); setAllServices(true); } else setAllServices(v => !v); }} aria-expanded={allServices} aria-controls="service-list">{normalized || issue ? t.all : allServices ? t.seeLess : t.viewAll}<ArrowRight aria-hidden="true" /></button></div>
          <div className={s.srOnly} aria-live="polite">{displayed.length} {t.services.toLowerCase()}</div>
          {displayed.length ? <div id="service-list" className={`${s.serviceGrid} ${allServices ? s.expandedServices : ""}`}>
            {displayed.map(item => <Link className={s.serviceCard} key={item.id} href={item.id === "recovery" ? "/account" : `/${locale}/services/${item.id}`}><div className={s.serviceImage}><WebsiteArt kind={item.id} /><span className={s.serviceArrow} aria-hidden="true"><ArrowRight /></span></div><div className={s.serviceCopy}>
              {item.id === "recovery" && <span className={s.serviceCategory}>{t.soon}</span>}<h3>{item.title}</h3><p>{item.text}</p></div></Link>)}
          </div> : <div id="service-list" className={s.empty}><Search aria-hidden="true" /><h3>{t.empty}</h3><p>{t.emptyText}</p><button className={s.secondary} onClick={() => { setQuery(""); setIssue(null); }}>{t.all}<ArrowRight aria-hidden="true" /></button></div>}
        </section>        <div className={s.lowerGrid}>
          <section className={s.therapist} id="therapist" aria-labelledby="therapist-title">
            <div className={s.therapistHeading}>
              <div className={s.therapistPortrait}><WebsiteArt kind="charlie" /></div>
              <div className={s.therapistCopy}><span>{say("Your physiotherapist", "Твоят физиотерапевт")}</span><h2 id="therapist-title">{t.hello}</h2></div>
            </div>
            <p className={s.therapistDescription}>{t.introduction}</p>
            <Link className={s.profileAction} href={`/${locale}/about`}>{t.about}<ArrowRight aria-hidden="true" /></Link>
          </section>
          <section className={s.memberCard} aria-labelledby="member-title"><div className={s.memberArtwork}><Image src="/physix-preview/website-art/books-tall.webp" alt="" width={142} height={172} unoptimized /></div><div className={s.memberContent}><h2 id="member-title">{t.recovery}</h2><p>{t.plansText}</p><span className={s.memberBadge}>{t.soon}</span><Link href="/account">{say("My account", "Моят профил")}<ArrowRight aria-hidden="true" /></Link></div></section>
        </div>
        <section className={s.questions} id="questions" aria-labelledby="questions-title">
          <div className={s.questionIntro}><h2 id="questions-title">{say("Before your visit", "Преди посещението")}</h2><p>{say("A few things you might be wondering.", "Отговори на твоите въпроси.")}</p></div>
          <div className={s.faqList}>{faqs.map(item => <details key={item.id} name="physix-visit-faq">
            <summary><span>{item.question}</span><span className={s.faqToggle} aria-hidden="true" /></summary>
            <div className={s.faqAnswer}><p>{item.answer}</p><Link className={s.faqLink} href={item.href}>{item.action}<ArrowRight aria-hidden="true" /></Link></div>
          </details>)}</div>
        </section>
        <footer className={s.footer}><div><Brand /><p>{t.footer}</p></div><nav aria-label={say("Footer navigation", "Навигация в края на страницата")}><a href="#services">{t.services}</a><Link href={`/${locale}/book`}>{t.bookVisit}</Link><Link href="/account">{say("My account", "Моят профил")}</Link></nav><small>{say("PhysiX · Physiotherapy", "PhysiX · Физиотерапия")}</small></footer>
      </main>
    </div>
    <nav className={s.dock} aria-label={say("Main navigation", "Основна навигация")}><a href="#physix-content" aria-current="page"><span><Home fill="currentColor" aria-hidden="true" /></span>{t.home}</a><Link href={`/${locale}/book`}><span><CalendarDays aria-hidden="true" /></span>{t.book}</Link><Link href={`/${locale}/online`}><span><Video aria-hidden="true" /></span>{t.online}</Link><Link href="/account"><span><UserRound aria-hidden="true" /></span>{t.account}</Link></nav>
    <dialog ref={dialog} className={s.dialog} aria-labelledby="panel-title" onCancel={() => setPanel(null)} onClick={event => { if(event.target === event.currentTarget) setPanel(null); }}>
      <div className={s.dialogBody}><div className={s.dialogHeader}><Brand /><button onClick={() => setPanel(null)} aria-label={t.close}><X /></button></div>
        {panel === "menu" ? <><h2 id="panel-title" className={s.srOnly}>{t.menu}</h2><nav className={s.menuLinks}><button onClick={() => closeAndGo("physix-content")}>{t.home}<ArrowRight /></button><button onClick={() => closeAndGo("services")}>{t.services}<ArrowRight /></button><Link href={`/${locale}/about`} onClick={() => setPanel(null)}>{t.about}<ArrowRight /></Link><Link href={`/${locale}/first-visit`} onClick={() => setPanel(null)}>{say("Your first visit", "Първо посещение")}<ArrowRight /></Link><Link href={`/${locale}/book`}>{t.bookVisit}<ArrowRight /></Link><Link href={`/${locale}/online`}>{t.onlineConsult}<ArrowRight /></Link><Link href="/account">{say("My account", "Моят профил")}<ArrowRight /></Link></nav><Link className={s.menuLanguage} href={`/${bg ? "en" : "bg"}`}>{bg ? "English" : "Български"}<ArrowRight /></Link></> : <><span className={s.eyebrow}>{t.previewLabel}</span><h2 id="panel-title">{t.hello}</h2><p>{t.therapistText}</p><button className={s.secondary} onClick={() => setPanel(null)}>{t.close}</button></>}
      </div>
    </dialog>
  </div>;
}
