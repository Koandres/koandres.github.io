/**
 * Main JavaScript file for portfolio website
 * Handles navigation, project loading, animations, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initSmoothScroll();
    initProjectFilter();
    initImageLoading();
    initExperienceAnimations();
    loadProjects();
    initSkillAnimations();
    if (typeof skillsManager !== 'undefined') {
        skillsManager.init();
    } else {
        // Fallback to basic skills if manager fails
        initBasicSkills();
    }
    setCurrentYear();
    
    // Initialize theme from localStorage
    initTheme();
    
    // Add loading animation removal
    document.body.classList.remove('loading');
});

// Navigation Management
function initNavigation() {
    const hamburger = document.querySelector('.nav__hamburger');
  const navMenu = document.querySelector('.nav__menu');
  const navOverlay = document.querySelector('.nav__overlay');
  const navLinks = document.querySelectorAll('.nav__link');
  const body = document.body;
  
  if (!hamburger || !navMenu) {
    console.warn('Navigation elements not found');
    return;
  }
  
  // Toggle menu function
  function toggleMenu() {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    
    // Update hamburger button
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    
    // Update menu
    navMenu.classList.toggle('active');
    
    // Update overlay
    if (navOverlay) {
      navOverlay.classList.toggle('active');
    }
    
    // Update body scroll
    body.classList.toggle('menu-open');
    
    console.log('Menu toggled:', !isExpanded ? 'open' : 'closed');
  }
  
  // Close menu function
  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    if (navOverlay) {
      navOverlay.classList.remove('active');
    }
    body.classList.remove('menu-open');
  }
  
  // Hamburger button click
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
  
  // Close menu when clicking overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }
  
  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
      
      // Smooth scroll for anchor links
      if (link.hash && link.hash.startsWith('#')) {
        setTimeout(() => {
          const target = document.querySelector(link.hash);
          if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }, 300); // Small delay to allow menu to close
      }
    });
  });
  
  // Close menu when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  });
  
  // Close menu on window resize (if resizing to desktop)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMenu();
      }
    }, 250);
  });
  
  console.log('Mobile navigation initialized');
}

// Smooth scrolling
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('[data-scroll-to]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Project Filtering
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!filterButtons.length || !projectsGrid) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const filter = button.dataset.filter;
            const projectCards = projectsGrid.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                const projectType = card.dataset.type || 'frontend';
                let shouldShow = false;
                
                switch(filter) {
                    case 'all':
                        shouldShow = true;
                        break;
                    case 'frontend':
                        shouldShow = projectType === 'frontend';
                        break;
                    case 'backend':
                        shouldShow = projectType === 'backend';
                        break;
                    case 'fullstack':
                        shouldShow = projectType === 'fullstack';
                        break;
                    default:
                        shouldShow = true;
                }
                
                if (shouldShow) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Load Projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error('Failed to load projects');
        
        const data = await response.json();
        const projectsGrid = document.getElementById('projects-grid');
        
        if (!projectsGrid) return;
        
        // Clear loading state
        projectsGrid.innerHTML = '';
        
        // Create project cards
        data.projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
        
        // Re-initialize filter after loading
        setTimeout(initProjectFilter, 100);
        
    } catch (error) {
        console.error('Error loading projects:', error);
        showErrorMessage('Failed to load projects. Please try again later.');
    }
}

function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card fade-in';
    card.dataset.tech = project.tech.join(' ').toLowerCase();
    card.dataset.type = project.type || 'fullstack';
    
    // Handle image source
    let imageUrl = project.image;
    if (!project.image.startsWith('assets/') && !project.image.startsWith('http')) {
        imageUrl = `https://picsum.photos/600/400?random=${project.id}&grayscale`;
    }
    
    // Generate links HTML only if URLs exist
    const demoLink = project.demo ? `
        <a href="${project.demo}" class="btn btn--primary project-card__link" 
           target="_blank" rel="noopener noreferrer" aria-label="View live demo of ${project.title}">
            Live Demo
        </a>
    ` : `
        <button class="btn btn--primary project-card__link btn--disabled" 
                disabled aria-label="Live demo not available for ${project.title}">
            Demo N/A
        </button>
    `;
    
    const githubLink = project.github ? `
        <a href="${project.github}" class="btn btn--secondary project-card__link" 
           target="_blank" rel="noopener noreferrer" aria-label="View source code of ${project.title} on GitHub">
            GitHub
        </a>
    ` : `
        <button class="btn btn--secondary project-card__link btn--disabled" 
                disabled aria-label="Source code not available for ${project.title}">
            Code Private
        </button>
    `;
    
    card.innerHTML = `
        <div class="project-card__image-container">
            <img 
                src="${imageUrl}" 
                alt="${project.title} project screenshot" 
                class="project-card__image"
                loading="lazy"
                onerror="this.onerror=null; this.src='https://picsum.photos/600/400?random=${project.id}&grayscale'; this.alt='Project placeholder image'"
            >
            <div class="project-card__image-overlay"></div>
        </div>
        <div class="project-card__content">
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__description">${project.description}</p>
            <div class="project-card__tech">
                ${project.tech.map(tech => `<span class="project-card__tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-card__links">
                ${demoLink}
                ${githubLink}
            </div>
        </div>
    `;
    
    return card;
}

// Handle image lazy loading and fallbacks
function initImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add loading class
                    img.classList.add('loading');
                    
                    // Load the image
                    const src = img.getAttribute('data-src') || img.src;
                    const imageLoader = new Image();
                    
                    imageLoader.onload = () => {
                        img.src = src;
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    };
                    
                    imageLoader.onerror = () => {
                        // Use placeholder if image fails to load
                        img.src = `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}&grayscale`;
                        img.alt = 'Project placeholder image';
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    };
                    
                    imageLoader.src = src;
                }
            });
        });
        
        images.forEach(img => {
            // Store original src in data-src
            if (!img.hasAttribute('data-src')) {
                img.setAttribute('data-src', img.src);
                img.src = ''; // Clear src to prevent immediate loading
            }
            imageObserver.observe(img);
        });
    }
    
    // Fallback for browsers without IntersectionObserver
    else {
        images.forEach(img => {
            img.classList.add('loading');
            const originalSrc = img.src;
            
            const imageLoader = new Image();
            imageLoader.onload = () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            };
            imageLoader.onerror = () => {
                img.src = `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}&grayscale`;
                img.classList.remove('loading');
                img.classList.add('loaded');
            };
            imageLoader.src = originalSrc;
        });
    }
}

// Skill Animations
function initSkillAnimations() {
    const skills = document.querySelectorAll('.skill');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skill = entry.target;
                const progressBar = skill.querySelector('.skill__progress');
                const level = skill.dataset.skillLevel || '0';
                
                // Animate progress bar
                setTimeout(() => {
                    progressBar.style.width = `${level}%`;
                }, 200);
                
                // Animate skill entry
                skill.style.animationDelay = `${Math.random() * 0.3}s`;
                skill.classList.add('animate');
                
                observer.unobserve(skill);
            }
        });
    }, observerOptions);
    
    skills.forEach(skill => observer.observe(skill));
}

// Experience Animations
function initExperienceAnimations() {
    const timelineItems = document.querySelectorAll('.timeline__item');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => observer.observe(item));
}

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[data-nav-link]');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Show error message
function showErrorMessage(message) {
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        projectsGrid.innerHTML = `
            <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p style="color: var(--color-text-light);">${message}</p>
                <button onclick="loadProjects()" class="btn btn--primary" style="margin-top: 1rem;">
                    Retry
                </button>
            </div>
        `;
    }
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme icon
    const themeIcon = document.querySelector('[data-theme-icon]');
    if (themeIcon) {
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

// Utility function: throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Handle service worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}

// Handle images loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        
        // Handle broken images
        img.addEventListener('error', () => {
            img.src = 'https://picsum.photos/400/300?random=404';
            img.alt = 'Placeholder image';
        });
    });
});