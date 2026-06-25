import { motion, type Variants } from "framer-motion";
import { LeadForm } from "./components/LeadForm";

const asset = (name: string) => `/assets/${name}`;

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

export default function App() {
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
          <img className="hero-bg" src={asset("hero-bg.png")} alt="" />

          <motion.div
            className="hero-content"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h1>
              <span>Это именно</span>
              <span className="hero-accent">про тебя</span>
            </h1>

            <p>
              Премиальный крем для рук с нишевым ароматом и именем, которое
              имеет значение.
            </p>

            <a className="hero-button" href="#buy">
              Где купить
            </a>
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
              Потому что самые тёплые подарки выбирают с мыслью о том, кому они предназначены.</p>
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
              src={asset(`asset-${String(index + 8).padStart(2, "0")}.png`)}
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

          <div className="kit-grid">
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

        <section className="buy section" id="buy">
          <motion.div
            className="buy-copy"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="section-label">Найдите своё имя</div>

            <h2>
              Выберите имя
              <br />и оформите заказ
              <br />на удобной площадке
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
              <a href="#contact">Перейти в магазин</a>
            </motion.article>

            <motion.article
              className="market-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <img src={asset("new-pdf/new-pdf-04.webp")} alt="Wildberries" />
              <a href="#contact">Перейти в магазин</a>
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
            <h4>Покупка</h4>
            <a href="#kit">Что входит в набор</a>
            <a href="#buy">Маркетплейсы</a>
          </div>
        </div>

        <div className="copyright">
          © 2026 ИМЕННО. Все права защищены.
        </div>
      </footer>
    </div>
  );
}