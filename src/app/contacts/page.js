import ContactForm from '../components/ContactForm';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { GiKnifeFork } from 'react-icons/gi';

export default function ContactsPage() {
    const phoneNumbers = ['+998 (94) 444-44-45', '+998 (99) 714-40-45'];

    return (
        <>
            <section style={{
                height: '40vh',
                background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}>
                <div>
                    <h1 className="section-title" style={{ color: 'var(--white)' }}>
                        Свяжитесь <span className="gold-text">с нами</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: 'var(--text-gray)' }}>
                        Мы ответим на все ваши вопросы
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '50px',
                    }}>
                        {/* Контактная информация */}
                        <div>
                            <div style={{ marginBottom: '40px' }}>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <FaPhoneAlt style={{ color: 'var(--gold)' }} /> Телефоны
                                </h3>
                                {phoneNumbers.map((phone, index) => (
                                    <a key={index} href={`tel:${phone.replace(/\s/g, '')}`} style={{
                                        display: 'block',
                                        color: 'var(--gold)',
                                        textDecoration: 'none',
                                        fontSize: '1.2rem',
                                        marginBottom: '10px',
                                        transition: 'var(--transition)',
                                    }}>
                                        📞 {phone}
                                    </a>
                                ))}
                            </div>

                            <div style={{ marginBottom: '40px' }}>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <FaMapMarkerAlt style={{ color: 'var(--gold)' }} /> Адрес
                                </h3>
                                <p style={{ color: 'var(--text-gray)' }}>Бухара, Узбекистан</p>
                                <p style={{ color: 'var(--text-gray)' }}>Работаем по всему городу и области</p>
                            </div>

                            <div style={{ marginBottom: '40px' }}>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <FaClock style={{ color: 'var(--gold)' }} /> Режим работы
                                </h3>
                                <p style={{ color: 'var(--text-gray)' }}>Ежедневно: 09:00 - 21:00</p>
                                <p style={{ color: 'var(--text-gray)' }}>Без выходных</p>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <GiKnifeFork style={{ color: 'var(--gold)' }} /> Соцсети
                                </h3>
                                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                    <a href="https://www.facebook.com/profile.php?id=100038896853450" target="_blank" rel="noopener noreferrer" style={{
                                        padding: '12px 24px',
                                        backgroundColor: '#1877f2',
                                        color: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '10px',
                                        transition: 'var(--transition)',
                                    }}>
                                        Facebook
                                    </a>
                                    <a href="https://www.instagram.com/murod_korol_karving" target="_blank" rel="noopener noreferrer" style={{
                                        padding: '12px 24px',
                                        background: 'radial-gradient(circle at 30% 110%, #ffdb8d, #fca245, #d92e8a, #9b2a9b, #631c6b)',
                                        color: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '10px',
                                        transition: 'var(--transition)',
                                    }}>
                                        Instagram
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Форма */}
                        <div>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>✉️ Отправить заявку</h3>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}