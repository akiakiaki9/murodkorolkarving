'use client';
import { useState } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import '../styles/ContactForm.css';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        eventType: 'wedding',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const telegramUsername = 'murod_korol_karving';
    const phoneNumbers = ['+998 (94) 444-44-45', '+998 (99) 714-40-45'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formatMessage = () => {
        const eventTypes = {
            wedding: '💍 Свадьба',
            banquet: '🍽️ Банкет',
            rental: '🍷 Прокат посуды',
            other: '📋 Другое',
        };

        const currentDate = new Date().toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return `🛎 НОВАЯ ЗАЯВКА С САЙТА! 🛎

👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
🎉 Мероприятие: ${eventTypes[formData.eventType]}

💬 Сообщение:
${formData.message || 'нет'}

⏰ Время заявки: ${currentDate}

📍 Бухара | Royal Carving

📞 Связаться с клиентом: ${formData.phone}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 3000);
            return;
        }

        setIsSubmitting(true);

        try {
            const messageText = formatMessage();
            const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(messageText)}`;
            window.open(telegramUrl, '_blank');

            setSubmitStatus('success');
            setFormData({
                name: '',
                phone: '',
                eventType: 'wedding',
                message: '',
            });

            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
                <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="+998 (__) ___-__-__ *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
            </div>

            <div className="form-row">
                <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="form-select"
                >
                    <option value="wedding">💍 Свадьба</option>
                    <option value="banquet">🍽️ Банкет</option>
                    <option value="rental">🍷 Прокат посуды</option>
                    <option value="other">📋 Другое</option>
                </select>
            </div>

            <textarea
                name="message"
                placeholder="Ваше сообщение..."
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="form-textarea"
            />

            <button type="submit" className="btn form-submit" disabled={isSubmitting}>
                <FaTelegramPlane size={18} />
                {isSubmitting ? 'Отправка...' : 'Отправить заявку в Telegram'}
            </button>

            {submitStatus === 'success' && (
                <div className="form-success">
                    ✅ Заявка готова! Откроется Telegram — отправьте сообщение админу.
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="form-error">
                    ❌ Заполните имя и номер телефона!
                </div>
            )}

            <div className="form-contacts">
                <p className="form-contacts-title">Или свяжитесь напрямую:</p>
                <div className="form-contacts-list">
                    {phoneNumbers.map((phone, index) => (
                        <a key={index} href={`tel:${phone.replace(/\s/g, '')}`} className="form-contact-phone">
                            📞 {phone}
                        </a>
                    ))}
                </div>
            </div>
        </form>
    );
}