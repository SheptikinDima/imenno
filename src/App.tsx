import { useEffect, useState, type UIEvent } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { LeadForm } from "./components/LeadForm";

const asset = (name: string) => `/assets/${name}`;

const heroNames = [
  "Алина",
  "Катя",
  "София",
  "Мария",
  "Алиса",
  "Полина",
  "Вика",
  "Дарья"
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

const ingredients = [
  {
    image: "ingredient-cream.png",
    title: "Ресвератрол",
    text: "Антиоксидантный компонент, который помогает поддерживать защиту кожи от воздействия внешней среды."
  },
  {
    image: "ingredient-gel.png",
    title: "Масло сладкого миндаля и аллантоин",
    text: "Помогают смягчать кожу и сохранять чувство комфорта после нанесения."
  },
  {
    image: "ingredient-hands.png",
    title: "Ниацинамид и витамин Е",
    text: "Компоненты для ухода за кожей, ощущения мягкости и визуальной ухоженности."
  },
  {
    image: "ingredient-vanilla.png",
    title: "Нишевая парфюмерная композиция",
    text: "Специально разработана для этой коллекции и делает ежедневный уход ещё более приятным."
  }
];

const kit = [
  {
    number: "01",
    title: "Основа подарка",
    text: "Нишевый аромат и премиальная формула для ежедневного комфорта.",
    image: "product-anastasia.jpg"
  },
  {
    number: "02",
    title: "Первое впечатление",
    text: "Красивое оформление, созданное для подарка.",
    image: "box-front.jpg"
  },
  {
    number: "03",
    title: "Личное послание",
    text: "Имя и тёплые слова, которые остаются на память.",
    image: "insert-float-b.png"
  },
  {
    number: "04",
    title: "Стикерпак внутри",
    text: "Завершающие штрихи, создающие настроение.",
    image: "stickerpack.png"
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

function PrivacyPage() {
  return (
    <div className="site">
      <header className="header">
        <a className="logo" href="/">
          ИМЕННО
        </a>

        <nav className="nav">
          <a href="/#about">О бренде</a>
          <a href="/#product">О продукте</a>
          <a href="/#kit">Состав набора</a>
          <a href="/#buy">Где купить</a>
        </nav>
      </header>

      <main className="privacy-page">
        <section className="privacy-page-inner">
          <div className="section-label">Документы</div>

          <h1>Политика конфиденциальности</h1>

          <p>
            Оператор персональных данных: Индивидуальный предприниматель Ширинян
            Давид Торгомович, ИНН 772793703895, ОГРНИП 324774600800835.
          </p>

          <p>
            Нажимая кнопку отправки заявки на сайте, пользователь подтверждает,
            что ознакомлен с настоящей политикой конфиденциальности и даёт
            согласие на обработку своих персональных данных.
          </p>

          <p>
            К персональным данным могут относиться: имя, номер телефона, адрес
            электронной почты, а также иная информация, которую пользователь
            самостоятельно указывает в форме заявки.
          </p>

          <p>
            Персональные данные используются для обработки заявки, связи с
            пользователем, уточнения деталей заказа и предоставления информации
            о товарах бренда «ИМЕННО».
          </p>

          <p>
            Оператор принимает необходимые меры для защиты персональных данных и
            не передаёт их третьим лицам, за исключением случаев,
            предусмотренных законодательством Российской Федерации.
          </p>

          <p>
            Пользователь вправе отозвать согласие на обработку персональных
            данных, направив обращение на электронную почту: info@imenno.store.
          </p>

          <a className="privacy-back" href="/#contact">
            Вернуться к форме
          </a>
        </section>
      </main>
    </div>
  );
}

function HomePage() {
  const [heroNameIndex, setHeroNameIndex] = useState(0);
  const [kitActiveIndex, setKitActiveIndex] = useState(0);

  const handleKitScroll = (event: UIEvent<HTMLDivElement>) => {
    const slider = event.currentTarget;
    const card = slider.querySelector<HTMLElement>(".kit-card");

    if (!card) return;

    const gap = parseFloat(getComputedStyle(slider).gap || "0");
    const step = card.offsetWidth + gap;
    const index = Math.round(slider.scrollLeft / step);

    setKitActiveIndex(Math.max(0, Math.min(index, kit.length - 1)));
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroNameIndex((prev) => (prev + 1) % heroNames.length);
    }, 2300);

    return () => window.clearInterval(interval);
  }, []);

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
        <section className="hero">
          <div className="hero-scene" aria-hidden="true">
            <img className="hero-bg" src={asset("hero-bg-final.png")} alt="" />

            <div className="hero-name-on-bg">
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroNames[heroNameIndex]}
                  className="hero-name"
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  {heroNames[heroNameIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span>Это именно</span>
              <span className="hero-accent">про тебя</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: "easeOut" }}
            >
              Премиальный крем для рук с нишевым ароматом и именем, которое
              имеет значение.
            </motion.p>

            <motion.a
              className="hero-button"
              href="#buy"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.42, ease: "easeOut" }}
            >
              Где купить
            </motion.a>
          </motion.div>
        </section>

        <section className="about" id="about">
          <div className="about-inner">
            <motion.div
              className="about-copy"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <div className="section-label">Почему ИМЕННО</div>

              <h2>Имя меняет всё</h2>

              <p>ИМЕННО — бренд подарков, созданных с вниманием.</p>

              <p>Мы верим, что самые тёплые подарки начинаются с деталей.</p>
            </motion.div>

            <motion.div
              className="about-image"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <img
                src={asset("insert-float-a.png")}
                alt="Персональный вкладыш ИМЕННО"
              />
            </motion.div>
          </div>
        </section>

        <section className="personal section" id="personalization">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="section-label">Именно для неё</div>

            <h2>С чего начинается подарок?</h2>

            <p className="lead">Мы верим, что всё начинается с имени.</p>

            <p className="lead">
              Потому что самые тёплые подарки выбирают с мыслью о том, кому они
              предназначены.
            </p>
          </motion.div>

          <div className="bottles-marquee" aria-label="Примеры именных флаконов">
            <div className="bottles-track">
              {[0, 1].map((group) => (
                <div
                  className="bottles-group"
                  key={group}
                  aria-hidden={group > 0}
                >
                  {bottles.map((name, index) => (
                    <figure key={`${group}-${name}`}>
                      <img
                        src={asset(
                          `asset-${String(index + 8).padStart(2, "0")}.png`
                        )}
                        alt={group === 0 ? `Флакон ${name}` : ""}
                        loading="eager"
                        draggable="false"
                      />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="product section" id="product">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="section-label">Нишевый уход</div>

            <h2>
              Премиальный крем для рук
              <br />с нишевым ароматом
            </h2>

            <p className="lead">
              Ежедневный уход, который делает привычные моменты особенными.
            </p>
          </motion.div>

          <div className="ingredients">
            {ingredients.map((item, index) => (
              <motion.article
                className="ingredient"
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08 }}
              >
                <img src={asset(item.image)} alt="" />

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="kit section" id="kit">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="section-label">Что внутри</div>

            <h2>Всё уже готово для подарка</h2>

            <p className="lead">Внутри — всё, что делает подарок особенным.</p>

            <p className="lead">
              От премиального ухода до личного послания и маленьких деталей,
              которые хочется сохранить.
            </p>
          </motion.div>

          <div className="kit-grid" onScroll={handleKitScroll}>
            {kit.map((item, index) => (
              <motion.article
                className="kit-card"
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08 }}
              >
                <span>{item.number}</span>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

                <img src={asset(item.image)} alt="" />
              </motion.article>
            ))}
          </div>

          <div className="kit-dots" aria-hidden="true">
            {kit.map((_, index) => (
              <span
                key={index}
                className={index === kitActiveIndex ? "active" : ""}
              />
            ))}
          </div>

          <motion.div
            className="note"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <span>♥</span>
            Каждая деталь собрана с вниманием, чтобы подарок стал особенным и
            личным.
          </motion.div>
        </section>

        <section className="buy" id="buy">
          <motion.div
            className="buy-copy"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="section-label">Найдите своё имя</div>

            <h2>
              <span>Выберите имя</span>
              <span>и оформите заказ</span>
              <span>на удобной площадке</span>
            </h2>
          </motion.div>

          <div className="marketplaces">
            <motion.article
              className="market-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <img src={asset("new-pdf/new-pdf-05.webp")} alt="Ozon" />

              <a
                href="https://www.ozon.ru/seller/mipupu/?__rr=2&from=share"
                target="_blank"
                rel="noreferrer"
              >
                <span>Перейти в магазин</span>
                <span className="market-arrow">→</span>
              </a>
            </motion.article>

            <motion.article
              className="market-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <img src={asset("new-pdf/new-pdf-04.webp")} alt="Wildberries" />

              <a
                href="https://www.wildberries.ru/seller/250120152"
                target="_blank"
                rel="noreferrer"
              >
                <span>Перейти в магазин</span>
                <span className="market-arrow">→</span>
              </a>
            </motion.article>
          </div>
        </section>

        <section className="contact" id="contact">
          <img className="contact-bg" src={asset("contact-bottles.png")} alt="" />

          <div className="contact-inner">
            <motion.div
              className="contact-copy"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <h2>
                Есть вопрос?
                <br />
                Мы всегда на связи.
              </h2>
            </motion.div>

            <motion.div
              className="form-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <h3>Оставить заявку</h3>
              <LeadForm />
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="logo" href="#top">
              ИМЕННО
            </a>

            <p>Подарок, который запоминается.</p>

            <div className="footer-legal">
              <p>ИП Ширинян Давид Торгомович</p>
              <p>ИНН 772793703895</p>
              <p>ОГРНИП 324774600800835</p>
            </div>
          </div>

          <div className="footer-col">
            <h4>Контакты</h4>
            <a href="mailto:info@imenno.store">info@imenno.store</a>
          </div>

          <div className="footer-col">
            <h4>Бренд</h4>
            <a href="#about">О бренде</a>
            <a href="#personalization">Персонализация</a>
            <a href="#product">О продукте</a>
          </div>

          <div className="footer-col">
            <h4>Документы</h4>
            <a href="#kit">Что входит в набор</a>
            <a href="#buy">Маркетплейсы</a>
            <a href="/privacy">Политика конфиденциальности</a>
          </div>
        </div>

        <div className="copyright">
          © 2026 ИМЕННО. Все права защищены.
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const isPrivacyPage =
    typeof window !== "undefined" && window.location.pathname === "/privacy";

  if (isPrivacyPage) {
    return <PrivacyPage />;
  }

  return <HomePage />;
}