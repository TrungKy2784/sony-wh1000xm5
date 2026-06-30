"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mic, Battery, Music, Cpu, Smartphone, MessageSquare
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "8-Mic Array ANC",
    subtitle: "Industry-Leading Noise Cancellation",
    desc: "8 microphones paired with dual noise-canceling chips — QN1 HD + V1 — detect and eliminate ambient noise across all frequencies in real time.",
    accent: "#ff6b00",
    tag: "Flagship ANC",
  },
  {
    icon: Battery,
    title: "30-Hour Battery",
    subtitle: "All-Day, All-Night Listening",
    desc: "30 hours with ANC on, 40 hours without. Quick Charge gives you 3 hours of playback from just 3 minutes of charging.",
    accent: "#22c55e",
    tag: "Ultra Endurance",
  },
  {
    icon: Music,
    title: "LDAC Hi-Res Audio",
    subtitle: "Studio-Quality Wireless Sound",
    desc: "LDAC codec transmits 3× more data than standard Bluetooth. Pair with DSEE Extreme AI to upscale compressed audio to near Hi-Res quality.",
    accent: "#8b5cf6",
    tag: "Hi-Res Audio",
  },
  {
    icon: Cpu,
    title: "DSEE Extreme AI",
    subtitle: "AI Audio Enhancement",
    desc: "Machine learning analyzes the music genre and instruments in real time, restoring lost details from compressed streaming audio sources.",
    accent: "#0066cc",
    tag: "AI Powered",
  },
  {
    icon: Smartphone,
    title: "Multipoint Connect",
    subtitle: "Two Devices, Zero Friction",
    desc: "Stay connected to two Bluetooth devices simultaneously. Seamlessly switch audio between your phone, laptop, or tablet without re-pairing.",
    accent: "#ec4899",
    tag: "Multipoint",
  },
  {
    icon: MessageSquare,
    title: "Speak-to-Chat",
    subtitle: "Intelligent Auto-Pause",
    desc: "Start speaking and the headphones automatically pause your music and activate ambient sound mode so you can have a conversation — hands free.",
    accent: "#f59e0b",
    tag: "Smart Feature",
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
            Why WH-1000XM5
          </span>
          <h2 style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, letterSpacing: "-1.5px",
            color: "var(--text-primary)", marginBottom: 20,
          }}>
            Engineered for{" "}
            <span className="gradient-text">Perfection</span>
          </h2>
          <p style={{
            fontSize: 17, color: "var(--text-secondary)",
            maxWidth: 540, margin: "0 auto", lineHeight: 1.7,
          }}>
            Every detail of the WH-1000XM5 has been refined to deliver an unmatched listening experience.
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
