import { useState } from "react"
import { path, whatsappOrderLink, type Photo } from "../shared"

const examples: Photo[] = [
  { src: "/modelos/sacolinha.webp", title: "Sacolinha personalizada", category: "Lembrancinhas", alt: "Exemplo de Sacolinha personalizada" },
  { src: "/modelos/boletim-pet.webp", title: "Boletim personalizado", category: "Lembrancinhas", alt: "Exemplo de Boletim personalizado" },
  { src: "/modelos/calendario-ima.webp", title: "Calendário de ímã", category: "Lembrancinhas", alt: "Exemplo de Calendário de ímã" },
  { src: "/modelos/marca-pagina-tradicional.webp", title: "Marca-página tradicional", category: "Lembrancinhas", alt: "Exemplo de Marca-página tradicional" },
  { src: "/modelos/marca-pagina-personalizado.webp", title: "Marca-página personalizado", category: "Lembrancinhas", alt: "Exemplo de Marca-página personalizado" },
  { src: "/modelos/fotos-polaroid.webp", title: "Fotos estilo Polaroid", category: "Fotos", alt: "Exemplo de Fotos estilo Polaroid" },
  { src: "/modelos/fotos-tradicionais.webp", title: "Fotos tradicionais", category: "Fotos", alt: "Exemplo de Fotos tradicionais" },
  { src: "/modelos/caneca-personalizada.webp", title: "Caneca personalizada", category: "Canecas", alt: "Exemplo de Caneca personalizada" },
  { src: "/modelos/natal-classico.webp", title: "Cenário de Natal — Kit Clássico", category: "Natal", alt: "Exemplo de Cenário de Natal — Kit Clássico" },
  { src: "/modelos/natal-premium.webp", title: "Cenário de Natal — Kit Premium", category: "Natal", alt: "Exemplo de Cenário de Natal — Kit Premium" }
]

const filters = ["Todos", "Lembrancinhas", "Fotos", "Canecas", "Natal"]

export default function ExemplosPage({ onOpen }: { onOpen: (photo: Photo) => void }) {
  const [filter, setFilter] = useState("Todos")
  const list = filter === "Todos" ? examples : examples.filter((e) => e.category === filter)

  return (
    <section className="catalog section" id="exemplos">
      <h1 className="sr-only">Exemplos de produtos</h1>
      <div className="catalog-heading">
        <div>
          <div className="eyebrow">
            <span></span> Exemplos de produtos
          </div>
          <h2>
            Inspire-se nos
            <br />
            <em>nossos modelos.</em>
          </h2>
        </div>
        <p>
          Veja como ficam os produtos personalizados da Sakuritcha. Toque em uma
          imagem para ampliar e peça o seu pelo WhatsApp.
        </p>
      </div>

      <div className="catalog-tabs" role="group" aria-label="Filtrar exemplos">
        {filters.map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {list.map((item) => (
          <article className="product-card" key={item.src}>
            <div className="product-image">
              <button
                type="button"
                className="zoom-button"
                onClick={() => onOpen(item)}
                aria-label={`Ampliar exemplo: ${item.title}`}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
              </button>
            </div>
            <div className="product-content">
              <small>{item.category}</small>
              <h3>{item.title}</h3>
              <a href={whatsappOrderLink(item.title)} target="_blank" rel="noreferrer">
                Quero um assim <span>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="catalog-note">
        Gostou? <a href={path("precos")}>Veja os preços e kits →</a>
      </p>
    </section>
  )
}
