'use client';

export default function HeroCarousel() {
    return (
        <section className="w-full px-4 pt-4">
            <div className="relative w-full aspect-[21/9] overflow-hidden rounded-xl bg-primary/10">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNsizplfT-pNPaHFFgIGdjaQw4_Dfn4VQ6bpBPGA4KU17KHrscYwIq-KtBgt0mne-_wJO35TAPIC2fQTW4J8YvlymFQiy7KhU1wRivCITBhgyZB8AA-owpwH1y8CO2rehJm8QtWmOczsdN3oGChtv981q_1WyT_rgxiDNwlNLr-UW7QJ_fSXeJP9SflHCVwghLrC1mYSFWPcawlDEB2HLrPLAihja7pIdU7BEyurXtT1ezAQWT7N3vaeSjugzakMpq1NUeuJdaNA')" }} // Placeholder from Stitch
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-center p-6">
                    <span className="text-white text-xs font-bold uppercase tracking-widest mb-1">Limited Time Only</span>
                    <h2 className="text-white text-2xl font-extrabold leading-tight mb-2">Global Shipping<br />Now Available!</h2>
                    <button className="w-fit px-4 py-1.5 bg-white text-primary text-sm font-bold rounded-full shadow-sm">Shop Now</button>
                </div>
                {/* Carousel Dots */}
                <div className="absolute bottom-3 right-4 flex gap-1.5">
                    <div className="h-1.5 w-4 bg-white rounded-full"></div>
                    <div className="h-1.5 w-1.5 bg-white/50 rounded-full"></div>
                    <div className="h-1.5 w-1.5 bg-white/50 rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
