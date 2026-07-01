"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mic, Battery, Music, Cpu, Smartphone, MessageSquare
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Khử ồn 8 micro",
    subtitle: "Khử ồn hàng đầu",
    desc: "8 micro và hai chip khử ồn — QN1 HD + V1 — phát hiện và loại bỏ tiếng ồn nền ở mọi dải tần theo thời gian thực.",
    accent: "#ff6b00",
    tag: "ANC cao cấp",
  },
  {
    icon: Battery,
    title: "Pin 30 giờ",
    subtitle: "Nghe cả ngày lẫn đêm",
    desc: "30 giờ khi bật ANC, 40 giờ khi tắt. Sạc nhanh cho 3 giờ phát lại chỉ với 3 phút sạc.",
    accent: "#22c55e",
    tag: "Pin bền bỉ",
  },
  {
    icon: Music,
    title: "Âm thanh LDAC Hi-Res",
    subtitle: "Âm thanh không dây chất lượng phòng thu",
    desc: "LDAC truyền nhiều dữ liệu hơn Bluetooth tiêu chuẩn gấp 3 lần. Kết hợp với DSEE Extreme AI để nâng cấp âm thanh nén gần đạt chất lượng Hi-Res.",
    accent: "#8b5cf6",
    tag: "Âm thanh Hi-Res",
  },
  {
    icon: Cpu,
    title: "DSEE Extreme AI",
    subtitle: "Nâng cấp âm thanh bằng AI",
    desc: "Học máy phân tích thể loại và nhạc cụ theo thời gian thực, khôi phục chi tiết đã mất từ nguồn nhạc nén.",
    accent: "#0066cc",
    tag: "AI thông minh",
  },
  {
    icon: Smartphone,
    title: "Kết nối đa điểm",
    subtitle: "Hai thiết bị, không gián đoạn",
    desc: "Giữ kết nối với hai thiết bị Bluetooth cùng lúc. Chuyển audio mượt mà giữa điện thoại, laptop hoặc máy tính bảng mà không cần ghép đôi lại.",
    accent: "#ec4899",
    tag: "Đa điểm",
  },
  {
    icon: MessageSquare,
    title: "Speak-to-Chat",
    subtitle: "Tạm dừng thông minh",
    desc: "Khi bạn bắt đầu nói, tai nghe tự động tạm dừng nhạc và kích hoạt chế độ âm thanh xung quanh để bạn có thể trò chuyện mà không cần dùng tay.",
    accent: "#f59e0b",
    tag: "Tính năng thông minh",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.01 }}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: 20,
        padding: "32px 28px",
        cursor: "default",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = feature.accent + "50";
        e.currentTarget.style.boxShadow = `0 12px 40px ${feature.accent}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-color)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 120, height: 120,
        background: `radial-gradient(circle at top right, ${feature.accent}12, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Tag */}
      <span style={{
        display: "inline-block",
        background: feature.accent + "18",
        color: feature.accent,
        fontSize: 11, fontWeight: 700,
        padding: "3px 10px", borderRadius: 50,
        marginBottom: 20,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      }}>{feature.tag}</span>

      {/* Icon */}
      <div style={{
        width: 52, height: 52,
        borderRadius: 14,
        background: feature.accent + "15",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20,
      }}>
        <Icon size={24} color={feature.accent} strokeWidth={1.8} />
      </div>

      {/* Content */}
      <h3 style={{
        fontFamily: "var(--font-space-grotesk)",
        fontSize: 20, fontWeight: 700,
        color: "var(--text-primary)",
        marginBottom: 4,
      }}>{feature.title}</h3>
      <div style={{ fontSize: 12, color: feature.accent, fontWeight: 600, marginBottom: 12 }}>
        {feature.subtitle}
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
        {feature.desc}
      </p>
    </motion.div>
  );
}

export default function Features() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="features" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <span style={{
            display: "inline-block",
            background: "rgba(255,107,0,0.1)", color: "var(--accent)",
            fontSize: 12, fontWeight: 700, letterSpacing: "2px",
            textTransform: "uppercase", padding: "6px 18px",
            borderRadius: 50, marginBottom: 20,
            border: "1px solid rgba(255,107,0,0.2)",
          }}>
            Tại sao WH-1000XM5
          </span>
          <h2 style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, letterSpacing: "-1.5px",
            color: "var(--text-primary)", marginBottom: 20,
          }}>
            Thiết kế cho{" "}
            <span className="gradient-text">Sự Hoàn Hảo</span>
          </h2>
          <p style={{
            fontSize: 17, color: "var(--text-secondary)",
            maxWidth: 540, margin: "0 auto", lineHeight: 1.7,
          }}>
            Mọi chi tiết của WH-1000XM5 đều được hoàn thiện để mang lại trải nghiệm nghe không gì sánh bằng.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 24,
        }}>
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
