export function validateSourceUrl(raw: string): URL {
  const url = new URL(raw);
  if (url.protocol !== "https:" || !["www.jnbk-brakes.com", "jnbk-brakes.com", "www.nibk.jp", "nibk.jp"].includes(url.hostname) || !url.pathname.startsWith("/catalogue/")) throw new Error("Only HTTPS JNBK/NiBK catalogue URLs are allowed");
  if (url.username || url.password || url.port) throw new Error("Source URL contains unsupported credentials or port");
  return url;
}
