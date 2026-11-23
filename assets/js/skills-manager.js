/**
 * Skills Manager
 * Loads the skill list and handles category tabs.
 */

class SkillsManager {
    constructor() {
        this.skillsData = null;
    }

    async init() {
        try {
            const response = await fetch('data/skills.json', { cache: 'no-store' });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            this.skillsData = await response.json();
            this.renderSkills();
            this.initTabs();
        } catch (error) {
            console.error('Failed to load skills:', error);
            const grid = document.getElementById('frontend-skills');
            if (grid) {
                grid.innerHTML = `<p class="skills__empty-state" data-i18n="skills.error">Skills could not be loaded.</p>`;
            }
        }
    }

    renderSkills() {
        if (!this.skillsData) return;

        ['frontend', 'backend', 'tools'].forEach(category => {
            const container = document.getElementById(`${category}-skills`);
            const skills = this.skillsData.skills?.[category];
            if (!container) return;

            container.innerHTML = skills?.length
                ? skills.map(skill => {
                    const years = skill.years
                        ? `<span class="skill__years">${skill.years} ${t(skill.years === 1 ? 'skill.year' : 'skill.years')}</span>`
                        : '';
                    const description = skill.description
                        ? `<p class="skill__description">${pick(skill.description)}</p>`
                        : '';

                    return `
                        <div class="skill">
                            <div class="skill__body">
                                <span class="skill__name">${skill.name}</span>
                                ${years}
                                ${description}
                            </div>
                        </div>
                    `;
                }).join('')
                : `<p class="skills__empty-state" data-i18n="skills.empty">No skills in this category yet.</p>`;
        });
    }

    initTabs() {
        const tabs = document.querySelectorAll('.skills__tab');
        const panels = document.querySelectorAll('.skills__panel');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;

                tabs.forEach(t => {
                    t.classList.toggle('active', t === tab);
                    t.setAttribute('aria-selected', String(t === tab));
                });

                panels.forEach(panel => {
                    const active = panel.id === `${target}-panel`;
                    panel.classList.toggle('active', active);
                    panel.hidden = !active;
                });
            });

            tab.addEventListener('keydown', (event) => {
                const next = event.key === 'ArrowRight'
                    ? (index + 1) % tabs.length
                    : event.key === 'ArrowLeft'
                        ? (index - 1 + tabs.length) % tabs.length
                        : null;

                if (next === null) return;
                event.preventDefault();
                tabs[next].focus();
                tabs[next].click();
            });
        });
    }
}

const skillsManager = new SkillsManager();

document.addEventListener('DOMContentLoaded', () => skillsManager.init());
document.addEventListener('langchange', () => skillsManager.renderSkills());
