import { useState, useEffect } from "react";
import "./App.css";

// ============================================================================
// PROFILE PHOTO / AVATAR CONFIGURATION
// To display your photo once ready:
// 1. Place your image file in 'src/assets/' (e.g. 'profile.jpg')
// 2. Import it at the top: import myPhoto from "./assets/profile.jpg";
// 3. Set PROFILE_PHOTO_SRC = myPhoto; below.
// When null, a modern developer monogram avatar placeholder is rendered.
// ============================================================================
const PROFILE_PHOTO_SRC = null;

// Official GitHub Profile
const GITHUB_USERNAME = "God-of-Bugs";
const GITHUB_PROFILE_URL = "https://github.com/God-of-Bugs";

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
      }
    } catch {
      // Gracefully handle environments with restricted localStorage
    }
    return "light";
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Real GitHub API live state (with robust verified fallback values)
  const [githubStats, setGithubStats] = useState({
    repos: 6,
    followers: 2,
    loading: true,
  });

  const [recentEvents, setRecentEvents] = useState([
    {
      id: "ev-1",
      repo: "God-of-Bugs/Neon-Override",
      type: "PushEvent",
      description: "Pushed updates to Godot 3D game repository",
    },
    {
      id: "ev-2",
      repo: "God-of-Bugs/BLOOMKEEPER-",
      type: "PublicEvent",
      description: "Open-sourced Godot 3D pacifist game project",
    },
    {
      id: "ev-3",
      repo: "God-of-Bugs/suraksha-vr",
      type: "PushEvent",
      description: "Updated VR interactive experience systems",
    },
  ]);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Ignore storage errors
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Fetch real public GitHub stats tokenlessly without exposing credentials
  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          if (isMounted) {
            setGithubStats({
              repos: userData.public_repos ?? 6,
              followers: userData.followers ?? 2,
              loading: false,
            });
          }
        } else {
          if (isMounted) {
            setGithubStats((prev) => ({ ...prev, loading: false }));
          }
        }

        const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`);
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          if (isMounted && Array.isArray(eventsData) && eventsData.length > 0) {
            const mapped = eventsData.slice(0, 3).map((e) => {
              let desc = "Pushed code updates";
              if (e.type === "PublicEvent") desc = "Public repository activity";
              else if (e.type === "CreateEvent") desc = `Created ${e.payload?.ref_type || "branch"}`;
              else if (e.type === "WatchEvent") desc = "Starred repository";

              return {
                id: e.id,
                repo: e.repo?.name || `${GITHUB_USERNAME}/project`,
                type: e.type,
                description: desc,
              };
            });
            setRecentEvents(mapped);
          }
        }
      } catch {
        // Fallback to verified local stats if offline or rate-limited
        if (isMounted) {
          setGithubStats((prev) => ({ ...prev, loading: false }));
        }
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className={`portfolio ${theme}`} data-theme={theme}>
      {/* Navigation Header */}
      <header className="header">
        <nav className="navbar" aria-label="Main Navigation">
          <a href="#home" className="logo" onClick={closeMobileMenu}>
            <span className="logo-badge" aria-hidden="true">MG</span>
            <span className="logo-text">Mayank Gupta</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#activity">Activity</a>
            <a href="#contact">Contact</a>

            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              <span className="toggle-icon" aria-hidden="true">
                {theme === "light" ? "🌙" : "☀️"}
              </span>
              <span className="toggle-text">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </span>
            </button>
          </div>

          {/* Mobile Actions: Theme button + Hamburger */}
          <div className="mobile-nav-actions">
            <button
              type="button"
              className="theme-toggle theme-toggle-mobile"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              <span aria-hidden="true">{theme === "light" ? "🌙" : "☀️"}</span>
            </button>

            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className={`hamburger-icon ${mobileMenuOpen ? "open" : ""}`} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu" role="dialog" aria-label="Mobile Navigation">
            <div className="mobile-menu-links">
              <a href="#home" onClick={closeMobileMenu}>Home</a>
              <a href="#about" onClick={closeMobileMenu}>About</a>
              <a href="#skills" onClick={closeMobileMenu}>Skills</a>
              <a href="#projects" onClick={closeMobileMenu}>Projects</a>
              <a href="#activity" onClick={closeMobileMenu}>Activity</a>
              <a href="#contact" onClick={closeMobileMenu}>Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Landmark */}
      <main>
        {/* Home Section */}
        <section id="home" className="hero-section">
          <div className="hero-ambient hero-ambient-1" aria-hidden="true" />
          <div className="hero-ambient hero-ambient-2" aria-hidden="true" />

          <div className="container hero-container">
            <div className="hero-content">
              <div className="welcome-pill">
                <span className="pulse-dot" aria-hidden="true" />
                <span className="welcome-text">WELCOME TO MY PORTFOLIO</span>
              </div>

              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">Mayank Kumar Gupta</span>
              </h1>

              <div className="role-tag-row">
                <span className="role-badge">React Developer</span>
                <span className="role-dot" aria-hidden="true">•</span>
                <span className="role-sub">Game Developer</span>
              </div>

              <p className="home-description">
                I am a frontend developer and game developer working with
                React and Godot to create interactive digital experiences.
              </p>

              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">
                  <span>View My Projects</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Contact Me
                </a>
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  title="Visit Mayank's verified GitHub profile (@God-of-Bugs)"
                >
                  <svg
                    className="btn-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Profile Avatar / Photo Slot */}
            <div className="hero-visual">
              <div className="hero-card">
                <div className="hero-image-wrapper">
                  {PROFILE_PHOTO_SRC ? (
                    <img
                      src={PROFILE_PHOTO_SRC}
                      alt="Mayank Kumar Gupta"
                      className="hero-avatar"
                    />
                  ) : (
                    /* Tasteful Developer Monogram & Avatar Placeholder (No invented photograph) */
                    <div className="avatar-placeholder" aria-label="Profile photo placeholder">
                      <div className="avatar-monogram">
                        <span className="monogram-initials">MKG</span>
                      </div>
                      <div className="avatar-placeholder-meta">
                        <span className="avatar-name">Mayank Kumar Gupta</span>
                        <span className="avatar-tag">Frontend & Game Dev</span>
                      </div>
                      <div className="avatar-status-pill">
                        <span className="status-ping" aria-hidden="true" />
                        <span>Ready for final photo</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating Tech Badges */}
                <div className="hero-floating-badge badge-react">
                  <span className="badge-icon" aria-hidden="true">⚛️</span>
                  <div className="badge-meta">
                    <strong>React.js</strong>
                    <span>Frontend Dev</span>
                  </div>
                </div>
                <div className="hero-floating-badge badge-godot">
                  <span className="badge-icon" aria-hidden="true">🎮</span>
                  <div className="badge-meta">
                    <strong>Godot 3D</strong>
                    <span>Game Dev</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section about-section">
          <div className="container">
            <div className="section-header">
              <span className="section-eyebrow">ABOUT ME</span>
              <h2>About Me</h2>
            </div>

            <div className="about-card">
              <div className="about-text-content">
                <p className="about-lead">
                  I'm a frontend developer and game developer with an interest
                  in building modern web applications and interactive games.
                  I enjoy working with React and Godot to turn ideas into
                  functional digital experiences.
                </p>

                <div className="about-grid">
                  <div className="about-feature">
                    <div className="feature-icon" aria-hidden="true">💻</div>
                    <div className="feature-info">
                      <h3>Frontend Engineering</h3>
                      <p>
                        Building modern, modular, and responsive user interfaces
                        leveraging React and modern component architecture.
                      </p>
                    </div>
                  </div>

                  <div className="about-feature">
                    <div className="feature-icon" aria-hidden="true">🕹️</div>
                    <div className="feature-info">
                      <h3>Interactive Game Development</h3>
                      <p>
                        Designing 3D worlds, responsive gameplay loops, and immersive
                        digital mechanics with the Godot engine.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section skills-section">
          <div className="container">
            <div className="section-header">
              <span className="section-eyebrow">TECHNICAL TOOLKIT</span>
              <h2>My Skills</h2>
              <p className="section-subtitle">
                Core technologies I work with to bring web and interactive ideas to life.
              </p>
            </div>

            <div className="skills-grid">
              {/* React Skill Card */}
              <div className="skill-card">
                <div className="skill-card-top">
                  <div className="skill-icon-badge react-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="2" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      <path d="M2 12a15.3 15.3 0 0 1 10-4 15.3 15.3 0 0 1 10 4 15.3 15.3 0 0 1-10 4 15.3 15.3 0 0 1-10-4z" />
                    </svg>
                  </div>
                  <span className="skill-category">Frontend</span>
                </div>
                <h3>React</h3>
                <p>
                  Building modern and responsive frontend applications.
                </p>
                <div className="skill-tags">
                  <span className="skill-tag">Components</span>
                  <span className="skill-tag">JSX</span>
                  <span className="skill-tag">Responsive UI</span>
                  <span className="skill-tag">Hooks</span>
                </div>
              </div>

              {/* Python Skill Card */}
              <div className="skill-card">
                <div className="skill-card-top">
                  <div className="skill-icon-badge python-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 9H7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h5v-4H9" />
                      <path d="M12 15h5a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3h-5v4h3" />
                      <circle cx="9" cy="6" r="1" fill="currentColor" />
                      <circle cx="15" cy="18" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="skill-category">Programming</span>
                </div>
                <h3>Python</h3>
                <p>
                  Programming and developing useful applications.
                </p>
                <div className="skill-tags">
                  <span className="skill-tag">Logic & Algorithms</span>
                  <span className="skill-tag">Scripting</span>
                  <span className="skill-tag">Applications</span>
                </div>
              </div>

              {/* Godot Skill Card */}
              <div className="skill-card">
                <div className="skill-card-top">
                  <div className="skill-icon-badge godot-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="20" height="12" rx="4" />
                      <path d="M6 12h4m-2-2v4" />
                      <line x1="15" y1="11" x2="15.01" y2="11" strokeWidth="3" />
                      <line x1="18" y1="13" x2="18.01" y2="13" strokeWidth="3" />
                    </svg>
                  </div>
                  <span className="skill-category">Game Engine</span>
                </div>
                <h3>Godot</h3>
                <p>
                  Developing interactive 3D games and gameplay systems.
                </p>
                <div className="skill-tags">
                  <span className="skill-tag">3D Gameplay</span>
                  <span className="skill-tag">Physics</span>
                  <span className="skill-tag">Game Logic</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section projects-section">
          <div className="container">
            <div className="section-header">
              <span className="section-eyebrow">PORTFOLIO SHOWCASE</span>
              <h2>My Projects</h2>
              <p className="section-subtitle">
                A selection of applications and interactive projects I have developed.
              </p>
            </div>

            <div className="projects-grid">
              {/* Project 1: YT Music Clone */}
              <article className="project-card">
                <div className="project-card-header">
                  <div className="project-tag-pill web-tag">Web Application</div>
                  <span className="project-year">React Project</span>
                </div>
                <h3>YT Music Clone</h3>
                <p>
                  A frontend project inspired by the YouTube Music
                  experience.
                </p>
                <div className="project-tech-stack">
                  <span className="tech-badge">React</span>
                  <span className="tech-badge">CSS Modules</span>
                  <span className="tech-badge">Audio UI</span>
                  <span className="tech-badge">Frontend</span>
                </div>
                <div className="project-card-actions">
                  <a
                    href="#contact"
                    className="btn-project btn-project-secondary"
                    title="Source repository link required — connect via contact section"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="btn-icon" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>Source Code</span>
                  </a>
                  <span
                    className="btn-project btn-project-disabled"
                    title="Live demo URL to be configured"
                  >
                    <span>Demo ↗</span>
                  </span>
                </div>
              </article>

              {/* Project 2: Overrider (Renamed from Neon Ridder) */}
              <article className="project-card">
                <div className="project-card-header">
                  <div className="project-tag-pill game-tag">Game Development</div>
                  <span className="project-year">Godot Project</span>
                </div>
                <h3>Overrider</h3>
                <p>
                  A game development project created using Godot.
                </p>
                <div className="project-tech-stack">
                  <span className="tech-badge">Godot Engine</span>
                  <span className="tech-badge">GDScript</span>
                  <span className="tech-badge">3D Gameplay</span>
                  <span className="tech-badge">Game Systems</span>
                </div>
                <div className="project-card-actions">
                  <a
                    href="#contact"
                    className="btn-project btn-project-secondary"
                    title="Source repository link required — connect via contact section"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="btn-icon" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>Source Code</span>
                  </a>
                  <span
                    className="btn-project btn-project-disabled"
                    title="Live demo URL to be configured"
                  >
                    <span>Demo ↗</span>
                  </span>
                </div>
              </article>

              {/* Project 3: BLOOMKEEPER */}
              <article className="project-card">
                <div className="project-card-header">
                  <div className="project-tag-pill game-tag">Game Development</div>
                  <span className="project-year">Godot 3D</span>
                </div>
                <h3>BLOOMKEEPER</h3>
                <p>
                  A 3D pacifist game project developed using the Godot engine.
                </p>
                <div className="project-tech-stack">
                  <span className="tech-badge">Godot Engine</span>
                  <span className="tech-badge">GDScript</span>
                  <span className="tech-badge">3D Pacifist Gameplay</span>
                  <span className="tech-badge">Game Systems</span>
                </div>
                <div className="project-card-actions">
                  <a
                    href="https://github.com/God-of-Bugs/BLOOMKEEPER-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-project btn-project-secondary"
                    title="View BLOOMKEEPER- repository on GitHub"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="btn-icon" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>Source Code ↗</span>
                  </a>
                  <span
                    className="btn-project btn-project-disabled"
                    title="Live demo URL to be configured"
                  >
                    <span>Demo ↗</span>
                  </span>
                </div>
              </article>

              {/* Project 4: Surksha VR */}
              <article className="project-card">
                <div className="project-card-header">
                  <div className="project-tag-pill vr-tag">Virtual Reality</div>
                  <span className="project-year">VR Experience</span>
                </div>
                <h3>Surksha VR</h3>
                <p>
                  An interactive VR-focused project exploring immersive
                  digital experiences.
                </p>
                <div className="project-tech-stack">
                  <span className="tech-badge">VR Simulation</span>
                  <span className="tech-badge">3D Environments</span>
                  <span className="tech-badge">Interactive Tech</span>
                </div>
                <div className="project-card-actions">
                  <a
                    href="#contact"
                    className="btn-project btn-project-secondary"
                    title="Source repository link required — connect via contact section"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="btn-icon" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>Source Code</span>
                  </a>
                  <span
                    className="btn-project btn-project-disabled"
                    title="Live demo URL to be configured"
                  >
                    <span>Demo ↗</span>
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* GitHub Activity & Contributions Section */}
        <section id="activity" className="section activity-section">
          <div className="container">
            <div className="section-header">
              <span className="section-eyebrow">OPEN SOURCE & CONTRIBUTIONS</span>
              <h2>GitHub Activity</h2>
              <p className="section-subtitle">
                Real public contribution history and repositories for{" "}
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="activity-user-link"
                >
                  @{GITHUB_USERNAME}
                </a>
              </p>
            </div>

            {/* GitHub Metrics Overview */}
            <div className="activity-stats-grid">
              <div className="stat-card">
                <span className="stat-label">Public Repositories</span>
                <strong className="stat-value">{githubStats.repos}</strong>
                <span className="stat-desc">Projects & prototypes</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">GitHub Followers</span>
                <strong className="stat-value">{githubStats.followers}</strong>
                <span className="stat-desc">Community network</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Core Focus</span>
                <strong className="stat-value focus-value">React & Godot</strong>
                <span className="stat-desc">Frontend & 3D Gameplay</span>
              </div>
            </div>

            {/* GitHub Contribution Calendar Heatmap */}
            <div className="contribution-card">
              <div className="contribution-card-top">
                <div className="contribution-meta">
                  <div className="gh-icon-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3>Contribution Calendar</h3>
                    <p>Verified public contribution squares on GitHub</p>
                  </div>
                </div>

                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-project btn-project-secondary"
                  title="View full GitHub profile"
                >
                  <span>@{GITHUB_USERNAME} ↗</span>
                </a>
              </div>

              {/* Real GitHub Contribution Heatmap SVG Container */}
              <div className="calendar-scroll-wrapper">
                <img
                  src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
                  alt={`${GITHUB_USERNAME}'s GitHub Contribution Calendar`}
                  className="github-chart-img"
                  loading="lazy"
                />
              </div>

              {/* Recent Public Activity Feed */}
              <div className="recent-activity-section">
                <h4 className="recent-activity-title">Recent Public Repository Activity</h4>
                <div className="activity-event-list">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="activity-event-item">
                      <span className="event-bullet" aria-hidden="true" />
                      <div className="event-details">
                        <strong className="event-repo">{event.repo}</strong>
                        <span className="event-desc">{event.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="calendar-footer">
                <p className="calendar-note">
                  Activity is sourced live from GitHub's public API and public contribution chart.
                </p>
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <span>Explore Repositories on GitHub ↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <div className="contact-card">
              <div className="contact-icon-bubble" aria-hidden="true">✉️</div>
              <span className="section-eyebrow">GET IN TOUCH</span>
              <h2>Contact Me</h2>

              <p className="contact-description">
                Interested in working together? Feel free to connect directly via GitHub.
              </p>

              <div className="contact-cta-wrapper">
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                  title="Visit Mayank's verified GitHub profile (@God-of-Bugs)"
                >
                  <svg
                    className="btn-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>Connect on GitHub (@God-of-Bugs)</span>
                </a>
              </div>

              {/* Explicit status indicating public email is pending confirmation */}
              <div className="contact-status-box">
                <span className="status-indicator pending-indicator" aria-hidden="true" />
                <span className="status-text">
                  Direct public contact email is currently <strong>pending configuration</strong>.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">Mayank Kumar Gupta</a>
            <p className="footer-tagline">React Developer & Game Developer</p>
          </div>

          <div className="footer-nav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#activity">Activity</a>
            <a href="#contact">Contact</a>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-external-link"
            >
              GitHub (@God-of-Bugs) ↗
            </a>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Mayank Kumar Gupta. All rights reserved.</p>
            <a href="#home" className="back-to-top" aria-label="Back to top of page">
              <span>Back to Top</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
