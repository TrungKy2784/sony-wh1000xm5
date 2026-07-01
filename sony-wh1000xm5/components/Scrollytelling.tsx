"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const scenes = [
  {
    id: 1,
    badge: "01 / Chống ồn",
    title: "Thế giới chìm vào im lặng",
    body: "8 micro và hai bộ xử lý riêng phân tích tiếng ồn ở mọi dải tần. Kết quả: gần như im lặng tuyệt đối — trên máy bay, tàu hỏa và văn phòng đông đúc.",
    accent: "#ff6b00",
    stat: "8 mic",
    statLabel: "Hệ thống chống ồn",
  },
  {
    id: 2,
    badge: "02 / Chất lượng âm thanh",
    title: "Âm nhạc đúng như nghệ sĩ mong muốn",
    body: "LDAC truyền âm thanh lên tới 990 kbps — gấp ba lần Bluetooth thông thường. DSEE Extreme AI phục hồi nhạc nén gần chuẩn Hi-Res ngay tức thì.",
    accent: "#8b5cf6",
    stat: "990 kbps",
    statLabel: "Tốc độ truyền LDAC",
  },
  {
    id: 3,
    badge: "03 / Thời lượng pin",
    title: "Không bỏ lỡ một nhịp nào",
    body: "30 giờ với ANC. 40 giờ khi tắt. Khi sắp hết pin, sạc USB-C 3 phút cho bạn 3 giờ nghe nhạc đầy đủ. Năng lượng kéo dài hơn hành trình của bạn.",
    accent: "#22c55e",
    stat: "40 giờ",
    statLabel: "Thời lượng pin tối đa",
  },
  {
    id: 4,
    badge: "04 / Kết nối thông minh",
    title: "Luôn đồng bộ mượt mà",
    body: "Công nghệ Multipoint giữ bạn kết nối với điện thoại và máy tính cùng lúc. Speak-to-Chat tự động dừng nhạc khi bạn bắt đầu trò chuyện.",
    accent: "#0066cc",
    stat: "×2",
    statLabel: "Thiết bị đồng thời",
  },
];

function SceneCard({ scene, index }: { scene: typeof scenes[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="scrolly-scene"
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: isEven ? "1fr 1fr" : "1fr 1fr",
        gap: 80, alignItems: "center",
        padding: "80px 0",
        borderBottom: "1px solid var(--border-color)",
      }}
        className="scrolly-inner"
      >
        {/* Text side */}
        <div style={{ order: isEven ? 0 : 1 }}>
          <motion.div style={{ y }}>
            <span style={{
              display: "inline-block",
              background: scene.accent + "18",
              color: scene.accent,
              fontSize: 11, fontWeight: 700,
              letterSpacing: "2px", textTransform: "uppercase",
              padding: "5px 14px", borderRadius: 50, marginBottom: 24,
            }}>{scene.badge}</span>

            <h3 style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800, letterSpacing: "-1px",
              color: "var(--text-primary)", marginBottom: 20, lineHeight: 1.1,
            }}>{scene.title}</h3>

            <p style={{
              fontSize: 16, color: "var(--text-secondary)",
              lineHeight: 1.8, marginBottom: 40, maxWidth: 460,
            }}>{scene.body}</p>

            {/* Stat callout */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 16,
              background: "var(--bg-card)",
              border: `1px solid ${scene.accent}40`,
              borderRadius: 16, padding: "16px 24px",
              boxShadow: `0 4px 20px ${scene.accent}15`,
            }}>
              <div style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: 36, fontWeight: 900,
                color: scene.accent,
              }}>{scene.stat}</div>
              <div style={{
                fontSize: 13, color: "var(--text-muted)",
                fontWeight: 500, lineHeight: 1.4,
              }}>{scene.statLabel}</div>
            </div>
          </motion.div>
        </div>

        {/* Visual side */}
        <div style={{ order: isEven ? 1 : 0, position: "relative" }}>
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
          >
            {/* Glow */}
            <div style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(circle at center, ${scene.accent}15 0%, transparent 70%)`,
              borderRadius: 24, filter: "blur(20px)",
            }} />

            {/* Visual card */}
            <div style={{
              background: "var(--bg-card)",
              border: `1px solid ${scene.accent}25`,
              borderRadius: 24,
              aspectRatio: "4/3",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
              boxShadow: `0 20px 60px ${scene.accent}15`,
            }}>
              <Image
                src={index < 2 ? "/sony-hero.png" : "/sony-silver.png"}
                alt={scene.title}
                fill
                style={{ objectFit: "contain", padding: 30, opacity: 0.92 }}
              />
              {/* Accent overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(135deg, ${scene.accent}08 0%, transparent 60%)`,
                pointerEvents: "none",
              }} />
              {/* Number badge */}
              <div style={{
                position: "absolute", bottom: 20, right: 20,
                background: scene.accent,
                borderRadius: 12, padding: "8px 14px",
                color: "#fff", fontFamily: "var(--font-space-grotesk)",
                fontWeight: 800, fontSize: 20,
              }}>0{scene.id}</div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .scrolly-inner {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .scrolly-inner > div { order: 0 !important; }
        }
      `}</style>
    </motion.div>
  );
}

export default function Scrollytelling() {
  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="scrollytelling"
      className="section-padding"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <span style={{
            display: "inline-block",
            background: "rgba(255,107,0,0.1)", color: "var(--accent)",
            fontSize: 12, fontWeight: 700, letterSpacing: "2px",
            textTransform: "uppercase", padding: "6px 18px",
            borderRadius: 50, marginBottom: 20,
            border: "1px solid rgba(255,107,0,0.2)",
          }}>Câu chuyện</span>
          <h2 style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, letterSpacing: "-1.5px",
            color: "var(--text-primary)", marginBottom: 20,
          }}>
            Bốn lý do để{" "}
            <span className="gradient-text">chọn XM5</span>
          </h2>
          <p style={{
            fontSize: 17, color: "var(--text-secondary)",
            maxWidth: 480, margin: "0 auto", lineHeight: 1.7,
          }}>
            Kéo xuống để khám phá câu chuyện về cách từng chi tiết được thiết kế hoàn hảo.
          </p>
        </motion.div>

        {scenes.map((scene, i) => (
          <SceneCard key={scene.id} scene={scene} index={i} />
        ))}
      </div>
    </section>
  );
}
