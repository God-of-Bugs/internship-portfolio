import { useState, useEffect, useCallback, useRef } from "react";
import mayankProfile from "./assets/mayank-profile.webp";
import "./App.css";

// ============================================================================
// PROFILE & CREDENTIAL DATA STRUCTURES (Prepared for future owner management)
// ============================================================================
const CONTACT_EMAIL = "itsMayank.codes@gmail.com";
const GITHUB_USERNAME = "God-of-Bugs";
const GITHUB_PROFILE_URL = "https://github.com/God-of-Bugs";
const BLOOMKEEPER_REPO_URL = "https://github.com/God-of-Bugs/BLOOMKEEPER-";

const ROLES = ["Frontend Developer", "Godot Game Developer"];

const PROFILE_DATA = {
  name: "Mayank Kumar Gupta",
  badgeInitials: "MG",
  shortBio:
    "B.Tech Computer Science student building responsive web applications with React and interactive 3D games with Godot Engine. Focused on practical software engineering, clean code, and engaging user experiences.",
  location: "India",
  tagline: "Code / Create / Build",
};

// Curated projects list - factual, no invented URLs
const FEATURED_PROJECTS = [
  {
    id: "yt-music-clone",
    title: "YT Music Clone",
    category: "Frontend Web Application",
    badgeType: "React Project",
    description:
      "A responsive web player interface inspired by YouTube Music, built with React to experiment with audio player state, playlist management, and modern component design.",
    tags: ["React", "JavaScript", "CSS3", "Audio UI"],
    repoUrl: null,
    demoUrl: null,
    bannerTheme: "banner-yt",
  },
  {
    id: "overrider",
    title: "Overrider",
    category: "3D Action Game",
    badgeType: "Godot 3D",
    description:
      "A 3D action game developed in Godot Engine exploring responsive third-person character movement, combat mechanics, camera orientation, and game loop pacing.",
    tags: ["Godot Engine", "GDScript", "3D Mechanics", "Character Controller"],
    repoUrl: null,
    demoUrl: null,
    bannerTheme: "banner-overrider",
  },
  {
    id: "bloomkeeper",
    title: "BLOOMKEEPER",
    category: "3D Pacifist Adventure",
    badgeType: "Godot 3D Game",
    description:
      "A 3D pacifist game built with Godot where players restore light and vitality to a corrupted world through environmental exploration, non-violent mechanics, and atmosphere.",
    tags: ["Godot Engine", "GDScript", "3D Environment", "Game Systems"],
    repoUrl: BLOOMKEEPER_REPO_URL,
    demoUrl: null,
    bannerTheme: "banner-bloom",
  },
  {
    id: "surksha-vr",
    title: "Surksha VR",
    category: "VR Safety Simulation",
    badgeType: "VR Experience",
    description:
      "An interactive virtual reality simulation developed in Godot Engine focusing on hazard identification, safety protocol awareness, and real-world risk training scenarios.",
    tags: ["Godot Engine", "GDScript", "VR Simulation", "Interactive Training"],
    repoUrl: null,
    demoUrl: null,
    bannerTheme: "banner-vr",
  },
];

// Categorized skills toolkit based strictly on verified areas
const SKILLS_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend Development",
    shortName: "Frontend",
    iconType: "react",
    summary:
      "Developing component-driven user interfaces, responsive layouts, and clean client-side state flow using modern web standards.",
    skills: [
      { name: "React", detail: "Component architecture, hooks, state synchronization, and modular UI structure" },
      { name: "JavaScript (ES6+)", detail: "Modern asynchronous workflows, DOM events, fetch API, and clean syntax" },
      { name: "HTML5", detail: "Semantic markup, accessibility landmarks, and structured document hierarchy" },
      { name: "CSS3", detail: "Flexbox, CSS Grid, custom properties, animations, and responsive media queries" },
      { name: "Responsive Web Design", detail: "Fluid layouts ensuring seamless presentation across desktop, tablet, and mobile" },
      { name: "UI Implementation", detail: "Translating wireframes and design systems into pixel-polished, functional code" },
    ],
  },
  {
    id: "gamedev",
    title: "Game Development",
    shortName: "Game Dev",
    iconType: "godot",
    summary:
      "Building gameplay systems, scene graphs, physics-based movement, and player interactions in Godot Engine.",
    skills: [
      { name: "Godot Engine", detail: "Scene architecture, node hierarchies, viewport management, and 2D/3D project setup" },
      { name: "GDScript", detail: "Game logic scripting, signals, custom resources, and object-oriented structure" },
      { name: "2D/3D Gameplay Development", detail: "Player movement, third-person controller mechanics, and environmental interaction" },
      { name: "Gameplay Systems", detail: "State machines, camera orientation, collision physics, and game loop timing" },
      { name: "UI Integration", detail: "In-game HUDs, menus, health indicators, and responsive dialogue/control overlays" },
      { name: "Debugging & Testing", detail: "Profiling scene performance, script error diagnosis, and collision box validation" },
    ],
  },
  {
    id: "tools",
    title: "Programming & Tools",
    shortName: "Tools",
    iconType: "code",
    summary:
      "Writing algorithmic logic, scripting utilities, version-controlling repositories, and collaborating on GitHub.",
    skills: [
      { name: "Python", detail: "Problem solving, scripting utilities, data manipulation, and clean algorithmic code" },
      { name: "Git", detail: "Branching strategies, atomic commits, diff inspection, and local repository versioning" },
      { name: "GitHub", detail: "Remote repository hosting, issue tracking, open-source workflow, and pull requests" },
    ],
  },
];

// ============================================================================
// PROFESSIONAL VECTOR ICONS
// ============================================================================

function ReactLogo({ size = 24, className = "tech-icon" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="-11.5 -10.23174 23 20.46348"
      aria-hidden="true"
    >
      <circle cx="0" cy="0" r="2.05" fill="#38bdf8" />
      <g stroke="#38bdf8" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function GodotLogo({ size = 24, className = "tech-icon" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 128 128"
      aria-hidden="true"
    >
      <path
        d="M114.906 84.145s-.172-1.04-.27-1.028l-18.823 1.817a3.062 3.062 0 00-2.77 2.84l-.516 7.413-14.566 1.04-.988-6.72a3.089 3.089 0 00-3.04-2.62H54.067a3.089 3.089 0 00-3.039 2.62l-.988 6.72-14.566-1.04-.516-7.414a3.058 3.058 0 00-2.77-2.84l-18.835-1.816c-.094-.012-.168 1.028-.266 1.028l-.024 4.074 15.954 2.574.52 7.477a3.084 3.084 0 002.843 2.847l20.059 1.434c.078.004.152.008.226.008a3.087 3.087 0 003.031-2.621l1.02-6.915h14.57l1.02 6.915a3.088 3.088 0 003.254 2.613l20.062-1.434a3.084 3.084 0 002.844-2.847l.52-7.477 15.945-2.586zm0 0"
        fill="#ffffff"
      />
      <path
        d="M13.086 53.422v30.723c.059 0 .113.003.168.007L32.09 85.97a2.027 2.027 0 011.828 1.875l.582 8.316 16.426 1.172 1.133-7.672a2.03 2.03 0 012.007-1.734h19.868a2.03 2.03 0 012.007 1.734l1.133 7.672 16.43-1.172.578-8.316a2.027 2.027 0 011.828-1.875l18.828-1.817c.055-.004.11-.007.168-.007V81.69h.008V53.42c2.652-3.335 5.16-7.019 7.086-10.116-2.941-5.008-6.543-9.48-10.395-13.625a101.543 101.543 0 00-10.316 6.004c-1.64-1.633-3.484-2.965-5.3-4.36-1.782-1.43-3.79-2.48-5.696-3.703.566-4.223.848-8.379.96-12.719-4.913-2.476-10.155-4.113-15.456-5.293-2.117 3.559-4.055 7.41-5.738 11.176-2-.332-4.008-.457-6.02-.48V20.3c-.016 0-.027.004-.039.004s-.023-.004-.04-.004v.004c-2.01.023-4.019.148-6.019.48-1.683-3.765-3.62-7.617-5.738-11.176-5.3 1.18-10.543 2.817-15.457 5.293.113 4.34.395 8.496.961 12.72-1.906 1.222-3.914 2.273-5.695 3.702-1.813 1.395-3.66 2.727-5.301 4.36a101.543 101.543 0 00-10.316-6.004C12.543 33.824 8.94 38.297 6 43.305c2.313 3.629 4.793 7.273 7.086 10.117zm0 0"
        fill="#478cbf"
      />
      <path
        d="M98.008 89.84l-.582 8.36a2.024 2.024 0 01-1.88 1.878l-20.062 1.434c-.046.004-.097.004-.144.004-.996 0-1.86-.73-2.004-1.73l-1.152-7.806H55.816l-1.152 7.805a2.026 2.026 0 01-2.148 1.727l-20.063-1.434a2.024 2.024 0 01-1.879-1.879l-.582-8.36-16.937-1.632c.008 1.82.03 3.816.03 4.211 0 17.887 22.692 26.484 50.88 26.582h.07c28.188-.098 50.871-8.695 50.871-26.582 0-.402.024-2.39.031-4.211zm0 0"
        fill="#478cbf"
      />
      <circle cx="37.3" cy="65.9" r="11.35" fill="#ffffff" />
      <circle cx="37.3" cy="65.9" r="7.53" fill="#2d3748" />
      <path
        d="M64 78.277c-2.02 0-3.652-1.488-3.652-3.32v-10.45c0-1.831 1.632-3.32 3.652-3.32 2.016 0 3.656 1.489 3.656 3.32v10.45c0 1.832-1.64 3.32-3.656 3.32"
        fill="#2d3748"
      />
      <circle cx="90.7" cy="65.9" r="11.35" fill="#ffffff" />
      <circle cx="90.7" cy="65.9" r="7.53" fill="#2d3748" />
    </svg>
  );
}

function PythonLogo({ size = 24, className = "tech-icon" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M11.914 2c-4.992 0-4.68 2.164-4.68 2.164l.006 2.244h4.74v.672H5.24s-3.24.368-3.24 4.704c0 4.336 2.828 4.184 2.828 4.184h1.688v-2.368s-.092-2.828 2.776-2.828h4.748s2.684.044 2.684-2.616V4.688S17.078 2 11.914 2zm-2.584 1.484a.972.972 0 1 1 0 1.944.972.972 0 0 1 0-1.944z"
        fill="#38bdf8"
      />
      <path
        d="M12.086 22c4.992 0 4.68-2.164 4.68-2.164l-.006-2.244h-4.74v-.672h6.74s3.24-.368 3.24-4.704c0-4.336-2.828-4.184-2.828-4.184h-1.688v2.368s.092 2.828-2.776 2.828H9.998s-2.684-.044-2.684 2.616v3.472S6.922 22 12.086 22zm2.584-1.484a.972.972 0 1 1 0-1.944.972.972 0 0 1 0 1.944z"
        fill="#fbbf24"
      />
    </svg>
  );
}

function OctocatIcon({ size = 20, className = "gh-icon" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function MailIcon({ size = 18, className = "mail-icon" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function CopyIcon({ size = 16, className = "copy-icon" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ size = 16, className = "check-icon" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
      }
    } catch {
      // Gracefully handle restricted storage environments
    }
    return "dark"; // Default to deep navy theme
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active section tracking for navbar highlighting
  const [activeSection, setActiveSection] = useState("home");

  // Hero animated role transition state
  const [roleIndex, setRoleIndex] = useState(0);
  const [isRoleFading, setIsRoleFading] = useState(false);

  // Interactive skills category tab state
  const [activeSkillCategory, setActiveSkillCategory] = useState("frontend");

  // Email clipboard copy feedback state
  const [emailCopied, setEmailCopied] = useState(false);

  // Live GitHub Public Statistics (no fabricated counts, no fake baseline)
  const [githubStats, setGithubStats] = useState({
    repos: null,
    followers: null,
    following: null,
    loading: true,
    error: false,
  });

  // Contribution Calendar image state
  const [chartStatus, setChartStatus] = useState("loading"); // "loading" | "loaded" | "error"
  const [chartRefreshKey, setChartRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const lastFetchRef = useRef(0);

  // Sync theme attribute with document root
  useEffect(() => {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Ignore storage errors
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Animated role presentation cycle (smooth 3.5s transition)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRoleFading(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setIsRoleFading(false);
      }, 250);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Navigation active-section highlighting via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "activity", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Section & card entrance reveal via IntersectionObserver (respects reduced-motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Fetch real public GitHub statistics directly from public REST API
  const fetchGitHubStats = useCallback(async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      });

      if (res.ok) {
        const data = await res.json();
        setGithubStats({
          repos: typeof data.public_repos === "number" ? data.public_repos : null,
          followers: typeof data.followers === "number" ? data.followers : null,
          following: typeof data.following === "number" ? data.following : null,
          loading: false,
          error: false,
        });
      } else {
        setGithubStats((prev) => ({
          ...prev,
          loading: false,
          error: true,
        }));
      }
    } catch {
      setGithubStats((prev) => ({
        ...prev,
        loading: false,
        error: true,
      }));
    }
  }, []);

  // Initial load + periodic refresh (every 15 minutes) + visibility refresh
  useEffect(() => {
    let isMounted = true;

    async function loadInitial() {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          headers: { Accept: "application/vnd.github.v3+json" },
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setGithubStats({
              repos: typeof data.public_repos === "number" ? data.public_repos : null,
              followers: typeof data.followers === "number" ? data.followers : null,
              following: typeof data.following === "number" ? data.following : null,
              loading: false,
              error: false,
            });
          }
        } else if (isMounted) {
          setGithubStats((prev) => ({ ...prev, loading: false, error: true }));
        }
      } catch {
        if (isMounted) {
          setGithubStats((prev) => ({ ...prev, loading: false, error: true }));
        }
      }
    }

    loadInitial();

    // 15-minute background refresh to stay current during long sessions
    const intervalId = setInterval(() => {
      fetchGitHubStats();
    }, 15 * 60 * 1000);

    const handleVisibilityChange = () => {
      const now = Date.now();
      if (document.visibilityState === "visible" && now - lastFetchRef.current > 5 * 60 * 1000) {
        lastFetchRef.current = now;
        fetchGitHubStats();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchGitHubStats]);

  // User manual refresh action
  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    setChartStatus("loading");
    setChartRefreshKey((prev) => prev + 1);
    setGithubStats((prev) => ({ ...prev, loading: true, error: false }));
    lastFetchRef.current = Date.now();
    await fetchGitHubStats();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Copy email to clipboard with graceful fallback
  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
        setEmailCopied(true);
      } else {
        // Fallback for browsers with restricted clipboard permission
        const textarea = document.createElement("textarea");
        textarea.value = CONTACT_EMAIL;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setEmailCopied(true);
      }
    } catch {
      window.prompt("Copy email address:", CONTACT_EMAIL);
    }
  };

  // Auto-reset copy feedback state after 2.5 seconds
  useEffect(() => {
    if (emailCopied) {
      const timer = setTimeout(() => setEmailCopied(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [emailCopied]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Find active category data for the interactive skills panel
  const currentCategoryData =
    SKILLS_CATEGORIES.find((cat) => cat.id === activeSkillCategory) || SKILLS_CATEGORIES[0];

  return (
    <div className={`portfolio ${theme}`} data-theme={theme}>
      {/* Top Navigation Bar */}
      <header className="header">
        <nav className="navbar" aria-label="Main Navigation">
          <a href="#home" className="logo" onClick={closeMobileMenu}>
            <span className="logo-badge" aria-hidden="true">
              {PROFILE_DATA.badgeInitials}
            </span>
            <span className="logo-text">{PROFILE_DATA.name}</span>
          </a>

          {/* Centered Navigation Links with Active Highlighting */}
          <div className="nav-links">
            <a
              href="#home"
              className={`nav-link ${activeSection === "home" ? "active" : ""}`}
            >
              Home
            </a>
            <a
              href="#about"
              className={`nav-link ${activeSection === "about" ? "active" : ""}`}
            >
              About
            </a>
            <a
              href="#skills"
              className={`nav-link ${activeSection === "skills" ? "active" : ""}`}
            >
              Skills
            </a>
            <a
              href="#activity"
              className={`nav-link ${activeSection === "activity" ? "active" : ""}`}
            >
              Activity
            </a>
            <a
              href="#projects"
              className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
            >
              Projects
            </a>
            <a
              href="#contact"
              className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
            >
              Contact
            </a>
          </div>

          {/* Theme Controls & Mobile Menu Button on Right */}
          <div className="nav-right">
            <button
              type="button"
              className="theme-pill-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span
                className={`theme-icon sun-icon ${theme === "light" ? "active" : ""}`}
                aria-hidden="true"
              >
                ☀️
              </span>
              <span className={`theme-pill-indicator ${theme}`} aria-hidden="true" />
              <span
                className={`theme-icon moon-icon ${theme === "dark" ? "active" : ""}`}
                aria-hidden="true"
              >
                🌙
              </span>
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
              <a href="#activity" onClick={closeMobileMenu}>Activity</a>
              <a href="#projects" onClick={closeMobileMenu}>Projects</a>
              <a href="#contact" onClick={closeMobileMenu}>Contact</a>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="mobile-gh-link"
              >
                GitHub Profile ↗
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Landmark */}
      <main>
        {/* ===================================================================
            HERO SECTION — THREE-PART COMPOSITION
            Left: Introduction & CTAs
            Center: Circular glowing profile photo with interactive halo
            Right: Contact & credentials panel
           =================================================================== */}
        <section id="home" className="hero-section">
          {/* Subtle Ambient Radial Glows */}
          <div className="ambient-glow glow-center" aria-hidden="true" />
          <div className="ambient-glow glow-left" aria-hidden="true" />

          <div className="container hero-grid">
            {/* Left Column: Introduction & CTAs */}
            <div className="hero-intro">
              <div className="welcome-tag">
                <span className="welcome-dot" aria-hidden="true" />
                <span className="welcome-tag-text">WELCOME TO MY PORTFOLIO</span>
              </div>

              <h1 className="hero-heading">
                <span className="hero-hi">Hi, I'm</span>
                <span className="hero-name gradient-text">{PROFILE_DATA.name}</span>
              </h1>

              {/* Tasteful animated role presentation */}
              <div className="role-subheading" aria-live="polite">
                <span className="role-static-label">I build as a</span>
                <span
                  className={`role-animated-badge ${isRoleFading ? "fading-out" : "fading-in"}`}
                >
                  {ROLES[roleIndex]}
                </span>
              </div>

              <p className="hero-bio">{PROFILE_DATA.shortBio}</p>

              <div className="hero-cta-group">
                <a href="#projects" className="btn btn-primary-gradient">
                  <span>View Projects</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </a>

                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark-pill"
                  title="Visit Mayank's verified GitHub profile (@God-of-Bugs)"
                >
                  <OctocatIcon size={17} />
                  <span>GitHub</span>
                </a>

                {/* Hero Contact Me Button scrolls smoothly to #contact section */}
                <a href="#contact" className="btn btn-dark-pill">
                  <MailIcon size={16} />
                  <span>Contact Me</span>
                </a>
              </div>
            </div>

            {/* Center Column: Circular Profile Photo with Glowing Rings & Subtle Response */}
            <div className="hero-center-profile">
              <div className="profile-halo-container" title={`${PROFILE_DATA.name} - Profile`}>
                {/* Outer Neon Glow Rings */}
                <div className="profile-neon-ring outer-ring" aria-hidden="true" />
                <div className="profile-neon-ring inner-ring" aria-hidden="true" />

                {/* Floating Top-Left React Vector Badge */}
                <div className="profile-float-badge badge-react-top" title="React Developer">
                  <ReactLogo size={28} />
                </div>

                {/* Circular Image Crop Frame preserving real uncompressed photo */}
                <div className="profile-circle-frame">
                  <img
                    src={mayankProfile}
                    alt={PROFILE_DATA.name}
                    className="profile-real-photo"
                  />
                  <div className="profile-shine-overlay" aria-hidden="true" />
                </div>

                {/* Floating Bottom-Right Godot Vector Badge */}
                <div className="profile-float-badge badge-godot-bottom" title="Godot Game Developer">
                  <GodotLogo size={28} />
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Details Panel */}
            <div className="hero-contact-panel">
              <div className="panel-card reveal-on-scroll">
                <div className="panel-item">
                  <div className="panel-icon-wrap" aria-hidden="true">
                    <MailIcon size={18} />
                  </div>
                  <div className="panel-info">
                    <span className="panel-label">Email</span>
                    <div className="panel-email-row">
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="panel-value panel-link"
                        title={`Open email client for ${CONTACT_EMAIL}`}
                      >
                        {CONTACT_EMAIL}
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className={`panel-copy-mini-btn ${emailCopied ? "copied" : ""}`}
                        title="Copy email to clipboard"
                        aria-label="Copy email address"
                      >
                        {emailCopied ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="panel-item">
                  <div className="panel-icon-wrap" aria-hidden="true">
                    <OctocatIcon size={18} />
                  </div>
                  <div className="panel-info">
                    <span className="panel-label">GitHub</span>
                    <a
                      href={GITHUB_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="panel-value panel-link"
                      title="Open GitHub profile in new tab"
                    >
                      github.com/{GITHUB_USERNAME}
                    </a>
                  </div>
                </div>

                <div className="panel-item">
                  <div className="panel-icon-wrap" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="18"
                      height="18"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="panel-info">
                    <span className="panel-label">Location</span>
                    <span className="panel-value">{PROFILE_DATA.location}</span>
                  </div>
                </div>

                {/* Stylized Handwritten Tagline */}
                <div className="panel-tagline-wrap">
                  <span className="script-tagline">{PROFILE_DATA.tagline}</span>
                  <svg className="script-flourish" viewBox="0 0 180 20" fill="none" aria-hidden="true">
                    <path
                      d="M5 14 Q 45 4, 90 12 T 175 10"
                      stroke="url(#flourishGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="flourishGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#c084fc" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            ABOUT ME SECTION — FACTUAL, GROUNDED STUDENT INTRO
            Features scroll-entrance reveal animation
           =================================================================== */}
        <section id="about" className="section standard-section">
          <div className="container">
            <div className="section-header reveal-on-scroll">
              <span className="section-eyebrow">ABOUT ME</span>
              <h2>About Me</h2>
            </div>

            <div className="section-card-box reveal-on-scroll">
              <p className="about-lead">
                I'm a Computer Science student who enjoys turning ideas into
                interactive digital experiences. My work spans frontend development
                with React and game development with Godot, where I focus on building
                clean interfaces, responsive experiences and engaging gameplay systems.
              </p>
              <p className="about-secondary">
                I learn primarily by building real projects — experimenting with UI,
                programming, game mechanics and development workflows, then improving
                them through testing and iteration. I'm continuing to expand both my
                web-development and game-development skills while creating projects that
                demonstrate what I can build.
              </p>

              <div className="about-pillars-grid">
                <div className="pillar-item">
                  <div className="pillar-icon-box" aria-hidden="true">
                    <ReactLogo size={26} />
                  </div>
                  <div>
                    <h3>Frontend Engineering</h3>
                    <p>
                      Building clean, modular, and responsive user interfaces using
                      React, modern JavaScript, and CSS component systems. Focused
                      on accessible UI patterns and clean state flow.
                    </p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon-box" aria-hidden="true">
                    <GodotLogo size={26} />
                  </div>
                  <div>
                    <h3>Game Development</h3>
                    <p>
                      Developing 2D and 3D gameplay systems with Godot Engine and
                      GDScript. Exploring player movement controllers, interactive
                      mechanics, scene structure, and responsive game loops.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SKILLS SECTION — INTERACTIVE CATEGORY TABS INTERFACE
            Controlled via React state, fully accessible with keyboard navigation
           =================================================================== */}
        <section id="skills" className="section standard-section">
          <div className="container">
            <div className="section-header reveal-on-scroll">
              <span className="section-eyebrow">TECHNICAL TOOLKIT</span>
              <h2>Skills & Technologies</h2>
              <p className="section-subtitle">
                Explore the core technologies and tools I actively use across web and game development.
              </p>
            </div>

            <div className="interactive-skills-container reveal-on-scroll">
              {/* Category Navigation Tabs */}
              <div
                className="skills-tablist"
                role="tablist"
                aria-label="Skill Categories"
              >
                {SKILLS_CATEGORIES.map((cat) => {
                  const isSelected = activeSkillCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      id={`tab-${cat.id}`}
                      aria-selected={isSelected}
                      aria-controls={`panel-${cat.id}`}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => setActiveSkillCategory(cat.id)}
                      onKeyDown={(e) => {
                        const ids = SKILLS_CATEGORIES.map((c) => c.id);
                        const currentIndex = ids.indexOf(cat.id);
                        if (e.key === "ArrowRight") {
                          const nextId = ids[(currentIndex + 1) % ids.length];
                          setActiveSkillCategory(nextId);
                          document.getElementById(`tab-${nextId}`)?.focus();
                        } else if (e.key === "ArrowLeft") {
                          const prevId = ids[(currentIndex - 1 + ids.length) % ids.length];
                          setActiveSkillCategory(prevId);
                          document.getElementById(`tab-${prevId}`)?.focus();
                        }
                      }}
                      className={`skills-tab-btn ${isSelected ? "active" : ""}`}
                    >
                      <span className="skills-tab-icon" aria-hidden="true">
                        {cat.iconType === "react" && <ReactLogo size={18} />}
                        {cat.iconType === "godot" && <GodotLogo size={18} />}
                        {cat.iconType === "code" && <PythonLogo size={16} />}
                      </span>
                      <span>{cat.title}</span>
                      <span className="skills-count-pill">{cat.skills.length}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Panel */}
              <div
                key={currentCategoryData.id}
                role="tabpanel"
                id={`panel-${currentCategoryData.id}`}
                aria-labelledby={`tab-${currentCategoryData.id}`}
                className="skills-tabpanel fade-in-panel"
              >
                <div className="panel-summary-bar">
                  <div className="panel-summary-icon" aria-hidden="true">
                    {currentCategoryData.iconType === "react" && <ReactLogo size={28} />}
                    {currentCategoryData.iconType === "godot" && <GodotLogo size={28} />}
                    {currentCategoryData.iconType === "code" && <PythonLogo size={26} />}
                  </div>
                  <div>
                    <h3 className="panel-summary-title">{currentCategoryData.title}</h3>
                    <p className="panel-summary-desc">{currentCategoryData.summary}</p>
                  </div>
                </div>

                <div className="skills-items-grid">
                  {currentCategoryData.skills.map((skill) => (
                    <div key={skill.name} className="skill-detail-card">
                      <div className="skill-header">
                        <span className="skill-bullet-dot" aria-hidden="true" />
                        <h4 className="skill-item-name">{skill.name}</h4>
                      </div>
                      <p className="skill-item-detail">{skill.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            GITHUB ACTIVITY SECTION — FULL-WIDTH PROMINENT DISPLAY
            Live data from public GitHub REST API and dynamic contribution SVG
           =================================================================== */}
        <section id="activity" className="section standard-section activity-section">
          <div className="container">
            <div className="section-header reveal-on-scroll">
              <span className="section-eyebrow">OPEN SOURCE & CONTRIBUTIONS</span>
              <h2>GitHub Activity</h2>
              <p className="section-subtitle">
                Real-time contribution history and public activity mirrored directly from GitHub.
              </p>
            </div>

            <div className="gh-activity-full-card reveal-on-scroll">
              {/* Activity Card Header */}
              <div className="gh-activity-header">
                <div className="gh-header-title-wrap">
                  <div className="gh-octocat-icon" aria-hidden="true">
                    <OctocatIcon size={30} />
                  </div>
                  <div>
                    <h3 className="gh-card-title">@{GITHUB_USERNAME}</h3>
                    <p className="gh-card-subtitle">
                      Public Contribution Graph & Repository Activity
                    </p>
                  </div>
                </div>

                <div className="gh-header-actions">
                  <button
                    type="button"
                    onClick={handleManualRefresh}
                    disabled={isRefreshing}
                    className={`btn-gh-refresh ${isRefreshing ? "refreshing" : ""}`}
                    title="Check for GitHub updates and sync public metrics"
                    aria-label="Sync GitHub activity data"
                  >
                    <span className="refresh-symbol" aria-hidden="true">↻</span>
                    <span>{isRefreshing ? "Syncing..." : "Sync Activity"}</span>
                  </button>

                  <a
                    href={`${GITHUB_PROFILE_URL}?tab=overview`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dark-pill btn-sm"
                    title="View live interactive contribution calendar on GitHub"
                  >
                    <span>Live on GitHub ↗</span>
                  </a>
                </div>
              </div>

              {/* Heatmap Area */}
              <div className="heatmap-viewport">
                {/* Visual loading indicator */}
                {chartStatus === "loading" && (
                  <div className="heatmap-loading-overlay">
                    <div className="loading-spinner" aria-hidden="true" />
                    <span>Loading real-time contribution calendar from GitHub...</span>
                  </div>
                )}

                {/* Error fallback card if proxy/network is down */}
                {chartStatus === "error" ? (
                  <div className="heatmap-fallback-box">
                    <p className="fallback-msg">
                      The live contribution calendar preview could not be loaded at this time.
                    </p>
                    <p className="fallback-note">
                      All commits, repositories, and pull requests are live and publicly viewable
                      on GitHub.
                    </p>
                    <a
                      href={GITHUB_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary-gradient btn-sm"
                    >
                      <OctocatIcon size={16} />
                      <span>Open GitHub Activity</span>
                    </a>
                  </div>
                ) : (
                  <div className="heatmap-with-labels">
                    <div className="heatmap-weekdays" aria-hidden="true">
                      <span>Mon</span>
                      <span>Wed</span>
                      <span>Fri</span>
                    </div>

                    <div className="heatmap-scroll-area">
                      <img
                        key={chartRefreshKey}
                        src={`https://ghchart.rshah.org/${GITHUB_USERNAME}?t=${chartRefreshKey}`}
                        alt={`${GITHUB_USERNAME} GitHub contributions calendar`}
                        className={`gh-real-chart ${chartStatus === "loaded" ? "visible" : "hidden"}`}
                        loading="lazy"
                        onLoad={() => setChartStatus("loaded")}
                        onError={() => setChartStatus("error")}
                      />
                      <div className="heatmap-months" aria-hidden="true">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Real Stats Row directly from public GitHub REST API */}
              <div className="gh-stats-row">
                <div className="gh-stat-block">
                  <span className="gh-stat-label">Public Repositories</span>
                  <strong className="gh-stat-number">
                    {githubStats.loading ? (
                      <span className="stat-loading">...</span>
                    ) : githubStats.error || githubStats.repos === null ? (
                      "—"
                    ) : (
                      githubStats.repos
                    )}
                  </strong>
                </div>

                <div className="gh-stat-block">
                  <span className="gh-stat-label">Followers</span>
                  <strong className="gh-stat-number">
                    {githubStats.loading ? (
                      <span className="stat-loading">...</span>
                    ) : githubStats.error || githubStats.followers === null ? (
                      "—"
                    ) : (
                      githubStats.followers
                    )}
                  </strong>
                </div>

                <div className="gh-stat-block">
                  <span className="gh-stat-label">Following</span>
                  <strong className="gh-stat-number">
                    {githubStats.loading ? (
                      <span className="stat-loading">...</span>
                    ) : githubStats.error || githubStats.following === null ? (
                      "—"
                    ) : (
                      githubStats.following
                    )}
                  </strong>
                </div>
              </div>

              {/* Footnote / Limitation Disclosure */}
              <div className="gh-card-footnote">
                <span className="footnote-dot" aria-hidden="true" />
                <span>
                  Contribution graph mirrors public activity published by GitHub. Upstream graph caches sync
                  periodically; commits to private repositories appear if private contributions are enabled in
                  GitHub profile settings.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            FEATURED PROJECTS SECTION — FULL-WIDTH PROMINENT DISPLAY
            Directly below GitHub Activity section
           =================================================================== */}
        <section id="projects" className="section standard-section projects-section">
          <div className="container">
            <div className="section-header reveal-on-scroll">
              <span className="section-eyebrow">PORTFOLIO WORK</span>
              <h2>Featured Projects</h2>
              <p className="section-subtitle">
                Selected web applications and games built with React and Godot Engine.
              </p>
            </div>

            {/* Responsive Projects Grid */}
            <div className="featured-projects-grid">
              {FEATURED_PROJECTS.map((project) => (
                <article key={project.id} className="project-feature-card reveal-on-scroll">
                  {/* Distinctive Visual Header Banner */}
                  <div className={`project-banner ${project.bannerTheme}`}>
                    <div className="banner-glow-effect" aria-hidden="true" />
                    <span className="project-badge-pill">{project.badgeType}</span>
                    <div className="banner-icon-container">
                      {project.id === "yt-music-clone" && (
                        <svg viewBox="0 0 24 24" fill="#ff0000" width="38" height="38" aria-hidden="true">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      )}
                      {project.id === "overrider" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="36" height="36" aria-hidden="true">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      )}
                      {project.id === "bloomkeeper" && (
                        <span className="banner-bloom-title">BLOOMKEEPER</span>
                      )}
                      {project.id === "surksha-vr" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="36" height="36" aria-hidden="true">
                          <path d="M21 9v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          <circle cx="9" cy="12" r="2" />
                          <circle cx="15" cy="12" r="2" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="project-card-body">
                    <div className="project-title-row">
                      <h3>{project.title}</h3>
                      <span className="project-category-tag">{project.category}</span>
                    </div>

                    <p>{project.description}</p>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag-chip">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="project-btn-row">
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-card-action active-link"
                          title="View verified source code on GitHub"
                        >
                          <OctocatIcon size={14} />
                          <span>Source Code</span>
                        </a>
                      ) : (
                        <span
                          className="btn-card-action disabled"
                          title="Repository to be linked"
                        >
                          <OctocatIcon size={14} />
                          <span>In Development</span>
                        </span>
                      )}

                      <span
                        className="btn-card-action disabled"
                        title="Live demo link to be configured"
                      >
                        <span>Demo Pending ↗</span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            CONTACT SECTION — REDESIGNED TWO-ACTION INTERACTION
            Action 1: Copy Email (instant clipboard with reliable fallback & feedback)
            Action 2: Open Email App (clean mailto: without target="_blank")
           =================================================================== */}
        <section id="contact" className="section standard-section">
          <div className="container">
            <div className="contact-full-card reveal-on-scroll">
              <div className="contact-top-icon" aria-hidden="true">
                <MailIcon size={36} />
              </div>
              <span className="section-eyebrow">GET IN TOUCH</span>
              <h2>Contact Me</h2>

              <p className="contact-main-desc">
                Interested in discussing a project, collaboration, or learning more about my work?
                Feel free to copy my direct email or launch your email client.
              </p>

              {/* Verified Direct Email Badge with 1-click Copy */}
              <div className="contact-address-display">
                <span className="contact-address-label">Direct Address:</span>
                <code className="contact-email-code">{CONTACT_EMAIL}</code>
              </div>

              {/* Two Primary Contact Actions */}
              <div className="contact-btn-row" aria-live="polite">
                {/* Action 1: Copy Email Button with temporal feedback */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`btn ${emailCopied ? "btn-copied" : "btn-primary-gradient"} btn-lg`}
                  aria-label="Copy email address to clipboard"
                >
                  {emailCopied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
                  <span>{emailCopied ? "Email Copied!" : "Copy Email"}</span>
                </button>

                {/* Action 2: Open Email App (Clean mailto without target="_blank") */}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="btn btn-dark-pill btn-lg"
                  title={`Launch default email application for ${CONTACT_EMAIL}`}
                >
                  <MailIcon size={18} />
                  <span>Open Email App</span>
                </a>

                {/* Secondary Action: Connect on GitHub */}
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark-pill btn-lg"
                  title="Open GitHub profile in a new tab"
                >
                  <OctocatIcon size={18} />
                  <span>GitHub Profile ↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              {PROFILE_DATA.name}
            </a>
            <p className="footer-tagline">React Developer • Game Developer</p>
          </div>

          <div className="footer-nav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#activity">Activity</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-gh-link"
            >
              GitHub (@{GITHUB_USERNAME}) ↗
            </a>
          </div>

          <div className="footer-bottom">
            <p>© 2026 {PROFILE_DATA.name}. All rights reserved.</p>
            <a href="#home" className="back-to-top" aria-label="Back to top">
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
