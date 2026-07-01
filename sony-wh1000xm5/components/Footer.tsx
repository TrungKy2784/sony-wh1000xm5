"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, Play, Camera, Users } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    Product: [
      { label: "Tính Năng", href: "#features" },
      { label: "Thông Số", href: "#specs" },
      { label: "Giá", href: "#pricing" },
    ],
    Support: [
      { label: "FAQ", href: "#newsletter" },
      { label: "Bảo Hành", href: "#pricing" },
      { label: "Đổi trả", href: "#pricing" },
      { label: "Liên hệ", href: "#newsletter" },
    ],
    Company: [
      { label: "Về Sony", href: "https://sony.com", external: true },
      { label: "Báo chí", href: "#" },
      { label: "Tuyển Dụng", href: "#" },
      { label: "Bền vững", href: "#" },
    ],
  };

  const socials = [
    { icon: Globe, href: "https://sony.com", label: "Website" },
    { icon: Play, href: "https://youtube.com/Sony", label: "YouTube" },
    { icon: Camera, href: "https://instagram.com/Sony", label: "Instagram" },
    { icon: Users, href: "https://facebook.com/Sony", label: "Facebook" },
  ];

  return (
    <footer style={{
      background: "var(--bg-secondary)",
      borderTop: "1px solid var(--border-color)",
      paddingTop: 80, paddingBottom: 40,
    }}>
      <div className="container-custom">
        {/* Top grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 60, marginBottom: 64,
        }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "linear-gradient(135deg, #ff6b00, #ff8c3a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 900, fontSize: 18,
                fontFamily: "var(--font-space-grotesk)",
              }}>S</div>
              <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 800, fontSize: 20, color: "var(--text-primary)" }}>
                SONY
              </span>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: 280, marginBottom: 28 }}>
              Sony Electronics — tiên phong công nghệ âm thanh từ năm 1946. WH-1000XM5 là đỉnh cao của kỹ thuật âm thanh không dây.
            </p>
            {/* Socials */}
            <div style={{ display: "flex", gap: 12 }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-secondary)", textDecoration: "none",
                    transition: "color 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.borderColor = "var(--border-color)";
                  }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: 13, fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "1.5px", textTransform: "uppercase",
                marginBottom: 20,
              }}>{category}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={"external" in item && item.external ? "_blank" : undefined}
                      rel={"external" in item && item.external ? "noopener noreferrer" : undefined}
                      style={{
                        fontSize: 14, color: "var(--text-secondary)",
                        textDecoration: "none", transition: "color 0.2s ease",
                        display: "flex", alignItems: "center", gap: 4,
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                    >
                      {item.label}
                      {"external" in item && item.external && <ExternalLink size={11} />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
            © {currentYear} Sony Electronics Inc. Bảo lưu mọi quyền. WH-1000XM5 là thương hiệu của Sony.
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
