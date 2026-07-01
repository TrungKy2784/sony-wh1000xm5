"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Bell } from "lucide-react";

const WEBHOOK_URL = "https://webhook.site/sony-wh1000xm5-helicorp";

export default function NewsletterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    // Track scroll depth
    useEffect(() => {
        let sent75 = false;
        let sent100 = false;
        const onScroll = () => {
            const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrolled >= 75 && !sent75) {
                sent75 = true;
                sendEvent("scroll_depth", { depth: "75%" });
            }
            if (scrolled >= 99 && !sent100) {
                sent100 = true;
                sendEvent("scroll_depth", { depth: "100%" });
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const sendEvent = async (event: string, data: Record<string, unknown>) => {
        try {
            await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                mode: "no-cors",
                body: JSON.stringify({
                    event,
                    timestamp: new Date().toISOString(),
                    page: "sony-wh1000xm5-landing",
                    ...data,
                }),
            });
        } catch { }
    };

    const validate = () => {
        const errs: { name?: string; email?: string } = {};
        if (!name.trim()) errs.name = "Vui lòng nhập họ và tên";
        else if (name.trim().length < 2) errs.name = "Họ tên phải ít nhất 2 ký tự";
        if (!email.trim()) errs.email = "Vui lòng nhập email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Vui lòng nhập email hợp lệ";
        return errs;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        setStatus("loading");

        sendEvent("cta_click", { button: "newsletter_subscribe", element: "form" });

        try {
            await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                mode: "no-cors",
                body: JSON.stringify({
                    event: "newsletter_signup",
                    name, email,
                    timestamp: new Date().toISOString(),
                    source: "sony-wh1000xm5-landing",
                }),
            });
            setStatus("success");
            setToast({ msg: "🎉 Bạn đã đăng ký thành công! Chúng tôi sẽ thông báo ưu đãi đặc biệt.", type: "success" });
            setName(""); setEmail("");
        } catch {
            setStatus("error");
            setToast({ msg: "Có lỗi xảy ra. Vui lòng thử lại.", type: "error" });
        }

        setTimeout(() => {
            setStatus("idle");
            setToast(null);
        }, 4000);
    };

    const handleCtaClick = (btn: string) => {
        sendEvent("cta_click", { button: btn });
    };

    return (
        <section
            id="newsletter"
            ref={sectionRef}
            className="section-padding"
            style={{ background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}
        >
            {/* Background */}
            <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,107,0,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -60, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -60, x: "-50%" }}
                        style={{
                            position: "fixed", top: 24, left: "50%",
                            zIndex: 9999,
                            background: toast.type === "success" ? "#0f172a" : "#450a0a",
                            border: `1px solid ${toast.type === "success" ? "#22c55e40" : "#ef444440"}`,
                            borderRadius: 16, padding: "14px 24px",
                            display: "flex", alignItems: "center", gap: 12,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                            minWidth: 300,
                        }}
                    >
                        {toast.type === "success"
                            ? <CheckCircle size={20} color="#22c55e" />
                            : <AlertCircle size={20} color="#ef4444" />
                        }
                        <span style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>{toast.msg}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container-custom">
                <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div style={{
                            width: 64, height: 64, borderRadius: 20,
                            background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            margin: "0 auto 24px",
                        }}>
                            <Bell size={28} color="#ff6b00" />
                        </div>

                        <span style={{
                            display: "inline-block",
                            background: "rgba(255,107,0,0.1)", color: "var(--accent)",
                            fontSize: 12, fontWeight: 700, letterSpacing: "2px",
                            textTransform: "uppercase", padding: "6px 18px",
                            borderRadius: 50, marginBottom: 20,
                            border: "1px solid rgba(255,107,0,0.2)",
                        }}>Cập nhật</span>

                        <h2 style={{
                            fontFamily: "var(--font-space-grotesk)",
                            fontSize: "clamp(28px, 4vw, 44px)",
                            fontWeight: 800, letterSpacing: "-1px",
                            color: "var(--text-primary)", marginBottom: 16,
                        }}>
                            Nhận{" "}
                            <span className="gradient-text">Ưu đãi đặc biệt</span>
                        </h2>
                        <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 40 }}>
                            Đăng ký để nhận truy cập sớm khuyến mãi Sony WH-1000XM5, cập nhật phần mềm và các gói ưu đãi hạn chế. Không gửi spam.
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-color)",
                            borderRadius: 24, padding: "40px",
                            boxShadow: "var(--shadow-card)",
                        }}
                    >
                        {/* Name field */}
                        <div style={{ marginBottom: 20, textAlign: "left" }}>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
                                Họ và tên
                            </label>
                            <input
                                id="newsletter-name"
                                type="text"
                                value={name}
                                onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
                                placeholder="Nguyễn Văn A"
                                style={{
                                    width: "100%", padding: "12px 16px",
                                    background: "var(--bg-secondary)",
                                    border: `1.5px solid ${errors.name ? "#ef4444" : "var(--border-color)"}`,
                                    borderRadius: 12, fontSize: 15,
                                    color: "var(--text-primary)",
                                    outline: "none", transition: "border-color 0.2s ease",
                                    fontFamily: "var(--font-inter)",
                                }}
                                onFocus={(e) => { if (!errors.name) e.target.style.borderColor = "var(--accent)"; }}
                                onBlur={(e) => { if (!errors.name) e.target.style.borderColor = "var(--border-color)"; }}
                            />
                            <AnimatePresence>
                                {errors.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        style={{ fontSize: 12, color: "#ef4444", marginTop: 6 }}
                                    >{errors.name}</motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Email field */}
                        <div style={{ marginBottom: 28, textAlign: "left" }}>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
                                Email
                            </label>
                            <input
                                id="newsletter-email"
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                                placeholder="email@domain.com"
                                style={{
                                    width: "100%", padding: "12px 16px",
                                    background: "var(--bg-secondary)",
                                    border: `1.5px solid ${errors.email ? "#ef4444" : "var(--border-color)"}`,
                                    borderRadius: 12, fontSize: 15,
                                    color: "var(--text-primary)",
                                    outline: "none", transition: "border-color 0.2s ease",
                                    fontFamily: "var(--font-inter)",
                                }}
                                onFocus={(e) => { if (!errors.email) e.target.style.borderColor = "var(--accent)"; }}
                                onBlur={(e) => { if (!errors.email) e.target.style.borderColor = "var(--border-color)"; }}
                            />
                            <AnimatePresence>
                                {errors.email && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        style={{ fontSize: 12, color: "#ef4444", marginTop: 6 }}
                                    >{errors.email}</motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Submit */}
                        <motion.button
                            id="newsletter-submit"
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCtaClick("newsletter_subscribe")}
                            style={{
                                width: "100%", padding: "15px",
                                background: status === "success"
                                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                                    : "linear-gradient(135deg, #ff6b00, #ff8c3a)",
                                color: "#fff", border: "none", borderRadius: 50,
                                fontSize: 16, fontWeight: 700, cursor: status === "loading" ? "not-allowed" : "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                                transition: "all 0.3s ease",
                                opacity: status === "loading" ? 0.7 : 1,
                            }}
                        >
                            {status === "loading" && (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    style={{ width: 20, height: 20, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%" }}
                                />
                            )}
                            {status === "success" && <CheckCircle size={20} />}
                            {status === "idle" && <Send size={18} />}
                            {status === "loading" ? "Đang đăng ký..." : status === "success" ? "Đã đăng ký!" : "Nhận ưu đãi"}
                        </motion.button>

                        <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 16 }}>
                            🔒 Không spam. Hủy đăng ký bất cứ lúc nào. Chúng tôi tôn trọng quyền riêng tư của bạn.
                        </p>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
