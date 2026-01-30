
// Map of common Korean cosmetics terms to English/Spanish/Portuguese
// Since we don't have a real API, we use a simple dictionary and a heuristic fallback.

const DICTIONARY: Record<string, Record<string, string>> = {
    '마스크': {
        'en': 'Mask',
        'es': 'Mascarilla',
        'pt': 'Máscara',
        'ru': 'Маска',
    },
    '세럼': {
        'en': 'Serum',
        'es': 'Suero',
        'pt': 'Sérum',
        'ru': 'Сыворотка',
    },
    '크림': {
        'en': 'Cream',
        'es': 'Crema',
        'pt': 'Creme',
        'ru': 'Крем',
    },
    '토너': {
        'en': 'Toner',
        'es': 'Tónico',
        'pt': 'Tônico',
        'ru': 'Тоник',
    },
    '선크림': {
        'en': 'Sunscreen',
        'es': 'Protector Solar',
        'pt': 'Protetor Solar',
        'ru': 'Солнцезащитный крем',
    },
    '올영픽': {
        'en': '[Olive Young Pick]',
        'es': '[Selección Olive Young]',
        'pt': '[Escolha Olive Young]',
        'ru': '[Выбор Olive Young]',
    },
    '1위': {
        'en': '#1 Best',
        'es': '#1 Mejor',
        'pt': '#1 Melhor',
        'ru': '#1 Лучший',
    },
    '기획': {
        'en': 'Set',
        'es': 'Set',
        'pt': 'Conjunto',
        'ru': 'Набор',
        'tr': 'Set',
    },
    '토리든': { 'en': 'Torriden', 'es': 'Torriden', 'pt': 'Torriden', 'tr': 'Torriden' },
    '메디힐': { 'en': 'Mediheal', 'es': 'Mediheal', 'pt': 'Mediheal', 'tr': 'Mediheal' },
    '크런틴': { 'en': 'Crunky', 'es': 'Crunky', 'pt': 'Crunky', 'tr': 'Crunky' },
    '메노킨': { 'en': 'Menokin', 'es': 'Menokin', 'pt': 'Menokin', 'tr': 'Menokin' },
    '라로슈포제': { 'en': 'La Roche-Posay', 'es': 'La Roche-Posay', 'pt': 'La Roche-Posay', 'tr': 'La Roche-Posay' },
    '에스트라': { 'en': 'Aestura', 'es': 'Aestura', 'pt': 'Aestura', 'tr': 'Aestura' },
    '바이오더마': { 'en': 'Bioderma', 'es': 'Bioderma', 'pt': 'Bioderma', 'tr': 'Bioderma' },
    '달바': { 'en': 'd\'Alba', 'es': 'd\'Alba', 'pt': 'd\'Alba', 'tr': 'd\'Alba' },
    '바이오던스': { 'en': 'Biodance', 'es': 'Biodance', 'pt': 'Biodance', 'tr': 'Biodance' },
    '다이브인': { 'en': 'Dive-In', 'es': 'Dive-In', 'pt': 'Dive-In', 'tr': 'Dive-In' },
    '마데카소사이드': { 'en': 'Madecassoside', 'es': 'Madecassoside', 'pt': 'Madecassoside', 'tr': 'Madecassoside' },
    '히알루론산': { 'en': 'Hyaluronic Acid', 'es': 'Ácido Hialurónico', 'pt': 'Ácido Hialurônico', 'tr': 'Hyaluronik Asit' },
    '패드': { 'en': 'Pad', 'es': 'Almohadilla', 'pt': 'Almofada', 'tr': 'Ped' },
    '어워즈': { 'en': 'Awards', 'es': 'Premios', 'pt': 'Prêmios', 'tr': 'Ödüller' },
    '1등': { 'en': '#1', 'es': '#1', 'pt': '#1', 'tr': '#1' },
    '매': { 'en': 'sheets', 'es': 'hojas', 'pt': 'folhas', 'tr': 'adet' },
    '종': { 'en': 'types', 'es': 'tipos', 'pt': 'tipos', 'tr': 'tür' },
    '택1': { 'en': '(Select 1)', 'es': '(Seleccionar 1)', 'pt': '(Selecionar 1)', 'tr': '(1 Seç)' },
    '증정': { 'en': '+Gift', 'es': '+Regalo', 'pt': '+Presente', 'tr': '+Hediye' },
    '단독': { 'en': 'Exclusive', 'es': 'Exclusivo', 'pt': 'Exclusivo', 'tr': 'Özel' },
    // Catch-all for the specific Torriden product (normalize spaces if needed)
    '[2025 어워즈 1등] 토리든 다이브인 마스크 10매': {
        'en': '[2025 Awards #1] Torriden Dive-In Mask 10 Sheets',
        'es': '[Premios 2025 #1] Torriden Mascarilla Dive-In 10 Hojas',
        'pt': '[Prêmios 2025 #1] Torriden Máscara Dive-In 10 Folhas',
        'tr': '[2025 Ödüller #1] Torriden Dive-In Maske 10 Adet'
    },
};

export async function translateText(text: string, targetLang: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const lang = targetLang.split('-')[0];

    if (lang === 'ko') return text;

    // Simple substitution
    let translated = text;
    Object.keys(DICTIONARY).forEach(key => {
        const translations = DICTIONARY[key];
        if (translations && translations[lang]) {
            translated = translated.replace(new RegExp(key, 'g'), translations[lang]);
        }
    });

    // If mostly Korean characters remain, append a mock tag
    // Check if Korean characters exist range: AC00-D7AF
    const hasKorean = /[=\uac00-\ud7af]/.test(translated);
    if (hasKorean) {
        return `[${targetLang.toUpperCase()}] ${translated}`;
    }

    return translated;
}
