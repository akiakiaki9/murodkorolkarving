'use client';
import { useState, useRef } from 'react';
import { IoIosPlayCircle, IoLogoInstagram, IoIosClose } from 'react-icons/io';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import '../styles/CarvingShowcase.css';

const carvingVideos = [
    { id: 1, title: 'Фруктовый букет', url: '/videos/carving1.mp4' },
    { id: 2, title: 'Арбузный шедевр', url: '/videos/carving2.mp4' },
    { id: 3, title: 'Овощная скульптура', url: '/videos/carving3.mp4' },
    { id: 4, title: 'Тыква резная', url: '/videos/carving4.mp4' },
];

export default function CarvingShowcase() {
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
        <section className="section carving-section">
            <div className="container">
                <div className="carving-grid">
                    <div className="carving-info">
                        <h3>
                            Карвинг от <span className="gold-text">Murod Korol Karving</span>
                        </h3>
                        <p>
                            Превращаем фрукты и овощи в настоящие произведения искусства.
                            Украсим любой стол уникальными композициями, которые удивят ваших гостей.
                        </p>
                        <div className="carving-stats">
                            <div className="carving-stat">
                                <div className="carving-stat-number">500+</div>
                                <div className="carving-stat-label">работ выполнено</div>
                            </div>
                            <div className="carving-stat">
                                <div className="carving-stat-number">25+</div>
                                <div className="carving-stat-label">лет опыта</div>
                            </div>
                            <div className="carving-stat">
                                <div className="carving-stat-number">100%</div>
                                <div className="carving-stat-label">ручная работа</div>
                            </div>
                        </div>
                        <a
                            href="https://www.instagram.com/murod_korol_karving"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline carving-instagram"
                        >
                            <IoLogoInstagram size={20} />
                            Смотреть в Instagram
                        </a>
                    </div>

                    <div className="carving-videos">
                        {carvingVideos.map((video) => (
                            <div key={video.id} className="carving-video-card">
                                <div className="carving-video-wrapper">
                                    {playingVideo === video.id ? (
                                        <>
                                            <video
                                                ref={el => videoRefs.current[video.id] = el}
                                                src={video.url}
                                                className="carving-video-element"
                                                controls
                                                autoPlay
                                                playsInline
                                                onEnded={() => handleVideoEnd(video.id)}
                                            />
                                            <button
                                                className="carving-video-close"
                                                onClick={(e) => handleCloseVideo(video.id, e)}
                                            >
                                                <IoIosClose />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <video
                                                ref={el => videoRefs.current[video.id] = el}
                                                src={video.url}
                                                className="carving-video-element"
                                                preload="metadata"
                                                playsInline
                                            />
                                            <div className="carving-video-overlay"></div>
                                            
                                            {/* Индикатор загрузки */}
                                            {loadingVideo === video.id && (
                                                <div className="carving-video-loading">
                                                    <AiOutlineLoading3Quarters className="loading-spinner" />
                                                    <span>Загрузка...</span>
                                                </div>
                                            )}
                                            
                                            {/* Кнопка play */}
                                            <button
                                                className="carving-video-play"
                                                onClick={() => handlePlay(video.id)}
                                                disabled={loadingVideo === video.id}
                                            >
                                                <IoIosPlayCircle />
                                            </button>
                                            
                                            {/* Индикатор что это видео */}
                                            <div className="carving-video-indicator">
                                                <IoIosPlayCircle />
                                                <span>Нажмите для просмотра</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="carving-video-title">{video.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}