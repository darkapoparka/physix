/** Keep the retained client navigation inside its account namespace. */
export function accountHref(href: string): string {
  if (!href.startsWith("/") || href.startsWith("//") || href.includes("\\"))
    return href;
  if (
    /^\/(account|api|app|auth|bg|en|coach|coaches|operator|login|security|join|guest-pass|friend-invite|review|preview|design-review|home-preview)(?:[/?#]|$)/.test(
      href,
    )
  )
    return href;
  const url = new URL(href, "http://local.invalid");
  return (
    "/account" +
    (url.pathname === "/" ? "" : url.pathname) +
    url.search +
    url.hash
  );
}
