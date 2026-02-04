import React from 'react';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function TrustBanner() {
    const t = useTranslations('TrustBanner');

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#fdfbf7] via-[#f4f9e9] to-[#edf5d8] py-20 mb-16">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#badc58]/10 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#6ab04c]/10 rounded-full blur-[100px]"></div>
                <div className="absolute top-[20%] right-[10%] w-[150px] h-[150px] bg-[#ffbe76]/10 rounded-full blur-[60px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
                    {/* Authentic Card */}
                    <div className="group flex flex-col items-center text-center p-8 rounded-[32px] bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(106,176,76,0.15)] hover:-translate-y-2 hover:bg-white/60">
                        <div className="mb-6 relative">
                            <div className="absolute inset-0 bg-[#6ab04c]/20 rounded-full blur-xl transform scale-0 transition-transform duration-500 group-hover:scale-150"></div>
                            <div className="relative flex items-center justify-center w-20 h-20 rounded-[24px] bg-gradient-to-br from-white to-[#f0f9ff] shadow-[0_8px_16px_rgba(0,0,0,0.08)] text-[#6ab04c]">
                                <ShieldCheck size={42} strokeWidth={1.5} className="transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-black text-gray-800 mb-2 tracking-tight group-hover:text-[#6ab04c] transition-colors">{t('authenticTitle')}</h3>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">{t('authenticDesc')}</p>
                    </div>

                    {/* Shipping Card */}
                    <div className="group flex flex-col items-center text-center p-8 rounded-[32px] bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(56,173,169,0.15)] hover:-translate-y-2 hover:bg-white/60">
                        <div className="mb-6 relative">
                            <div className="absolute inset-0 bg-[#38ada9]/20 rounded-full blur-xl transform scale-0 transition-transform duration-500 group-hover:scale-150"></div>
                            <div className="relative flex items-center justify-center w-20 h-20 rounded-[24px] bg-gradient-to-br from-white to-[#f0f9ff] shadow-[0_8px_16px_rgba(0,0,0,0.08)] text-[#38ada9]">
                                <Truck size={42} strokeWidth={1.5} className="transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-black text-gray-800 mb-2 tracking-tight group-hover:text-[#38ada9] transition-colors">{t('shippingTitle')}</h3>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">{t('shippingDesc')}</p>
                    </div>

                    {/* Quality Card */}
                    <div className="group flex flex-col items-center text-center p-8 rounded-[32px] bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(246,185,59,0.15)] hover:-translate-y-2 hover:bg-white/60">
                        <div className="mb-6 relative">
                            <div className="absolute inset-0 bg-[#f6b93b]/20 rounded-full blur-xl transform scale-0 transition-transform duration-500 group-hover:scale-150"></div>
                            <div className="relative flex items-center justify-center w-20 h-20 rounded-[24px] bg-gradient-to-br from-white to-[#f0f9ff] shadow-[0_8px_16px_rgba(0,0,0,0.08)] text-[#f6b93b]">
                                <Sparkles size={42} strokeWidth={1.5} className="transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                            </div>
                        </div>
                        <h3 className="text-xl font-black text-gray-800 mb-2 tracking-tight group-hover:text-[#f6b93b] transition-colors">{t('qualityTitle')}</h3>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">{t('qualityDesc')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
