import {
  useEffect,
  useRef,
  useState,
  type UIEvent
} from "react";

import {
  AnimatePresence,
  motion,
  type Variants
} from "framer-motion";


const ASSET_VERSION = "20260824-1";

const asset = (name: string) =>
  `/assets/${name}?v=${ASSET_VERSION}`;


const heroNames = [
  "Анна",
  "Мария",
  "Елена",
  "Наталья",
  "Ольга",
  "Юлия",
  "Дарья",
  "София",
  "Ирина"
];


const bottles = [
  "Ольга",
  "Алёна",
  "Александра",
  "Алиса",
  "Анна",
  "Алина",
  "Дарья",
  "Анастасия"
];


const bottleImages = bottles.map((_, index) =>
  asset(
    `asset-${String(index + 8).padStart(2, "0")}.webp`
  )
);


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


const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 34
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};


const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: 42
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.9,
      ease: "easeOut"
    }
  }
};


function HomePage() {
  const [heroNameIndex, setHeroNameIndex] =
    useState(0);

  const [kitActiveIndex, setKitActiveIndex] =
    useState(0);

  const [bottlesInView, setBottlesInView] =
    useState(false);

  const [bottlesReady, setBottlesReady] =
    useState(false);

  const [pageVisible, setPageVisible] =
    useState(true);

  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window
        .matchMedia("(max-width: 1100px)")
        .matches
  );


  const bottlesRef =
    useRef<HTMLDivElement | null>(null);

  const loadedBottleIndexes =
    useRef<Set<number>>(new Set());


  const markBottleLoaded = (index: number) => {
    const loaded =
      loadedBottleIndexes.current;

    if (loaded.has(index)) {
      return;
    }

    loaded.add(index);

    if (
      loaded.size >= bottleImages.length
    ) {
      setBottlesReady(true);
    }
  };


  const handleKitScroll = (
    event: UIEvent<HTMLDivElement>
  ) => {
    const slider = event.currentTarget;

    const card =
      slider.querySelector<HTMLElement>(
        ".kit-card"
      );

    if (!card) {
      return;
    }

    const gap = parseFloat(
      getComputedStyle(slider).gap || "0"
    );

    const step =
      card.offsetWidth + gap;

    const index = Math.round(
      slider.scrollLeft / step
    );

    setKitActiveIndex(
      Math.max(
        0,
        Math.min(
          index,
          kit.length - 1
        )
      )
    );
  };


  /*
   * MOBILE / DESKTOP DETECTION
   */
  useEffect(() => {
    const media =
      window.matchMedia(
        "(max-width: 1100px)"
      );

    const update = () => {
      setIsMobile(media.matches);
    };

    update();

    if (media.addEventListener) {
      media.addEventListener(
        "change",
        update
      );

      return () => {
        media.removeEventListener(
          "change",
          update
        );
      };
    }

    media.addListener(update);

    return () => {
      media.removeListener(update);
    };
  }, []);


  /*
   * BOTTLES VISIBILITY
   */
  useEffect(() => {
    const node = bottlesRef.current;

    if (!node) {
      return;
    }

    if (
      !(
        "IntersectionObserver" in
        window
      )
    ) {
      setBottlesInView(true);
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setBottlesInView(
            entry.isIntersecting
          );
        },
        {
          rootMargin: "0px",
          threshold: 0.01
        }
      );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);


  /*
   * PAGE VISIBILITY
   */
  useEffect(() => {
    const updatePageVisibility =
      () => {
        setPageVisible(
          document.visibilityState ===
            "visible"
        );
      };

    updatePageVisibility();

    document.addEventListener(
      "visibilitychange",
      updatePageVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        updatePageVisibility
      );
    };
  }, []);


  /*
   * HERO NAME ROTATION
   * Только desktop.
   */
  useEffect(() => {
    if (
      isMobile ||
      !pageVisible
    ) {
      return;
    }

    const interval =
      window.setInterval(() => {
        setHeroNameIndex(
          (prev) =>
            (prev + 1) %
            heroNames.length
        );
      }, 2300);

    return () => {
      window.clearInterval(interval);
    };
  }, [isMobile, pageVisible]);


  return (
    <div
      className="site"
      id="top"
    >
      <header className="header">
        <a
          className="logo"
          href="#top"
        >
          ИМЕННО
        </a>

        <nav className="nav">
          <a href="#about">
            О бренде
          </a>

          <a href="#product">
            О продукте
          </a>

          <a href="#kit">
            Состав набора
          </a>

          <a href="#buy">
            Где купить
          </a>
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
                fetchPriority="high"
                decoding="async"
              />

            </picture>


            <div className="hero-name-on-bg">

              {isMobile ? (

                <span className="hero-name">
                  {
                    heroNames[
                      heroNameIndex
                    ]
                  }
                </span>

              ) : (

                <AnimatePresence mode="wait">

                  <motion.span
                    key={
                      heroNames[
                        heroNameIndex
                      ]
                    }
                    className="hero-name"
                    initial={{
                      opacity: 0,
                      y: 8
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: -8
                    }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut"
                    }}
                  >
                    {
                      heroNames[
                        heroNameIndex
                      ]
                    }
                  </motion.span>

                </AnimatePresence>

              )}

            </div>

          </div>


          <motion.div
            className="hero-content"
            initial={
              isMobile
                ? false
                : {
                    opacity: 0,
                    y: 28
                  }
            }
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.85,
              ease: "easeOut"
            }}
          >

            <motion.h1
              initial={
                isMobile
                  ? false
                  : {
                      opacity: 0,
                      y: 22
                    }
              }
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              <span>
                Это именно
              </span>

              <span className="hero-accent">
                про тебя
              </span>
            </motion.h1>


            <motion.p
              initial={
                isMobile
                  ? false
                  : {
                      opacity: 0,
                      y: 18
                    }
              }
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.75,
                delay: isMobile
                  ? 0
                  : 0.18,
                ease: "easeOut"
              }}
            >
              Премиальный крем для рук
              с нишевым ароматом и
              именем, которое имеет
              значение.
            </motion.p>


            <motion.a
              className="hero-button"
              href="#buy"
              initial={
                isMobile
                  ? false
                  : {
                      opacity: 0,
                      y: 16
                    }
              }
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.65,
                delay: isMobile
                  ? 0
                  : 0.42,
                ease: "easeOut"
              }}
            >
              Где купить
            </motion.a>

          </motion.div>

        </section>


        {/* ABOUT */}

        <section
          className="about"
          id="about"
        >

          <div className="about-inner">

            <motion.div
              className="about-copy"
              variants={fadeUp}
              initial={
                isMobile
                  ? false
                  : "hidden"
              }
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.35
              }}
            >

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
                Мы верим, что самые
                тёплые подарки начинаются
                с деталей.
              </p>

            </motion.div>


            <motion.div
              className="about-image"
              variants={fadeRight}
              initial={
                isMobile
                  ? false
                  : "hidden"
              }
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.35
              }}
            >

              <img
                src={asset(
                  "insert-float-a.webp"
                )}
                alt="Персональный вкладыш ИМЕННО"
                loading="lazy"
                decoding="async"
              />

            </motion.div>

          </div>

        </section>


        {/* PERSONALIZATION */}

        <section
          className="personal section"
          id="personalization"
        >

          <motion.div
            variants={fadeUp}
            initial={
              isMobile
                ? false
                : "hidden"
            }
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.35
            }}
          >

            <div className="section-label">
              Именно для неё
            </div>

            <h2>
              С чего начинается подарок?
            </h2>

            <p className="lead">
              Мы верим, что всё
              начинается с имени.
            </p>

            <p className="lead">
              Потому что самые тёплые
              подарки выбирают с мыслью
              о том, кому они
              предназначены.
            </p>

          </motion.div>


          <div
            ref={bottlesRef}
            className={
              `bottles-marquee ${
                bottlesInView &&
                pageVisible
                  ? "is-in-view"
                  : ""
              } ${
                bottlesReady
                  ? "is-ready"
                  : ""
              }`
            }
            aria-label="Примеры именных флаконов"
          >

            <div className="bottles-track">

              {(isMobile
                ? [0]
                : [0, 1]
              ).map((group) => (

                <div
                  className="bottles-group"
                  key={group}
                  aria-hidden={
                    group > 0
                  }
                >

                  {bottles.map(
                    (name, index) => (

                      <figure
                        key={`${group}-${name}`}
                      >

                        <img
                          src={
                            bottleImages[
                              index
                            ]
                          }
                          alt={
                            group === 0
                              ? `Флакон ${name}`
                              : ""
                          }
                          loading="lazy"
                          fetchPriority="low"
                          decoding="async"
                          onLoad={() =>
                            markBottleLoaded(
                              index
                            )
                          }
                          onError={() =>
                            markBottleLoaded(
                              index
                            )
                          }
                          draggable={false}
                        />

                      </figure>

                    )
                  )}

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* PRODUCT */}

        <section
          className="product section"
          id="product"
        >

          <motion.div
            variants={fadeUp}
            initial={
              isMobile
                ? false
                : "hidden"
            }
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.35
            }}
          >

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

          </motion.div>


          <div className="ingredients">

            {ingredients.map(
              (item, index) => (

                <motion.article
                  className="ingredient"
                  key={item.title}
                  variants={fadeUp}
                  initial={
                    isMobile
                      ? false
                      : "hidden"
                  }
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.25
                  }}
                  transition={{
                    delay: isMobile
                      ? 0
                      : index * 0.08
                  }}
                >

                  <img
                    src={asset(
                      item.image
                    )}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />

                  <div>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>

                  </div>

                </motion.article>

              )
            )}

          </div>

        </section>


        {/* KIT */}

        <section
          className="kit section"
          id="kit"
        >

          <motion.div
            variants={fadeUp}
            initial={
              isMobile
                ? false
                : "hidden"
            }
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.35
            }}
          >

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
              личного послания и
              маленьких деталей, которые
              хочется сохранить.
            </p>

          </motion.div>


          <div
            className="kit-grid"
            onScroll={
              handleKitScroll
            }
          >

            {kit.map(
              (item, index) => (

                <motion.article
                  className="kit-card"
                  key={item.title}
                  variants={fadeUp}
                  initial={
                    isMobile
                      ? false
                      : "hidden"
                  }
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.25
                  }}
                  transition={{
                    delay: isMobile
                      ? 0
                      : index * 0.08
                  }}
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
                    decoding="async"
                  />

                </motion.article>

              )
            )}

          </div>


          <div
            className="kit-dots"
            aria-hidden="true"
          >

            {kit.map(
              (_, index) => (

                <span
                  key={index}
                  className={
                    index ===
                    kitActiveIndex
                      ? "active"
                      : ""
                  }
                />

              )
            )}

          </div>


          <motion.div
            className="note"
            variants={fadeUp}
            initial={
              isMobile
                ? false
                : "hidden"
            }
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.35
            }}
          >

            <span>♥</span>

            Каждая деталь собрана с
            вниманием, чтобы подарок стал
            особенным и личным.

          </motion.div>

        </section>


        {/* BUY */}

        <section
          className="buy"
          id="buy"
        >

          <motion.div
            className="buy-copy"
            variants={fadeUp}
            initial={
              isMobile
                ? false
                : "hidden"
            }
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.35
            }}
          >

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

          </motion.div>


          <div className="marketplaces">

            <motion.article
              className="market-card"
              variants={fadeUp}
              initial={
                isMobile
                  ? false
                  : "hidden"
              }
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.35
              }}
            >

              <img
                src={asset(
                  "new-pdf/new-pdf-05.webp"
                )}
                alt="Ozon"
                loading="lazy"
                decoding="async"
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

            </motion.article>


            <motion.article
              className="market-card"
              variants={fadeUp}
              initial={
                isMobile
                  ? false
                  : "hidden"
              }
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.35
              }}
            >

              <img
                src={asset(
                  "new-pdf/new-pdf-04.webp"
                )}
                alt="Wildberries"
                loading="lazy"
                decoding="async"
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

            </motion.article>

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
              Подарок, который
              запоминается.
            </p>

            <div className="footer-legal">

              <p>
                ИП Ширинян Давид
                Торгомович
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