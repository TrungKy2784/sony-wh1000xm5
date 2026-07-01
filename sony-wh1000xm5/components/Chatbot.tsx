"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type Message = { role: "user" | "bot"; text: string; time: string };

const faq: { patterns: string[]; answer: string }[] = [
    {
        patterns: ["price", "cost", "how much", "giá", "bao nhiêu"],
        answer: "Sony WH-1000XM5 có giá **349 USD** cho bản tiêu chuẩn. Chúng tôi cũng có Gói Premium 399 USD và Ultimate Platinum Silver 449 USD. Tất cả đều bao gồm giao hàng miễn phí toàn cầu! 🎧",
    },
    {
        patterns: ["battery", "pin", "charge", "sạc", "long"],
        answer: "Thời lượng pin xuất sắc: **30 giờ với ANC bật** và lên tới 40 giờ khi tắt ANC. Sạc nhanh cho bạn 3 giờ phát nhạc chỉ sau **3 phút** sạc bằng USB-C! ⚡",
    },
    {
        patterns: ["anc", "noise cancel", "chống ồn", "quiet", "block"],
        answer: "WH-1000XM5 có **ANC hàng đầu trong ngành** với 8 micro và hai chip xử lý riêng biệt (QN1 HD + V1). Đây là chống ồn tốt nhất trong mọi tai nghe hiện nay. 🔇",
    },
    {
        patterns: ["bluetooth", "connect", "multipoint", "kết nối", "device"],
        answer: "Bluetooth 5.2 với công nghệ **Multipoint** — kết nối với **hai thiết bị cùng lúc**! Chuyển giữa điện thoại và máy tính mà không cần ghép đôi lại. 📱💻",
    },
    {
        patterns: ["ldac", "audio quality", "sound", "âm thanh", "hi-res", "hires"],
        answer: "LDAC truyền âm thanh lên tới **990 kbps** — gấp 3 lần Bluetooth thông thường. Kết hợp với DSEE Extreme AI nâng cấp, ngay cả nhạc Spotify nén cũng nghe rõ chi tiết đáng kinh ngạc. 🎵",
    },
    {
        patterns: ["weight", "comfort", "wear", "gram", "trọng lượng"],
        answer: "XM5 chỉ nặng **250 gram** với thiết kế tinh gọn. Đệm tai siêu mềm giúp phân bổ lực đều cho cảm giác thoải mái cả ngày. 😌",
    },
    {
        patterns: ["color", "colour", "silver", "black", "màu"],
        answer: "Có sẵn màu **Midnight Black** và **Platinum Silver**. Phiên bản Silver độc quyền trong gói Ultimate 449 USD. Cả hai đều sang trọng! ✨",
    },
    {
        patterns: ["warranty", "bảo hành", "return", "refund"],
        answer: "Phiên bản tiêu chuẩn đi kèm **bảo hành Sony 1 năm**. Gói Bundle có 2 năm, Ultimate có **bảo hành mở rộng 3 năm** với hỗ trợ ưu tiên. Còn có đổi trả miễn phí 30 ngày! 🛡️",
    },
    {
        patterns: ["hello", "hi", "hey", "xin chào", "chào"],
        answer: "Xin chào! 👋 Tôi là trợ lý Sony WH-1000XM5. Hỏi tôi bất cứ điều gì về tai nghe — giá, pin, chất âm, ANC, kết nối, hoặc bất cứ điều gì khác!",
    },
    {
        patterns: ["speak to chat", "auto pause", "voice", "chat feature"],
        answer: "**Speak-to-Chat** tự động tạm dừng nhạc và kích hoạt chế độ âm thanh xung quanh khi bạn bắt đầu nói. Nói tự nhiên — không cần nút bấm. Nhạc sẽ tiếp tục khi cuộc trò chuyện kết thúc. 💬",
    },
];

const getReply = (input: string): string => {
    const lower = input.toLowerCase();
    for (const entry of faq) {
        if (entry.patterns.some((p) => lower.includes(p))) {
            return entry.answer;
        }
    }
    return "Câu hỏi hay! Sony WH-1000XM5 là tai nghe không dây cao cấp của Sony với ANC đỉnh, pin 30 giờ, âm thanh LDAC Hi-Res và kết nối Multipoint. Bạn muốn biết cụ thể về điều gì? Hãy hỏi về **giá**, **pin**, **ANC**, **chất âm**, hoặc **màu sắc**! 🎧";
};

function renderMarkdown(text: string) {
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br/>");
}

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", text: "Xin chào! Tôi là trợ lý Sony WH-1000XM5 🎧 Hãy hỏi tôi về pin, chất âm, giá, ANC, hoặc kết nối!", time: now() },
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    function now() {
        return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    const send = async () => {
        if (!input.trim()) return;
        const userMsg: Message = { role: "user", text: input, time: now() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setTyping(true);

        await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
        const reply = getReply(userMsg.text);
        setTyping(false);
        setMessages((prev) => [...prev, { role: "bot", text: reply, time: now() }]);
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
    };

    const quickReplies = ["Giá?", "Thời lượng pin?", "Chất lượng ANC?", "Chất âm?"];

    return (
        <>
            {/* Floating button */}
            <motion.button
                id="chatbot-toggle"
                onClick={() => setOpen(!open)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: "fixed", bottom: 32, right: 32, zIndex: 1000,
                    width: 60, height: 60, borderRadius: "50%",
                    background: "linear-gradient(135deg, #ff6b00, #ff8c3a)",
                    border: "none", cursor: "pointer", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 8px 32px rgba(255,107,0,0.4)",
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={open ? "close" : "open"}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                    >
                        {open ? <X size={24} /> : <MessageCircle size={24} />}
                    </motion.div>
                </AnimatePresence>
                {/* Pulse ring */}
                {!open && (
                    <motion.div
                        animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                            position: "absolute", inset: 0, borderRadius: "50%",
                            border: "2px solid #ff6b00", pointerEvents: "none",
                        }}
                    />
                )}
            </motion.button>

            {/* Chat window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        style={{
                            position: "fixed", bottom: 104, right: 32, zIndex: 999,
                            width: 360, height: 520,
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-color)",
                            borderRadius: 24,
                            boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
                            display: "flex", flexDirection: "column",
                            overflow: "hidden",
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: "18px 20px",
                            background: "linear-gradient(135deg, #ff6b00, #ff8c3a)",
                            display: "flex", alignItems: "center", gap: 12,
                        }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: "50%",
                                background: "rgba(255,255,255,0.2)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Bot size={22} color="#fff" />
                            </div>
                            <div>
                                <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Trợ lý Sony</div>
                                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                                    Đang trực tuyến · Chuyên gia XM5
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 12 }}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    style={{
                                        display: "flex",
                                        flexDirection: msg.role === "user" ? "row-reverse" : "row",
                                        gap: 8, alignItems: "flex-end",
                                    }}
                                >
                                    <div style={{
                                        width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                                        background: msg.role === "bot" ? "rgba(255,107,0,0.15)" : "rgba(0,102,204,0.15)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}>
                                        {msg.role === "bot" ? <Bot size={15} color="#ff6b00" /> : <User size={15} color="#0066cc" />}
                                    </div>
                                    <div style={{ maxWidth: "75%" }}>
                                        <div style={{
                                            padding: "10px 14px",
                                            background: msg.role === "bot" ? "var(--bg-secondary)" : "linear-gradient(135deg, #0066cc, #4d9de0)",
                                            color: msg.role === "bot" ? "var(--text-primary)" : "#fff",
                                            borderRadius: msg.role === "bot" ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                                            fontSize: 13, lineHeight: 1.6,
                                        }}
                                            dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                                        />
                                        <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 3, textAlign: msg.role === "user" ? "right" : "left" }}>
                                            {msg.time}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {/* Typing indicator */}
                            <AnimatePresence>
                                {typing && (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        style={{ display: "flex", gap: 8, alignItems: "flex-end" }}
                                    >
                                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,107,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Bot size={15} color="#ff6b00" />
                                        </div>
                                        <div style={{ padding: "10px 16px", background: "var(--bg-secondary)", borderRadius: "16px 16px 16px 4px", display: "flex", gap: 4 }}>
                                            {[0, 1, 2].map((j) => (
                                                <motion.div
                                                    key={j}
                                                    animate={{ y: [0, -4, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: j * 0.15 }}
                                                    style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff6b00" }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={bottomRef} />
                        </div>

                        {/* Quick replies */}
                        <div style={{ padding: "8px 16px", display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {quickReplies.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => { setInput(q); setTimeout(send, 10); }}
                                    style={{
                                        padding: "5px 12px", borderRadius: 50, fontSize: 11,
                                        background: "var(--bg-secondary)",
                                        border: "1px solid var(--border-color)",
                                        color: "var(--text-secondary)", cursor: "pointer",
                                        fontFamily: "var(--font-inter)",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "#ff6b00";
                                        e.currentTarget.style.color = "#ff6b00";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "var(--border-color)";
                                        e.currentTarget.style.color = "var(--text-secondary)";
                                    }}
                                >{q}</button>
                            ))}
                        </div>

                        {/* Input */}
                        <div style={{
                            padding: "12px 16px 16px",
                            borderTop: "1px solid var(--border-color)",
                            display: "flex", gap: 8,
                        }}>
                            <input
                                id="chatbot-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder="Hỏi về XM5..."
                                style={{
                                    flex: 1, padding: "10px 14px",
                                    background: "var(--bg-secondary)",
                                    border: "1px solid var(--border-color)",
                                    borderRadius: 50, fontSize: 13,
                                    color: "var(--text-primary)", outline: "none",
                                    fontFamily: "var(--font-inter)",
                                }}
                                onFocus={(e) => e.target.style.borderColor = "#ff6b00"}
                                onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
                            />
                            <motion.button
                                id="chatbot-send"
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                                onClick={send}
                                style={{
                                    width: 40, height: 40, borderRadius: "50%",
                                    background: "linear-gradient(135deg, #ff6b00, #ff8c3a)",
                                    border: "none", cursor: "pointer", color: "#fff",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <Send size={16} />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
