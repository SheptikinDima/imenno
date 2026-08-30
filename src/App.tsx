const ASSET_VERSION = "20260830-1";

const asset = (name: string) =>
  `/assets/${name}?v=${ASSET_VERSION}`;


const bottles = [
  {
    name: "Ольга",
    image: "asset-08.webp"
  },
  {
    name: "Алёна",
    image: "asset-09.webp"
  },
  {
    name: "Александра",
    image: "asset-10.webp"
  },
  {
    name: "Алиса",
    image: "asset-11.webp"
  },
  {
    name: "Анна",
    image: "asset-12.webp"
  },
  {
    name: "Алина",
    image: "asset-13.webp"
  },
  {
    name: "Дарья",
    image: "asset-14.webp"
  },
  {
    name: "Анастасия",
    image: "asset-15.webp"
  }
];


const ingredients = [
  {
    image: "ingredient-cream.webp",
    title: "Ресвератрол",
    text:
      "Антиоксидантный компонент, который помогает поддерживать защиту кожи от воздействия внешней среды."
  },
  {
    image: "ingredient-gel.webp",
    title: "Масло сладкого миндаля и аллантоин",
    text:
      "Помогают смягчать кожу и сохранять чувство комфорта после нанесения."
  },
  {
    image: "ingredient-hands.webp",
    title: "Ниацинамид и витамин Е",
    text:
      "Компоненты для ухода за кожей, ощущения мягкости и визуальной ухоженности."
  },
  {
    image: "ingredient-vanilla.webp",
    title: "Нишевая парфюмерная композиция",
    text:
      "Специально разработана для этой коллекции и делает ежедневный уход ещё более приятным."
  }
];


const kit = [
  {
    number: "01",
    title: "Основа подарка",
    text:
      "Нишевый аромат и премиальная формула для ежедневного комфорта.",
    image: "product-anastasia.webp"
  },
  {
    number: "02",
    title: "Первое впечатление",
    text:
      "Красивое оформление, созданное для подарка.",
    image: "box-front.webp"
  },
  {
    number: "03",
    title: "Личное послание",
    text:
      "Имя и тёплые слова, которые остаются на память.",
    image: "insert-float-b.webp"
  },
  {
    number: "04",
    title: "Стикерпак внутри",
    text:
      "Завершающие штрихи, создающие настроение.",
    image: "stickerpack.webp"
  }
];


function HomePage() {
  return (
    <div className="site" id="top">

      <header className="header">
        <a className="logo" href="#top">
          ИМЕННО
        </a>

        <nav className="nav">
          <a href="#about">О бренде</a>
          <a href="#product">О продукте</a>
          <a href="#kit">Состав набора</a>
          <a href="#buy">Где купить</a>
        </nav>
      </header>


      <main>

        {/* HERO */}

        <section className="hero">

          <div
            className="hero-scene"
            aria-hidden="true"
          >
            <picture className="hero-picture">

              <source
                media="(max-width: 760px)"
                srcSet={asset(
                  "hero-bg-mobile.webp"
                )}
              />

              <img
                className="hero-bg"
                src={asset(
                  "hero-bg-final.webp"
                )}
                alt=""
                loading="eager"
              />

            </picture>


            <div className="hero-name-on-bg">
              <span className="hero-name">
                Анна
              </span>
            </div>

          </div>


          <div className="hero-content">

            <h1>
              <span>Это именно</span>

              <span className="hero-accent">
                про тебя
              </span>
            </h1>


            <p>
              Премиальный крем для рук
              с нишевым ароматом и именем,
              которое имеет значение.
            </p>


            <a
              className="hero-button"
              href="#buy"
            >
              Где купить
            </a>

          </div>

        </section>


        {/* ABOUT */}

        <section
          className="about"
          id="about"
        >

          <div className="about-inner">

            <div className="about-copy">

              <div className="section-label">
                Почему ИМЕННО
              </div>

              <h2>
                Имя меняет всё
              </h2>

              <p>
                ИМЕННО — бренд подарков,
                созданных с вниманием.
              </p>

              <p>
                Мы верим, что самые тёплые
                подарки начинаются с деталей.
              </p>

            </div>


            <div className="about-image">

              <img
                src={asset(
                  "insert-float-a.webp"
                )}
                alt="Персональный вкладыш ИМЕННО"
                loading="lazy"
              />

            </div>

          </div>

        </section>


        {/* PERSONALIZATION */}

        <section
          className="personal section"
          id="personalization"
        >

          <div>

            <div className="section-label">
              Именно для неё
            </div>

            <h2>
              С чего начинается подарок?
            </h2>

            <p className="lead">
              Мы верим, что всё начинается
              с имени.
            </p>

            <p className="lead">
              Потому что самые тёплые подарки
              выбирают с мыслью о том, кому
              они предназначены.
            </p>

          </div>


          <div
            className="bottles-marquee is-ready"
            aria-label="Примеры именных флаконов"
          >

            <div className="bottles-track">

              <div className="bottles-group">

                {bottles.map(
                  (bottle) => (

                    <figure
                      key={bottle.name}
                    >

                      <img
                        src={asset(
                          bottle.image
                        )}
                        alt={`Флакон ${bottle.name}`}
                        loading="lazy"
                        draggable={false}
                      />

                    </figure>

                  )
                )}

              </div>

            </div>

          </div>

        </section>


        {/* PRODUCT */}

        <section
          className="product section"
          id="product"
        >

          <div>

            <div className="section-label">
              Нишевый уход
            </div>

            <h2>
              Премиальный крем для рук
              <br />
              с нишевым ароматом
            </h2>

            <p className="lead">
              Ежедневный уход, который
              делает привычные моменты
              особенными.
            </p>

          </div>


          <div className="ingredients">

            {ingredients.map(
              (item) => (

                <article
                  className="ingredient"
                  key={item.title}
                >

                  <img
                    src={asset(
                      item.image
                    )}
                    alt=""
                    loading="lazy"
                  />

                  <div>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>

                  </div>

                </article>

              )
            )}

          </div>

        </section>


        {/* KIT */}

        <section
          className="kit section"
          id="kit"
        >

          <div>

            <div className="section-label">
              Что внутри
            </div>

            <h2>
              Всё уже готово для подарка
            </h2>

            <p className="lead">
              Внутри — всё, что делает
              подарок особенным.
            </p>

            <p className="lead">
              От премиального ухода до
              личного послания и маленьких
              деталей, которые хочется
              сохранить.
            </p>

          </div>


          <div className="kit-grid">

            {kit.map(
              (item) => (

                <article
                  className="kit-card"
                  key={item.title}
                >

                  <span>
                    {item.number}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                  <img
                    src={asset(
                      item.image
                    )}
                    alt=""
                    loading="lazy"
                  />

                </article>

              )
            )}

          </div>


          <div
            className="kit-dots"
            aria-hidden="true"
          >
            <span className="active" />
            <span />
            <span />
            <span />
          </div>


          <div className="note">

            <span>♥</span>

            Каждая деталь собрана с
            вниманием, чтобы подарок стал
            особенным и личным.

          </div>

        </section>


        {/* BUY */}

        <section
          className="buy"
          id="buy"
        >

          <div className="buy-copy">

            <div className="section-label">
              Найдите своё имя
            </div>

            <h2>

              <span>
                Выберите имя
              </span>

              <span>
                и оформите заказ
              </span>

              <span>
                на удобной площадке
              </span>

            </h2>

          </div>


          <div className="marketplaces">

            <article className="market-card">

              <img
                src={asset(
                  "new-pdf/new-pdf-05.webp"
                )}
                alt="Ozon"
                loading="lazy"
              />

              <a
                href="https://www.ozon.ru/seller/imenno-store/"
                target="_blank"
                rel="noreferrer"
              >

                <span>
                  Перейти в магазин
                </span>

                <span className="market-arrow">
                  →
                </span>

              </a>

            </article>


            <article className="market-card">

              <img
                src={asset(
                  "new-pdf/new-pdf-04.webp"
                )}
                alt="Wildberries"
                loading="lazy"
              />

              <a
                href="https://www.wildberries.ru/seller/250120152"
                target="_blank"
                rel="noreferrer"
              >

                <span>
                  Перейти в магазин
                </span>

                <span className="market-arrow">
                  →
                </span>

              </a>

            </article>

          </div>

        </section>

      </main>


      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-grid">

          <div className="footer-brand">

            <a
              className="logo"
              href="#top"
            >
              ИМЕННО
            </a>

            <p>
              Подарок, который запоминается.
            </p>


            <div className="footer-legal">

              <p>
                ИП Ширинян Давид Торгомович
              </p>

              <p>
                ИНН 772793703895
              </p>

              <p>
                ОГРНИП 324774600800835
              </p>

            </div>

          </div>


          <div className="footer-col">

            <h4>
              Контакты
            </h4>

            <a href="mailto:info@imenno.store">
              info@imenno.store
            </a>

          </div>


          <div className="footer-col">

            <h4>
              Бренд
            </h4>

            <a href="#about">
              О бренде
            </a>

            <a href="#personalization">
              Персонализация
            </a>

            <a href="#product">
              О продукте
            </a>

          </div>


          <div className="footer-col">

            <h4>
              Документы
            </h4>

            <a href="#kit">
              Что входит в набор
            </a>

            <a href="#buy">
              Маркетплейсы
            </a>

          </div>

        </div>


        <div className="copyright">
          © 2026 ИМЕННО. Все права
          защищены.
        </div>

      </footer>

    </div>
  );
}


export default function App() {
  return <HomePage />;
}