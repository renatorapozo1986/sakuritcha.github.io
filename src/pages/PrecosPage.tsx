import { useState, type KeyboardEvent as ReactKeyboardEvent } from "react"
import { path, whatsappOrderLink } from "../shared"

type TabId = "personalizados" | "kits" | "natal"

const tabs: { id: TabId; label: string }[] = [
  { id: "personalizados", label: "Produtos personalizados" },
  { id: "kits", label: "Kits promocionais" },
  { id: "natal", label: "Natal Encantado 2026" },
]

const personalizedProducts = [
  {
    name: "Sacolinha personalizada",
    detail: "15 × 12 × 5 cm",
    image: "/modelos/sacolinha.webp",
    prices: [
      "1 unidade — R$ 9,00",
      "10 a 29 — R$ 8,50 / un.",
      "Acima de 30 — R$ 8,00 / un.",
    ],
  },
  {
    name: "Boletim personalizado",
    detail: "Boletim Pet",
    image: "/modelos/boletim-pet.webp",
    prices: [
      "1 unidade — R$ 9,90",
      "10 a 29 — R$ 8,50 / un.",
      "Acima de 30 — R$ 7,50 / un.",
    ],
  },
  {
    name: "Calendário de ímã",
    detail: "Personalizado • 2027",
    image: "/modelos/calendario-ima.webp",
    prices: [
      "1 unidade — R$ 6,00",
      "10 a 29 — R$ 5,50 / un.",
      "Acima de 30 — R$ 5,00 / un.",
    ],
  },
  {
    name: "Marca-página tradicional",
    detail: "Tirinha de fotos • 5 × 15 cm",
    image: "/modelos/marca-pagina-tradicional.webp",
    prices: [
      "1 unidade — R$ 4,90",
      "Kit com 3 — R$ 12,00",
      "Kit com 30 — R$ 100,00",
    ],
  },
  {
    name: "Marca-página personalizado",
    detail: "6 × 18 cm",
    image: "/modelos/marca-pagina-personalizado.webp",
    prices: [
      "1 unidade — R$ 5,90",
      "Kit com 3 — R$ 14,00",
      "Kit com 30 — R$ 110,00",
    ],
  },
  {
    name: "Fotos estilo Polaroid",
    detail: "8 × 10 cm",
    image: "/modelos/fotos-polaroid.webp",
    prices: [
      "1 unidade — R$ 2,00",
      "Kit com 6 — R$ 10,90",
      "Kit com 30 — R$ 46,00",
    ],
  },
  {
    name: "Fotos tradicionais",
    detail: "10 × 15 cm",
    image: "/modelos/fotos-tradicionais.webp",
    prices: [
      "1 unidade — R$ 2,50",
      "Kit com 4 — R$ 8,90",
      "Kit com 40 — R$ 80,00",
    ],
  },
  {
    name: "Caneca personalizada",
    detail: "Estampa personalizada",
    image: "/modelos/caneca-personalizada.webp",
    prices: [
      "1 unidade — R$ 35,00",
      "10 a 29 — R$ 33,00 / un.",
      "Acima de 30 — R$ 30,00 / un.",
    ],
  },
]

const promotionalKits = [
  {
    number: "Kit 1",
    name: "Clássico",
    oldPrice: "R$ 35,80",
    price: "R$ 32,90",
    items: [
      "Sacolinha personalizada",
      "Boletim personalizado",
      "Marca-página personalizado",
      "3 fotos estilo Polaroid",
      "2 bombons",
    ],
    images: [
      "/modelos/sacolinha.webp",
      "/modelos/boletim-pet.webp",
      "/modelos/fotos-polaroid.webp",
    ],
  },
  {
    number: "Kit 2",
    name: "Gourmet",
    oldPrice: "R$ 39,80",
    price: "R$ 34,90",
    items: [
      "Sacolinha personalizada",
      "Boletim personalizado",
      "Calendário de ímã",
      "Marca-página tradicional",
      "2 fotos tradicionais",
      "2 bombons",
    ],
    images: [
      "/modelos/sacolinha.webp",
      "/modelos/calendario-ima.webp",
      "/modelos/fotos-tradicionais.webp",
    ],
  },
  {
    number: "Kit 3",
    name: "Premium",
    oldPrice: "R$ 75,80",
    price: "R$ 69,90",
    items: [
      "Sacolinha personalizada",
      "Boletim personalizado",
      "Calendário de ímã",
      "Marca-página tradicional",
      "3 fotos estilo Polaroid",
      "Caneca personalizada",
      "2 bombons",
    ],
    images: [
      "/modelos/sacolinha.webp",
      "/modelos/fotos-polaroid.webp",
      "/modelos/caneca-personalizada.webp",
    ],
  },
]

export default function PrecosPage() {
  const [catalogTab, setCatalogTab] = useState<TabId>("personalizados")

  const onTabsKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const current = tabs.findIndex((t) => t.id === catalogTab)
    let next = current
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length
    else if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length
    else return
    event.preventDefault()
    setCatalogTab(tabs[next].id)
    document.getElementById(`tab-${tabs[next].id}`)?.focus()
  }

  return (
        <section className="catalog section" id="modelos">
          <h1 className="sr-only">Modelos, kits e preços</h1>
          <div className="catalog-heading">
            <div>
              <div className="eyebrow">
                <span></span> Catálogo Sakuritcha
              </div>
              <h2>
                Escolha seu modelo,
                <br />
                <em>veja os valores.</em>
              </h2>
            </div>
            <p>
              Opções criadas para presentear, celebrar e montar momentos
              encantadores. Selecione uma categoria para conhecer os modelos e
              preços.
            </p>
          </div>

          <div
          className="catalog-tabs"
          role="tablist"
          aria-label="Categorias do catálogo"
          onKeyDown={onTabsKeyDown}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={catalogTab === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={catalogTab === t.id ? 0 : -1}
              onClick={() => setCatalogTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

          {catalogTab === "personalizados" && (
            <div className="product-grid" role="tabpanel" id="panel-personalizados" aria-labelledby="tab-personalizados">
              {personalizedProducts.map((product) => (
                <article className="product-card" key={product.name}>
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={`Modelo de ${product.name}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="product-content">
                    <small>{product.detail}</small>
                    <h3>{product.name}</h3>
                    <ul>
                      {product.prices.map((price) => (
                        <li key={price}>{price}</li>
                      ))}
                    </ul>
                    <a
                      href={whatsappOrderLink(product.name)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Quero este modelo <span>→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {catalogTab === "kits" && (
            <div className="kit-grid" role="tabpanel" id="panel-kits" aria-labelledby="tab-kits">
              {promotionalKits.map((kit) => (
                <article className="kit-card" key={kit.name}>
                  <div className="kit-collage">
                    {kit.images.map((image, index) => (
                      <img
                        src={image}
                        alt=""
                        loading="lazy"
                        key={image}
                        className={`kit-image-${index + 1}`}
                      />
                    ))}
                    <span>{kit.number}</span>
                  </div>
                  <div className="kit-content">
                    <small>Kit especial</small>
                    <h3>{kit.name}</h3>
                    <div className="kit-price">
                      <span>
                        de <s>{kit.oldPrice}</s>
                      </span>
                      <strong>{kit.price}</strong>
                    </div>
                    <ul>
                      {kit.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <a
                      className="button"
                      href={whatsappOrderLink(`${kit.number} • ${kit.name}`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Pedir pelo WhatsApp
                    </a>
                  </div>
                </article>
              ))}
              <p className="catalog-note">
                Acima de 30 kits, consulte condições especiais diretamente com a
                Milena.
              </p>
            </div>
          )}

          {catalogTab === "natal" && (
            <div className="christmas-catalog" role="tabpanel" id="panel-natal" aria-labelledby="tab-natal">
              <div className="christmas-kits">
                <article className="christmas-card">
                  <img
                    src="/modelos/natal-classico.webp"
                    alt="Cenário de Natal do Kit Clássico"
                    loading="lazy"
                  />
                  <div>
                    <small>Pegue e monte</small>
                    <h3>Kit Clássico</h3>
                    <strong>R$ 349,90</strong>
                    <ul>
                      <li>2 arcos romanos decorados</li>
                      <li>1 mesa de apoio com laço</li>
                      <li>1 boneco de chão</li>
                      <li>Árvore de mesa decorada e com luz</li>
                      <li>1 boneco de mesa e 2 miniaturas</li>
                    </ul>
                    <a
                      href={whatsappOrderLink("Kit Clássico de Natal 2026")}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Reservar este cenário <span>→</span>
                    </a>
                  </div>
                </article>
                <article className="christmas-card">
                  <img
                    src="/modelos/natal-premium.webp"
                    alt="Cenário de Natal do Kit Premium"
                    loading="lazy"
                  />
                  <div>
                    <small>Pegue e monte</small>
                    <h3>Kit Premium</h3>
                    <strong>R$ 449,90</strong>
                    <ul>
                      <li>2 arcos romanos decorados</li>
                      <li>2 mesas de apoio</li>
                      <li>2 bonecos de chão</li>
                      <li>Árvore de mesa decorada e com luz</li>
                      <li>3 bonecos de mesa e 3 miniaturas</li>
                    </ul>
                    <a
                      href={whatsappOrderLink("Kit Premium de Natal 2026")}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Reservar este cenário <span>→</span>
                    </a>
                  </div>
                </article>
              </div>
              <div className="christmas-extras">
                <article>
                  <span>Entrega, montagem e retirada</span>
                  <h3>Seu cenário pronto</h3>
                  <p>
                    Entrega e montagem no primeiro dia, permanência durante os
                    dias 2 e 3 e retirada no quarto dia.
                  </p>
                  <div>
                    <strong>Clássico — R$ 350,00</strong>
                    <strong>Premium — R$ 400,00</strong>
                  </div>
                </article>
                <article>
                  <span>Assessoria e fotos • 16 horas</span>
                  <h3>Registre cada encanto</h3>
                  <div className="photo-prices">
                    <p>
                      <b>Digital Essencial</b>
                      <strong>R$ 1.190,00</strong>
                      <small>Celular, sem edição • até 12 pets/dia</small>
                    </p>
                    <p>
                      <b>Digital Tratado</b>
                      <strong>R$ 1.590,00</strong>
                      <small>Celular, edição básica • até 10 pets/dia</small>
                    </p>
                    <p>
                      <b>Fotografia Profissional</b>
                      <strong>R$ 2.390,00</strong>
                      <small>Câmera e edição completa • até 10 pets/dia</small>
                    </p>
                  </div>
                </article>
              </div>
              <p className="catalog-note">
                Valores promocionais do catálogo Natal Encantado 2026. Consulte
                disponibilidade e condições.
              </p>
            </div>
          )}
          <p className="catalog-note">
            Quer ver como cada produto fica? <a href={path("exemplos")}>Veja os exemplos →</a>
          </p>
        </section>
  )
}
