"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";

const plans = [
    {
        id: "standard",
        name: "Tiêu chuẩn",
        price: 349,
        color: "Đen Midnight",
        colorHex: "#1a1a1a",
        badge: null,
        desc: "Trải nghiệm WH-1000XM5 cơ bản",
        features: [
            "Sony WH-1000XM5 (Đen)",
            "Cáp sạc USB-C",
            "Bao đựng đi kèm",
            "Cáp âm thanh 3.5mm",
            "Bảo hành Sony 1 năm",
            "Ứng dụng Sony Headphones Connect",
        ],
        accent: "#ff6b00",
        highlight: false,
    },
    {
        id: "bundle",
        name: "Gói Premium",
        price: 399,
        color: "Đen Midnight + Phụ kiện",
        colorHex: "#ff6b00",
        badge: "🔥 Phổ biến nhất",
        desc: "Giá trị tối đa cho người nghe khó tính",
        features: [
            "Sony WH-1000XM5 (Đen)",
            "Bao đựng sang trọng",
            "Cáp sạc nhanh USB-C (2m)",
            "Cáp âm thanh 3.5mm chất lượng cao",
            "Bộ chuyển đổi hàng không đi kèm",
            "Bảo hành Sony 2 năm",
            "Ứng dụng Sony Headphones Connect",
        ],
        accent: "#ff6b00",
        highlight: true,
    },
    {
        id: "premium",
        name: "Tối thượng",
        price: 449,
        color: "Bạc Platinum",
        colorHex: "#b0b0b0",
        badge: null,
        desc: "Phiên bản bạc với bảo vệ mở rộng",
        features: [
            "Sony WH-1000XM5 (Bạc)",
            "Bao đựng cao cấp",
            "Cáp USB-C + bộ chuyển đổi hàng không",
            "Cáp âm thanh 3.5mm chất lượng cao",
            "Bảo hành mở rộng 3 năm",
            "Hỗ trợ Sony ưu tiên",
            "Ứng dụng Sony Headphones Connect",
        ],
        accent: "#8b5cf6",
        highlight: false,
    },
];

export default function Pricing() {
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

    return (
        <section id="pricing" className="section-padding" style={{ background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>
            {/* BG */}
            <div style={{
                position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                width: 600, height: 300,
                background: "radial-gradient(ellipse, rgba(255,107,0,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: "center", marginBottom: 64 }}
                >
                    <span style={{
                        display: "inline-block",
                        background: "rgba(255,107,0,0.1)", color: "var(--accent)",
                        fontSize: 12, fontWeight: 700, letterSpacing: "2px",
                        textTransform: "uppercase", padding: "6px 18px",
                        borderRadius: 50, marginBottom: 20,
                        border: "1px solid rgba(255,107,0,0.2)",
                    }}>Giá</span>
                    <h2 style={{
                        fontFamily: "var(--font-space-grotesk)",
                        fontSize: "clamp(32px, 5vw, 52px)",
                        fontWeight: 800, letterSpacing: "-1.5px",
                        color: "var(--text-primary)", marginBottom: 16,
                    }}>
                        Chọn trải nghiệm của bạn
                    </h2>
                    <p style={{ fontSize: 17, color: "var(--text-secondary)", maxWidth: 400, margin: "0 auto" }}>
                        Miễn phí giao hàng toàn cầu. Đổi trả trong 30 ngày. Cam kết giá tốt nhất.
                    </p>
                </motion.div>

                {/* Plans grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: 24, alignItems: "start",
                }}>
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: plan.highlight ? -8 : -4 }}
                            onHoverStart={() => setHoveredPlan(plan.id)}
                            onHoverEnd={() => setHoveredPlan(null)}
                            style={{
                                background: plan.highlight ? `linear-gradient(145deg, ${plan.accent}12, var(--bg-card))` : "var(--bg-card)",
                                border: plan.highlight ? `2px solid ${plan.accent}` : "1px solid var(--border-color)",
                                borderRadius: 24,
                                padding: "32px 28px",
                                position: "relative",
                                boxShadow: plan.highlight ? `0 20px 60px ${plan.accent}25` : "none",
                                transition: "box-shadow 0.3s ease",
                            }}
                        >
                            {/* Popular badge */}
                            {plan.badge && (
                                <div style={{
                                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                                    background: `linear-gradient(135deg, ${plan.accent}, #ff8c3a)`,
                                    color: "#fff", fontSize: 12, fontWeight: 700,
                                    padding: "6px 18px", borderRadius: 50,
                                    whiteSpace: "nowrap",
                                    boxShadow: `0 4px 16px ${plan.accent}40`,
                                }}>{plan.badge}</div>
                            )}

                            {/* Color dot + name */}
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                <div style={{
                                    width: 14, height: 14, borderRadius: "50%",
                                    background: plan.colorHex,
                                    boxShadow: `0 0 0 2px ${plan.colorHex}40`,
                                }} />
                                <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>
                                    {plan.color}
                                </span>
                            </div>

                            <h3 style={{
                                fontFamily: "var(--font-space-grotesk)",
                                fontSize: 22, fontWeight: 800,
                                color: "var(--text-primary)", marginBottom: 6,
                            }}>{plan.name}</h3>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 28 }}>{plan.desc}</p>

                            {/* Price */}
                            <div style={{ marginBottom: 28 }}>
                                <span style={{
                                    fontFamily: "var(--font-space-grotesk)",
                                    fontSize: 48, fontWeight: 900,
                                    color: plan.highlight ? plan.accent : "var(--text-primary)",
                                }}>${plan.price}</span>
                                <span style={{ fontSize: 14, color: "var(--text-muted)", marginLeft: 4 }}>USD</span>
                            </div>

                            {/* CTA */}
                            <motion.a
                                id={`pricing-${plan.id}`}
                                href="#newsletter"
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    display: "block", textAlign: "center",
                                    padding: "14px 24px",
                                    background: plan.highlight
                                        ? `linear-gradient(135deg, ${plan.accent}, #ff8c3a)`
                                        : "transparent",
                                    color: plan.highlight ? "#fff" : "var(--text-primary)",
                                    border: plan.highlight ? "none" : "1.5px solid var(--border-color)",
                                    borderRadius: 50, fontWeight: 700,
                                    fontSize: 15, textDecoration: "none",
                                    marginBottom: 28,
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    if (!plan.highlight) {
                                        e.currentTarget.style.borderColor = plan.accent;
                                        e.currentTarget.style.color = plan.accent;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!plan.highlight) {
                                        e.currentTarget.style.borderColor = "var(--border-color)";
                                        e.currentTarget.style.color = "var(--text-primary)";
                                    }
                                }}
                            >
                                {plan.highlight ? <><Zap size={16} style={{ display: "inline", marginRight: 6 }} />Đặt Ngay</> : "Đặt Ngay"}
                            </motion.a>

                            {/* Features */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {plan.features.map((feat) => (
                                    <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                        <div style={{
                                            width: 20, height: 20, borderRadius: "50%",
                                            background: plan.accent + "18",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            flexShrink: 0, marginTop: 1,
                                        }}>
                                            <Check size={12} color={plan.accent} />
                                        </div>
                                        <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                                            {feat}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{
                        display: "flex", flexWrap: "wrap", gap: 24,
                        justifyContent: "center", marginTop: 56,
                        padding: "32px", background: "var(--bg-card)",
                        borderRadius: 20, border: "1px solid var(--border-color)",
                    }}
                >
                    {[
                        { icon: "🚚", text: "Giao hàng miễn phí toàn cầu" },
                        { icon: "↩️", text: "Đổi trả miễn phí 30 ngày" },
                        { icon: "🔒", text: "Thanh toán an toàn" },
                        { icon: "🛡️", text: "Bảo đảm giá tốt" },
                        { icon: "⭐", text: "Đánh giá 4.8/5 · 2.847 nhận xét" },
                    ].map(({ icon, text }) => (
                        <div key={text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span>{icon}</span>
                            <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>{text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
