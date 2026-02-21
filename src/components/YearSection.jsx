const YearSection = ({ year, children }) => {
    return (
        <section id={`year-${year}`} className="relative scroll-mt-24 mb-32 last:mb-0">
            {/* Year Marker */}
            <div className="md:absolute md:left-1/2 md:-translate-x-1/2 top-0 z-10 flex justify-center mb-12 md:mb-0">
                <span className="px-6 py-2 rounded-full border-2 border-blue-500 bg-white dark:bg-slate-900 text-blue-500 font-bold text-lg shadow-xl">
                    {year}
                </span>
            </div>

            <div className="space-y-12">
                {children}
            </div>
        </section>
    );
};

export default YearSection;
