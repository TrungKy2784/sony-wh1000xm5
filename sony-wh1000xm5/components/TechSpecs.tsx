"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ target, suffix = "", duration = 2000 }: {
  target: number; suffix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const specs = [
  {
    label: "Microphones",
    value: 8,
    suffix: "",
    unit: "Mics",
    desc: "Dual noise-canceling chip processing",
    color: "#ff6b00",
    icon: "🎤",
  },
  {
    label: "Battery Life",
    value: 30,
    suffix: "h",
    unit: "Hours",
    desc: "With noise canceling active",
    color: "#22c55e",
    icon: "🔋",
  },
  {
    label: "Driver Unit",
    value: 30,
    suffix: "mm",
    unit: "Driver",
    desc: "Carbon fiber composite dome",
    color: "#8b5cf6",
    icon: "🔊",
  },
  {
    label: "Quick Charge",
    value: 3,
    suffix: "min",
    unit: "Charge",
    desc: "= 3 hours of playback",
    color: "#0066cc",
    icon: "⚡",
  },
  {
    label: "Weight",
    value: 250,
    suffix: "g",
    unit: "Grams",
    desc: "Ultralight comfort design",
    color: "#ec4899",
    icon: "⚖️",
  },
  {
    label: "Bluetooth",
    value: 5,
    suffix: ".2",
    unit: "Version",
    desc: "Multipoint dual-device pairing",
    color: "#f59e0b",
    icon: "📶",
  },
];

const specRows = [
  { label: "Model", value: "WH-1000XM5" },
  { label: "Type", value: "Over-ear, closed" },
  { label: "Frequency Response", value: "4Hz – 40,000Hz" },
  { label: "Impedance", value: "48 Ω" },
  { label: "Sensitivity", value: "102 dB/mW" },
  { label: "Noise Canceling", value: "Industry-Leading ANC" },
  { label: "Processors", value: "QN1 HD + V1 (Dual)" },
  { label: "Codec Support", value: "LDAC, AAC, SBC" },
  { label: "Bluetooth Version", value: "5.2" },
  { label: "Bluetooth Profile", value: "A2DP, AVRCP, HFP, HSP" },
  { label: "Battery (ANC on)", value: "30 hours" },
  { label: "Battery (ANC off)", value: "40 hours" },
  { label: "Quick Charge", value: "3 min → 3 hours" },
  { label: "Charging Port", value: "USB-C" },
  { label: "Weight", value: "250 g" },
  { label: "Colors", value: "Midnight Black, Platinum Silver" },
];

export default function TechSpecs() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      id="specs"
      className="section-padding"
      style={{ background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}
    >
      {/* BG accent */}
      <div style={{
        position: "absolute", top: "10%", right: "-5%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <span style={{
            display: "inline-block",
            background: "rgba(255,107,0,0.1)", color: "var(--accent)",
            fontSize: 12, fontWeight: 700, letterSpacing: "2px",
            textTransform: "uppercase", padding: "6px 18px",
            borderRadius: 50, marginBottom: 20,
            border: "1px solid rgba(255,107,0,0.2)",
          }}>Tech Specs</span>
          <h2 style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, letterSpacing: "-1.5px",
            color: "var(--text-primary)", marginBottom: 20,
          }}>
            Numbers That{" "}
            <span className="gradient-text">Speak</span>
          </h2>
        </motion.div>

        {/* Animated stat cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: 20, marginBottom: 80,
        }}>
          {specs.map((spec, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inView = useInView(ref, { once: true });
            return (
              <motion.div
                key={spec.label}
                ref={ref}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${spec.color}30`,
                  borderRadius: 20, padding: "28px 20px",
                  textAlign: "center",
                  boxShadow: `0 4px 20px ${spec.color}10`,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{spec.icon}</div>
                <div style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 800,
                  color: spec.color,
                  lineHeight: 1,
                  marginBottom: 6,
                }}>
                  <AnimatedCounter target={spec.value} suffix={spec.suffix} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                  {spec.unit}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{spec.desc}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Full spec table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: 24, overflow: "hidden",
          }}
        >
          <div style={{
            padding: "24px 32px",
            borderBottom: "1px solid var(--border-color)",
            background: "var(--bg-secondary)",
          }}>
            <h3 style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 20, fontWeight: 700, color: "var(--text-primary)",
            }}>
              Full Specifications – Sony WH-1000XM5
            </h3>
          </div>
          {specRows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                padding: "16px 32px",
                borderBottom: i < specRows.length - 1 ? "1px solid var(--border-color)" : "none",
                background: i % 2 === 0 ? "transparent" : "var(--bg-secondary)",
              }}
            >
              <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 500 }}>
                {row.label}
              </span>
              <span style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 600 }}>
                {row.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
