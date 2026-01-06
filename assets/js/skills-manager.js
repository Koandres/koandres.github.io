/**
 * Skills Manager Module
 * Handles loading, displaying, and managing skills data
 */

class SkillsManager {
    constructor() {
        this.skillsData = null;
        this.initialized = false;
    }

    async init() {
        try {
            await this.loadSkillsData();
            this.renderSkills();
            this.initTabs();
            this.initSkillAnimations();
            this.calculateAndDisplayStats();
            this.initialized = true;
            
            console.log('Skills manager initialized successfully');
        } catch (error) {
            console.error('Failed to initialize skills manager:', error);
            this.showFallbackSkills();
        }
    }

    async loadSkillsData() {
        try {
            const response = await fetch('data/skills.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            this.skillsData = await response.json();
        } catch (error) {
            console.warn('Using fallback skills data:', error);
            this.skillsData = this.getFallbackSkillsData();
        }
    }

    getFallbackSkillsData() {
        return {
            skills: {
                frontend: [
                    { name: "HTML5", level: 95, icon: "🔧", years: 5 },
                    { name: "CSS3", level: 90, icon: "🎨", years: 5 },
                    { name: "JavaScript", level: 92, icon: "⚡", years: 4 }
                ],
                backend: [
                    { name: "Node.js", level: 88, icon: "🟢", years: 3 },
                    { name: "Python", level: 85, icon: "🐍", years: 4 },
                    { name: "MongoDB", level: 80, icon: "🍃", years: 3 }
                ],
                tools: [
                    { name: "Git", level: 90, icon: "📝", years: 4 },
                    { name: "Docker", level: 75, icon: "🐳", years: 2 },
                    { name: "AWS", level: 70, icon: "☁️", years: 2 }
                ],
                softSkills: [
                    { name: "Problem Solving", level: 95, icon: "🧩" },
                    { name: "Team Collaboration", level: 90, icon: "👥" },
                    { name: "Communication", level: 88, icon: "💬" }
                ]
            }
        };
    }

    renderSkills() {
        if (!this.skillsData) return;

        const categories = ['frontend', 'backend', 'tools', 'softSkills'];
        
        categories.forEach(category => {
            const skills = this.skillsData.skills[category];
            if (!skills) return;

            if (category === 'softSkills') {
                this.renderSoftSkills(skills);
            } else {
                this.renderTechnicalSkills(category, skills);
            }
        });
    }

    renderTechnicalSkills(category, skills) {
        const containerId = `${category}-skills`;
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = skills.map(skill => this.createSkillElement(skill)).join('');
    }

    renderSoftSkills(skills) {
        const containerId = 'softskills-badges';
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = skills.map(skill => this.createSoftSkillBadge(skill)).join('');
    }

    createSkillElement(skill) {
        const proficiencyClass = this.getProficiencyClass(skill.level);
        
        return `
            <div class="skill ${proficiencyClass}" data-skill-level="${skill.level}">
                <div class="skill__header">
                    <span class="skill__icon">${skill.icon}</span>
                    <div class="skill__info">
                        <div class="skill__name-wrapper">
                            <span class="skill__name">${skill.name}</span>
                            ${skill.years ? `<span class="skill__years">${skill.years} ${skill.years === 1 ? 'year' : 'years'}</span>` : ''}
                        </div>
                        <span class="skill__percentage">${skill.level}%</span>
                    </div>
                </div>
                ${skill.description ? `<p class="skill__description">${skill.description}</p>` : ''}
                <div class="skill__bar">
                    <div class="skill__progress" data-progress="${skill.level}" style="width: 0%"></div>
                </div>
                <div class="skill__level-indicator">
                    <span class="skill__level-label">${this.getProficiencyLabel(skill.level)}</span>
                </div>
            </div>
        `;
    }

    createSoftSkillBadge(skill) {
        const proficiencyClass = this.getProficiencyClass(skill.level);
        
        return `
            <div class="soft-skill-badge ${proficiencyClass}" data-skill-level="${skill.level}">
                <span class="soft-skill-badge__icon">${skill.icon}</span>
                <div class="soft-skill-badge__content">
                    <span class="soft-skill-badge__name">${skill.name}</span>
                    <div class="soft-skill-badge__progress">
                        <div class="soft-skill-badge__progress-bar" style="width: 0%"></div>
                    </div>
                    <span class="soft-skill-badge__level">${skill.level}%</span>
                </div>
            </div>
        `;
    }

    getProficiencyClass(level) {
        if (level >= 90) return 'skill--expert';
        if (level >= 75) return 'skill--advanced';
        if (level >= 60) return 'skill--intermediate';
        return 'skill--beginner';
    }

    getProficiencyLabel(level) {
        if (level >= 90) return 'Expert';
        if (level >= 75) return 'Advanced';
        if (level >= 60) return 'Intermediate';
        return 'Beginner';
    }

    initTabs() {
        const tabs = document.querySelectorAll('.skills__tab');
        const panels = document.querySelectorAll('.skills__panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // Update tabs
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                
                // Update panels
                panels.forEach(panel => {
                    panel.classList.remove('active');
                    panel.hidden = true;
                });
                
                const targetPanel = document.getElementById(`${targetTab}-panel`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                    targetPanel.hidden = false;
                }
                
                // Trigger skill animations for the new panel
                setTimeout(() => this.initSkillAnimations(), 100);
            });
        });

        // Keyboard navigation for tabs
        tabs.forEach((tab, index) => {
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    tab.click();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextTab = tabs[(index + 1) % tabs.length];
                    nextTab.focus();
                    nextTab.click();
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevTab = tabs[(index - 1 + tabs.length) % tabs.length];
                    prevTab.focus();
                    prevTab.click();
                }
            });
        });
    }

    initSkillAnimations() {
        const skills = document.querySelectorAll('.skill, .soft-skill-badge');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skill = entry.target;
                    const level = skill.dataset.skillLevel || '0';
                    
                    // Animate progress bars
                    const progressBar = skill.querySelector('.skill__progress, .soft-skill-badge__progress-bar');
                    if (progressBar) {
                        setTimeout(() => {
                            progressBar.style.width = `${level}%`;
                        }, 200);
                    }
                    
                    // Animate skill entry
                    skill.style.opacity = '1';
                    skill.style.transform = 'translateY(0)';
                    
                    observer.unobserve(skill);
                }
            });
        }, observerOptions);

        skills.forEach(skill => {
            skill.style.opacity = '0';
            skill.style.transform = 'translateY(20px)';
            skill.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(skill);
        });
    }

    calculateAndDisplayStats() {
        if (!this.skillsData) return;

        let totalSkills = 0;
        let totalProficiency = 0;
        let totalYears = 0;
        let countedSkills = 0;

        // Iterate through all categories
        Object.values(this.skillsData.skills).forEach(category => {
            category.forEach(skill => {
                totalSkills++;
                totalProficiency += skill.level;
                if (skill.years) {
                    totalYears += skill.years;
                }
                countedSkills++;
            });
        });

        // Update DOM elements
        const totalSkillsElement = document.getElementById('total-skills');
        const avgProficiencyElement = document.getElementById('avg-proficiency');
        const totalYearsElement = document.getElementById('total-years');

        if (totalSkillsElement) {
            totalSkillsElement.textContent = totalSkills;
            // Animate counting
            this.animateValue(totalSkillsElement, 0, totalSkills, 1000);
        }

        if (avgProficiencyElement && countedSkills > 0) {
            const average = Math.round(totalProficiency / countedSkills);
            avgProficiencyElement.textContent = `${average}%`;
            this.animateValue(avgProficiencyElement, 0, average, 1000, '%');
        }

        if (totalYearsElement) {
            totalYearsElement.textContent = totalYears;
            this.animateValue(totalYearsElement, 0, totalYears, 1000);
        }
    }

    animateValue(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = `${value}${suffix}`;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    showFallbackSkills() {
        // Show a warning and load basic skills
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            const warning = document.createElement('div');
            warning.className = 'skills__warning';
            warning.innerHTML = `
                <p>⚠️ Skills data could not be loaded. Showing fallback skills.</p>
                <button onclick="skillsManager.init()" class="btn btn--small">Retry</button>
            `;
            skillsSection.querySelector('.container').prepend(warning);
        }

        // Load fallback data
        this.skillsData = this.getFallbackSkillsData();
        this.renderSkills();
        this.initSkillAnimations();
    }

    // API to update skill levels dynamically (for admin interface)
    updateSkillLevel(category, skillName, newLevel) {
        if (!this.skillsData || !this.skillsData.skills[category]) {
            console.error('Category not found:', category);
            return false;
        }

        const skill = this.skillsData.skills[category].find(s => s.name === skillName);
        if (!skill) {
            console.error('Skill not found:', skillName);
            return false;
        }

        skill.level = Math.min(100, Math.max(0, newLevel));
        
        // Update in localStorage (for demo purposes)
        this.saveToLocalStorage();
        
        // Re-render and recalculate
        this.renderSkills();
        this.calculateAndDisplayStats();
        
        return true;
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('portfolio-skills', JSON.stringify(this.skillsData));
        } catch (error) {
            console.warn('Could not save skills to localStorage:', error);
        }
    }

    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('portfolio-skills');
            if (saved) {
                this.skillsData = JSON.parse(saved);
                return true;
            }
        } catch (error) {
            console.warn('Could not load skills from localStorage:', error);
        }
        return false;
    }
}

// Create global instance
const skillsManager = new SkillsManager();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    skillsManager.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SkillsManager };
}