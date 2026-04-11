'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { FaPhoneAlt } from 'react-icons/fa';
import Image from 'next/image';
import '../styles/Header.css';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Отслеживание скролла
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Закрытие при клике вне меню
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Блокировка скролла при открытом меню
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    return (
        <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="container header-container">
                <Link href="/" className="header-logo">
                    <div className="header-logo-wrapper">
                        <img
                            src="/images/logo.png"
                            alt="Murod Korol Karving"
                            width={60}
                            height={60}
                            className="header-logo-icon"
                            priority
                        />
                    </div>
                    Murod Korol<span className="gold-text">Karving</span>
                </Link>

                <nav className="header-nav">
                    <Link
                        href="/"
                        className={`header-nav-link ${pathname === '/' ? 'active' : ''}`}
                    >
                        Главная
                    </Link>
                    <Link
                        href="/contacts"
                        className={`header-nav-link ${pathname === '/contacts' ? 'active' : ''}`}
                    >
                        Контакты
                    </Link>
                    <a href="tel:+998944444445" className="btn header-phone-btn">
                        <FaPhoneAlt size={14} /> +998 (94) 444-44-45
                    </a>
                </nav>

                <div className="header-mobile-actions">
                    <a href="tel:+998944444445" className="header-mobile-call">
                        <FaPhoneAlt size={20} />
                    </a>
                    <button
                        ref={buttonRef}
                        onClick={() => setIsOpen(!isOpen)}
                        className="header-mobile-btn"
                        aria-label="Меню"
                    >
                        {isOpen ? <IoClose /> : <GiHamburgerMenu />}
                    </button>
                </div>
            </div>

            <div className={`header-mobile-menu ${isOpen ? 'open' : ''}`} ref={menuRef}>
                <Link
                    href="/"
                    className={`header-mobile-link ${pathname === '/' ? 'active' : ''}`}
                    onClick={closeMenu}
                >
                    Главная
                </Link>
                <Link
                    href="/contacts"
                    className={`header-mobile-link ${pathname === '/contacts' ? 'active' : ''}`}
                    onClick={closeMenu}
                >
                    Контакты
                </Link>
                <a href="tel:+998944444445" className="gold-text header-mobile-phone" onClick={closeMenu}>
                    📞 +998 (94) 444-44-45
                </a>
                <a href="tel:+998997144045" className="gold-text header-mobile-phone" onClick={closeMenu}>
                    📞 +998 (99) 714-40-45
                </a>
            </div>
        </header>
    );
}