import React, { useState } from "react";
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

const Portfolio = () => {
  // State for logo carousel
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [currentBackofficeIndex, setCurrentBackofficeIndex] = useState(0);
  const [currentBarefaceIndex, setCurrentBarefaceIndex] = useState(0);
  
  // State for zoom modal
  const [zoomModal, setZoomModal] = useState({
    isOpen: false,
    image: null,
    title: ""
  });

  // Logo data with imported images
  const logoProjects = [
    {
      title: "Lian Tech Brand Identity",
      subtitle: "Tech store brand identity design",
      description: "Created a modern and versatile logo for a store specializing in phones, laptops, and accessories. The design represents technology and connectivity.",
      image: lianTechLogo,
      tags: ["Logo Design", "Brand Identity", "Modern Style"]
    },
    {
      title: "EcoLife Brand Design",
      subtitle: "Sustainable products branding",
      description: "Eco-friendly brand identity focusing on sustainability and natural elements. Perfect for green technology and environmental companies.",
      image: ecoLifeLogo,
      tags: ["Logo Design", "Eco Branding", "Green Design"]
    },
    {
      title: "NovaTech Corporate Identity",
      subtitle: "Tech startup branding",
      description: "Clean and professional logo design for a technology startup. Emphasizes innovation and forward-thinking approach.",
      image: novaTechLogo,
      tags: ["Logo Design", "Corporate Branding", "Tech"]
    }
  ];

  // Backoffice project images
  const backofficeProjects = [
    {
      image: backoffice1,
      title: "Password Management Interface"
    },
    {
      image: backoffice2,
      title: "Dashboard Analytics"
    }
  ];

  // Bareface project images
  const barefaceProjects = [
    {
      image: barefaceHome,
      title: "Homepage Design"
    },
    {
      image: barefaceBlog,
      title: "Blog Layout"
    },
    {
      image: barefaceBooking,
      title: "Booking System"
    }
  ];

  // Carousel navigation functions
  const nextSlide = (setter, length) => {
    setter((prevIndex) => prevIndex === length - 1 ? 0 : prevIndex + 1);
  };

  const prevSlide = (setter, length) => {
    setter((prevIndex) => prevIndex === 0 ? length - 1 : prevIndex - 1);
  };

  // Zoom modal functions
  const openZoomModal = (image, title) => {
    setZoomModal({
      isOpen: true,
      image,
      title
    });
  };

  const closeZoomModal = () => {
    setZoomModal({
      isOpen: false,
      image: null,
      title: ""
    });
  };

  // Handle modal background click
  const handleModalBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeZoomModal();
    }
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Open email client
  const handleSendMessage = () => {
    const email = 'djadilina56@gmail.com';
    const subject = 'Portfolio Inquiry';
    const body = 'Hello Lina,\n\nI would like to get in touch with you regarding...';
    
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  // Scroll to projects section
  const scrollToProjects = () => {
    scrollToSection('projects');
  };

  const currentLogo = logoProjects[currentLogoIndex];
  const currentBackoffice = backofficeProjects[currentBackofficeIndex];
  const currentBareface = barefaceProjects[currentBarefaceIndex];

  return (
    <div className="portfolio-container">
      {/* Zoom Modal */}
      {zoomModal.isOpen && (
        <div 
          className="zoom-modal" 
          onClick={handleModalBackgroundClick}
        >
          <div className="zoom-modal-content">
            <button 
              className="zoom-close-btn"
              onClick={closeZoomModal}
            >
              ×
            </button>
            <div className="zoom-image-container">
              <img 
                src={zoomModal.image} 
                alt={zoomModal.title}
                className="zoom-image"
              />
            </div>
            <div className="zoom-modal-footer">
              <p className="zoom-image-title">{zoomModal.title}</p>
              <div className="zoom-controls">
                <button 
                  className="zoom-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    const img = e.target.closest('.zoom-modal-content').querySelector('.zoom-image');
                    img.style.transform = `scale(${parseFloat(img.style.transform.replace('scale(', '').replace(')', '')) || 1 * 1.2})`;
                  }}
                >
                  Zoom In
                </button>
                <button 
                  className="zoom-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    const img = e.target.closest('.zoom-modal-content').querySelector('.zoom-image');
                    const currentScale = parseFloat(img.style.transform.replace('scale(', '').replace(')', '')) || 1;
                    if (currentScale > 0.5) {
                      img.style.transform = `scale(${currentScale * 0.8})`;
                    }
                  }}
                >
                  Zoom Out
                </button>
                <button 
                  className="zoom-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    const img = e.target.closest('.zoom-modal-content').querySelector('.zoom-image');
                    img.style.transform = 'scale(1)';
                    img.style.transformOrigin = 'center center';
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="navbar">
        <div className="nav-container">
          <h2 className="logo">Portfolio</h2>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#home" className="nav-link" onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#skills" className="nav-link" onClick={(e) => {
                e.preventDefault();
                scrollToSection('skills');
              }}>Skills</a>
            </li>
            <li className="nav-item">
              <a href="#projects" className="nav-link" onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}>Projects</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link" onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}>Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <div className="hero-content">
        <h1 className="hero-title">Hi , i'm Lina </h1>
        <h1 className="hero-title">A Web & A Mobile Developer</h1>
          <h2 className="hero-subtitle">Creating modern and simple digital projects</h2>
          <p className="hero-description">
            Recent graduate specializing in full-stack web and mobile development. I enjoy building modern, responsive applications with clean code and intuitive user interfaces.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary" 
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </button>
            <button 
              className="btn btn-secondary"
              onClick={scrollToProjects}
            >
              View Projects
            </button>
          </div>
        </div>
      </section>

      <section id="skills" className="skills-section">
        <div className="section-container">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">A comprehensive toolkit for building modern web and mobile applications</p>
          
          <div className="skills-grid">
            <div className="skill-category">
              <h3 className="skill-category-title">Frontend</h3>
              <div className="skill-items">
                <span className="skill-item">HTML</span>
                <span className="skill-item">CSS</span>
                <span className="skill-item">JavaScript</span>
                <span className="skill-item">React.js</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3 className="skill-category-title">Backend</h3>
              <div className="skill-items">
                <span className="skill-item">PHP</span>
                <span className="skill-item">Laravel</span>
                <span className="skill-item">API Development</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3 className="skill-category-title">Mobile</h3>
              <div className="skill-items">
                <span className="skill-item">Flutter</span>
                <span className="skill-item">Kotlin</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3 className="skill-category-title">Design</h3>
              <div className="skill-items">
                <span className="skill-item">Logo Design</span>
                <span className="skill-item">Business Card Design</span>
                <span className="skill-item">WordPress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="section-container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">A selection of recent work showcasing my development capabilities</p>
          
          <div className="projects-grid">
            {/* Modern Business Bareface Project */}
            <div className="project-card logo-carousel-card">
              <div className="project-header">
                <h3 className="project-title">Modern Business Bareface</h3>
                <p className="project-subtitle">WordPress Business Site</p>
              </div>
              
              <div className="logo-carousel">
                <div className="logo-image-container">
                  <img 
                    src={currentBareface.image} 
                    alt={currentBareface.title} 
                    className="project-img"
                    onClick={() => openZoomModal(currentBareface.image, currentBareface.title)}
                  />

                  <button 
                    className="carousel-btn carousel-prev" 
                    onClick={() => prevSlide(setCurrentBarefaceIndex, barefaceProjects.length)}
                  >
                    ‹
                  </button>
                  <button 
                    className="carousel-btn carousel-next" 
                    onClick={() => nextSlide(setCurrentBarefaceIndex, barefaceProjects.length)}
                  >
                    ›
                  </button>
                </div>
                
                <div className="carousel-indicators">
                  {barefaceProjects.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentBarefaceIndex ? 'active' : ''}`}
                      onClick={() => setCurrentBarefaceIndex(index)}
                    />
                  ))}
                </div>
              </div>

              <div className="project-content">
                <p>Custom WordPress theme and plugins for a local business. Includes booking system, blog, and responsive design optimized for performance.</p>
                <div className="project-tech">
                  <span className="tech-tag">WordPress</span>
                  <span className="tech-tag">PHP</span>
                  <span className="tech-tag">CSS</span>
                  <span className="tech-tag">JavaScript</span>
                </div>
                
                <div className="carousel-counter">
                  {currentBarefaceIndex + 1} / {barefaceProjects.length}
                </div>
              </div>
            </div>

            {/* Digitization of Public Procurement Management */}
            <div className="project-card logo-carousel-card">
              <div className="project-header">
                <h3 className="project-title">Digitization of Public Procurement Management</h3>
                <p className="project-subtitle">Web Application</p>
              </div>
              
              <div className="logo-carousel">
                <div className="logo-image-container">
                  <img 
                    src={currentBackoffice.image} 
                    alt={currentBackoffice.title} 
                    className="project-img"
                    onClick={() => openZoomModal(currentBackoffice.image, currentBackoffice.title)}
                  />

                  <button 
                    className="carousel-btn carousel-prev" 
                    onClick={() => prevSlide(setCurrentBackofficeIndex, backofficeProjects.length)}
                  >
                    ‹
                  </button>
                  <button 
                    className="carousel-btn carousel-next" 
                    onClick={() => nextSlide(setCurrentBackofficeIndex, backofficeProjects.length)}
                  >
                    ›
                  </button>
                </div>
                
                <div className="carousel-indicators">
                  {backofficeProjects.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentBackofficeIndex ? 'active' : ''}`}
                      onClick={() => setCurrentBackofficeIndex(index)}
                    />
                  ))}
                </div>
              </div>

              <div className="project-content">
                <p>A web app that helps manage public contracts and tenders more easily. I built it using React and Laravel, with a focus on automation and user-friendly design.</p>
                <div className="project-tech">
                  <span className="tech-tag">React.js</span>
                  <span className="tech-tag">Laravel</span>
                  <span className="tech-tag">API</span>
                  <span className="tech-tag">CSS</span>
                </div>
                
                <div className="carousel-counter">
                  {currentBackofficeIndex + 1} / {backofficeProjects.length}
                </div>
              </div>
            </div>

            {/* Logo Carousel Project Card */}
            <div className="project-card logo-carousel-card">
              <div className="project-header">
                <h3 className="project-title">{currentLogo.title}</h3>
                <p className="project-subtitle">{currentLogo.subtitle}</p>
              </div>
              
              <div className="logo-carousel">
                <div className="logo-image-container">
                  <img 
                    src={currentLogo.image} 
                    alt={currentLogo.title} 
                    className="project-img"
                    onClick={() => openZoomModal(currentLogo.image, currentLogo.title)}
                  />

                  <button 
                    className="carousel-btn carousel-prev" 
                    onClick={() => prevSlide(setCurrentLogoIndex, logoProjects.length)}
                  >
                    ‹
                  </button>
                  <button 
                    className="carousel-btn carousel-next" 
                    onClick={() => nextSlide(setCurrentLogoIndex, logoProjects.length)}
                  >
                    ›
                  </button>
                </div>
                
                <div className="carousel-indicators">
                  {logoProjects.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentLogoIndex ? 'active' : ''}`}
                      onClick={() => setCurrentLogoIndex(index)}
                    />
                  ))}
                </div>
              </div>

              <div className="project-content">
                <p>{currentLogo.description}</p>
                <div className="project-tech">
                  {currentLogo.tags.map((tag, index) => (
                    <span key={index} className="tech-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="carousel-counter">
                  {currentLogoIndex + 1} / {logoProjects.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-container">
          <h2 className="section-title">Let's Work Together</h2>
          <p className="contact-intro">I'm currently available for freelance work and full-time opportunities</p>
          
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <h4>Email</h4>
                <p>djadilina56@gmail.com</p>
              </div>
             
              <div className="contact-item">
                <h4>LinkedIn</h4>
                <div className="linkedin-container">
                  <a 
                    href="https://www.linkedin.com/in/lina-djadi-257b2a2a6/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-link linkedin-link"
                  >
                    <svg 
                      className="linkedin-icon" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
            
            <div className="contact-message">
              <p>Whether you have a project in mind, need a developer for your team, or just want to connect, I'd love to hear from you.</p>
              <button 
                className="btn btn-primary"
                onClick={handleSendMessage}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <footer className="footer">
        <div className="footer-container">
          <p>&copy; {new Date().getFullYear()} Portfolio.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default Portfolio;