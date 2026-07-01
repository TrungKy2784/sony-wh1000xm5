"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Alex Johnson",
    title: "Audiophile & Music Producer",
    avatar: "AJ",
    rating: 5,
    date: "March 2024",
    review: "I've tried every premium headphone on the market. The WH-1000XM5 is in a class of its own. The noise cancellation is so good it feels like wearing earplugs — but you still hear your music in stunning clarity. LDAC with a hi-res source is breathtaking.",
    tag: "Verified Purchase",
    color: "#ff6b00",
  },
  {
    name: "Sarah Chen",
    title: "Daily Commuter, NYC",
    avatar: "SC",
    rating: 5,
    date: "February 2024",
    review: "Taking the NYC subway every day used to be exhausting. Now I put on the XM5 and the world disappears. 30 hours of battery means I charge once a week. The Speak-to-Chat feature is magical — I just start talking and it pauses the music automatically.",
    tag: "Verified Purchase",
    color: "#8b5cf6",
  },
  {
    name: "Marcus Williams",
    title: "Remote Software Engineer",
    avatar: "MW",
    rating: 5,
    date: "January 2024",
    review: "Working from home with kids running around? These headphones saved my productivity. Multipoint lets me stay connected to my phone and MacBook simultaneously. The call quality is crystal clear — my clients always comment on how good I sound.",
    tag: "Verified Purchase",
    color: "#22c55e",
  },
  {
    name: "Emma Davis",
    title: "Frequent Flyer, 100K miles/year",
    avatar: "ED",
    rating: 5,
    date: "April 2024",
    review: "I fly over 100,000 miles a year for work. These headphones have completely transformed long-haul flights. The noise cancellation eliminates engine roar entirely. Battery lasts the entire flight from NYC to Tokyo without charging. Worth every penny.",
    tag: "Verified Purchase",
    color: "#0066cc",
  },
  {
    name: "James Park",
    title: "Gym Enthusiast",
    avatar: "JP",
    rating: 4,
    date: "March 2024",
    review: "Great headphones overall. The comfort is top-notch for long sessions — I wear them 4 hours straight at my desk. Sound quality is incredible. The only minor gripe is they're not ideal for intense workouts, but for everything else they're perfect.",
    tag: "Verified Purchase",
    color: "#f59e0b",
  },
  {
    name: "Priya Patel",
    title: "Graduate Student",
    avatar: "PP",
    rating: 5,
    date: "May 2024",
    review: "As a PhD student who needs to focus in libraries and coffee shops, these headphones are life-changing. The ANC is superior to any competition. I can listen at low volumes and hear everything clearly while the ANC blocks all background noise perfectly.",
    tag: "Verified Purchase",
    color: "#ec4899",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + reviews.length) % reviews.length);
  };

  const visible = [
    reviews[(current) % reviews.length],
    reviews[(current + 1) % reviews.length],
    reviews[(current + 2) % reviews.length],
  ];

  return (
    <section id="reviews" className="section-padding" style={{ background: "var(--bg-primary)", overflow: "hidden" }}>
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
          }}>Reviews</span>
          <h2 style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, letterSpacing: "-1.5px",
            color: "var(--text-primary)", marginBottom: 16,
          }}>
            Loved by{" "}
            <span className="gradient-text">Thousands</span>
          </h2>
          {/* Rating summary */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12 }}>
            {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="#ff6b00" color="#ff6b00" />)}
            <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 20, fontWeight: 800, marginLeft: 6, color: "var(--text-primary)" }}>4.8</span>
            <span style={{ color: "var(--text-muted)", fontSize: 14 }}>/ 5.0 · 2,847 reviews</span>
          </div>
        </motion.div>

        {/* Cards */}
        <div style={{ position: "relative" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24, marginBottom: 48,
          }}>
            <AnimatePresence mode="popLayout">
              {visible.map((review, i) => (
                <motion.div
                  key={review.name + current}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 60 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 20, padding: 28,
                    position: "relative",
                  }}
                >
                  {/* Quote mark */}
                  <div style={{
                    position: "absolute", top: 20, right: 24,
                    fontSize: 64, fontFamily: "Georgia", lineHeight: 1,
                    color: review.color + "20", fontWeight: 900,
                  }}>"</div>

                  {/* Stars */}
                  <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} size={14} fill="#ff6b00" color="#ff6b00" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p style={{
                    fontSize: 14, color: "var(--text-secondary)",
                    lineHeight: 1.75, marginBottom: 24,
                  }}>&ldquo;{review.review}&rdquo;</p>

                  {/* Author */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${review.color}, ${review.color}88)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: 700, fontSize: 13,
                      flexShrink: 0,
                    }}>{review.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>
                        {review.name}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{review.title}</div>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <span style={{
                        background: "rgba(34,197,94,0.1)", color: "#22c55e",
                        fontSize: 10, fontWeight: 700, padding: "3px 8px",
                        borderRadius: 50, display: "block",
                      }}>✓ {review.tag}</span>
                      <span style={{ fontSize: 11, color: "var(--text-muted)", display: "block", textAlign: "right", marginTop: 2 }}>
                        {review.date}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
            <motion.button
              id="reviews-prev"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={() => paginate(-1)}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "var(--bg-card)", border: "1px solid var(--border-color)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--text-primary)",
              }}
            ><ChevronLeft size={20} /></motion.button>

            {reviews.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                style={{
                  width: i === current ? 24 : 8,
                  height: 8, borderRadius: 4, border: "none",
                  background: i === current ? "var(--accent)" : "var(--border-color)",
                  cursor: "pointer", transition: "all 0.3s ease",
                }}
              />
            ))}

            <motion.button
              id="reviews-next"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={() => paginate(1)}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "var(--bg-card)", border: "1px solid var(--border-color)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--text-primary)",
              }}
            ><ChevronRight size={20} /></motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
