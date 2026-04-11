'use client';
import { useState, useRef, useEffect } from 'react';
import { IoIosPlayCircle, IoLogoInstagram, IoIosClose } from 'react-icons/io';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import '../styles/CarvingShowcase.css';

const carvingVideos = [
    { id: 1, title: 'Фруктовый букет', url: '/videos/carving1.mp4' },
    { id: 2, title: 'Арбузный шедевр', url: '/videos/carving2.mp4' },
    { id: 3, title: 'Овощная скульптура', url: '/videos/carving3.mp4' },
    { id: 4, title: 'Тыква резная', url: '/videos/carving4.mp4' },
];

// Компонент для генерации постера из первого кадра видео
const VideoPosterGenerator = ({ videoUrl, onPosterReady, videoId }) => {
    const [posterGenerated, setPosterGenerated] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView && !posterGenerated) {
            generatePoster();
        }
    }, [inView]);

    const generatePoster = () => {
        const video = document.createElement('video');
        video.crossOrigin = 'Anonymous';
        video.src = videoUrl;
        video.muted = true;
        video.currentTime = 0.1; // Берем кадр на 0.1 секунде
        
        video.addEventListener('loadeddata', () => {
            // Создаем canvas для захвата кадра
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            
            // Рисуем видео на canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Получаем dataURL постера
            const posterDataUrl = canvas.toDataURL('image/jpeg', 0.8);
            onPosterReady(videoId, posterDataUrl);
            setPosterGenerated(true);
            
            // Очищаем
            video.remove();
            canvas.remove();
        });
        
        video.addEventListener('error', () => {
            // Если не удалось извлечь кадр, используем fallback
            onPosterReady(videoId, null);
            setPosterGenerated(true);
            video.remove();
        });
        
        video.load();
    };

    return <div ref={ref} style={{ display: 'none' }} />;
};

// Компонент видео карточки
const VideoCard = ({ video, isPlaying, isLoading, onPlay, onClose, onEnded }) => {
    const [posterUrl, setPosterUrl] = useState(null);
    const videoRef = useRef(null);
    const [isPosterReady, setIsPosterReady] = useState(false);
    const [showPoster, setShowPoster] = useState(true);

    // Обработчик получения постера
    const handlePosterReady = (id, dataUrl) => {
        if (id === video.id && dataUrl) {
            setPosterUrl(dataUrl);
            setIsPosterReady(true);
        } else if (id === video.id && !dataUrl) {
            // Fallback цвет если не удалось извлечь кадр
            setPosterUrl(null);
            setIsPosterReady(true);
        }
    };

    // Эффект для синхронизации воспроизведения
    useEffect(() => {
        if (isPlaying && videoRef.current) {
            videoRef.current.play().catch(e => console.log('Play error:', e));
        } else if (!isPlaying && videoRef.current && videoRef.current.currentTime > 0) {
            videoRef.current.pause();
        }
    }, [isPlaying]);

    // Сброс постера когда видео закрыто
    useEffect(() => {
        if (!isPlaying) {
            setShowPoster(true);
        }
    }, [isPlaying]);

    const handleVideoPlay = () => {
        setShowPoster(false);
        onPlay(video.id);
    };

    const handleVideoEnded = () => {
        setShowPoster(true);
        onEnded(video.id);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setShowPoster(true);
        onClose(video.id);
    };

    return (
        <div className="carving-video-card">
            {/* Генератор постера из первого кадра */}
            <VideoPosterGenerator 
                videoUrl={video.url} 
                onPosterReady={handlePosterReady}
                videoId={video.id}
            />
            
            <div className="carving-video-wrapper">
                {isPlaying ? (
                    <>
                        <video
                            ref={videoRef}
                            src={video.url}
                            className="carving-video-element"
                            controls
                            autoPlay
                            playsInline
                            onEnded={handleVideoEnded}
                        />
                        <button
                            className="carving-video-close"
                            onClick={handleClose}
                        >
                            <IoIosClose />
                        </button>
                    </>
                ) : (
                    <>
                        {/* Видео элемент (скрыт пока не нажат play) */}
                        <video
                            ref={videoRef}
                            src={video.url}
                            className="carving-video-element hidden-video"
                            preload="metadata"
                            playsInline
                        />
                        
                        {/* Постер из первого кадра или fallback */}
                        {showPoster && (
                            <div className="carving-video-poster">
                                {isPosterReady && posterUrl ? (
                                    <img 
                                        src={posterUrl} 
                                        alt={video.title}
                                        className="carving-poster-image"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="carving-poster-fallback">
                                        <div className="fallback-icon">🎬</div>
                                        <div className="fallback-text">{video.title}</div>
                                    </div>
                                )}
                                <div className="carving-video-overlay"></div>
                            </div>
                        )}
                        
                        {/* Индикатор загрузки */}
                        {isLoading && (
                            <div className="carving-video-loading">
                                <AiOutlineLoading3Quarters className="loading-spinner" />
                                <span>Загрузка...</span>
                            </div>
                        )}
                        
                        {/* Кнопка play */}
                        <button
                            className="carving-video-play"
                            onClick={handleVideoPlay}
                            disabled={isLoading}
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
    );
};

export default function CarvingShowcase() {
    const [playingVideo, setPlayingVideo] = useState(null);
    const [loadingVideo, setLoadingVideo] = useState(null);

    const handlePlay = async (id) => {
        // Если уже играет это видео - не делаем ничего
        if (playingVideo === id) return;
        
        // Останавливаем предыдущее видео
        if (playingVideo) {
            setPlayingVideo(null);
        }
        
        // Запускаем новое видео
        setLoadingVideo(id);
        
        // Имитация загрузки
        setTimeout(() => {
            setPlayingVideo(id);
            setLoadingVideo(null);
        }, 100);
    };

    const handleClose = (id) => {
        if (playingVideo === id) {
            setPlayingVideo(null);
        }
        setLoadingVideo(null);
    };

    const handleEnded = (id) => {
        if (playingVideo === id) {
            setPlayingVideo(null);
        }
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
                            <VideoCard
                                key={video.id}
                                video={video}
                                isPlaying={playingVideo === video.id}
                                isLoading={loadingVideo === video.id}
                                onPlay={handlePlay}
                                onClose={handleClose}
                                onEnded={handleEnded}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}