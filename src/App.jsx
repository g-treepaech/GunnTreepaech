import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Moon, Sun, ChevronDown, ArrowUp, Github, Linkedin, Twitter, CheckCircle2, FileText, Mail, Phone, MapPin, GraduationCap, Award } from 'lucide-react'

// Images
import InternshipImg from './image/Internship.jpg'
import SeniorProjectImg from './image/SeniorProjectImg.png'
import ProjectCloudAppImg from './image/ProjectCloudApp.png'
import ProjectACPImg from './image/ProjectACP.png'
import AIMiniprojectImg from './image/AIMiniproject.png'
import BleImg from './image/BleWirelessConnectionSystem.png'
import MyImg from './image/My.jpg'
import CVFile from './Documents/Treepaech_CV.pdf'

// Real Data
const startYear = 2020;
const currentYear = 2024;
const timelineData = {
    2022: {
        title: "Health Manage Calendar",
        description: "Developed a comprehensive to-do management system designed to help users track health-related tasks.",
        achievements: [
            "Implemented a dynamic calendar interface",
            "Built a task reminding system for due dates",
            "Integrated time management recommendations"
        ],
        image: ProjectACPImg
    },
    2023: {
        title: "Programmer Internship & AI Projects",
        description: "Gained professional experience at PlaySmart IoT and explored AI and BLE technologies.",
        achievements: [
            "Internship: Developed IoT data display and storage websites",
            "Co-authored: Tested and corrected code for 'Developing IoT on ESP32' book",
            "Garbage Classification: Built a Vision AI model for waste sorting",
            "BLE Connection: Developed NRF52840 wireless control system",
            "Home Loan App: Created a 3-year repayment simulation tool"
        ],
        image: InternshipImg
    },
    2024: {
        title: "Senior Project: CNI Performance Study",
        description: "Conducted in-depth research and testing on Container Network Interfaces for Kubernetes.",
        achievements: [
            "Analyzed Calico, Flannel, and Cilium performance",
            "Conducted tests on physical Raspberry Pi 4 hardware",
            "Utilized virtual simulators for large-scale testing",
            "Graduated with 3.43 GPA, Second Class Honors"
        ],
        image: SeniorProjectImg
    }
};

const years = [2022, 2023, 2024];

export default function App() {
    const [isDark, setIsDark] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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
                        <a href="#about" className="text-sm font-semibold hover:text-blue-500 transition-colors">About</a>
                        {years.map(y => (
                            <a key={y} href={`#year-${y}`} className="text-sm font-semibold hover:text-blue-500 transition-colors">{y}</a>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <a href={CVFile} download className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-all">
                            <FileText className="w-4 h-4" /> Download CV
                        </a>
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden pt-20">
                <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-[120px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                    className="relative mb-8"
                >
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-blue-500 p-1 overflow-hidden">
                        <img src={MyImg} alt="Treepaech" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 p-2 rounded-full shadow-lg">
                        <Award className="w-6 h-6 text-white" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                >
                    Treepaech Treechan
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl font-bold text-slate-600 dark:text-slate-400 mb-6"
                >
                    Computer Engineer | Full-Stack Developer
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="max-w-2xl text-slate-500 dark:text-slate-400 leading-relaxed mb-8 px-4"
                >
                    Recent graduate from Khon Kaen University with Second Class Honors.
                    Determined to apply academic knowledge to real-world challenges,
                    with experience in IoT, Web Development, and AI.
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full text-sm font-medium">
                        <GraduationCap className="w-4 h-4" /> B.Eng Computer Engineering
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 rounded-full text-sm font-medium">
                        <MapPin className="w-4 h-4" /> Khon Kaen, Thailand
                    </div>
                </div>

                <div className="absolute bottom-10 animate-bounce text-slate-400 flex flex-col items-center gap-2">
                    <span className="text-xs font-bold tracking-widest uppercase">My Journey</span>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </header>

            {/* Timeline Sections */}
            <main className="max-w-5xl mx-auto px-6 py-20 relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 md:block hidden" />

                <div className="space-y-32">
                    {years.map((year, idx) => (
                        <section key={year} id={`year-${year}`} className="relative scroll-mt-24">
                            {/* Year Marker */}
                            <div className="md:absolute md:left-1/2 md:-translate-x-1/2 top-0 z-10 flex justify-center mb-6 md:mb-0">
                                <span className="px-6 py-2 rounded-full border-2 border-blue-500 bg-white dark:bg-slate-900 text-blue-500 font-bold text-lg shadow-xl">
                                    {year}
                                </span>
                            </div>

                            <div className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Content Card */}
                                <div className="w-full md:w-[45%]">
                                    <motion.div
                                        initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                                        className="p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 shadow-2xl backdrop-blur-sm"
                                    >
                                        <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                                            {timelineData[year]?.title}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                                            {timelineData[year]?.description}
                                        </p>
                                        <ul className="space-y-4">
                                            {timelineData[year]?.achievements.map((item, i) => (
                                                <li key={i} className="flex gap-3 text-sm">
                                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                                    <span className="text-slate-600 dark:text-slate-300">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </div>

                                {/* Image/Media */}
                                <div className="w-full md:w-[45%]">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                                        className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800"
                                    >
                                        <img
                                            src={timelineData[year]?.image}
                                            alt={timelineData[year]?.title}
                                            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </main>

            {/* Additional Projects (Optional Grid) */}
            <section className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-100 dark:border-slate-800">
                <h2 className="text-3xl font-bold mb-12 text-center">Notable Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: "Home Loan Sim", img: ProjectCloudAppImg, desc: "3-year repayment calculation tool." },
                        { title: "Garbage AI", img: AIMiniprojectImg, desc: "Vision AI for waste classification." },
                        { title: "BLE Control", img: BleImg, desc: "Wireless hardware control via BLE." }
                    ].map((proj, i) => (
                        <div key={i} className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all">
                            <div className="h-48 overflow-hidden">
                                <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-6">
                                <h4 className="font-bold mb-2">{proj.title}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{proj.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-xl font-bold text-blue-600 mb-4">Let's Connect</p>
                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        <a href="mailto:treepaech.t@email.com" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                            <Mail className="w-5 h-5" /> treepaech.t@email.com
                        </a>
                        <a href="tel:+66xxxxxxxx" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                            <Phone className="w-5 h-5" /> +66 XX XXX XXXX
                        </a>
                    </div>
                    <div className="flex justify-center gap-6 mb-8">
                        {[Github, Linkedin, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                                <Icon className="w-6 h-6" />
                            </a>
                        ))}
                    </div>
                    <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Treepaech Treechan. Built with React & Tailwind.</p>
                </div>
            </footer>

            {/* Back to Top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                <ArrowUp className="w-6 h-6" />
            </button>
        </div>
    );
}

