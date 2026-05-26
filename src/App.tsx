import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  "Python", "MySQL", "PHP", "JavaScript", "HTML", "CSS",
  "PWA", "Hostinger", "GitHub Desktop", "phpMyAdmin",
  "Responsive Design", "Automation", "Scrum Agile",
  "Version Control", "Mobile App Development",
];

export default function App() {
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach((section) => {
      const el = document.getElementById(section.toLowerCase());
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(section); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      await emailjs.send(
        "service_qjxecht",
        "template_9x090fh",
        {
          name: formData.name,
          user_name: formData.name,
          user_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        "CAzdRDLw2qg5wObQg"
      );
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="app">
      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-inner">
          <span className="logo" onClick={() => scrollTo("home")}>PORTFOLIO</span>

          <nav className={`nav ${menuOpen ? "nav--open" : ""}`}>
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                className={`nav-link ${activeSection === link ? "nav-link--active" : ""}`}
                onClick={() => scrollTo(link)}
              >
                {link}
              </button>
            ))}
            <button
              className="resume-btn"
              onClick={() => window.open("/Wesley's Resume -Final.pdf", "_blank")}
            >
              Resume ↗
            </button>
          </nav>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── HOME ── */}
      <section id="home" className="section section--hero">
        <div className="hero-bg" />
        <div className="hero-portrait">
          <img src="/profile.jpg" alt="Wesley Fuentes Bibon" />
        </div>
        <div className="container hero-content">
          <p className="hero-eyebrow">Hello, I'm</p>
          <h1 className="hero-name">Wesley<br />Fuentes Bibon</h1>
          <p className="hero-tagline">
            Fresh graduate from Laguna University with a BSIT degree specializing in Business Analytics.
            Passionate about developing websites and applications that leverage the latest features the internet has to offer.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("projects")}>View My Work</button>
            <button className="btn-ghost" onClick={() => scrollTo("contact")}>Get In Touch</button>
          </div>
          <div className="hero-scroll-hint">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-label">01 — About</div>
          <h2 className="section-title">Who I Am</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm Wesley Fuentes Bibon, a fresh graduate from Laguna University with a Bachelor of Science
                in Information Technology, specializing in Business Analytics (Class of 2025–2026). My passion
                lies in developing modern websites and applications that leverage cutting-edge web technologies.
                I enjoy exploring new features the internet has to offer and implementing them in practical,
                business-focused solutions.
              </p>
              <blockquote className="about-motto">
                "Building the future, one line of code at a time."
              </blockquote>

              <ul className="about-achievements">
                {[
                  "Developed and published PureFace mobile application on Google Play Store",
                  "Technical Lead for Grievease – PWA Business Suite (Capstone Project)",
                  "Managed version control with GitHub and GitHub Desktop",
                  "Deployed production applications on Hostinger",
                  "Implemented PWA capabilities for cross-platform accessibility",
                ].map((item) => (
                  <li key={item}><span className="bullet">▸</span>{item}</li>
                ))}
              </ul>
            </div>

            <div className="about-sidebar">
              <div className="about-card">
                <div className="about-card-icon">🎓</div>
                <div>
                  <div className="about-card-label">Education</div>
                  <div className="about-card-value">BS Information Technology</div>
                  <div className="about-card-sub">Business Analytics Specialization</div>
                  <div className="about-card-sub">Laguna University — Class of 2025–2026</div>
                </div>
              </div>
              <div className="about-card">
                <div className="about-card-icon">📍</div>
                <div>
                  <div className="about-card-label">Location</div>
                  <div className="about-card-value">Laguna, Philippines</div>
                  <div className="about-card-sub">Open to Hybrid / Remote Work</div>
                </div>
              </div>
              <div className="about-card">
                <div className="about-card-icon">📞</div>
                <div>
                  <div className="about-card-label">Contact</div>
                  <div className="about-card-value">+63 975 793 5655</div>
                  <div className="about-card-sub">wesleyfuentes2k22@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section section--dark">
        <div className="container">
          <div className="section-label">02 — Skills</div>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">Technologies I work with</p>
          <div className="skills-grid">
            {SKILLS.map((skill) => (
              <div className="skill-badge" key={skill}>{skill}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section">
        <div className="container">
          <div className="section-label">03 — Projects</div>
          <h2 className="section-title">Selected Work</h2>

          {/* Project 1 */}
          <div className="project-card">
            <div className="project-header">
              <div>
                <span className="project-tag">Capstone Project</span>
                <h3 className="project-title">Grievease — PWA Business Suite</h3>
              </div>
              <div className="project-links">
                <a href="https://github.com/wisel-ctrl/grievease-hostinger" target="_blank" rel="noreferrer" className="project-link">
                  GitHub ↗
                </a>
                <a href="https://grievease.com" target="_blank" rel="noreferrer" className="project-link project-link--primary">
                  Live Demo ↗
                </a>
              </div>
            </div>
            <p className="project-desc">
              A Progressive Web Application developed for VJay Relova Funeral Services to modernize operations
              with forecasting analytics, POS integration, inter-branch data consolidation, and real-time
              messaging with SMS notifications.
            </p>
            <div className="project-meta-grid">
              <div className="project-meta-item">
                <span className="meta-label">My Role</span>
                <span className="meta-value">Technical Lead · Automation · PWA Integration · Deployment</span>
              </div>
              <div className="project-meta-item">
                <span className="meta-label">Key Contributions</span>
                <span className="meta-value">GitHub Version Control · Hostinger Deployment · PWA Installation Setup</span>
              </div>
              <div className="project-meta-item">
                <span className="meta-label">Methodology</span>
                <span className="meta-value">Scrum Agile · Iterative Planning · Continuous Improvement</span>
              </div>
            </div>
            <div className="project-stack">
              {["PHP", "MySQL", "JavaScript", "PWA", "Hostinger", "GitHub Desktop", "SMS Integration"].map((t) => (
                <span className="stack-chip" key={t}>{t}</span>
              ))}
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card">
            <div className="project-header">
              <div>
                <span className="project-tag">Published on Play Store</span>
                <h3 className="project-title">PureFace — Mobile Application</h3>
              </div>
              <div className="project-links">
                <a
                  href="https://play.google.com/store/apps/details?id=com.wisle.purefaceapplication"
                  target="_blank"
                  rel="noreferrer"
                  className="project-link project-link--primary"
                >
                  Play Store ↗
                </a>
              </div>
            </div>
            <p className="project-desc">
              A mobile application developed and published on Google Play Store, showcasing the ability to build,
              deploy, and maintain production-ready applications for real users.
            </p>
            <div className="project-meta-grid">
              <div className="project-meta-item">
                <span className="meta-label">Platform</span>
                <span className="meta-value">Android · Google Play Store</span>
              </div>
              <div className="project-meta-item">
                <span className="meta-label">Package ID</span>
                <span className="meta-value">com.wisle.purefaceapplication</span>
              </div>
              <div className="project-meta-item">
                <span className="meta-label">Status</span>
                <span className="meta-value status-live">🟢 Live · Available for Download</span>
              </div>
            </div>
            <div className="project-stack">
              {["Mobile Development", "Android", "Google Play Console", "App Publishing"].map((t) => (
                <span className="stack-chip" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section section--dark">
        <div className="container">
          <div className="section-label">04 — Contact</div>
          <h2 className="section-title">Connect With Me</h2>
          <p className="section-subtitle">Let's build something amazing together</p>

          <div className="contact-grid">
            {/* Info */}
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <div className="contact-item-label">Email</div>
                  <a href="mailto:wesleyfuentes2k22@gmail.com" className="contact-item-value">
                    wesleyfuentes2k22@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <div className="contact-item-label">Phone</div>
                  <div className="contact-item-value">+63 975 793 5655</div>
                  <div className="contact-item-sub">Available for Calls / Text</div>
                </div>
              </div>

              <div className="socials">
                <a href="https://www.linkedin.com/in/bibon-wesley-f-b76b8a29b/" target="_blank" rel="noreferrer" className="social-link">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
                <a href="https://github.com/wisel-ctrl" target="_blank" rel="noreferrer" className="social-link">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <a href="https://www.facebook.com/wesley10022002" target="_blank" rel="noreferrer" className="social-link">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
                <a href="https://www.instagram.com/wesleyfuentesbibon/" target="_blank" rel="noreferrer" className="social-link">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Instagram
                </a>
              </div>
            </div>

            {/* Form */}
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary btn-full" disabled={formStatus === "sending"}>
                {formStatus === "sending" ? "Sending…" : "Send Message →"}
              </button>
              {formStatus === "success" && (
                <div className="form-msg form-msg--success">✓ Message sent! I'll get back to you soon.</div>
              )}
              {formStatus === "error" && (
                <div className="form-msg form-msg--error">✕ Something went wrong. Please try again or email me directly.</div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <span className="footer-logo">PORTFOLIO</span>
          <span className="footer-copy">© {new Date().getFullYear()} Wesley Fuentes Bibon — Built with React & TypeScript</span>
        </div>
      </footer>
    </div>
  );
}