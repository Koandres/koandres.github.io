/**
 * Main JavaScript file for portfolio website
 * Handles navigation, project loading, animations, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initSmoothScroll();
    initProjectFilter();
    loadProjects();
    setCurrentYear();
});

document.addEventListener('langchange', loadProjects);

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
                
                card.hidden = !shouldShow;
            });
        });
    });
}

// Load Projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json', { cache: 'no-store' });
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
        
        // Terapkan lagi filter yang sedang aktif (mis. setelah ganti bahasa)
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter && activeFilter.dataset.filter !== 'all') activeFilter.click();
        
    } catch (error) {
        console.error('Error loading projects:', error);
        showErrorMessage(t('project.error'));
    }
}

function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.tech = project.tech.join(' ').toLowerCase();
    card.dataset.type = project.type || 'fullstack';
    
    // Generate links HTML only if URLs exist
    const demoLink = project.demo ? `
        <a href="${project.demo}" class="btn btn--primary project-card__link" 
           target="_blank" rel="noopener noreferrer" aria-label="${t('project.demoLabel', { title: pick(project.title) })}">
            ${t('project.demo')}
        </a>
    ` : `
        <button class="btn btn--primary project-card__link btn--disabled" 
                disabled aria-label="${t('project.demoNALabel', { title: pick(project.title) })}">
            ${t('project.demoNA')}
        </button>
    `;
    
    const githubLink = project.github ? `
        <a href="${project.github}" class="btn btn--secondary project-card__link" 
           target="_blank" rel="noopener noreferrer" aria-label="${t('project.codeLabel', { title: pick(project.title) })}">
            ${t('project.github')}
        </a>
    ` : `
        <button class="btn btn--secondary project-card__link btn--disabled" 
                disabled aria-label="${t('project.codeNALabel', { title: pick(project.title) })}">
            ${t('project.private')}
        </button>
    `;
    
    card.innerHTML = `
        <div class="project-card__image-container">
            <img 
                src="${project.image}" 
                alt="${t('project.alt', { title: pick(project.title) })}" 
                class="project-card__image"
                loading="lazy"
                onerror="this.hidden = true"
            >
            <div class="project-card__image-overlay"></div>
        </div>
        <div class="project-card__content">
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__description">${pick(project.description)}</p>
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
                    ${t('retry')}
                </button>
            </div>
        `;
    }
}
