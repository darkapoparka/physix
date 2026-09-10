import { notFound, redirect } from "next/navigation";
import {
  BookingStatusPage,
  PublicDestinationPage,
  type BookingScreen,
  type PublicDestination,
} from "./public-destination";
import { BookingServiceStep } from "./services-index";

type SearchParams = Record<string, string | string[] | undefined>;
type Locale = "bg" | "en";

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function PublicRoute({ locale, params, searchParams }: { locale: Locale; params: Promise<{ page: string[] }>; searchParams: Promise<SearchParams> }) {
  const { page } = await params;
  const query = await searchParams;
  const path = page.join("/");
  const requested = first(query.service);
  const service = requested === "sports" || requested === "manual" ? requested : undefined;

  if (path === "services") redirect(`/${locale}/book`);
  if (path === "services/recovery") redirect("/account");
  if (path === "book") return <BookingServiceStep locale={locale} initialService={service} />;

  if (page[0] === "book" && page.length === 2) {
    const allowed: BookingScreen[] = ["time", "details", "review", "confirmation", "conflict"];
    if (allowed.includes(page[1] as BookingScreen)) return <BookingStatusPage locale={locale} screen={page[1] as BookingScreen} service={service} />;
  }

  const destination: PublicDestination | undefined =
    path === "online" ? "online" :
    path === "about" ? "about" :
    path === "first-visit" || path === "faq" ? "first-visit" :
    page.length === 2 && page[0] === "services" && ["sports", "manual"].includes(page[1])
      ? (page[1] as PublicDestination)
      : undefined;

  if (!destination) notFound();
  return <PublicDestinationPage locale={locale} destination={destination} />;
}
