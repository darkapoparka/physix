"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CircleHelp,
  Home,
  Info,
  Menu,
  Target,
  UserRound,
  Video,
  X,
} from "lucide-react";
import { BrandMark } from "./services-index";
import s from "./public-screens.module.css";

export type PublicDestination = "online" | "sports" | "manual" | "about" | "first-visit";
export type BookingScreen = "time" | "details" | "review" | "confirmation" | "conflict";
type Locale = "en" | "bg";
const copy = {
  en: {
    home: "Home", book: "Book", online: "Online", account: "Account", menu: "Menu",
    back: "Back", bookVisit: "Book a visit", viewServices: "View services",
    sports: "Sports Rehab", sportsLead: "Get back to the movement you love.",
    manual: "Manual Therapy", manualLead: "Hands-on care for easier movement.",
    about: "Meet your physiotherapist", firstVisit: "Your first visit",
    onlineTitle: "Online Consultation", onlineLead: "Physiotherapy guidance by video, wherever you are.",
    illustrative: "Illustrative imagery · Clinic content still under review",
  },
  bg: {
    home: "Начало", book: "Запази", online: "Онлайн", account: "Профил", menu: "Меню",
    back: "Назад", bookVisit: "Запази час", viewServices: "Виж услугите",
    sports: "Спортна рехабилитация", sportsLead: "Върни се към движението, което обичаш.",
    manual: "Мануална терапия", manualLead: "Практична грижа за по-свободно движение.",
    about: "Твоят физиотерапевт", firstVisit: "Първо посещение",
    onlineTitle: "Онлайн консултация", onlineLead: "Видео консултация с физиотерапевт, където и да си.",
    illustrative: "Примерни изображения · Съдържанието подлежи на одобрение",
  },
} as const;

function localize(locale: Locale, en: string, bg: string) { return locale === "en" ? en : bg; }
function PublicChrome({ locale, path, active, children }: { locale: Locale; path: string; active: "home" | "book" | "online"; children: ReactNode }) {
  const t = copy[locale];
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const other = locale === "en" ? "bg" : "en";
  function showMenu() { dialog.current?.showModal(); setOpen(true); }
  function closeMenu() { dialog.current?.close(); setOpen(false); }
  return <div className={s.page} lang={locale} data-physix-public-screen>
    <div className={s.shell}>
      <header className={s.header}>
        <Link className={s.headerBack} href={`/${locale}`} aria-label={t.back}><ArrowLeft /></Link>
        <Link className={s.headerBrand} href={`/${locale}`} aria-label="PhysiX"><BrandMark /></Link>
        <div className={s.headerTools}>
          <Link className={s.language} href={`/${other}/${path}`}>{locale === "en" ? "БГ" : "EN"}</Link>
          <button className={s.menuButton} type="button" onClick={showMenu} aria-label={t.menu} aria-expanded={open}><Menu /></button>
        </div>
      </header>
      <main>{children}</main>
    </div>
    <PublicDock locale={locale} active={active} />
    <dialog ref={dialog} className={s.menuDialog} onCancel={closeMenu} onClose={() => setOpen(false)}>
      <div className={s.menuTop}><BrandMark /><button type="button" onClick={closeMenu} aria-label="Close"><X /></button></div>
      <nav><Link href={`/${locale}`} onClick={closeMenu}>{t.home}<ArrowRight /></Link><Link href={`/${locale}/book`} onClick={closeMenu}>{t.bookVisit}<ArrowRight /></Link><Link href={`/${locale}/online`} onClick={closeMenu}>{t.onlineTitle}<ArrowRight /></Link><Link href={`/${locale}/about`} onClick={closeMenu}>{t.about}<ArrowRight /></Link><Link href={`/${locale}/first-visit`} onClick={closeMenu}>{t.firstVisit}<ArrowRight /></Link><Link href="/account" onClick={closeMenu}>{t.account}<ArrowRight /></Link></nav>
    </dialog>
  </div>;
}
function PublicDock({ locale, active }: { locale: Locale; active: "home" | "book" | "online" }) {
  const t = copy[locale];
  const items = [
    { id: "home" as const, href: `/${locale}`, label: t.home, icon: Home },
    { id: "book" as const, href: `/${locale}/book`, label: t.book, icon: CalendarDays },
    { id: "online" as const, href: `/${locale}/online`, label: t.online, icon: Video },
    { id: "account" as const, href: "/account", label: t.account, icon: UserRound },
  ];
  return <nav className={s.dock} aria-label={localize(locale, "Main navigation", "Основна навигация")}>
    {items.map(({ id, href, label, icon: Icon }) => <Link key={id} href={href} aria-current={id === active ? "page" : undefined}><span><Icon /></span>{label}</Link>)}
  </nav>;
}

function FeatureRow({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <div className={s.featureRow}><span className={s.featureIcon}>{icon}</span><div><strong>{title}</strong><p>{text}</p></div></div>;
}

function ServiceHero({ image, title, lead }: { image: string; title: string; lead: string }) {
  return <section className={s.serviceHero}>
    <div className={s.serviceHeroImage}><Image src={image} alt="" fill sizes="430px" priority unoptimized /></div>
    <div className={s.serviceHeroTitle}><h1>{title}</h1><p>{lead}</p></div>
  </section>;
}
function ServiceDetail({ locale, type }: { locale: Locale; type: "sports" | "manual" }) {
  const t = copy[locale];
  const sports = type === "sports";
  const title = sports ? t.sports : t.manual;
  const lead = sports ? t.sportsLead : t.manualLead;
  const image = sports ? "/physix-preview/website-art/sports-detail-reference.webp" : "/physix-preview/website-art/manual-reference.webp";
  const otherTitle = sports ? t.manual : t.sports;
  const otherHref = `/${locale}/services/${sports ? "manual" : "sports"}`;
  const otherImage = sports ? "/physix-preview/website-art/manual-reference.webp" : "/physix-preview/website-art/sports-reference.webp";
  return <PublicChrome locale={locale} path={`services/${type}`} active="book">
    <ServiceHero image={image} title={title} lead={lead} />
    <section className={s.detailBody}>
      <p className={s.detailLead}>{localize(locale, "A focused service built around your movement goals and the activities you want to return to.", "Фокусирана услуга, съобразена с твоите цели за движение и дейностите, към които искаш да се върнеш.")}</p>
      <div className={s.featureList}>
        <FeatureRow icon={<Activity />} title={localize(locale, "Suitable for", "Подходящо за")} text={localize(locale, "People looking for support with active movement and returning to the things they enjoy.", "Хора, които търсят подкрепа за активно движение и връщане към любими дейности.")} />
        <FeatureRow icon={<CircleHelp />} title={localize(locale, "What to expect", "Какво да очакваш")} text={localize(locale, "Your practitioner will talk through the visit and explain the next steps clearly.", "Физиотерапевтът ще обясни ясно посещението и следващите стъпки.")} />
        <FeatureRow icon={<Target />} title={localize(locale, "Your goals", "Твоите цели")} text={localize(locale, "Tell us what you want to get back to so the visit starts with the right context.", "Сподели към какво искаш да се върнеш, за да започне посещението с правилния контекст.")} />
      </div>
      <Link className={s.primaryCta} href={`/${locale}/book?service=${type}`}>{t.bookVisit}<ArrowRight /></Link>
    </section>
    <RelatedSection locale={locale} title={otherTitle} href={otherHref} image={otherImage} />
    <p className={s.disclaimer}>{t.illustrative}</p>
  </PublicChrome>;
}
function RelatedSection({ locale, title, href, image }: { locale: Locale; title: string; href: string; image: string }) {
  return <section className={s.related}>
    <h2>{localize(locale, "Related services", "Свързани услуги")}</h2>
    <p>{localize(locale, "You might also be interested in", "Може да разгледаш и")}</p>
    <Link className={s.relatedCard} href={href}>
      <span className={s.relatedImage}><Image src={image} alt="" fill sizes="90px" unoptimized /></span>
      <span><strong>{title}</strong><small>{localize(locale, "Explore this service", "Разгледай услугата")}</small></span>
      <ArrowRight />
    </Link>
    <div className={s.helpCard}><strong>{localize(locale, "Not sure which service is right for you?", "Не си сигурен коя услуга е подходяща?")}</strong><p>{localize(locale, "Start with Book and choose the option that best matches what you are looking for.", "Започни от Запази и избери опцията, която най-добре отговаря на това, което търсиш.")}</p><Link href={`/${locale}/book`}>{copy[locale].bookVisit}<ArrowRight /></Link></div>
  </section>;
}

function OnlinePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <PublicChrome locale={locale} path="online" active="online">
    <section className={s.onlineHero}>
      <div className={s.onlineVisual}><div className={s.laptop}><div className={s.laptopScreen}><Image src="/physix-preview/website-art/charlie.webp" alt="" fill sizes="220px" priority unoptimized /></div><span className={s.laptopBase} /></div><span className={s.videoBadge}><Video />{localize(locale, "Video consultation", "Видео консултация")}</span></div>
      <div className={s.onlineTitle}><h1>{t.onlineTitle}</h1><p>{t.onlineLead}</p></div>
    </section>
    <section className={s.onlineBody}>
      <FeatureRow icon={<Video />} title={localize(locale, "Convenient", "Удобно")} text={localize(locale, "Join from home, work or wherever you have a private place to talk.", "Включи се от дома, работата или друго спокойно място.")} />
      <FeatureRow icon={<UserRound />} title={localize(locale, "One-to-one", "Индивидуално")} text={localize(locale, "A private video conversation with a physiotherapist.", "Личен видео разговор с физиотерапевт.")} />
      <FeatureRow icon={<Info />} title={localize(locale, "Availability", "Наличност")} text={localize(locale, "Online appointment times have not been published yet.", "Часовете за онлайн консултация още не са публикувани.")} />
      <Link className={s.primaryCta} href={`/${locale}/book`}>{localize(locale, "Start booking", "Започни записване")}<ArrowRight /></Link>
      <p className={s.disclaimer}>{t.illustrative}</p>
    </section>
  </PublicChrome>;
}
function AboutPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <PublicChrome locale={locale} path="about" active="home">
    <section className={s.profileHero}>
      <div className={s.profileImage}><Image src="/physix-preview/website-art/charlie.webp" alt="" fill sizes="430px" priority unoptimized /></div>
      <div className={s.profileTitle}><span>{localize(locale, "Your physiotherapist", "Твоят физиотерапевт")}</span><h1>{localize(locale, "Hi, I’m Charlie", "Здравей, аз съм Чарли")}</h1><p>{localize(locale, "I help people move better and do more of what they love.", "Помагам на хората да се движат по-добре и да правят повече от това, което обичат.")}</p></div>
    </section>
    <section className={s.profileBody}>
      <h2>{localize(locale, "A human approach to care", "Човешки подход към грижата")}</h2>
      <p>{localize(locale, "This profile layout is ready for the clinic’s approved practitioner biography, photos and credentials. The current name and portrait remain illustrative reference content.", "Този профил е подготвен за одобрената биография, снимки и квалификации на физиотерапевта. Текущите име и портрет остават примерни.")}</p>
      <div className={s.profileActions}><Link className={s.primaryCta} href={`/${locale}/book`}>{t.bookVisit}<ArrowRight /></Link><Link className={s.secondaryCta} href={`/${locale}/first-visit`}>{t.firstVisit}<ArrowRight /></Link></div>
      <p className={s.disclaimer}>{t.illustrative}</p>
    </section>
  </PublicChrome>;
}

function FirstVisitPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const steps = [
    [localize(locale, "Choose your visit", "Избери посещение"), localize(locale, "Start in Book and select the service that fits what you are looking for.", "Започни от Запази и избери услугата, която отговаря на това, което търсиш.")],
    [localize(locale, "Know what happens next", "Знай какво следва"), localize(locale, "Appointment times will appear only when the clinic publishes its schedule.", "Часовете ще се появят едва когато клиниката публикува графика си.")],
    [localize(locale, "Bring your questions", "Подготви въпросите си"), localize(locale, "Use the visit to discuss your goals and anything you want clarified.", "Използвай посещението, за да обсъдиш целите си и всичко, което искаш да уточниш.")],
  ];
  return <PublicChrome locale={locale} path="first-visit" active="home">
    <section className={s.supportIntro}><span>{localize(locale, "BEFORE YOUR VISIT", "ПРЕДИ ПОСЕЩЕНИЕТО")}</span><h1>{t.firstVisit}</h1><p>{localize(locale, "A few useful things to know before you book.", "Няколко полезни неща, които да знаеш преди записване.")}</p></section>
    <section className={s.steps}>{steps.map((step, index) => <article key={step[0]}><span>{index + 1}</span><div><h2>{step[0]}</h2><p>{step[1]}</p></div></article>)}</section>
    <FaqBlock locale={locale} />
    <Link className={s.primaryCta} href={`/${locale}/book`}>{t.bookVisit}<ArrowRight /></Link>
  </PublicChrome>;
}
function FaqBlock({ locale }: { locale: Locale }) {
  const items = [
    [localize(locale, "How do I book a visit?", "Как да запазя час?"), localize(locale, "Open Book, choose a service and continue. Times will only appear when the clinic publishes availability.", "Отвори Запази, избери услуга и продължи. Часовете ще се появят само когато клиниката публикува наличност.")],
    [localize(locale, "Can I book an online consultation?", "Мога ли да запазя онлайн консултация?"), localize(locale, "The online consultation entry is available, but appointment times are not published yet.", "Входът за онлайн консултация е наличен, но часовете още не са публикувани.")],
    [localize(locale, "Where are my courses and programmes?", "Къде са моите курсове и програми?"), localize(locale, "Use My Account to enter the retained Gymaf member experience.", "Използвай Профил, за да влезеш в запазеното Gymaf приложение.")],
  ];
  return <section className={s.faqBlock}><h2>{localize(locale, "Frequently asked", "Често задавани въпроси")}</h2>{items.map(item => <details key={item[0]}><summary><span>{item[0]}</span><span className={s.faqPlus}>+</span></summary><p>{item[1]}</p></details>)}</section>;
}

function BookingDetailsPanel({ locale }: { locale: Locale }) {
  return <section className={s.bookingPanel}>
    <div className={s.bookingNotice}><Info /><div><strong>{localize(locale, "No time selected", "Няма избран час")}</strong><p>{localize(locale, "Details can be entered, but nothing can be submitted until the clinic publishes availability.", "Можеш да въведеш данни, но нищо не може да бъде изпратено преди клиниката да публикува наличност.")}</p></div></div>
    <label>{localize(locale, "Full name", "Име и фамилия")}<input type="text" placeholder={localize(locale, "Your name", "Твоето име")} /></label>
    <label>{localize(locale, "Email", "Имейл")}<input type="email" placeholder="name@example.com" /></label>
    <label>{localize(locale, "Phone", "Телефон")}<input type="tel" placeholder={localize(locale, "Phone number", "Телефонен номер")} /></label>
    <div className={s.verificationNote}><Check /><div><strong>{localize(locale, "Verification before confirmation", "Потвърждение преди записване")}</strong><p>{localize(locale, "Identity verification belongs before a real booking is committed.", "Потвърждението на самоличност е преди реалното създаване на посещение.")}</p></div></div>
    <button className={s.disabledCta} type="button" disabled>{localize(locale, "Continue to review", "Към преглед")}</button>
  </section>;
}

function BookingReviewPanel({ locale, selected }: { locale: Locale; selected: string }) {
  const rows=[[localize(locale,"Service","Услуга"),selected],[localize(locale,"Time","Час"),localize(locale,"Not selected","Не е избран")],[localize(locale,"Details","Данни"),localize(locale,"Not submitted","Не са изпратени")]];
  return <section className={s.reviewPanel}><h2>{localize(locale,"Appointment summary","Обобщение")}</h2><div className={s.reviewRows}>{rows.map(row=><div key={row[0]}><span>{row[0]}</span><strong>{row[1]}</strong></div>)}</div><div className={s.bookingNotice}><Info /><div><strong>{localize(locale,"Booking is not live","Записването не е активно")}</strong><p>{localize(locale,"A persisted appointment and a revalidated slot are required before confirmation.","Преди потвърждение са нужни реално запазен час и повторна проверка на наличността.")}</p></div></div><button className={s.disabledCta} type="button" disabled>{localize(locale,"Confirm booking","Потвърди записването")}</button></section>;
}

export function BookingStatusPage({ locale, screen, service }: { locale: Locale; screen: BookingScreen; service?: "sports" | "manual" }) {
  const t = copy[locale];
  const selected = service === "manual" ? t.manual : t.sports;
  const titles: Record<BookingScreen, string> = { time: localize(locale,"Choose a time","Избери час"), details: localize(locale,"Your details","Твоите данни"), review: localize(locale,"Review booking","Преглед на записването"), confirmation: localize(locale,"Booking confirmation","Потвърждение"), conflict: localize(locale,"That time is no longer available","Този час вече не е наличен") };
  const body = screen === "conflict" ? localize(locale,"The selected time cannot be reserved. Choose another time when availability is published.","Избраният час не може да бъде запазен. Избери друг час, когато бъде публикувана наличност.") : screen === "confirmation" ? localize(locale,"No appointment has been created. Live booking is not configured yet.","Не е създадено посещение. Реалното записване още не е конфигурирано.") : localize(locale,"Appointment times are not published yet, so this step cannot continue to a real reservation.","Часовете още не са публикувани, затова тази стъпка не може да продължи към реално записване.");
  return <PublicChrome locale={locale} path={`book/${screen}?service=${service ?? "sports"}`} active="book"><section className={s.bookingStateIntro}><span>{localize(locale,"BOOK A VISIT","ЗАПАЗИ ЧАС")}</span><h1>{titles[screen]}</h1><p>{selected}</p></section><ol className={s.stepper}><li data-active={screen === "time"}>1<span>{localize(locale,"Time","Час")}</span></li><li data-active={screen === "details"}>2<span>{localize(locale,"Details","Данни")}</span></li><li data-active={screen === "review"}>3<span>{localize(locale,"Review","Преглед")}</span></li></ol>{screen === "details" ? <BookingDetailsPanel locale={locale} /> : screen === "review" ? <BookingReviewPanel locale={locale} selected={selected} /> : <section className={`${s.stateCard} ${screen === "conflict" ? s.conflictCard : ""}`}><span className={s.stateIcon}>{screen === "conflict" ? <Info /> : <CalendarDays />}</span><h2>{screen === "time" ? localize(locale,"Times are not published yet","Часовете още не са публикувани") : titles[screen]}</h2><p>{body}</p><Link className={s.primaryCta} href={`/${locale}/book?service=${service ?? "sports"}`}>{localize(locale,"Back to service","Назад към услугата")}<ArrowRight /></Link></section>}</PublicChrome>;
}
export function PublicDestinationPage({ locale, destination }: { locale: Locale; destination: PublicDestination }) {
  if (destination === "sports" || destination === "manual") return <ServiceDetail locale={locale} type={destination} />;
  if (destination === "online") return <OnlinePage locale={locale} />;
  if (destination === "about") return <AboutPage locale={locale} />;
  return <FirstVisitPage locale={locale} />;
}
