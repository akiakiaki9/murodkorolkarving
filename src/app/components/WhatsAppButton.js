import { FaWhatsapp } from 'react-icons/fa';
import '../styles/WhatsAppButton.css';

export default function WhatsAppButton() {
    const phoneNumber = '99894444445';
    const message = 'Здравствуйте! Хочу узнать подробнее о ваших услугах.';

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
            aria-label="WhatsApp"
        >
            <FaWhatsapp />
        </a>
    );
}