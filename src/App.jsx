```jsx
import "./App.css";

function App() {
  return (
    <div className="portfolio">

      {/* Navigation */}
      <nav className="navbar">
        <h2 className="logo">Mayank Gupta</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="home">
        <div className="home-content">
          <p className="welcome">WELCOME TO MY PORTFOLIO</p>

          <h1>
            Hi, I'm <span>Mayank Kumar Gupta</span>
          </h1>

          <h2>React Developer</h2>

          <p className="home-description">
            I am a frontend developer and game developer working with
            React and Godot to create interactive digital experiences.
          </p>

          <a href="#projects" className="button">
            View My Projects
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <h2>About Me</h2>

        <p>
          I'm a frontend developer and game developer with an interest
          in building modern web applications and interactive games.
          I enjoy working with React and Godot to turn ideas into
          functional digital experiences.
        </p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <h2>My Skills</h2>

        <div className="skills">

          <div className="skill-card">
            <h3>React</h3>
            <p>
              Building modern and responsive frontend applications.
            </p>
          </div>

          <div className="skill-card">
            <h3>Python</h3>
            <p>
              Programming and developing useful applications.
            </p>
          </div>

          <div className="skill-card">
            <h3>Godot</h3>
            <p>
              Developing interactive 3D games and gameplay systems.
            </p>
          </div>

        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <h2>My Projects</h2>

        <div className="projects">

          <div className="project-card">
            <h3>YT Music Clone</h3>
            <p>
              A frontend project inspired by the YouTube Music
              experience.
            </p>
          </div>

          <div className="project-card">
            <h3>Neon Ridder</h3>
            <p>
              A game development project created using Godot.
            </p>
          </div>

          <div className="project-card">
            <h3>Surksha VR</h3>
            <p>
              An interactive VR-focused project exploring immersive
              digital experiences.
            </p>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <h2>Contact Me</h2>

        <p>
          Interested in working together? Feel free to get in touch.
        </p>

        <a href="mailto:your@email.com" className="button">
          Send Me an Email
        </a>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 Mayank Kumar Gupta. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
```
