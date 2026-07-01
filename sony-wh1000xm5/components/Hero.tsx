"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ChevronDown, Zap } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const [imageLoaded, setImageLoaded] = useState(false);
  const words = ["Tĩnh lặng", "Tuyệt hảo", "Trong trẻo", "Tự do"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "30giờ", label: "Thời lượng pin" },
    { value: "8", label: "Micro" },
    { value: "30mm", label: "Loa 30mm" },
    { value: "3phút", label: "Sạc nhanh" },
  ];
  return (
    <section
      ref={ref}
      id="hero"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg-primary)",
      }}
    >
      {/* Parallax BG gradient */}
      <motion.div
        style={{ y, position: "absolute", inset: 0, zIndex: 0 }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(255,107,0,0.08) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 50% 50% at 20% 80%, rgba(0,102,204,0.05) 0%, transparent 60%)",
        }} />
      </motion.div>

      {/* Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            background: i % 2 === 0 ? "rgba(255,107,0,0.4)" : "rgba(0,102,204,0.3)",
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${6 + i}s`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        style={{ opacity, scale, width: "100%", position: "relative", zIndex: 1 }}
      >
        <div className="container-custom">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
            paddingTop: 100,
            paddingBottom: 60,
          }}
            className="hero-grid"
          >
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.3)",
                  borderRadius: 50, padding: "6px 16px", marginBottom: 28,
                }}
              >
                <Zap size={14} color="#ff6b00" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#ff6b00" }}>
                  Tai nghe ANC tốt nhất thế giới 2024
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "clamp(40px, 5vw, 68px)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: 16,
                  color: "var(--text-primary)",
                  letterSpacing: "-2px",
                }}
              >
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="gradient-text"
                  style={{ display: "inline-block" }}
                >
                  {words[wordIndex]}.
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontSize: "clamp(15px, 2vw, 18px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: 40,
                  maxWidth: 480,
                }}
              >
                Sony WH-1000XM5 định nghĩa lại khả năng khử ồn với{" "}
                <strong style={{ color: "var(--text-primary)" }}>8 micro</strong> và{" "}
                <strong style={{ color: "var(--text-primary)" }}>hai bộ xử lý</strong>.
                Nghe nhạc của bạn, không phải tiếng ồn bên ngoài.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
              >
                <a href="#pricing" className="btn-primary" id="hero-order-now">
                  Đặt Ngay – $349
                </a>
                <a href="#scrollytelling" className="btn-secondary" id="hero-watch-story">
                  <Play size={16} />
                  Khám Phá Câu Chuyện
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{
                  display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 24, marginTop: 56,
                  paddingTop: 40,
                  borderTop: "1px solid var(--border-color)",
                }}
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontSize: "clamp(20px, 2.5vw, 28px)",
                      fontWeight: 800,
                      color: "var(--accent)",
                    }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right – Product image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: "relative", display: "flex", justifyContent: "center" }}
            >
              {/* Glow ring */}
              <div style={{
                position: "absolute",
                width: "75%", height: "75%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)",
                top: "12%", left: "12%",
                filter: "blur(30px)",
              }} />

              {/* Skeleton */}
              {!imageLoaded && (
                <div
                  className="skeleton"
                  style={{ width: "90%", aspectRatio: "1", borderRadius: 24 }}
                />
              )}

              {/* product */}
              <motion.div
                style={{ width: "90%", position: "relative" }}
              >
                <Image
                  src="/sony-hero.png"
                  alt="Sony WH-1000XM5 Wireless Headphones - Black Edition"
                  width={600}
                  height={600}
                  priority
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.4))",
                    display: imageLoaded ? "block" : "none",
                  }}
                  onLoad={() => setImageLoaded(true)}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute", bottom: 32, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}
      >
        <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
          Cuộn xuống
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
      </motion.div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};