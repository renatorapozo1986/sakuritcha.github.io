export type Photo = { src: string; title: string; category: string; alt: string }

export type Route = "home" | "precos" | "exemplos" | "privacidade"

// Prefixo da hospedagem ("" quando o site fica na raiz do domínio)
export const BASE = new URL(import.meta.env.BASE_URL, window.location.origin).pathname.replace(/\/$/, "")

export const path = (route: Exclude<Route, "home">) => `${BASE}/${route}/`

export const routeFromPath = (pathname: string): Route => {
  const rest = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname
  const segment = rest.replace(/^\/+|\/+$/g, "")
  return segment === "precos" || segment === "exemplos" || segment === "privacidade" ? segment : "home"
}

export const BUSINESS_HOURS = "Seg a Sex, 9h às 18h" // confirme o horário real de atendimento

export const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.53 0 .2 5.32.2 11.86c0 2.09.55 4.13 1.59 5.92L.1 23.94l6.3-1.65a11.9 11.9 0 0 0 5.67 1.44h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.14-3.45-8.36Zm-8.42 18.22h-.01a9.85 9.85 0 0 1-5.02-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.83 9.83 0 0 1-1.51-5.24A9.89 9.89 0 0 1 12.08 2a9.8 9.8 0 0 1 6.98 2.9 9.8 9.8 0 0 1 2.89 6.97 9.88 9.88 0 0 1-9.87 9.85Zm5.42-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.94 8.94 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
  </svg>
)


export const PawIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <ellipse cx="18" cy="18" rx="7" ry="10" transform="rotate(-22 18 18)" />
    <ellipse cx="33" cy="13" rx="7" ry="10" />
    <ellipse cx="47" cy="20" rx="7" ry="10" transform="rotate(22 47 20)" />
    <ellipse cx="10" cy="33" rx="6" ry="9" transform="rotate(-35 10 33)" />
    <path d="M31.5 27c-9.4 0-17.7 9.7-17.7 18 0 6 5.3 8.4 10.6 6.6 4.3-1.4 5.2-1.2 8.1.1 5.4 2.4 16.6.6 16.6-7.5 0-7.1-9.5-17.2-17.6-17.2Z" />
  </svg>
)


export const whatsappOrderLink = (item: string) =>
  `https://wa.me/5511960739865?text=${encodeURIComponent(`Olá, Milena! Gostaria de saber mais sobre: ${item}.`)}`

