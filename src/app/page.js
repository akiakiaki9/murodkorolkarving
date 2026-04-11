import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import CarvingShowcase from './components/CarvingShowcase';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <CarvingShowcase />

      {/* CTA блок */}
      <section className="section cta-section">
        <div className="container">
          <h2 className="cta-title">
            Готовы обсудить ваше мероприятие?
          </h2>
          <p className="cta-subtitle">
            Позвоните нам или оставьте заявку на сайте
          </p>
          <div className="cta-buttons">
            <a href="tel:+998944444445" className="btn cta-btn-call">
              📞 +998 (94) 444-44-45
            </a>
            <a href="/contacts" className="btn cta-btn-contact">
              Оставить заявку
            </a>
          </div>
        </div>
      </section>
    </>
  );
}