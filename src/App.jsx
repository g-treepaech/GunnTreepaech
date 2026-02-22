import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Moon, Sun, ChevronDown, ArrowUp, Github, Linkedin, Twitter, CheckCircle2, FileText, Mail, Phone, MapPin, GraduationCap, Award, Languages } from 'lucide-react'
import { useTranslation, Trans } from 'react-i18next'

// Images
import InternshipImg from './image/Internship.jpg'
import SeniorProjectImg from './image/SeniorProjectImg.png'
import ProjectCloudAppImg from './image/ProjectCloudApp.png'
import ProjectACPImg from './image/ProjectACP.png'
import AIMiniprojectImg from './image/AIMiniproject.png'
import BleImg from './image/BleWirelessConnectionSystem.png'
import MyImg from './image/My.jpg'
import CVFile from './Documents/Treepaech_CV.pdf'
import ResumeFile from './Documents/Treepaech_Resume.pdf'

import TimelineCard from './components/TimelineCard'
import YearSection from './components/YearSection'
import ProjectModal from './components/ProjectModal'
import DownloadDropdown from './components/DownloadDropdown'

const years = [2022, 2023, 2024];

const timelineData = [
    { year: 2022, key: 'healthCalendar', image: ProjectACPImg },
    { year: 2023, key: 'internship', image: InternshipImg },
    { year: 2023, key: 'garbageAI', image: AIMiniprojectImg },
    { year: 2023, key: 'bleControl', image: BleImg },
    { year: 2023, key: 'homeLoan', image: ProjectCloudAppImg },
    { year: 2024, key: 'seniorProject', image: SeniorProjectImg },
];

export default function App() {
    const [isDark, setIsDark] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const downloadOptions = [
        { labelKey: 'nav.cv', file: CVFile },
        { labelKey: 'nav.resume', file: ResumeFile },
    ];

    const { t, i18n } = useTranslation();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const handleViewDetails = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setIsDark(theme === 'dark');
        document.body.setAttribute('data-theme', theme);
        if (theme === 'dark') document.documentElement.classList.add('dark');
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

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'th' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className={`min-h-screen ${isDark ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300`}>
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 z-[2000] origin-left"
                style={{ scaleX }}
            />

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-[1000] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="font-extrabold text-xl tracking-tighter text-blue-600">TREEPAECH.T</div>
                    <div className="hidden md:flex gap-6 items-center">
                        <a href="#about" className="text-sm font-semibold hover:text-blue-500 transition-colors">{t('nav.about')}</a>
                        {years.map(y => (
                            <a key={y} href={`#year-${y}`} className="text-sm font-semibold hover:text-blue-500 transition-colors">{y}</a>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={toggleLanguage} className="flex items-center gap-3 px-3 h-9 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                            {i18n.language === 'en' ? (
                                <div className="flex items-center gap-2">
                                    <img src="https://flagcdn.com/w20/th.png" srcSet="https://flagcdn.com/w40/th.png 2x" width="22" alt="Thai" className="rounded-sm shadow-sm" />
                                    <span className="leading-none">TH</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <img src="https://flagcdn.com/w20/us.png" srcSet="https://flagcdn.com/w40/us.png 2x" width="22" alt="English" className="rounded-sm shadow-sm" />
                                    <span className="leading-none">EN</span>
                                </div>
                            )}
                        </button>
                        <DownloadDropdown options={downloadOptions} />
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header id="about" className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden pt-20">
                <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-[120px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                    className="relative mb-6 md:mb-8"
                >
                    <div className="w-28 h-28 md:w-48 md:h-48 rounded-full border-4 border-blue-500 p-1 overflow-hidden">
                        <img src={MyImg} alt="Treepaech" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 p-1.5 md:p-2 rounded-full shadow-lg">
                        <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                    className="text-3xl md:text-6xl font-extrabold mb-3 md:mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent px-4"
                >
                    Treepaech Treechan
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-2xl font-bold text-slate-600 dark:text-slate-400 mb-4 md:mb-6 px-4"
                >
                    {t('hero.role')}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="max-w-2xl text-slate-500 dark:text-slate-400 leading-relaxed mb-6 md:mb-8 px-6 text-sm md:text-base"
                >
                    <Trans i18nKey="hero.about">
                        Recent graduate from Khon Kaen University with <strong>3.43 GPA, Second Class Honors</strong>.
                        Determined to apply academic knowledge to real-world challenges,
                        with experience in IoT, Web Development, and AI.
                    </Trans>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full text-[11px] md:text-sm font-medium">
                        <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4" /> {t('hero.degree')}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 rounded-full text-[11px] md:text-sm font-medium">
                        <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" /> {t('hero.location')}
                    </div>
                </div>

                <div className="mt-4 md:absolute md:bottom-10 animate-bounce text-slate-400 flex flex-col items-center gap-2 pb-10 md:pb-0">
                    <span className="text-[10px] font-bold tracking-widest uppercase">{t('hero.journey')}</span>
                    <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                </div>
            </header>

            {/* Timeline Sections */}
            <main className="max-w-5xl mx-auto px-6 py-20 relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 md:block hidden" />

                <div className="space-y-32">
                    {years.map(year => (
                        <YearSection key={year} year={year}>
                            {timelineData
                                .filter(item => item.year === year)
                                .map((item) => {
                                    // Find absolute index for alternating layout
                                    const absoluteIndex = timelineData.indexOf(item);
                                    return (
                                        <TimelineCard
                                            key={item.key}
                                            index={absoluteIndex}
                                            item={item}
                                            onViewDetails={handleViewDetails}
                                        />
                                    );
                                })}
                        </YearSection>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-xl font-bold text-blue-600 mb-4">{t('footer.connect')}</p>
                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        <a href={`mailto:${import.meta.env.VITE_EMAIL}`} className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                            <Mail className="w-5 h-5" /> {import.meta.env.VITE_EMAIL}
                        </a>
                        <a href={`tel:${import.meta.env.VITE_PHONE}`} className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                            <Phone className="w-5 h-5" /> {import.meta.env.VITE_PHONE}
                        </a>
                    </div>
                    <div className="flex justify-center gap-6 mb-8">
                        {[Github, Linkedin, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                                <Icon className="w-6 h-6" />
                            </a>
                        ))}
                    </div>
                    <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Treepaech Treechan. {t('footer.builtWith')}.</p>
                </div>
            </footer>

            {/* Back to Top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                <ArrowUp className="w-6 h-6" />
            </button>

            {/* Project Details Modal */}
            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                projectKey={selectedProject?.key}
                image={selectedProject?.image}
            />
        </div>
    );
}

