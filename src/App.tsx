import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import { BASE, BUSINESS_HOURS, PawIcon, WhatsAppIcon, path, routeFromPath, whatsappOrderLink, type Photo } from "./shared"
import PrecosPage from "./pages/PrecosPage"
import ExemplosPage from "./pages/ExemplosPage"
import PrivacidadePage from "./pages/PrivacidadePage"

const BalloonIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 4C19.8 4 13 13.4 13 24.5 13 36.4 23.5 44 29.5 46l-3 5h11l-3-5C40.5 44 51 36.4 51 24.5 51 13.4 44.2 4 32 4Z" />
    <path d="M32 51c-8 4-4 9-12 9M32 51c8 4 4 9 12 9" />
    <path d="M22 15c2.2-3 5.1-4.5 8.4-4.8" />
  </svg>
)

const CakeIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M9 31h46v23H9zM7 54h50M14 31v-8h36v8M20 23v-7M32 23V12M44 23v-7" />
    <path d="M20 9c3 3 3 5 0 7-3-2-3-4 0-7ZM32 5c3 3 3 5 0 7-3-2-3-4 0-7ZM44 9c3 3 3 5 0 7-3-2-3-4 0-7ZM9 40c5 5 10-5 15 0s10-5 15 0 10-5 16 0" />
  </svg>
)

const FlowerIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 31c-4-14 2-24 8-22 7 2 5 13-8 22Zm0 0c14-4 24 2 22 8-2 7-13 5-22-8Zm0 0c4 14-2 24-8 22-7-2-5-13 8-22Zm0 0C18 35 8 29 10 23c2-7 13-5 22 8Z" />
    <circle cx="32" cy="31" r="6" />
  </svg>
)

const GiftIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M8 25h48v31H8zM5 17h54v10H5zM32 17v39" />
    <path d="M31 17C19 18 14 13 17 8c4-6 12 2 14 9Zm2 0c12 1 17-4 14-9-4-6-12 2-14 9Z" />
  </svg>
)

function ServiceCard({
  icon,
  number,
  title,
  text,
}: {
  icon: ReactNode
  number: string
  title: string
  text: string
}) {
  return (
    <article className="service-card">
      <span className="service-number">{number}</span>
      <div className="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <a href={whatsappOrderLink(title)} target="_blank" rel="noreferrer">
        Saiba mais <span>→</span>
      </a>
    </article>
  )
}

const galleryItems = [
  {
    src: "/trabalho-lagrimas-alegria.webp",
    title: "Lágrimas de alegria",
    category: "Casamento",
    alt: "Lencinho personalizado para lágrimas de alegria em embalagem de organza",
  },
  {
    src: "/trabalho-toalhinhas-safari.webp",
    title: "Carinho em cada detalhe",
    category: "Maternidade",
    alt: "Toalhinhas personalizadas com tema safari embaladas para presente",
  },
  {
    src: "/trabalho-pocoes-magicas.webp",
    title: "Poções mágicas",
    category: "Festa temática",
    alt: "Mini frascos coloridos personalizados com nomes de poções mágicas",
  },
  {
    src: "/trabalho-cha-de-bebe.webp",
    title: "Um doce anúncio",
    category: "Chá de bebê",
    alt: "Mamadeiras personalizadas com confeitos azuis para chá de bebê",
  },
  {
    src: "/trabalho-caixinhas-safari.webp",
    title: "Surpresas do safari",
    category: "Lembrancinhas",
    alt: "Caixinhas transparentes personalizadas com tema safari",
  },
  {
    src: "/trabalho-primeira-volta-sol.webp",
    title: "Primeira volta ao sol",
    category: "Aniversário",
    alt: "Lembrancinha de primeira volta ao sol com biscoitos e fita azul",
  },
  {
    src: "/trabalho-bodas-de-prata.webp",
    title: "Amor para celebrar",
    category: "Bodas de prata",
    alt: "Potes personalizados com tecido prateado para bodas de prata",
  },
  {
    src: "/trabalho-doces-coloridos.webp",
    title: "Alegria em cores",
    category: "Festa infantil",
    alt: "Copos personalizados recheados com doces e confeitos coloridos",
  },
  {
    src: "/trabalho-lembrancas-personalizadas.webp",
    title: "Feito especialmente para você",
    category: "Lembranças personalizadas",
    alt: "Conjunto de lembrancinhas personalizadas com mel, doces e garrafa decorada",
  },
]

const pageTitles = {
  home: "Sakuritcha Decorações | Festas, lembrancinhas e mimos personalizados",
  precos: "Preços e kits | Sakuritcha Decorações",
  exemplos: "Exemplos de produtos | Sakuritcha Decorações",
  privacidade: "Política de Privacidade | Sakuritcha Decorações",
}

// Adicione depoimentos REAIS aqui para a seção aparecer no site.
// Modelo: { quote: "texto do cliente", author: "Nome", detail: "Tipo de festa" }
const testimonials: { quote: string; author: string; detail: string }[] = []

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  
  const closeMenu = () => setMenuOpen(false)

  const [loc, setLoc] = useState(() => ({
    pathname: window.location.pathname,
    hash: window.location.hash,
  }))
  const { hash } = loc
  const route = routeFromPath(loc.pathname)

  useEffect(() => {
    const sync = () => setLoc({ pathname: window.location.pathname, hash: window.location.hash })
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element).closest("a")
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return
      const href = link.getAttribute("href") ?? ""
      let url: string | null = null
      if (href.startsWith("#")) {
        // âncora da página inicial clicada a partir de outra página
        if (routeFromPath(window.location.pathname) !== "home") url = `${BASE}/${href}`
      } else if (link.origin === window.location.origin && routeFromPath(link.pathname) !== "home") {
        url = link.pathname + link.hash
      }
      if (url === null) return
      event.preventDefault()
      window.history.pushState(null, "", url)
      sync()
    }
    window.addEventListener("popstate", sync)
    window.addEventListener("hashchange", sync)
    document.addEventListener("click", onClick)
    return () => {
      window.removeEventListener("popstate", sync)
      window.removeEventListener("hashchange", sync)
      document.removeEventListener("click", onClick)
    }
  }, [])

  useEffect(() => {
    document.title = pageTitles[route]
    setMenuOpen(false)
    if (route !== "home" || hash === "" || hash === "#") {
      window.scrollTo(0, 0)
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 0)
    return () => window.clearTimeout(timer)
  }, [route, hash])

  useEffect(() => {
    if (!selectedPhoto) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selectedPhoto])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setFormStatus("sending")
    try {
      const res = await fetch("https://formsubmit.co/ajax/sakuritchadecoracoes@icloud.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error("falha no envio")
      form.reset()
      setFormStatus("success")
    } catch {
      setFormStatus("error")
    }
  }

  return (
    <div className="site-shell">
      <div className="topbar">
        <span>São Paulo e região</span>
        <p>Transformando festas em memórias inesquecíveis</p>
        <a href="#contato">Fale conosco</a>
      </div>

      <header className="header">
        <a className="brand" href="#inicio" aria-label="Sakuritcha Decorações">
          <PawIcon />
          <span>Sakuritcha</span>
          <small>decorações</small>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#inicio" onClick={closeMenu}>
            Início
          </a>
          <a href="#sobre" onClick={closeMenu}>
            Sobre
          </a>
          <a href="#servicos" onClick={closeMenu}>
            Serviços
          </a>
          <a href={path("exemplos")} onClick={closeMenu} aria-current={route === "exemplos" ? "page" : undefined}>
            Exemplos
          </a>
          <a href={path("precos")} onClick={closeMenu} aria-current={route === "precos" ? "page" : undefined}>
            Preços
          </a>
          <a href="#trabalhos" onClick={closeMenu}>
            Trabalhos
          </a>
          <a href="#processo" onClick={closeMenu}>
            Como funciona
          </a>
          <a href="#contato" onClick={closeMenu}>
            Contato
          </a>
        </nav>
        <a className="button button-small header-cta" href="#contato">
          Pedir orçamento
        </a>
      </header>

      <main>
        {route === "home" && (
        <>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow">
              <span></span> Festas que encantam
            </div>
            <h1>
              Seu momento,
              <br />
              <em>lindo em cada detalhe.</em>
            </h1>
            <p>
              Criamos decorações afetivas e personalizadas para celebrar
              histórias, espalhar alegria e tornar cada ocasião verdadeiramente única — de festas e lembrancinhas a mimos para o seu pet.
            </p>
            <div className="hero-actions">
              <a className="button" href="#contato">
                Quero uma festa especial <span>→</span>
              </a>
              <a className="text-link" href="#servicos">
                Conheça nosso trabalho
              </a>
            </div>
            <div className="hero-trust">
              <div className="avatar-stack">
                <span>S</span>
                <span>D</span>
                <span>+</span>
              </div>
              <div>
                <strong>Atendimento direto com a Milena</strong>
                <small>do primeiro contato à entrega</small>
              </div>
            </div>
          </div>
          <div className="hero-art">
            <span className="spark spark-one">✦</span>
            <span className="spark spark-two">✦</span>
            <div className="hero-ring">
              <img
                src="/sakuritcha-logo.webp"
                alt="Sakuritcha Decorações de festas e eventos"
              />
            </div>
            <div className="hero-badge">
              <PawIcon />
              <div>
                <strong>100%</strong>
                <span>personalizado</span>
              </div>
            </div>
            <div className="dot-pattern"></div>
          </div>
        </section>

        <section className="marquee" aria-label="Nossos valores">
          <span>Festas infantis</span>
          <PawIcon />
          <span>Decoração afetiva</span>
          <PawIcon />
          <span>Eventos especiais</span>
          <PawIcon />
          <span>Detalhes personalizados</span>
          <PawIcon />
          <span>Mimos para pets</span>
        </section>

        <section className="section services" id="servicos">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span></span> O que fazemos
              </div>
              <h2>
                Celebramos com você,
                <br />
                <em>do começo ao encanto.</em>
              </h2>
            </div>
            <p>
              Cada projeto nasce de uma conversa e ganha forma com criatividade,
              cuidado e um olhar atento para o que faz sua história ser única.
            </p>
          </div>
          <div className="service-grid">
            <ServiceCard
              number="01"
              icon={<BalloonIcon />}
              title="Decoração completa"
              text="Cenários exclusivos, balões, painéis e todos os elementos para uma festa inesquecível."
            />
            <ServiceCard
              number="02"
              icon={<CakeIcon />}
              title="Festas personalizadas"
              text="Um projeto criado do zero a partir do seu tema, estilo, espaço e convidados."
            />
            <ServiceCard
              number="03"
              icon={<FlowerIcon />}
              title="Celebrações especiais"
              text="Batizados, chás, aniversários e encontros com uma atmosfera cheia de afeto."
            />
            <ServiceCard
              number="04"
              icon={<GiftIcon />}
              title="Detalhes e lembranças"
              text="Papelaria, mimos e lembranças personalizadas, com um carinho especial pelos pets."
            />
          </div>
        </section>

        <section className="catalog section" id="modelos">
          <div className="catalog-heading">
            <div>
              <div className="eyebrow">
                <span></span> Catálogo Sakuritcha
              </div>
              <h2>
                Modelos, exemplos
                <br />
                <em>e valores.</em>
              </h2>
            </div>
            <p>Veja como ficam os nossos produtos e consulte os preços em páginas separadas.</p>
          </div>
          <div className="teaser-grid">
            <a className="teaser-card" href={path("exemplos")}>
              <small>Inspire-se</small>
              <h3>Exemplos de produtos</h3>
              <p>Sacolinhas, boletins, calendários, fotos, canecas e cenários de Natal.</p>
              <span>Ver exemplos →</span>
            </a>
            <a className="teaser-card" href={path("precos")}>
              <small>Valores</small>
              <h3>Preços e kits</h3>
              <p>Tabela por quantidade, kits promocionais e o Natal Encantado 2026.</p>
              <span>Ver preços →</span>
            </a>
          </div>
        </section>

        <section className="about" id="sobre">
          <div className="about-visual">
            <div className="about-frame">
              <img
                src="/sakuritcha-logo.webp"
                alt="Identidade visual Sakuritcha"
              />
            </div>
            <div className="about-note">
              <PawIcon />
              <p>
                Feito com amor,
                <br />
                <strong>pensado para você.</strong>
              </p>
            </div>
          </div>
          <div className="about-copy">
            <div className="eyebrow">
              <span></span> Nossa essência
            </div>
            <h2>
              Transformamos carinho
              <br />
              em <em>cenários de sonho.</em>
            </h2>
            <p>
              Eu sou a Milena, responsável pela Sakuritcha. Acredito que toda
              celebração merece contar uma história. Por isso, cada escolha —
              das cores aos pequenos detalhes — é feita para traduzir quem você
              é.
            </p>
            <p>
              Unimos criatividade, delicadeza e organização para que você possa
              viver o melhor da festa: o momento.
            </p>
            <div className="about-features">
              <div>
                <span>✓</span>
                <p>
                  <strong>Atendimento próximo</strong>
                  <small>Você participa de cada etapa.</small>
                </p>
              </div>
              <div>
                <span>✓</span>
                <p>
                  <strong>Criação exclusiva</strong>
                  <small>Nenhuma festa é igual à outra.</small>
                </p>
              </div>
            </div>
            <a className="text-link" href="#processo">
              Descubra como trabalhamos <span>→</span>
            </a>
          </div>
        </section>

        <section className="gallery section" id="trabalhos">
          <div className="gallery-heading">
            <div>
              <div className="eyebrow">
                <span></span> Nosso portfólio
              </div>
              <h2>
                Detalhes que viram
                <br />
                <em>lindas memórias.</em>
              </h2>
            </div>
            <div className="gallery-intro">
              <PawIcon />
              <p>
                Conheça um pouco do universo visual que inspira nossas
                celebrações e imagine o que podemos criar para você.
              </p>
            </div>
          </div>
          <div className="gallery-grid">
            {galleryItems.map((photo, index) => (
              <button
                className={`gallery-item gallery-item-${index + 1}`}
                key={photo.src}
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                aria-label={`Ampliar foto: ${photo.title}`}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <span className="gallery-overlay">
                  <small>{photo.category}</small>
                  <strong>{photo.title}</strong>
                  <i aria-hidden="true">↗</i>
                </span>
              </button>
            ))}
          </div>
          <div className="gallery-footer">
            <span>Quer ver mais inspirações e novidades?</span>
            <a
              className="text-link"
              href="https://instagram.com/sakuritchadecoracoes"
              target="_blank"
              rel="noreferrer"
            >
              Acompanhe @sakuritchadecoracoes <span>→</span>
            </a>
          </div>
        </section>

        <section className="process section" id="processo">
          <div className="process-header">
            <div className="eyebrow light">
              <span></span> Simples e especial
            </div>
            <h2>
              Da sua ideia até o<br />
              <em>grande dia.</em>
            </h2>
          </div>
          <div className="process-grid">
            <article>
              <b aria-hidden="true">01</b>
              <div className="process-icon" aria-hidden="true">01</div>
              <h3>A gente conversa</h3>
              <p>
                Você compartilha seus sonhos, referências e tudo que imagina
                para a celebração.
              </p>
            </article>
            <article>
              <b aria-hidden="true">02</b>
              <div className="process-icon" aria-hidden="true">02</div>
              <h3>Criamos a proposta</h3>
              <p>
                Desenvolvemos um projeto personalizado com conceito, elementos e
                investimento.
              </p>
            </article>
            <article>
              <b aria-hidden="true">03</b>
              <div className="process-icon" aria-hidden="true">03</div>
              <h3>Cuidamos de tudo</h3>
              <p>
                Produzimos e organizamos cada detalhe para que a montagem
                aconteça com tranquilidade.
              </p>
            </article>
            <article>
              <b aria-hidden="true">04</b>
              <div className="process-icon" aria-hidden="true">04</div>
              <h3>Você celebra</h3>
              <p>
                No grande dia, é só chegar, se emocionar e aproveitar cada
                instante.
              </p>
            </article>
          </div>
        </section>

        {testimonials.slice(0, 1).map((t) => (
          <section className="testimonial section" key={t.author}>
            <PawIcon className="quote-paw" />
            <div className="eyebrow centered">
              <span></span> Histórias felizes <span></span>
            </div>
            <blockquote>“{t.quote}”</blockquote>
            <div className="stars">★★★★★</div>
            <strong>{t.author}</strong>
            <small>{t.detail}</small>
          </section>
        ))}

        <section className="contact section" id="contato">
          <div className="contact-info">
            <div className="eyebrow">
              <span></span> Entre em contato
            </div>
            <h2>
              Vamos criar algo
              <br />
              <em>especial juntos?</em>
            </h2>
            <p>
              Conte para a Milena como você imagina a sua celebração. Quanto
              mais detalhes compartilhar, mais personalizada será a nossa
              proposta.
            </p>
            <div className="contact-list">
              <a
                href="https://wa.me/5511960739865"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-icon">
                  <WhatsAppIcon />
                </span>
                <span>
                  <small>Telefone e WhatsApp</small>
                  <strong>(11) 96073-9865</strong>
                </span>
              </a>
              <a href="mailto:sakuritchadecoracoes@icloud.com">
                <span className="contact-icon">@</span>
                <span>
                  <small>E-mail</small>
                  <strong>sakuritchadecoracoes@icloud.com</strong>
                </span>
              </a>
              <a
                href="https://instagram.com/sakuritchadecoracoes"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-icon">ig</span>
                <span>
                  <small>Instagram</small>
                  <strong>@sakuritchadecoracoes</strong>
                </span>
              </a>
            </div>
            <div className="contact-signature">
              <PawIcon />
              <p>
                Com carinho,<strong>Milena</strong>
              </p>
            </div>
          </div>

          <form className="contact-form" action="https://formsubmit.co/sakuritchadecoracoes@icloud.com" method="POST" onSubmit={onSubmit}>
            <input
              type="hidden"
              name="_subject"
              value="Novo pedido de orçamento pelo site Sakuritcha"
            />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input
              className="form-honeypot"
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
            />
            <div className="form-title">
              <span>Solicite seu orçamento</span>
              <PawIcon />
            </div>
            <div className="form-grid">
              <label>
                <span>Seu nome *</span>
                <input
                  type="text"
                  name="Nome"
                  placeholder="Como podemos te chamar?"
                  required
                />
              </label>
              <label>
                <span>Seu telefone *</span>
                <input
                  type="tel"
                  name="Telefone"
                  placeholder="(11) 99999-9999"
                  required
                />
              </label>
              <label>
                <span>Seu e-mail *</span>
                <input
                  type="email"
                  name="Email"
                  placeholder="voce@email.com"
                  required
                />
              </label>
              <label>
                <span>Data do evento</span>
                <input type="date" name="Data do evento" />
              </label>
              <label>
                <span>Tipo de celebração *</span>
                <select name="Tipo de celebração" defaultValue="" required>
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  <option>Festa infantil</option>
                  <option>Aniversário adulto</option>
                  <option>Chá de bebê ou revelação</option>
                  <option>Casamento ou noivado</option>
                  <option>Batizado</option>
                  <option>Evento corporativo</option>
                  <option>Outro</option>
                </select>
              </label>
              <label>
                <span>Número de convidados</span>
                <input
                  type="number"
                  min="1"
                  name="Número de convidados"
                  placeholder="Ex.: 50"
                />
              </label>
              <label className="form-full">
                <span>Conte um pouco sobre o seu evento *</span>
                <textarea
                  name="Mensagem"
                  rows={5}
                  placeholder="Tema, local, cores, ideias e tudo que deseja para esse dia..."
                  required
                ></textarea>
              </label>
            </div>
            <label className="form-consent">
              <input type="checkbox" name="Consentimento LGPD" required />
              <span>
                Li e concordo com a <a href={path("privacidade")}>Política de Privacidade</a>.
              </span>
            </label>
            <button className="button form-submit" type="submit" disabled={formStatus === "sending"}>
              {formStatus === "sending" ? "Enviando..." : <>Enviar pedido de orçamento <span>→</span></>}
            </button>
            {formStatus === "success" && (
              <p className="form-status" role="status">
                Pedido enviado! A Milena vai retornar em breve.
              </p>
            )}
            {formStatus === "error" && (
              <p className="form-status form-status-error" role="alert">
                Não foi possível enviar agora. Tente novamente ou fale pelo{" "}
                <a href="https://wa.me/5511960739865" target="_blank" rel="noreferrer">WhatsApp</a>.
              </p>
            )}
            <small className="form-notice">
              Seus dados são usados apenas para responder ao seu pedido de orçamento.
            </small>
          </form>
        </section>

        </>
        )}
        {route === "precos" && <PrecosPage />}
        {route === "exemplos" && <ExemplosPage onOpen={setSelectedPhoto} />}
        {route === "privacidade" && <PrivacidadePage />}

        <section className="cta-section">
          <div className="cta-copy">
            <div className="eyebrow light">
              <span></span> Vamos celebrar?
            </div>
            <h2>
              Conte sua ideia.
              <br />
              <em>A gente cria a magia.</em>
            </h2>
            <p>
              Fale conosco e receba uma proposta personalizada para o seu
              momento especial.
            </p>
            <a
              className="button button-light"
              href="https://wa.me/5511960739865"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon /> Conversar pelo WhatsApp
            </a>
          </div>
          <div className="cta-card">
            <PawIcon />
            <span>Seu sonho</span>
            <strong>começa aqui.</strong>
            <small>Orçamento sem compromisso</small>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#inicio">
              <PawIcon />
              <span>Sakuritcha</span>
              <small>decorações</small>
            </a>
            <p>
              Festas e eventos pensados com carinho, criados com propósito e
              vividos para sempre.
            </p>
          </div>
          <div>
            <h4>Navegue</h4>
            <a href="#sobre">Sobre nós</a>
            <a href="#servicos">Serviços</a>
            <a href={path("exemplos")}>Exemplos</a>
            <a href={path("precos")}>Preços</a>
            <a href="#trabalhos">Trabalhos</a>
            <a href="#processo">Como funciona</a>
            <a href={path("privacidade")}>Política de Privacidade</a>
          </div>
          <div>
            <h4>Atendimento</h4>
            <a href="mailto:sakuritchadecoracoes@icloud.com">
              sakuritchadecoracoes@icloud.com
            </a>
            <a href="tel:+5511960739865">(11) 96073-9865</a>
            <a
              href="https://instagram.com/sakuritchadecoracoes"
              target="_blank"
              rel="noreferrer"
            >
              @sakuritchadecoracoes
            </a>
            <span>{BUSINESS_HOURS}</span>
          </div>
          <div>
            <h4>Onde estamos</h4>
            <span>São Paulo — SP</span>
            <span>Atendemos toda a região</span>
            <span>Responsável: Milena</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Sakuritcha Decorações. Todos os direitos reservados.
          </span>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href="https://wa.me/5511960739865"
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar com Milena no WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      {selectedPhoto && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="lightbox-close"
            type="button"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Fechar imagem"
          >
            ×
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
            <figcaption>
              <span>{selectedPhoto.category}</span>
              <strong>{selectedPhoto.title}</strong>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}
