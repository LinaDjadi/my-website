import React, { useEffect, useMemo, useRef, useState } from "react";
import "./portfolio.css";

// Import your images
import lianTechLogo from "./assets/image.png";
import ecoLifeLogo from "./assets/image (1).png";
import novaTechLogo from "./assets/image (2).png";
import backoffice1 from "./assets/Capture d'écran 2025-10-15 232424.png";
import backoffice2 from "./assets/Capture d'écran 2025-10-15 232443.png";
import barefaceHome from "./assets/Modern Business Bareface WordPress Theme - Homepage.jpeg";
import barefaceBlog from "./assets/Modern Business Bareface WordPress Theme - Blog Layout.jpeg";
import barefaceBooking from "./assets/Modern Business Bareface WordPress Theme - Booking System.jpeg";

// ---------- Small inline icons (no libs needed) ----------
const IconPalette = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="skill-icon">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0 0 20h1a3 3 0 0 0 3-3v-1a2 2 0 0 1 2-2h1a3 3 0 0 0 3-3A11 11 0 0 0 12 2Zm-4.5 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
    />
  </svg>
);

const IconGear = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="skill-icon">
    <path
      fill="currentColor"
      d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96c-.5-.38-1.04-.7-1.64-.94l-.36-2.54A.5.5 0 0 0 13.9 1h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.6.24-1.14.56-1.64.94l-2.39-.96a.5.5 0 0 0-.6.22L2.7 7.48a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L2.82 14.52a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.3.6.22l2.39-.96c.5.38 1.04.7 1.64.94l.36 2.54c.04.24.25.42.49.42h3.8c.24 0 .45-.18.49-.42l.36-2.54c.6-.24 1.14-.56 1.64-.94l2.39.96c.22.09.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z"
    />
  </svg>
);

const IconMobile = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="skill-icon">
    <path
      fill="currentColor"
      d="M16 1H8a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-4 21a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM18 17H6V4h12v13Z"
    />
  </svg>
);

const IconPen = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="skill-icon">
    <path
      fill="currentColor"
      d="m14.06 9 0.94.94L6.92 18H6v-.92L14.06 9Zm3.15-5.15a1.5 1.5 0 0 1 2.12 0l.82.82a1.5 1.5 0 0 1 0 2.12l-1.84 1.84L15.37 5.7l1.84-1.85ZM5 19h4l10.73-10.73-4-4L5 14v5Z"
    />
  </svg>
);

// ---------- Reusable Carousel ----------
function Carousel({ items, index, setIndex, onImageClick, counterVariant = "overlay" }) {
  // Safety guard (prevents crash if items missing)
  if (!items || !items.length) return null;

  const current = items[index];

  const next = () => setIndex((p) => (p === items.length - 1 ? 0 : p + 1));
  const prev = () => setIndex((p) => (p === 0 ? items.length - 1 : p - 1));

  return (
    <div className="carousel">
      <div className="carousel-media">
        <img
          src={current.image}
          alt={current.title}
          className="carousel-img"
          onClick={() => onImageClick(current.image, current.title)}
          loading="lazy"
        />

        <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Previous">
          ‹
        </button>
        <button className="carousel-btn carousel-next" onClick={next} aria-label="Next">
          ›
        </button>

        {counterVariant === "overlay" && (
          <div className="carousel-counter-overlay">
            {index + 1}/{items.length}
          </div>
        )}
      </div>

      <div className="carousel-indicators">
        {items.map((_, i) => (
          <button
            key={i}
            className={`indicator ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Main ----------
const Portfolio = () => {
  const [currentBackofficeIndex, setCurrentBackofficeIndex] = useState(0);
  const [currentBarefaceIndex, setCurrentBarefaceIndex] = useState(0);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  const [activeSection, setActiveSection] = useState("home");

  const [zoomModal, setZoomModal] = useState({ isOpen: false, image: null, title: "" });
  const [zoomScale, setZoomScale] = useState(1);

  const sectionsRef = useRef(["home", "skills", "projects", "contact"]);

  const backofficeProjects = useMemo(
    () => [
      { image: backoffice1, title: "Password Management Interface" },
      { image: backoffice2, title: "Dashboard Analytics" },
    ],
    []
  );

  const barefaceProjects = useMemo(
    () => [
      { image: barefaceHome, title: "Homepage Design" },
      { image: barefaceBlog, title: "Blog Layout" },
      { image: barefaceBooking, title: "Booking System" },
    ],
    []
  );

  const lianTechLogos = useMemo(
    () => [
      { image: lianTechLogo, title: "Lian Tech - Primary Logo" },
      { image: ecoLifeLogo, title: "Lian Tech - Alternative Logo Variation" },
      { image: novaTechLogo, title: "Lian Tech - Monochrome Version" },
    ],
    []
  );

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSendMessage = () => {
    const email = "djadilina56@gmail.com";
    const subject = "Portfolio Inquiry";
    const body = "Hello Lina,\n\nI would like to get in touch with you regarding...";
    window.open(
      `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
  };

  const openZoomModal = (image, title) => {
    setZoomScale(1);
    setZoomModal({ isOpen: true, image, title });
  };

  const closeZoomModal = () => {
    setZoomModal({ isOpen: false, image: null, title: "" });
    setZoomScale(1);
  };

  const handleModalBackgroundClick = (e) => {
    if (e.target === e.currentTarget) closeZoomModal();
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeZoomModal();
    };

    if (zoomModal.isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomModal.isOpen]);

  useEffect(() => {
    const ids = sectionsRef.current;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((x) => x.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const skillCards = useMemo(
    () => [
      {
        title: "Frontend",
        icon: <IconPalette />,
        desc: "Creating beautiful, responsive user interfaces",
        items: ["HTML", "CSS", "JavaScript", "React.js"],
      },
      {
        title: "Backend",
        icon: <IconGear />,
        desc: "Building robust server-side applications",
        items: ["PHP", "Laravel", "API Development"],
      },
      {
        title: "Mobile",
        icon: <IconMobile />,
        desc: "Cross-platform and native mobile development",
        items: ["Flutter", "Kotlin"],
      },
      {
        title: "Design",
        icon: <IconPen />,
        desc: "Visual identity and UI/UX-ready assets",
        items: ["Logo Design", "Brochure Design", "Business Card Design", "WordPress"],
      },
    ],
    []
  );

  return (
    <div className="portfolio-container">
      {/* Zoom Modal */}
      {zoomModal.isOpen && (
        <div className="zoom-modal" onClick={handleModalBackgroundClick} role="dialog" aria-modal="true">
          <div className="zoom-modal-content">
            <button className="zoom-close-btn" onClick={closeZoomModal} aria-label="Close">
              ×
            </button>

            <div className="zoom-image-container">
              <img
                src={zoomModal.image}
                alt={zoomModal.title}
                className="zoom-image"
                style={{ transform: `scale(${zoomScale})` }}
              />
            </div>

            <div className="zoom-modal-footer">
              <p className="zoom-image-title">{zoomModal.title}</p>
              <div className="zoom-controls">
                <button className="zoom-btn" onClick={() => setZoomScale((s) => Math.min(3, +(s + 0.2).toFixed(2)))}>
                  Zoom In
                </button>
                <button className="zoom-btn" onClick={() => setZoomScale((s) => Math.max(0.5, +(s - 0.2).toFixed(2)))}>
                  Zoom Out
                </button>
                <button className="zoom-btn" onClick={() => setZoomScale(1)}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="navbar">
        <div className="nav-container">
          <button className="brand" onClick={() => scrollToSection("home")} aria-label="Go to home">
            <span className="brand-bracket">&lt;</span>
            Lina <span className="brand-accent">Dev</span>
            <span className="brand-bracket">/&gt;</span>
          </button>

          <ul className="nav-menu">
            {[
              { id: "home", label: "Home" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <li key={item.id} className="nav-item">
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-pill">Welcome to my portfolio</div>

          <h1 className="hero-title">
            Hi, I&apos;m <span className="hero-accent">Lina</span>
          </h1>
          <h2 className="hero-subtitle">A Web &amp; Mobile Developer</h2>

          <p className="hero-description">
            Recent graduate specializing in full-stack web and mobile development. I enjoy building modern, responsive
            applications with clean code and intuitive user interfaces.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection("contact")}>
              Get In Touch
            </button>
            <button className="btn btn-secondary" onClick={() => scrollToSection("projects")}>
              View Projects
            </button>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills-section">
        <div className="section-container">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">A comprehensive toolkit for building modern web and mobile applications</p>

          <div className="skills-grid">
            {skillCards.map((c) => (
              <div key={c.title} className="skill-card">
                <div className="skill-card-icon">{c.icon}</div>
                <h3 className="skill-card-title">{c.title}</h3>
                <p className="skill-card-desc">{c.desc}</p>

                <div className="skill-pill-grid">
                  {c.items.map((x) => (
                    <span key={x} className="skill-pill">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects-section">
        <div className="section-container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">A selection of recent work showcasing my development and design capabilities</p>

          <div className="projects-grid">
            {/* Brochure (NO IMAGES) */}
            <div className="project-card">
              <div className="project-top">
                <span className="project-chip">DESIGN</span>
              </div>

              <div className="project-body project-body--single">
                <div className="project-details">
                  <h3 className="project-title">Nutrition Program Brochure</h3>
                  <p className="project-subtitle">Medical Nutrition Brochure Design</p>

                  <p className="project-text">
                    Designed a nutrition program brochure targeting women aged 35–55, focusing on menopause support and
                    hormonal balance. Includes meal plans, nutritional guidance, and supplement integration.
                  </p>

                  <div className="project-tech">
                    <span className="tech-tag">Arabic RTL</span>
                    <span className="tech-tag">Print Design</span>
                    <span className="tech-tag">Responsive</span>
                  </div>

                  <div className="project-features">
                    <h4>Key Features:</h4>
                    <ul>
                      <li>Bilingual (French/Arabic) content</li>
                      <li>Print-optimized landscape A4 layout</li>
                      <li>Medical-grade nutrition information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* WordPress */}
            <div className="project-card">
              <div className="project-top">
                <span className="project-chip">WORDPRESS</span>
              </div>

              <div className="project-body">
                <div className="project-details">
                  <h3 className="project-title">Modern Business Bareface</h3>
                  <p className="project-subtitle">WordPress Business Site</p>

                  <p className="project-text">
                    Custom WordPress theme and plugins for a local business. Includes booking system, blog, and responsive
                    design optimized for performance.
                  </p>

                  <div className="project-tech">
                    <span className="tech-tag">WordPress</span>
                    <span className="tech-tag">PHP</span>
                    <span className="tech-tag">Plugins</span>
                  </div>
                </div>

                <div className="project-media">
                  <Carousel
                    items={barefaceProjects}
                    index={currentBarefaceIndex}
                    setIndex={setCurrentBarefaceIndex}
                    onImageClick={openZoomModal}
                    counterVariant="overlay"
                  />
                </div>
              </div>
            </div>

            {/* NAFTAL */}
            <div className="project-card">
              <div className="project-top">
                <span className="project-chip">WEB APP</span>
              </div>

              <div className="project-body">
                <div className="project-details">
                  <h3 className="project-title">Digitization of Public Procurement</h3>
                  <p className="project-subtitle">React + Laravel Web Application</p>

                  <p className="project-text">
                    A web app for NAFTAL that helps manage public contracts and tenders more easily, focusing on automation
                    and user-friendly workflows.
                  </p>

                  <div className="project-tech">
                    <span className="tech-tag">React.js</span>
                    <span className="tech-tag">Laravel</span>
                    <span className="tech-tag">API</span>
                    <span className="tech-tag">CSS</span>
                  </div>
                </div>

                <div className="project-media">
                  <Carousel
                    items={backofficeProjects}
                    index={currentBackofficeIndex}
                    setIndex={setCurrentBackofficeIndex}
                    onImageClick={openZoomModal}
                    counterVariant="overlay"
                  />
                </div>
              </div>
            </div>

            {/* Branding */}
            <div className="project-card">
              <div className="project-top">
                <span className="project-chip">BRANDING</span>
              </div>

              <div className="project-body">
                <div className="project-details">
                  <h3 className="project-title">Lian Tech Brand Identity</h3>
                  <p className="project-subtitle">Logo Design &amp; Brand System</p>

                  <p className="project-text">
                    Complete brand identity system for Lian Tech featuring multiple logo variations, color palettes, and
                    brand guidelines.
                  </p>

                  <div className="project-tech">
                    <span className="tech-tag">Branding</span>
                    <span className="tech-tag">Logo Design</span>
                    <span className="tech-tag">Visual Identity</span>
                  </div>
                </div>

                <div className="project-media">
                  <Carousel
                    items={lianTechLogos}
                    index={currentLogoIndex}
                    setIndex={setCurrentLogoIndex}
                    onImageClick={openZoomModal}
                    counterVariant="overlay"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <h2 className="section-title">Let&apos;s Connect</h2>
          <p className="contact-intro">I&apos;d love to hear from you. Get in touch for collaborations or just a friendly hello!</p>

          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-row">
                <div>
                  <h4 className="contact-label">Email</h4>
                  <p className="contact-value">djadilina56@gmail.com</p>
                </div>
              </div>

              <div className="contact-row">
                <div>
                  <h4 className="contact-label">LinkedIn</h4>
                  <a
                    href="https://www.linkedin.com/in/lina-djadi-257b2a2a6/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    <span className="linkedin-dot" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              <div className="contact-row">
                <div>
                  <h4 className="contact-label">Phone</h4>
                  <p className="contact-value subtle">Available upon request</p>
                </div>
              </div>
            </div>

            <div className="contact-card contact-cta">
              <p className="contact-message">
                Whether you have a project in mind, need a developer for your team, or want a clean modern website — send
                me a message and let’s talk.
              </p>
              <button className="btn btn-primary" onClick={handleSendMessage}>
                Send Me a Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <p>© {new Date().getFullYear()} Lina — Web &amp; Mobile Developer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
