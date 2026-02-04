
// Map of common Korean cosmetics terms to English/Spanish/Portuguese
// Since we don't have a real API, we use a simple dictionary and a heuristic fallback.

const DICTIONARY: Record<string, Record<string, string>> = {
    '마스크': {
        'en': 'Mask',
        'es': 'Mascarilla',
        'pt': 'Máscara',
        'ru': 'Маска',
        'fr': 'Masque',
        'de': 'Maske',
        'it': 'Maschera',
        'nl': 'Masker',
        'pl': 'Maska',
        'tr': 'Maske',
    },
    '세럼': {
        'en': 'Serum',
        'es': 'Suero',
        'pt': 'Sérum',
        'ru': 'Сыворотка',
        'fr': 'Sérum',
        'de': 'Serum',
        'it': 'Siero',
        'nl': 'Serum',
        'pl': 'Serum',
        'tr': 'Serum',
    },
    '크림': {
        'en': 'Cream',
        'es': 'Crema',
        'pt': 'Creme',
        'ru': 'Крем',
        'fr': 'Crème',
        'de': 'Creme',
        'it': 'Crema',
        'nl': 'Crème',
        'pl': 'Krem',
        'tr': 'Krem',
    },
    '토너': {
        'en': 'Toner',
        'es': 'Tónico',
        'pt': 'Tônico',
        'ru': 'Тоник',
        'fr': 'Tonique',
        'de': 'Toner',
        'it': 'Tonico',
        'nl': 'Toner',
        'pl': 'Tonik',
        'tr': 'Tonik',
    },
    '선크림': {
        'en': 'Sunscreen',
        'es': 'Protector Solar',
        'pt': 'Protetor Solar',
        'ru': 'Солнцезащитный крем',
        'fr': 'Crème Solaire',
        'de': 'Sonnencreme',
        'it': 'Crema Solare',
        'nl': 'Zonnebrandcrème',
        'pl': 'Krem przeciwsłoneczny',
        'tr': 'Güneş Kremi',
    },
    '올영픽': {
        'en': '[Olive Young Pick]',
        'es': '[Selección Olive Young]',
        'pt': '[Escolha Olive Young]',
        'ru': '[Выбор Olive Young]',
        'fr': '[Sélection Olive Young]',
        'de': '[Olive Young Auswahl]',
        'it': '[Selezione Olive Young]',
        'nl': '[Olive Young Keuze]',
        'pl': '[Wybór Olive Young]',
        'tr': '[Olive Young Seçimi]',
    },
    '1위': {
        'en': '#1 Best',
        'es': '#1 Mejor',
        'pt': '#1 Melhor',
        'ru': '#1 Лучший',
        'fr': '#1 Meilleurs',
        'de': '#1 Bestseller',
        'it': '#1 Migliore',
        'nl': '#1 Beste',
        'pl': '#1 Najlepszy',
        'tr': '#1 En İyi',
    },
    '기획': {
        'en': 'Set',
        'es': 'Set',
        'pt': 'Conjunto',
        'ru': 'Набор',
        'tr': 'Set',
        'fr': 'Coffret',
        'de': 'Set',
        'it': 'Set',
        'nl': 'Set',
        'pl': 'Zestaw',
    },
    '토리든': { 'en': 'Torriden', 'es': 'Torriden', 'pt': 'Torriden', 'tr': 'Torriden', 'fr': 'Torriden', 'de': 'Torriden', 'it': 'Torriden', 'nl': 'Torriden', 'pl': 'Torriden', 'ru': 'Torriden' },
    '메디힐': { 'en': 'Mediheal', 'es': 'Mediheal', 'pt': 'Mediheal', 'tr': 'Mediheal', 'fr': 'Mediheal', 'de': 'Mediheal', 'it': 'Mediheal', 'nl': 'Mediheal', 'pl': 'Mediheal', 'ru': 'Mediheal' },
    '크런틴': { 'en': 'Crunky', 'es': 'Crunky', 'pt': 'Crunky', 'tr': 'Crunky', 'fr': 'Crunky', 'de': 'Crunky', 'it': 'Crunky', 'nl': 'Crunky', 'pl': 'Crunky', 'ru': 'Crunky' },
    '메노킨': { 'en': 'Menokin', 'es': 'Menokin', 'pt': 'Menokin', 'tr': 'Menokin', 'fr': 'Menokin', 'de': 'Menokin', 'it': 'Menokin', 'nl': 'Menokin', 'pl': 'Menokin', 'ru': 'Menokin' },
    '라로슈포제': { 'en': 'La Roche-Posay', 'es': 'La Roche-Posay', 'pt': 'La Roche-Posay', 'tr': 'La Roche-Posay', 'fr': 'La Roche-Posay', 'de': 'La Roche-Posay', 'it': 'La Roche-Posay', 'nl': 'La Roche-Posay', 'pl': 'La Roche-Posay', 'ru': 'La Roche-Posay' },
    '에스트라': { 'en': 'Aestura', 'es': 'Aestura', 'pt': 'Aestura', 'tr': 'Aestura', 'fr': 'Aestura', 'de': 'Aestura', 'it': 'Aestura', 'nl': 'Aestura', 'pl': 'Aestura', 'ru': 'Aestura' },
    '바이오더마': { 'en': 'Bioderma', 'es': 'Bioderma', 'pt': 'Bioderma', 'tr': 'Bioderma', 'fr': 'Bioderma', 'de': 'Bioderma', 'it': 'Bioderma', 'nl': 'Bioderma', 'pl': 'Bioderma', 'ru': 'Bioderma' },
    '달바': { 'en': 'd\'Alba', 'es': 'd\'Alba', 'pt': 'd\'Alba', 'tr': 'd\'Alba', 'fr': 'd\'Alba', 'de': 'd\'Alba', 'it': 'd\'Alba', 'nl': 'd\'Alba', 'pl': 'd\'Alba', 'ru': 'd\'Alba' },
    '바이오던스': { 'en': 'Biodance', 'es': 'Biodance', 'pt': 'Biodance', 'tr': 'Biodance', 'fr': 'Biodance', 'de': 'Biodance', 'it': 'Biodance', 'nl': 'Biodance', 'pl': 'Biodance', 'ru': 'Biodance' },
    '프로티원': { 'en': 'Protein One', 'es': 'Protein One', 'pt': 'Protein One', 'tr': 'Protein One', 'fr': 'Protein One', 'de': 'Protein One', 'it': 'Protein One', 'nl': 'Protein One', 'pl': 'Protein One', 'ru': 'Protein One' },
    '아누아': { 'en': 'Anua', 'es': 'Anua', 'pt': 'Anua', 'tr': 'Anua', 'fr': 'Anua', 'de': 'Anua', 'it': 'Anua', 'nl': 'Anua', 'pl': 'Anua', 'ru': 'Anua' },
    '멜라메이트': { 'en': 'Melamate', 'es': 'Melamate', 'pt': 'Melamate', 'tr': 'Melamate', 'fr': 'Melamate', 'de': 'Melamate', 'it': 'Melamate', 'nl': 'Melamate', 'pl': 'Melamate', 'ru': 'Melamate' },
    '정샘물': { 'en': 'Jung Saem Mool', 'es': 'Jung Saem Mool', 'pt': 'Jung Saem Mool', 'tr': 'Jung Saem Mool', 'fr': 'Jung Saem Mool', 'de': 'Jung Saem Mool', 'it': 'Jung Saem Mool', 'nl': 'Jung Saem Mool', 'pl': 'Jung Saem Mool', 'ru': 'Jung Saem Mool' },
    '션리': { 'en': 'ShionLe', 'es': 'ShionLe', 'pt': 'ShionLe', 'tr': 'ShionLe', 'fr': 'ShionLe', 'de': 'ShionLe', 'it': 'ShionLe', 'nl': 'ShionLe', 'pl': 'ShionLe', 'ru': 'ShionLe' },
    '알파드라이브원': { 'en': 'ALPHA DRIVE ONE', 'es': 'ALPHA DRIVE ONE', 'pt': 'ALPHA DRIVE ONE', 'tr': 'ALPHA DRIVE ONE', 'fr': 'ALPHA DRIVE ONE', 'de': 'ALPHA DRIVE ONE', 'it': 'ALPHA DRIVE ONE', 'nl': 'ALPHA DRIVE ONE', 'pl': 'ALPHA DRIVE ONE', 'ru': 'ALPHA DRIVE ONE' },
    '다이브인': { 'en': 'Dive-In', 'es': 'Dive-In', 'pt': 'Dive-In', 'tr': 'Dive-In', 'fr': 'Dive-In', 'de': 'Dive-In', 'it': 'Dive-In', 'nl': 'Dive-In', 'pl': 'Dive-In', 'ru': 'Dive-In' },
    '마데카소사이드': { 'en': 'Madecassoside', 'es': 'Madecassoside', 'pt': 'Madecassoside', 'tr': 'Madecassoside', 'fr': 'Madécassoside', 'de': 'Madecassoside', 'it': 'Madecassoside', 'nl': 'Madecassoside', 'pl': 'Madecassoside', 'ru': 'Madecassoside' },
    '히알루론산': { 'en': 'Hyaluronic Acid', 'es': 'Ácido Hialurónico', 'pt': 'Ácido Hialurônico', 'tr': 'Hyaluronik Asit', 'fr': 'Acide Hyaluronique', 'de': 'Hyaluronsäure', 'it': 'Acido Ialuronico', 'nl': 'Hyaluronzuur', 'pl': 'Kwas hialuronowy', 'ru': 'Гиалуроновая кислота' },
    '패드': { 'en': 'Pad', 'es': 'Almohadilla', 'pt': 'Almofada', 'tr': 'Ped', 'fr': 'Pad', 'de': 'Pad', 'it': 'Dischetto', 'nl': 'Pad', 'pl': 'Płatki', 'ru': 'Пэды' },
    '어워즈': { 'en': 'Awards', 'es': 'Premios', 'pt': 'Prêmios', 'tr': 'Ödüller', 'fr': 'Prix', 'de': 'Awards', 'it': 'Premi', 'nl': 'Awards', 'pl': 'Nagrody', 'ru': 'Награды' },
    '1등': { 'en': '#1', 'es': '#1', 'pt': '#1', 'tr': '#1', 'fr': '#1', 'de': '#1', 'it': '#1', 'nl': '#1', 'pl': '#1', 'ru': '#1' },
    '매': { 'en': 'sheets', 'es': 'hojas', 'pt': 'folhas', 'tr': 'adet', 'fr': 'feuilles', 'de': 'Blätter', 'it': 'fogli', 'nl': 'vellen', 'pl': 'sztuk', 'ru': 'шт.' },
    '종': { 'en': 'types', 'es': 'tipos', 'pt': 'tipos', 'tr': 'tür', 'fr': 'types', 'de': 'Typen', 'it': 'tipi', 'nl': 'soorten', 'pl': 'typy', 'ru': 'видов' },
    '택1': { 'en': '(Select 1)', 'es': '(Seleccionar 1)', 'pt': '(Selecionar 1)', 'tr': '(1 Seç)', 'fr': '(Choix 1)', 'de': '(Wähle 1)', 'it': '(Seleziona 1)', 'nl': '(Kies 1)', 'pl': '(Wybierz 1)', 'ru': '(Выбрать 1)' },
    '증정': { 'en': '+Gift', 'es': '+Regalo', 'pt': '+Presente', 'tr': '+Hediye', 'fr': '+Cadeau', 'de': '+Geschenk', 'it': '+Regalo', 'nl': '+Cadeau', 'pl': '+Prezent', 'ru': '+Подарок' },
    '단독': { 'en': 'Exclusive', 'es': 'Exclusivo', 'pt': 'Exclusivo', 'tr': 'Özel', 'fr': 'Exclusif', 'de': 'Exklusiv', 'it': 'Esclusivo', 'nl': 'Exclusief', 'pl': 'Wyłącznie', 'ru': 'Эксклюзив' },
    '속보습세럼': { 'en': 'Hydrating Serum', 'es': 'Suero Hidratante', 'pt': 'Sérum Hidratante', 'tr': 'Nemlendirici Serum', 'fr': 'Sérum Hydratant', 'de': 'Feuchtigkeitsserum', 'it': 'Siero Idratante', 'nl': 'Hydraterend Serum', 'pl': 'Nawilżające serum', 'ru': 'Увлажняющая сыворотка' },
    '저분자': { 'en': 'Low Molecule', 'es': 'Baja Molécula', 'pt': 'Baixa Molécula', 'tr': 'Düşük Molekül', 'fr': 'Bas Poids Moléculaire', 'de': 'Niedermolekular', 'it': 'Basso Peso Molecolare', 'nl': 'Laag Molecuul', 'pl': 'Niskocząsteczkowy', 'ru': 'Низкомолекулярный' },
    '리필기획': { 'en': 'Refill Set', 'es': 'Set de Recarga', 'pt': 'Conjunto de Recarga', 'tr': 'Yedek Set', 'fr': 'Coffret Recharge', 'de': 'Nachfüllset', 'it': 'Set Ricarica', 'nl': 'Navulset', 'pl': 'Zestaw uzupełniający', 'ru': 'Набор рефилов' },
    '리필팩': { 'en': 'Refill Pack', 'es': 'Paquete de Recarga', 'pt': 'Pacote de Recarga', 'tr': 'Yedek Paket', 'fr': 'Pack Recharge', 'de': 'Nachfüllpackung', 'it': 'Pacchetto Ricarica', 'nl': 'Navulverpakking', 'pl': 'Opakowanie uzupełniające', 'ru': 'Рефил-пак' },
    '시카플라스트': { 'en': 'Cicaplast', 'es': 'Cicaplast', 'pt': 'Cicaplast', 'tr': 'Cicaplast', 'fr': 'Cicaplast', 'de': 'Cicaplast', 'it': 'Cicaplast', 'nl': 'Cicaplast', 'pl': 'Cicaplast', 'ru': 'Cicaplast' },
    '밤': { 'en': 'Balm', 'es': 'Bálsamo', 'pt': 'Bálsamo', 'tr': 'Balm', 'fr': 'Baume', 'de': 'Balsam', 'it': 'Balsamo', 'nl': 'Balsem', 'pl': 'Balsam', 'ru': 'Бальзам' },
    '시카토너': { 'en': 'Cica Toner', 'es': 'Tónico Cica', 'pt': 'Tônico Cica', 'tr': 'Cica Tonik', 'fr': 'Tonique Cica', 'de': 'Cica Toner', 'it': 'Tonico Cica', 'nl': 'Cica Toner', 'pl': 'Tonik Cica', 'ru': 'Cica Тоник' },
    '시카밤': { 'en': 'Cica Balm', 'es': 'Bálsamo Cica', 'pt': 'Bálsamo Cica', 'tr': 'Cica Balm', 'fr': 'Baume Cica', 'de': 'Cica Balsam', 'it': 'Balsamo Cica', 'nl': 'Cica Balsem', 'pl': 'Balsam Cica', 'ru': 'Cica Бальзам' },
    '아토베리어365': { 'en': 'Atobarrier 365', 'es': 'Atobarrier 365', 'pt': 'Atobarrier 365', 'tr': 'Atobarrier 365', 'fr': 'Atobarrier 365', 'de': 'Atobarrier 365', 'it': 'Atobarrier 365', 'nl': 'Atobarrier 365', 'pl': 'Atobarrier 365', 'ru': 'Atobarrier 365' },
    '하이드로 에센스': { 'en': 'Hydro Essence', 'es': 'Esencia Hidro', 'pt': 'Hidro Essência', 'tr': 'Hydro Öz', 'fr': 'Essence Hydro', 'de': 'Hydro Essenz', 'it': 'Essenza Hydro', 'nl': 'Hydro Essentie', 'pl': 'Esencja nawilżająca', 'ru': 'Гидро-эссенция' },
    '세라-히알 앰플': { 'en': 'Cera-Hyal Ampoule', 'es': 'Ampolla Cera-Hyal', 'pt': 'Ampola Cera-Hyal', 'tr': 'Cera-Hyal Ampul', 'fr': 'Ampoule Cera-Hyal', 'de': 'Cera-Hyal Ampulle', 'it': 'Fiala Cera-Hyal', 'nl': 'Cera-Hyal Ampul', 'pl': 'Ampułka Cera-Hyal', 'ru': 'Cera-Hyal Ампула' },
    '더마': { 'en': 'Derma', 'es': 'Derma', 'pt': 'Derma', 'tr': 'Derma', 'fr': 'Derma', 'de': 'Derma', 'it': 'Derma', 'nl': 'Derma', 'pl': 'Derma', 'ru': 'Derma' },
    '흔적 리페어 세럼': { 'en': 'Blemish Repair Serum', 'es': 'Suero Reparador', 'pt': 'Sérum Reparador', 'tr': 'Leke Onarıcı Serum', 'fr': 'Sérum Réparateur', 'de': 'Reparatur Serum', 'it': 'Siero Riparatore', 'nl': 'Herstellend Serum', 'pl': 'Serum naprawcze', 'ru': 'Восстанавливающая сыворотка' },
    '하이드라비오 에센스로션': { 'en': 'Hydrabio Essence Lotion', 'es': 'Loción Esencia Hydrabio', 'pt': 'Loção Essência Hydrabio', 'tr': 'Hydrabio Öz Losyon', 'fr': 'Lotion Essence Hydrabio', 'de': 'Hydrabio Essenz Lotion', 'it': 'Lozione Essenza Hydrabio', 'nl': 'Hydrabio Essence Lotion', 'pl': 'Lotion esencja Hydrabio', 'ru': 'Hydrabio Эссенция-лосьон' },
    '안개분사 미스트': { 'en': 'Fine Mist', 'es': 'Niebla Fina', 'pt': 'Névoa Fina', 'tr': 'İnce Sis', 'fr': 'Brume Fine', 'de': 'Feiner Nebel', 'it': 'Nebbia Sottile', 'nl': 'Fijne Nevel', 'pl': 'Mgiełka', 'ru': 'Мелкодисперсный мист' },
    '화이트 트러플 퍼스트 스프레이 세럼': { 'en': 'White Truffle First Spray Serum', 'es': 'Suero Trufa Blanca', 'pt': 'Sérum Trufa Branca', 'tr': 'Beyaz Trüf Sprey Serum', 'fr': 'Sérum Spray Truffe Blanche', 'de': 'Weißes Trüffel Spray Serum', 'it': 'Siero Spray Tartufo Bianco', 'nl': 'Witte Truffel Spray Serum', 'pl': 'Serum w sprayu z białą truflą', 'ru': 'Спрей-сыворотка с белым трюфелем' },
    '한정기획': { 'en': 'Limited Set', 'es': 'Set Limitado', 'pt': 'Conjunto Limitado', 'tr': 'Sınırlı Set', 'fr': 'Coffret Limité', 'de': 'Limitiertes Set', 'it': 'Set Limitato', 'nl': 'Beperkte Set', 'pl': 'Zestaw limitowany', 'ru': 'Лимитированный набор' },
    '리얼 딥 마스크': { 'en': 'Real Deep Mask', 'es': 'Mascarilla Profunda', 'pt': 'Máscara Profunda', 'tr': 'Gerçek Derin Maske', 'fr': 'Masque Real Deep', 'de': 'Real Deep Maske', 'it': 'Maschera Real Deep', 'nl': 'Real Deep Masker', 'pl': 'Maska głęboko nawilżająca', 'ru': 'Глубоко увлажняющая маска' },
    '콜라겐': { 'en': 'Collagen', 'es': 'Colágeno', 'pt': 'Colágeno', 'tr': 'Kolajen', 'fr': 'Collagène', 'de': 'Kollagen', 'it': 'Collagene', 'nl': 'Collageen', 'pl': 'Kolagen', 'ru': 'Коллаген' },
    '씨켈프': { 'en': 'Sea Kelp', 'es': 'Alga Marina', 'pt': 'Alga Marinha', 'tr': 'Deniz Yosunu', 'fr': 'Varech', 'de': 'Seetang', 'it': 'Alghe Marine', 'nl': 'Zeewier', 'pl': 'Wodorosty', 'ru': 'Морские водоросли' },
    '세라놀': { 'en': 'Ceranol', 'es': 'Ceranol', 'pt': 'Ceranol', 'tr': 'Ceranol', 'fr': 'Céranol', 'de': 'Ceranol', 'it': 'Ceranol', 'nl': 'Ceranol', 'pl': 'Ceranol', 'ru': 'Ceranol' },
    '비타': { 'en': 'Vita', 'es': 'Vita', 'pt': 'Vita', 'tr': 'Vita', 'fr': 'Vita', 'de': 'Vita', 'it': 'Vita', 'nl': 'Vita', 'pl': 'Vita', 'ru': 'Vita' },
    '단백질쉐이크': { 'en': 'Protein Shake', 'es': 'Batido de Proteína', 'pt': 'Shake de Proteína', 'tr': 'Protein Shake', 'fr': 'Boisson Protéinée', 'de': 'Proteinshake', 'it': 'Frullato Proteico', 'nl': 'Eiwitshake', 'pl': 'Shake białkowy', 'ru': 'Протеиновый коктейль' },
    '파우치형': { 'en': 'Pouch Type', 'es': 'Tipo Bolsa', 'pt': 'Tipo Bolsa', 'tr': 'Kese Tipi', 'fr': 'Format Poche', 'de': 'Beutel-Typ', 'it': 'Tipo Bustina', 'nl': 'Zakje Type', 'pl': 'Typ saszetki', 'ru': 'В пакете' },
    '피디알엔': { 'en': 'PDRN', 'es': 'PDRN', 'pt': 'PDRN', 'tr': 'PDRN', 'fr': 'PDRN', 'de': 'PDRN', 'it': 'PDRN', 'nl': 'PDRN', 'pl': 'PDRN', 'ru': 'PDRN' },
    '수분 캡슐 미스트': { 'en': 'Moisture Capsule Mist', 'es': 'Niebla de Humedad', 'pt': 'Névoa de Umidade', 'tr': 'Nem Kapsül Sis', 'fr': 'Brume Capsule Hydratante', 'de': 'Feuchtigkeits-Kapsel-Nebel', 'it': 'Nebbia Capsule Idratante', 'nl': 'Vochtcapsule Nevel', 'pl': 'Mgiełka nawilżająca', 'ru': 'Увлажняющий мист с капсулами' },
    '뽀용뇽 공동개발/NEW': { 'en': '[New/Collab]', 'es': '[Nuevo/Collab]', 'pt': '[Novo/Collab]', 'tr': '[Yeni/İşbirliği]', 'fr': '[Nouveau/Collab]', 'de': '[Neu/Collab]', 'it': '[Nuovo/Collab]', 'nl': '[Nieuw/Samenwerking]', 'pl': '[Nowość/Współpraca]', 'ru': '[Новинка/Коллаб]' },
    '미니앨범': { 'en': 'Mini Album', 'es': 'Mini Álbum', 'pt': 'Mini Álbum', 'tr': 'Mini Albüm', 'fr': 'Mini Album', 'de': 'Mini-Album', 'it': 'Mini Album', 'nl': 'Mini Album', 'pl': 'Mini Album', 'ru': 'Мини-альбом' },
    '1집': { 'en': 'Vol.1', 'es': 'Vol.1', 'pt': 'Vol.1', 'tr': 'Vol.1', 'fr': 'Vol.1', 'de': 'Vol.1', 'it': 'Vol.1', 'nl': 'Vol.1', 'pl': 'Vol.1', 'ru': 'Том 1' },
    '식물성 멜라토닌': { 'en': 'Plant Melatonin', 'es': 'Melatonina Vegetal', 'pt': 'Melatonina Vegetal', 'tr': 'Bitkisel Melatonin', 'fr': 'Mélatonine Végétale', 'de': 'Pflanzliches Melatonin', 'it': 'Melatonina Vegetale', 'nl': 'Plantaardige Melatonine', 'pl': 'Roślinna melatonina', 'ru': 'Растительный мелатонин' },
    '함유': { 'en': 'Contains', 'es': 'Contiene', 'pt': 'Contém', 'tr': 'İçerir', 'fr': 'Contient', 'de': 'Enthält', 'it': 'Contiene', 'nl': 'Bevat', 'pl': 'Zawiera', 'ru': 'Содержит' },
    '구미': { 'en': 'Gummy', 'es': 'Gomita', 'pt': 'Goma', 'tr': 'Sakız', 'fr': 'Gomme', 'de': 'Gummi', 'it': 'Gommosa', 'nl': 'Gummy', 'pl': 'Żelki', 'ru': 'Мармелад' },
    '에센셜 스킨 누더 쿠션': { 'en': 'Essential Skin Nuder Cushion', 'es': 'Cojín Nuder', 'pt': 'Almofada Nuder', 'tr': 'Essential Skin Nuder Yastık', 'fr': 'Cushion Skin Nuder Essentiel', 'de': 'Essential Skin Nuder Cushion', 'it': 'Cuscino Skin Nuder Essenziale', 'nl': 'Essential Skin Nuder Cushion', 'pl': 'Podkład w poduszce Skin Nuder', 'ru': 'Кушон Essential Skin Nuder' },
    '미니하이라이터': { 'en': 'Mini Highlighter', 'es': 'Mini Iluminador', 'pt': 'Mini Iluminador', 'tr': 'Mini Aydınlatıcı', 'fr': 'Mini Enlumineur', 'de': 'Mini-Highlighter', 'it': 'Mini Illuminante', 'nl': 'Mini Highlighter', 'pl': 'Mini rozświetlacz', 'ru': 'Мини-хайлайтер' },
    '물크림': { 'en': 'Water Cream', 'es': 'Crema de Agua', 'pt': 'Creme de Água', 'tr': 'Su Kremi', 'fr': 'Crème d\'Eau', 'de': 'Wassercreme', 'it': 'Crema Acqua', 'nl': 'Watercrème', 'pl': 'Krem wodny', 'ru': 'Водный крем' },
    '본품': { 'en': 'Main', 'es': 'Principal', 'pt': 'Principal', 'tr': 'Ana', 'fr': 'Principal', 'de': 'Hauptprodukt', 'it': 'Principale', 'nl': 'Hoofdproduct', 'pl': 'Główny', 'ru': 'Основной' },
    '리필': { 'en': 'Refill', 'es': 'Recarga', 'pt': 'Recarga', 'tr': 'Yedek', 'fr': 'Recharge', 'de': 'Nachfüllung', 'it': 'Ricarica', 'nl': 'Navulling', 'pl': 'Wkład uzupełniający', 'ru': 'Рефил' },
    '수분진정': { 'en': 'Hydrating Soothing', 'es': 'Hidratante Calmante', 'pt': 'Hidratante Calmante', 'tr': 'Nemlendirici Yatıştırıcı', 'fr': 'Hydratant Apaisant', 'de': 'Beruhigende Feuchtigkeit', 'it': 'Idratante Lenitivo', 'nl': 'Hydraterend Kalmerend', 'pl': 'Nawilżająco-kojący', 'ru': 'Увлажнение и успокоение' },
    '광채캡슐크림': { 'en': 'Radiance Capsule Cream', 'es': 'Crema Resplandor', 'pt': 'Creme Radiância', 'tr': 'Parlaklık Kapsül Krem', 'fr': 'Crème Capsule Éclat', 'de': 'Strahlende Kapselcreme', 'it': 'Crema Capsula Luminosa', 'nl': 'Stralende Capsulecrème', 'pl': 'Krem rozświetlający', 'ru': 'Крем с капсулами сияния' },
    '다시마 글레이즈드 크림': { 'en': 'Kelp Glazed Cream', 'es': 'Crema Glaseada', 'pt': 'Creme Glaceado', 'tr': 'Yosun Glazeli Krem', 'fr': 'Crème Glacée Varech', 'de': 'Kelp Glazed Creme', 'it': 'Crema Glassata Kelp', 'nl': 'Kelp Geglazuurde Crème', 'pl': 'Krem glazurowany z wodorostami', 'ru': 'Глазированный крем с водорослями' },
    '하이퍼 콜라겐 겔 마스크': { 'en': 'Hyper Collagen Gel Mask', 'es': 'Máscara Gel Híper Colágeno', 'pt': 'Máscara Gel Hiper Colágeno', 'tr': 'Hiper Kolajen Jel Maske', 'fr': 'Masque Gel Hyper Collagène', 'de': 'Hyper Kollagen Gel Maske', 'it': 'Maschera Gel Iper Collagene', 'nl': 'Hyper Collageen Gel Masker', 'pl': 'Maska żelowa z kolagenem', 'ru': 'Гелевая маска с коллагеном' },
    '앰플한병팩': { 'en': 'One Bottle Ampoule Pack', 'es': 'Pack Ampolla', 'pt': 'Pacote Ampola', 'tr': 'Bir Şişe Ampul Paketi', 'fr': 'Masque Ampoule Bouteille Entière', 'de': 'Eine Flasche Ampullenpackung', 'it': 'Impacco Ampolla', 'nl': 'Eén Fles Ampul Pakket', 'pl': 'Maska z ampułką', 'ru': 'Маска-ампула' },
    '1월 올영픽': { 'en': '[Jan Pick]', 'es': '[Sel. Enero]', 'pt': '[Sel. Jan]', 'tr': '[Ocak Seç]', 'fr': '[Sél. Jan]', 'de': '[Jan Auswahl]', 'it': '[Sel. Gen]', 'nl': '[Jan Keuze]', 'pl': '[Wybór Sty]', 'ru': '[Выбор Янв]' },
    '15년연속 1위': { 'en': '#1 for 15 Years', 'es': '#1 por 15 Años', 'pt': '#1 por 15 Anos', 'tr': '15 Yıl #1', 'fr': '#1 depuis 15 ans', 'de': '#1 seit 15 Jahren', 'it': '#1 da 15 anni', 'nl': '#1 voor 15 jaar', 'pl': '#1 przez 15 lat', 'ru': '#1 в течение 15 лет' },
    '3년연속1위쿠션': { 'en': '#1 Cushion (3 Years)', 'es': '#1 Cojín (3 Años)', 'pt': '#1 Almofada (3 Anos)', 'tr': '#1 Yastık (3 Yıl)', 'fr': '#1 Cushion (3 Ans)', 'de': '#1 Cushion (3 Jahre)', 'it': '#1 Cushion (3 Anni)', 'nl': '#1 Cushion (3 Jaar)', 'pl': '#1 Podkład (3 Lata)', 'ru': '#1 Кушон (3 года)' },
    '크런치볼': { 'en': 'Crunch Ball', 'es': 'Bola Crujiente', 'pt': 'Bola Crocante', 'tr': 'Crunch Topu', 'fr': 'Crunch Ball', 'de': 'Crunch Ball', 'it': 'Palla Croccante', 'nl': 'Crunch Bal', 'pl': 'Chrupiąca kulka', 'ru': 'Хрустящий шарик' },
    '박보영 버블팩': { 'en': 'Park Bo-young Bubble Pack', 'es': 'Pack Burbujas', 'pt': 'Pacote Bolhas', 'tr': 'Park Bo-young Balon Paketi', 'fr': 'Masque Bulles Park Bo-young', 'de': 'Park Bo-young Bubble Pack', 'it': 'Maschera Bolle Park Bo-young', 'nl': 'Park Bo-young Bubbelmasker', 'pl': 'Maska bąbelkowa Park Bo-young', 'ru': 'Пузырьковая маска Пак Бо Ён' },
    '30초 퀵 버블 마스크': { 'en': '30s Quick Bubble Mask', 'es': 'Máscara Burbujas 30s', 'pt': 'Máscara Bolhas 30s', 'tr': '30sn Hızlı Balon Maske', 'fr': 'Masque Bulles Express 30s', 'de': '30s Schnelle Bubble Maske', 'it': 'Maschera Bolle 30s', 'nl': '30s Snel Bubbelmasker', 'pl': '30s Maska bąbelkowa', 'ru': '30-секундная пузырьковая маска' },
    '중 택1': { 'en': '(Select 1)', 'es': '(Seleccionar 1)', 'pt': '(Selecionar 1)', 'tr': '(1 Seç)', 'fr': '(Choix 1)', 'de': '(Wähle 1)', 'it': '(Seleziona 1)', 'nl': '(Kies 1)', 'pl': '(Wybierz 1)', 'ru': '(Выбрать 1)' },
    '단독기획': { 'en': 'Exclusive Set', 'es': 'Set Exclusivo', 'pt': 'Conjunto Exclusivo', 'tr': 'Özel Set', 'fr': 'Coffret Exclusif', 'de': 'Exklusives Set', 'it': 'Set Esclusivo', 'nl': 'Exclusieve Set', 'pl': 'Zestaw ekskluzywny', 'ru': 'Эксклюзивный набор' },
    '3시간팩': { 'en': '3-Hour Pack', 'es': 'Pack 3 Horas', 'pt': 'Pacote 3 Horas', 'tr': '3 Saatlik Paket', 'fr': 'Pack 3 Heures', 'de': '3-Stunden-Packung', 'it': 'Impacco 3 Ore', 'nl': '3-Uur Pakket', 'pl': 'Maska 3-godzinna', 'ru': '3-часовая маска' },
    '한정': { 'en': 'Limited', 'es': 'Limitado', 'pt': 'Limitado', 'tr': 'Sınırlı', 'fr': 'Limité', 'de': 'Limitiert', 'it': 'Limitato', 'nl': 'Beperkt', 'pl': 'Limitowany', 'ru': 'Лимитированный' },
    '더블': { 'en': 'Double', 'es': 'Doble', 'pt': 'Duplo', 'tr': 'Çift', 'fr': 'Double', 'de': 'Doppel', 'it': 'Doppio', 'nl': 'Dubbel', 'pl': 'Podwójny', 'ru': 'Двойной' },
    '올영': { 'en': 'Olive Young', 'es': 'Olive Young', 'pt': 'Olive Young', 'tr': 'Olive Young', 'fr': 'Olive Young', 'de': 'Olive Young', 'it': 'Olive Young', 'nl': 'Olive Young', 'pl': 'Olive Young', 'ru': 'Olive Young' },
    '팩': { 'en': 'Pack', 'es': 'Pack', 'pt': 'Pacote', 'tr': 'Paket', 'fr': 'Pack', 'de': 'Packung', 'it': 'Pacco', 'nl': 'Pakket', 'pl': 'Maska', 'ru': 'Маска/Пак' },
    '에센셜': { 'en': 'Essential', 'es': 'Esencial', 'pt': 'Essencial', 'tr': 'Temel', 'fr': 'Essentiel', 'de': 'Essenziell', 'it': 'Essenziale', 'nl': 'Essentieel', 'pl': 'Esencjonalny', 'ru': 'Эссенциальный' },
};

export function translateText(text: string, targetLang: string): string {
    const lang = targetLang.split('-')[0];

    if (lang === 'ko') return text;

    // Simple substitution
    let translated = text;

    // Check for specific full-match overrides first
    const exactMatch = DICTIONARY[text];
    if (exactMatch && exactMatch[lang]) {
        return exactMatch[lang];
    }

    // Sort keys by length (longest first) to prevent partial replacement issues
    // e.g. "Water Cream" should be replaced before "Cream"
    const sortedKeys = Object.keys(DICTIONARY).sort((a, b) => b.length - a.length);

    // Partial word substitution
    sortedKeys.forEach(key => {
        const translations = DICTIONARY[key];
        if (translations && translations[lang]) {
            // Escape special regex characters if any
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            translated = translated.replace(new RegExp(escapedKey, 'g'), translations[lang]);
        }
    });

    // Clean up spacing (e.g., "4Types" -> "4 Types")
    translated = translated.replace(/(\d)(Types|Sheets|Gummies)/g, '$1 $2');

    // Clean up "SetSet" redundancies if they happen
    translated = translated.replace(/Set Set/g, 'Set');

    // Clean up "among (Select 1)" -> "(Select 1)"
    translated = translated.replace(/among \(Select 1\)/g, '(Select 1)');

    return translated;
}
