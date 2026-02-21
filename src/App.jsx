import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Moon, Sun, ChevronDown, ArrowUp, Github, Linkedin, Twitter, CheckCircle2 } from 'lucide-react'

// Mock Data
const startYear = 2013;
const currentYear = new Date().getFullYear();
const timelineData = {
    2013: { title: "The Beginning", description: "Started my journey into the world of web development.", achievements: ["Learned HTML & CSS basics", "Built first static website"] },
    2014: { title: "Hello JavaScript", description: "Dived deep into Vanilla JavaScript.", achievements: ["Mastered JS fundamentals", "Built a simple Calculator App"] },
    2015: { title: "System Architecture", description: "Explored backend technologies.", achievements: ["Learned PHP & MySQL", "Developed a blogging platform"] },
    2016: { title: "Responsive Era", description: "Focused on Mobile-first design.", achievements: ["Started using Bootstrap/SASS", "Optimized for mobile"] },
    2017: { title: "Framework Revolution", description: "Adopted modern JS frameworks.", achievements: ["Learned Vue.js", "Built task management system"] },
    2018: { title: "Professional Growth", description: "Joined a tech startup.", achievements: ["Agile environment", "Learned React & Redux"] },
    2019: { title: "Full Stack!", description: "Node.js and Express.", achievements: ["Developed RESTful APIs", "Worked with MongoDB"] },
    2020: { title: "Digital Shift", description: "Remote collaboration.", achievements: ["Learned Next.js", "Mastered CSS Grid"] },
    2021: { title: "Senior Lead", description: "Leadership responsibilities.", achievements: ["Mentored juniors", "Architectural decisions"] },
    2022: { title: "Cloud & DevOps", description: "AWS and CI/CD.", achievements: ["AWS Certification", "Docker containers"] },
    2023: { title: "AI Integration", description: "Exploring AI/ML in web.", achievements: ["OpenAI API features", "Built AI chat interfaces"] },
    2024: { title: "Modern Architecture", description: "Edge and Micro-frontends.", achievements: ["Serverless apps", "Security best practices"] },
    2025: { title: "Innovation", description: "Digital transformation.", achievements: ["Design Systems", "Performance optimization"] },
    [currentYear]: { title: "Present Day", description: "Pushing boundaries.", achievements: ["Leading global team", "AI-driven development"] }
};

const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

export default function App() {
    const [isDark, setIsDark] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setIsDark(theme === 'dark');
        document.body.setAttribute('data-theme', theme);
    }, []);

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 500);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        const theme = next ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', theme);
        if (next) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    };

    return (
        <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 z-[2000] origin-left"
                style={{ scaleX }}
            />

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-[1000] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="font-extrabold text-xl tracking-tighter text-blue-600">PORTFOLIO</div>
                    <div className="hidden md:flex gap-6 items-center">
                        {years.filter(y => y === startYear || y === currentYear || (y - startYear) % 3 === 0).map(y => (
                            <a key={y} href={`#year-${y}`} className="text-sm font-semibold hover:text-blue-500 transition-colors">{y}</a>
                        ))}
                    </div>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <header className="h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-[120px]" />
                </div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                >
                    My Professional Journey
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-500 max-w-2xl"
                >
                    A decade of building, learning, and growing in the world of technology.
                </motion.p>
                <div className="absolute bottom-10 animate-bounce text-slate-400 flex flex-col items-center gap-2">
                    <span className="text-xs font-bold tracking-widest uppercase">Scroll Down</span>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </header>

            {/* Timeline */}
            <main className="max-w-4xl mx-auto px-6 py-20 relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 md:block hidden" />

                <div className="space-y-24">
                    {years.map((year, idx) => (
                        <section key={year} id={`year-${year}`} className="relative scroll-mt-24">
                            {/* Year Marker */}
                            <div className="md:absolute md:left-1/2 md:-translate-x-1/2 top-0 z-10 flex justify-center mb-6 md:mb-0">
                                <span className="px-4 py-1 rounded-full border-2 border-blue-500 bg-white dark:bg-slate-900 text-blue-500 font-bold text-sm shadow-xl">
                                    {year}
                                </span>
                            </div>

                            {/* Background Year Text */}
                            <h2 className="absolute top-0 left-0 w-full text-center text-[10rem] font-black opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none -translate-y-1/2">
                                {year}
                            </h2>

                            <div className={`flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="w-full md:w-[45%]">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                                        className="p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-xl backdrop-blur-sm hover:scale-[1.02] transition-transform"
                                    >
                                        <h3 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">
                                            {timelineData[year]?.title || `Year ${year}`}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 mb-6 italic">
                                            {timelineData[year]?.description}
                                        </p>
                                        <ul className="space-y-3">
                                            {timelineData[year]?.achievements.map((item, i) => (
                                                <li key={i} className="flex gap-3 text-sm">
                                                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </div>
                                <div className="hidden md:block w-[10%]" />
                                <div className="w-full md:w-[45%] hidden md:block" />
                            </div>
                        </section>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-slate-500 mb-8">&copy; {currentYear} Portfolio. All rights reserved.</p>
                    <div className="flex justify-center gap-6">
                        {[Github, Linkedin, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-blue-500 transition-all">
                                <Icon className="w-6 h-6" />
                            </a>
                        ))}
                    </div>
                </div>
            </footer>

            {/* Back to Top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-2xl transition-all ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                <ArrowUp className="w-6 h-6" />
            </button>
        </div>
    );
}
