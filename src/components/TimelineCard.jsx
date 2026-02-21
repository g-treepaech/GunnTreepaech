import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const TimelineCard = ({ item, index, onViewDetails }) => {
    const { t } = useTranslation();
    const isEven = index % 2 === 0;

    return (
        <div className={`flex flex-col md:flex-row items-center md:justify-center gap-12 md:pt-24 ${isEven ? 'md:flex-row-reverse' : ''}`}>
            {/* Content Card */}
            <div className="w-full md:w-[45%]">
                <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 shadow-2xl backdrop-blur-sm"
                >
                    <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                        {t(`timeline.${item.key}.title`)}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                        {t(`timeline.${item.key}.description`)}
                    </p>
                    <ul className="space-y-4 mb-8">
                        {t(`timeline.${item.key}.items`, { returnObjects: true }).map((li, i) => (
                            <li key={i} className="flex gap-3 text-sm">
                                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                <span className="text-slate-600 dark:text-slate-300">{li}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => onViewDetails(item)}
                        className="group flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                        {t('timeline.viewDetails')}
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                    </button>
                </motion.div>
            </div>

            {/* Image/Media */}
            <div className="w-full md:w-[45%]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700"
                >
                    <img
                        src={item.image}
                        alt={item.key}
                        className="w-full aspect-[4/3] object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default TimelineCard;
