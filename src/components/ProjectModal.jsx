import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Globe, Github, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ProjectModal = ({ isOpen, onClose, projectKey, image }) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!projectKey) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800"
                    >
                        {/* Header Image */}
                        <div className="relative h-48 md:h-72 overflow-hidden">
                            <img
                                src={image}
                                alt={t(`timeline.${projectKey}.title`)}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-10">
                            <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                {t(`timeline.${projectKey}.title`)}
                            </h2>

                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                                {t(`timeline.${projectKey}.details`)}
                            </p>

                            {/* Features/Items */}
                            <div className="mb-10">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-blue-500" />
                                    Key Features
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {t(`timeline.${projectKey}.items`, { returnObjects: true }).map((li, i) => (
                                        <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-sm">
                                            {li}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            <div className="flex flex-wrap gap-4">
                                {t(`timeline.${projectKey}.links`, { returnObjects: true }).map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
                                    >
                                        {link.label.includes('GitHub') ? <Github className="w-5 h-5" /> :
                                            link.label.includes('Book') ? <BookOpen className="w-5 h-5" /> :
                                                <ExternalLink className="w-5 h-5" />}
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
