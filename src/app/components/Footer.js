import Link from 'next/link';
import { GiKnifeFork } from 'react-icons/gi';
import { FaPhoneAlt, FaMapMarkerAlt, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import '../styles/Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <div className="footer-logo">
                            <GiKnifeFork style={{ color: 'var(--gold)', display: 'inline', marginRight: '8px' }} />
                            Murod Korol <span className="gold-text">Karving</span>
                        </div>
                        <p className="footer-desc">
                            Свадьбы, банкеты, прокат посуды и карвинг в Бухаре. <br />
                            Более 25 лет опыта. Работаем под ключ.
                        </p>
                    </div>

                    <div>
                        <h4 className="footer-title">Быстрые ссылки</h4>
                        <ul className="footer-links">
                            <li><Link href="/">Главная</Link></li>
                            <li><Link href="/contacts">Контакты</Link></li>
                            <li><a href="#services">Услуги</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-title">Контакты</h4>
                        <div className="footer-contact-item">
                            <FaPhoneAlt className="footer-contact-icon" />
                            <a href="tel:+998944444445" className="footer-contact-link">+998 (94) 444-44-45</a>
                        </div>
                        <div className="footer-contact-item">
                            <FaPhoneAlt className="footer-contact-icon" />
                            <a href="tel:+998997144045" className="footer-contact-link">+998 (99) 714-40-45</a>
                        </div>
                        <div className="footer-contact-item">
                            <FaMapMarkerAlt className="footer-contact-icon" />
                            <span>Бухара, Узбекистан</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-title">Мы в соцсетях</h4>
                        <div className="footer-social">
                            <a href="https://www.facebook.com/profile.php?id=100038896853450" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                                <FaFacebookF />
                            </a>
                            <a href="https://www.instagram.com/murod_korol_karving" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 Murod Korol Karving. Все права защищены.</p>
                    <div className="footer-developer">
                        <span>Разработал</span>
                        <a
                            href="https://akbarsoft.uz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-developer-link"
                        >
                            Akbar Soft
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};