/**
 * Portfolio Timeline Script
 * Author: Antigravity AI
 * Description: Dynamically generates timeline from 2013 to current year.
 */

// 1. Configuration & Data
const currentYear = new Date().getFullYear();
const startYear = 2013;

// Mock Data for the Timeline
// In a real scenario, this could be fetched from a JSON file or API
const timelineData = {
    2013: {
        title: "The Beginning",
        description: "Started my journey into the world of web development and programming.",
        achievements: ["Learned HTML & CSS basics", "Built first static website", "Expressed interest in UI/UX"]
    },
    2014: {
        title: "Hello JavaScript",
        description: "Dived deep into Vanilla JavaScript and basic DOM manipulation.",
        achievements: ["Mastered JS fundamentals", "Built a simple Calculator App", "Started using jQuery for DOM interactions"]
    },
    2015: {
        title: "System Architecture",
        description: "Explored backend technologies and databases.",
        achievements: ["Learned PHP & MySQL basics", "Developed a blogging platform", "Understood client-server architecture"]
    },
    2016: {
        title: "Responsive Era",
        description: "Focused on Mobile-first design and modern CSS techniques.",
        achievements: ["Started using Bootstrap and SASS", "Optimized performance for mobile devices", "Freelanced for local businesses"]
    },
    2017: {
        title: "Framework Revolution",
        description: "Adopted modern JS frameworks for building scalable SPAs.",
        achievements: ["Early adoption of Vue.js", "Built a task management system", "Started using Git for version control"]
    },
    2018: {
        title: "Professional Growth",
        description: "Joined a tech startup as a Junior Frontend Developer.",
        achievements: ["Worked in an Agile environment", "Collaborated on team projects with Git", "Learned React.js and Redux"]
    },
    2019: {
        title: "Full Stack Development",
        description: "Expanded skills to include Node.js and Express.",
        achievements: ["Developed RESTful APIs", "Worked with MongoDB (NoSQL)", "Implemented user authentication systems"]
    },
    2020: {
        title: "Digital Shift",
        description: "Focused on remote collaboration and high-performance web apps.",
        achievements: ["Learned Next.js for SSR", "Mastered CSS Grid and Advanced Animations", "Started a tech blog"]
    },
    2021: {
        title: "Senior Lead Role",
        description: "Took on leadership responsibilities and architectural decisions.",
        achievements: ["Mentored junior developers", "Directed architectural shifts to TypeScript", "Led migration to Tailwind CSS"]
    },
    2022: {
        title: "Cloud & DevOps",
        description: "Integrated cloud services and CI/CD pipelines.",
        achievements: ["AWS Certification (Practitioner)", "Configured Docker containers", "Focused on Web Vitals and SEO"]
    },
    2023: {
        title: "AI Integration",
        description: "Started exploring AI/ML integration in web applications.",
        achievements: ["Used OpenAI API for smart features", "Built AI-powered chat interfaces", "Experimented with WebAssembly"]
    },
    2024: {
        title: "Modern Architecture",
        description: "Embracing Edge Computing and Micro-frontends.",
        achievements: ["Built highly scalable serverless apps", "Focused on Cyber-security best practices", "Contributed to major Open Source projects"]
    },
    2025: {
        title: "Innovation & Scale",
        description: "Leading large-scale digital transformations.",
        achievements: ["Developed complex Design Systems", "Optimized sub-second page loads", "Published a book on Web Architecture"]
    },
    [currentYear]: {
        title: "Present Day",
        description: "Continuing to push boundaries in Web Development.",
        achievements: ["Leading a global engineering team", "Researching Decentralized Web", "Innovating with AI-driven development"]
    }
};

// 2. Initialization
document.addEventListener('DOMContentLoaded', () => {
    initTimeline();
    initNavbarLinks();
    initScrollAnimations();
    initDarkMode();
    initScrollProgressBar();
    initBackToTop();
    
    // Update footer year
    document.getElementById('current-footer-year').textContent = currentYear;
});

// 3. Generate Timeline Content
function initTimeline() {
    const timelineContent = document.getElementById('timeline-content');
    let html = '';

    // Generate years from 2013 to currentYear
    for (let year = startYear; year <= currentYear; year++) {
        const data = timelineData[year] || { 
            title: `Year ${year}`, 
            description: "Working on various exciting projects and improving skills.",
            achievements: ["Continuous learning", "Developing software solutions"]
        };

        html += `
            <section id="year-${year}" class="year-section">
                <div class="year-marker">${year}</div>
                <h2 class="year-title">${year}</h2>
                <div class="timeline-item">
                    <div class="timeline-content reveal">
                        <h3 class="item-title">${data.title}</h3>
                        <p class="item-description">${data.description}</p>
                        <ul class="item-list">
                            ${data.achievements.map(task => `<li>${task}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </section>
        `;
    }

    timelineContent.innerHTML = html;
}

// 4. Generate Navbar Links
function initNavbarLinks() {
    const navLinks = document.getElementById('nav-links');
    // We'll show a sample of years to keep it clean (e.g., every 2 or 3 years, plus current)
    const yearsToShow = [];
    for (let y = startYear; y <= currentYear; y++) {
        if (y === startYear || y === currentYear || (y - startYear) % 3 === 0) {
            yearsToShow.push(y);
        }
    }

    yearsToShow.forEach(year => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#year-${year}">${year}</a>`;
        navLinks.appendChild(li);
    });
}

// 5. Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve if you only want it once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with 'reveal' class
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// 6. Dark Mode Logic
function initDarkMode() {
    const toggle = document.getElementById('dark-mode-toggle');
    const icon = toggle.querySelector('i');
    
    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    toggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.body.removeAttribute('data-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// 7. Scroll Progress Bar
function initScrollProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
}

// 8. Back to Top Button
function initBackToTop() {
    const btn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
