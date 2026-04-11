"use client"
import '../styles/Stats.css';

export default function Stats() {
    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-grid">
                    <div>
                        <div className="stat-number">25+</div>
                        <div className="stat-label">лет опыта</div>
                    </div>
                    <div>
                        <div className="stat-number">100+</div>
                        <div className="stat-label">счастливых свадеб</div>
                    </div>
                    <div>
                        <div className="stat-number">100+</div>
                        <div className="stat-label">банкетов</div>
                    </div>
                    <div>
                        <div className="stat-number">100%</div>
                        <div className="stat-label">довольных клиентов</div>
                    </div>
                </div>
            </div>
        </section>
    );
};