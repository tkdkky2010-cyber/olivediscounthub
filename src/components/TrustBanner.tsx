import React from 'react';
import { useTranslations } from 'next-intl';

export default function TrustBanner() {
    const t = useTranslations('TrustBanner');

    return (
        <div className="bg-gray-50 py-12 border-y border-gray-100 mb-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {/* Authentic */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-white rounded-full shadow-sm text-green-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{t('authenticTitle')}</h3>
                            <p className="text-gray-500 text-sm">{t('authenticDesc')}</p>
                        </div>
                    </div>

                    {/* Shipping */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-white rounded-full shadow-sm text-green-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 17 17 2" />
                                <path d="m2 14 8 8" />
                                <path d="m5 11 8 8" />
                                <path d="m8 8 8 8" />
                                <path d="m11 5 8 8" />
                                <path d="m14 2 8 8" />
                                <path d="M7 2h10" />
                                <path d="M12 2v20" />
                                <path d="M2 12h20" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{t('shippingTitle')}</h3>
                            <p className="text-gray-500 text-sm">{t('shippingDesc')}</p>
                        </div>
                    </div>

                    {/* Quality */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-white rounded-full shadow-sm text-green-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{t('qualityTitle')}</h3>
                            <p className="text-gray-500 text-sm">{t('qualityDesc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
