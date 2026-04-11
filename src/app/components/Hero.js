'use client';
import { FaRegCalendarAlt, FaUtensils, FaWineGlassAlt } from 'react-icons/fa';
import { GiFruitBowl } from 'react-icons/gi';
import '../styles/Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            {/* Фоновое видео */}
            <div className="hero-video-wrapper">
                <video
                    className="hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay"></div>
            </div>

            <div className="container hero-content">
                <div className="hero-icons">
                    <div className="hero-icon"><FaRegCalendarAlt /></div>
                    <div className="hero-icon"><FaUtensils /></div>
                    <div className="hero-icon"><GiFruitBowl /></div>
                    <div className="hero-icon"><FaWineGlassAlt /></div>
                </div>

                <h1 className="hero-title animate-fade-up">
                    Ваша сказка <span className="gold-text">начинается здесь</span>
                </h1>
                <p className="hero-subtitle">
                    Свадьбы • Банкеты • Прокат посуды • Карвинг
                </p>
                <p className="hero-exp">
                    ⭐ Более 25 лет опыта в Бухаре ⭐
                </p>
                <div className="hero-buttons">
                    <a href="#services" className="btn">Наши услуги</a>
                    <a href="/contacts" className="btn btn-outline">Связаться</a>
                </div>
            </div>
        </section>
    );
}