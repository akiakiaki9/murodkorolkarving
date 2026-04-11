'use client';
import { useState, useRef } from 'react';
import { FaRing, FaChampagneGlasses, FaPlateWheat } from 'react-icons/fa6';
import { FaAppleAlt } from "react-icons/fa";
import { GiMusicalNotes, GiFlowerEmblem } from 'react-icons/gi';
import { IoIosPlayCircle, IoIosArrowForward, IoIosClose } from 'react-icons/io';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Link from 'next/link';
import '../styles/Services.css';

const servicesData = [
    {
        id: 'wedding',
        icon: <FaRing />,
        title: 'Свадьбы под ключ',
        desc: 'Организуем свадьбу вашей мечты — от выездной церемонии до банкета.',
        video: '/videos/service1.mp4',
        features: ['Выездная регистрация', 'Фотосессия', 'Трансфер гостей', 'Свадебный торт']
    },
    {
        id: 'banquet',
        icon: <FaChampagneGlasses />,
        title: 'Банкеты',
        desc: 'Юбилеи, корпоративы, дни рождения — накроем стол любой сложности.',
        video: '/videos/service2.mp4',
        features: ['Меню под заказ', 'Официанты', 'Музыка', 'Оформление зала']
    },
    {
        id: 'rental',
        icon: <FaPlateWheat />,
        title: 'Прокат посуды',
        desc: 'Элитная посуда, хрусталь, приборы для любого мероприятия.',
        video: '/videos/service3.mp4',
        features: ['Фарфор ручной работы', 'Хрустальные бокалы', 'Серебряные приборы', 'Доставка']
    },
    {
        id: 'carving',
        icon: <FaAppleAlt />,
        title: 'Карвинг',
        desc: 'Фруктовые и овощные шедевры от Murod Korol Karving.',
        video: '/videos/service4.mp4',
        features: ['Фруктовые композиции', 'Овощные скульптуры', 'Букеты из фруктов', 'Мастер-классы']
    },
    {
        id: 'music',
        icon: <GiMusicalNotes />,
        title: 'Музыкальный ансамбль',
        desc: 'Живая музыка, ведущие — создадим идеальную атмосферу.',
        video: '/videos/service5.mp4',
        features: ['Живая музыка', 'Профессиональные ведущие', 'Современное оборудование', 'Любой репертуар']
    },
    {
        id: 'decor',
        icon: <GiFlowerEmblem />,
        title: 'Декор и оформление',
        desc: 'От цветов до драпировки — полностью преобразим ваш зал.',
        video: '/videos/service6.mp4',
        features: ['Цветочные композиции', 'Драпировка', 'Световое шоу', 'Индивидуальный дизайн']
    }
];

export default function Services() {
    const [playingVideo, setPlayingVideo] = useState(null);
    const [loadingVideo, setLoadingVideo] = useState(null);
    const videoRefs = useRef({});

    const handlePlay = (id) => {
        // Если уже играет это видео - останавливаем
        if (playingVideo === id) {
            const videoElement = videoRefs.current[id];
            if (videoElement) {
                videoElement.pause();
            }
            setPlayingVideo(null);
            return;
        }

        // Останавливаем предыдущее видео
        if (playingVideo) {
            const prevVideo = videoRefs.current[playingVideo];
            if (prevVideo) {
                prevVideo.pause();
            }
        }

        // Запускаем новое видео
        setLoadingVideo(id);
        setPlayingVideo(id);

        const videoElement = videoRefs.current[id];
        if (videoElement) {
            // Сброс видео если оно уже было загружено
            videoElement.currentTime = 0;

            // Убираем loading когда видео готово к воспроизведению
            videoElement.oncanplay = () => {
                setLoadingVideo(null);
                videoElement.play().catch(e => {
                    console.log('Play error:', e);
                    setLoadingVideo(null);
                    setPlayingVideo(null);
                });
            };

            // Если видео уже загружено
            if (videoElement.readyState >= 3) {
                videoElement.play().catch(e => {
                    console.log('Play error:', e);
                    setLoadingVideo(null);
                    setPlayingVideo(null);
                });
                setLoadingVideo(null);
            }
        }
    };

    const handleVideoEnd = (id) => {
        setPlayingVideo(null);
        setLoadingVideo(null);
    };

    const handleCloseVideo = (id, e) => {
        e.stopPropagation();
        const videoElement = videoRefs.current[id];
        if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
        }
        setPlayingVideo(null);
        setLoadingVideo(null);
    };

    return (
        <section className="section services-section" id="services">
            <div className="container">
                <h2 className="section-title">Наши <span className="gold-text">услуги</span></h2>
                <p className="section-subtitle">Полный спектр услуг для вашего идеального мероприятия</p>

                <div className="services-grid">
                    {servicesData.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="service-video-wrapper">
                                <div className="service-video">
                                    <video
                                        ref={el => videoRefs.current[service.id] = el}
                                        src={service.video}
                                        className="service-video-element"
                                        preload="metadata"
                                        playsInline
                                        onEnded={() => handleVideoEnd(service.id)}
                                    />

                                    {/* Затемнение */}
                                    <div className={`video-overlay ${playingVideo === service.id ? 'hidden' : ''}`}></div>

                                    {/* Индикатор загрузки */}
                                    {loadingVideo === service.id && (
                                        <div className="video-loading">
                                            <AiOutlineLoading3Quarters className="loading-spinner" />
                                            <span>Загрузка видео...</span>
                                        </div>
                                    )}

                                    {/* Кнопка play/pause */}
                                    {playingVideo !== service.id && (
                                        <button
                                            className="service-play-btn"
                                            onClick={() => handlePlay(service.id)}
                                            disabled={loadingVideo === service.id}
                                        >
                                            <IoIosPlayCircle />
                                        </button>
                                    )}

                                    {/* Кнопка закрыть (крестик) когда видео играет */}
                                    {playingVideo === service.id && (
                                        <button
                                            className="video-close-btn"
                                            onClick={(e) => handleCloseVideo(service.id, e)}
                                        >
                                            <IoIosClose />
                                        </button>
                                    )}

                                    {/* Видео индикатор */}
                                    {playingVideo !== service.id && (
                                        <div className="video-indicator">
                                            <IoIosPlayCircle />
                                            <span>Нажмите для просмотра</span>
                                        </div>
                                    )}

                                    {/* Индикатор что видео играет */}
                                    {playingVideo === service.id && (
                                        <div className="video-playing-indicator">
                                            <span className="playing-dot"></span>
                                            <span>Сейчас играет</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="service-content">
                                <div className="service-icon">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-desc">{service.desc}</p>
                                <ul className="service-features">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <IoIosArrowForward size={12} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/contacts" className="service-link">
                                    Узнать подробнее <IoIosArrowForward />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}