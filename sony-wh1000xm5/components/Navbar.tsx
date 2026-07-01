"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved === "dark" || (!saved && prefersDark);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const handleCartUpdate = () => {
      const c = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(c.length);
    };
    window.addEventListener("cartUpdate", handleCartUpdate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cartUpdate", handleCartUpdate);
    };
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const links = [
    { href: "#features", label: "Tính Năng" },
    { href: "#specs", label: "Thông Số" },
    { href: "#pricing", label: "Giá" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-color)" : "none",
      }}
    >
      <div className="container-custom">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
          >
            <div style={{
              width: 36, height: 36,
              background: "linear-gradient(135deg, #ff6b00, #ff8c3a)",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, color: "#fff", fontSize: 14, fontFamily: "var(--font-space-grotesk)"
            }}>S</div>
            <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 18, color: "var(--text-primary)" }}>
              SONY
            </span>
          </motion.a>

          {/* Desktop links */}
          <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="hidden md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              id="nav-cart"
              style={{
                position: "relative", background: "none", border: "none",
                cursor: "pointer", color: "var(--text-primary)", padding: 8,
              }}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: "absolute", top: 0, right: 0,
                    width: 18, height: 18, borderRadius: "50%",
                    background: "var(--accent)", color: "#fff",
                    fontSize: 10, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >{cartCount}</motion.span>
              )}
            </motion.button>

            {/* Dark mode toggle */}
            <motion.button
              id="theme-toggle"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 180 }}
              onClick={toggleTheme}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "50%",
                width: 40, height: 40,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--text-primary)",
                transition: "all 0.3s ease",
              }}
              aria-label="Chuyển đổi chế độ sáng/tối"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* CTA */}
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary hidden md:inline-flex"
              style={{ padding: "10px 24px", fontSize: 14 }}
              id="nav-buy-now"
            >
              Mua Ngay – $349
            </motion.a>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)", display: "flex" }}
              className="flex md:hidden"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "var(--nav-bg)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid var(--border-color)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ color: "var(--text-primary)", textDecoration: "none", fontSize: 16, fontWeight: 500 }}
                >
                  {link.label}
                </a>
              ))}
              <a href="#pricing" className="btn-primary" style={{ textAlign: "center", padding: "12px 24px" }}>
                Mua Ngay – $349
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
