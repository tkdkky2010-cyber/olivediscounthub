import { BRAND_MAP } from './brand-translations';

// Full English translations for all 100 products (by product ID)
const EN_TRANSLATIONS: Record<string, string> = {
    'A000000232725': "[Glow Tone-Up/Sweatproof] d'Alba Pink Tone-Up Sunscreen Duo Set (50ml+50ml)",
    'A000000226241': "[Fever Market/NEW Color] Wakemake Healthy Glow Balm Stick 20 Colors (Single/Set)",
    'A000000190626': "[Feb OY Pick/Large Size] Bioga Moisture Body Wash & Hair Squalane 1000ml (Single/Cream+15ml Set)",
    'A000000245637': "[Mangom Collab] Wellage Real Hyaluronic 100 Cream 50ml Double Set (+Keycap Keyring)",
    'A000000162114': "So Natural All Day Tight Makeup Setting Fixer 120ml Double Set (120ml+120ml)",
    'A000000246196': "[Dark Spots/Blemish Serum] Layerlab Blemish Clear Serum 30ml",
    'A000000245738': "[1+1/Mangom Collab] Skinfood Pad Double Set 3 Types (+Mangom Face Pouch) (Carrot/Potato/Peach)",
    'A000000245092': "[Feb OY Pick/Large Size] Aestura Atobarrier 365 Cream 150ml Set (+Cream 10ml+Cleansing Milk 30ml)",
    'A000000245446': "[Mangom Collab] Be Plain Mung Bean Mild Acidic Cleansing Foam 160ml Double Set (+Coin Purse)",
    'A000000230109': "[Feb OY Pick/Heat Protection] Healing Bird Hyaluron Milk Hair Essence 150ml Set (+Pouch Gift)",
    'A000000245636': "[Mangom Collab] Wellage Real Hyaluronic Blue 100 Ampoule 75ml 2-Pack Set (+Cream 20ml+PVC Pouch)",
    'A000000242953': "[#1 Pad/Limited Set] Mediheal Derma Pad 100+100 Sheets Double Set 7 Types",
    'A000000223414': "[#1 for 15 Years] Mediheal Essential Mask Pack 10+1/10 Sheets Set 7 Types",
    'A000000244783': "[Mangom Collab] Banila Co Clean It Zero Cleansing Balm 100ml Double Set (+3ml*6ea+Mangom Smart Tok)",
    'A000000244834': "[Mangom Collab] Peripera Mood Glow Tint 22 Colors",
    'A000000202771': "[1+1] Protein One Protein Shake Pouch Type 40g 5 Types",
    'A000000245674': "[Mangom Collab] Abib Heartleaf Blemish Essence Pad Clear Touch 70 Sheets Set (+70 Sheets Refill+Pad Case)",
    'A000000192782': "[Feb OY Pick/1+1/Pore Hydration Cream] S.Nature Aqua Squalane Moisture Cream 60ml Double Set (60ml+60ml)",
    'A000000246717': "BOHO Hyper Matcha All-in-One Lotion 100ml",
    'A000000246073': "[Feb OY Pick] La Roche-Posay Cicaplast Balm B5+ 100ml Set (+Cica Toner 50ml+Cica Balm 3ml)",
    'A000000230114': "[Feb OY Pick/Anti-Static] Healing Bird Hyaluron Milk Hair Mist 200ml Set (+Miniature Keyring Gift)",
    'A000000243333': "[Feb OY Pick/Cream Gift][Emergency Damage Relief] Kiehl's Ultra Facial Medic Cream 28ml (Single/Set), 50ml",
    'A000000222698': "[Exclusive Set] Anua PDRN Hyaluronic Acid Capsule 100 Serum 30mL Set (+30mL Refill Pack)",
    'A000000245605': "[Mangom Collab/Last Stock] Brandon Expandable Beauty Pouch 2 Types Pick 1 (Light Beige/Sky Blue)",
    'A000000171423': "[#1 for 4 Years] Unove Deep Damage Hair Treatment EX 320ml Double/Duo Set",
    'A000000245468': "[Daily Deal/Feb OY Pick] Bioderma Sensibio H2O 850ml Set (+Face Towel 16 Sheets)",
    'A000000245471': "[Nintendo Event/#1 Calming Serum] Fanel Cica Manu 92 Serum 30ml Refill Set Snorlax Edition",
    'A000000245913': "[Mangom Collab] Ilso Super Melting Sebum Softener 150ml Set (+Deep Clean Master+Cotton Pads 40)",
    'A000000244948': "[Feb OY Pick] La Roche-Posay Cicaplast Multi Repair Cream 100ml Set (+15ml+Cica Balm 3ml)",
    'A000000234422': "[Park Bo-young Bubble Pack] Menokin 30s Quick Bubble Mask 95ml 6 Types Pick 1",
    'A000000244843': "[OY PICK/Mangom Collab] Etude My Petit Palette Single/Set (+Mangom Earphone Pouch Keyring)",
    'A000000211119': "[Exclusive/1+1] Mediheal Madecassoside Blemish Repair Serum 40+40ml Double Set",
    'A000000214877': "[Silver Pick] Inner Thought Feminine Wash Set 2 Types Pick 1 (Whipped/Foaming)",
    'A000000163765': "[Thin-Fit Coverage] April Skin Hero Cushion Set (Main+Refill)",
    'A000000137964': "[Feb OY Pick/Exclusive Set] Lily by Red Love Beam Cheek Balm 14 Types",
    'A000000246270': "[3-Second Finish/Makeup Primer] Arocel Super Collagen Bubble Serum Mask 90g",
    'A000000241123': "[Daily Deal] Fromrie EGF Sebum Pack Exo Peptide Pore Sebum Mask 4 Sheets",
    'A000000246369': "[Mangom Collab/Review Event] Alternative Stereo Lip Potion Sugar Glaze Tint 8ml",
    'A000000243074': "[Feb OY Pick] Laneige Cream Skin 170ml Refill Set (+Gelling Sheet Mask 1+170ml Refill+Mist Pump)",
    'A000000218424': "[Daily Deal][#1 Perfume 3 Years] Forment Signature Perfume 50ml Single/Set 3 Types Pick 1",
    'A000000117541': "[Best All-in-One] UL:OS All-in-One 200ml 2 Types Pick 1 (Gift Set/Single)",
    'A000000232710': "[#1 Adhesive 3-Hour Pack] Another Face Hydrogel Mask Pack (4 Sheets) 2 Types Pick 1",
    'A000000246446': "[Mangom Collab/Purchase Event] Fwee Lip & Cheek Blurry Pudding Pot 5g 37 Types (+Mangom Pudding Pot Pouch)",
    'A000000218073': "[Feb OY Pick/Sold Out Hit] Dr. Adol Catechin Acerola Barbados Cherry C D 60 Tablets (30 Days)",
    'A000000202472': "[Sebum Cleansing/Exclusive Set] April Skin Carrot Cleansing Balm 90ml Set (+Capsule Balm 6ml Gift)",
    'A000000246445': "[Mangom Collab/Purchase Event] Fwee 3D Voluming Gloss 5.3g 19 Types (+Mangom Stress Ball)",
    'A000000245091': "[Feb OY Pick] Aestura Atobarrier 365 Cera-Hyal Deep Hydration Ampoule 30ml+30ml Refill Set",
    'A000000245634': "[Mangom Collab] Numbuzin No.3 Silky Texture Serum 50ml Refill Set (+50ml Refill+Stress Ball)",
    'A000000245465': "KOI Flow Lifting Wrapping Cream 50ml Set (+Gua Sha Massager + Mini Cream 10ml*2ea)",
    'A000000246365': "[Mangom Collab/Review Event] Alternative Stereo Lip Potion Caramel Glaze 8ml",
    'A000000246345': "[4-Day Deal/100% Review Event/Exclusive Pre-Launch] Hince New Blur Tint 10 Colors",
    'A000000246295': "[Feb OY Pick/Scalp Heat Protection] Healing Bird Hyaluron Milk Shampoo 500ml Set (+Brush Keyring Gift)",
    'A000000222833': "[OY Awards #1 Cream] Aestura Atobarrier 365 Cream 80ml Set (+Hydro Essence 25ml+Cera-Hyal Ampoule 7ml)",
    'A000000246286': "[Mangom Collab] Peripera Speedy Skinny Brow (Single/Double Set+Mangom Lucky Charm)",
    'A000000233458': "EOMM Trouble Scaling Patch Mask 4 Sheets",
    'A000000199588': "[#1 for 5 Years/Blackhead OUT] Manyo Factory Pure Cleansing Oil 300ml Set (+25ml x2)",
    'A000000246223': "[NEW] Dermajency Zero-Ca 81 Serum 30ml",
    'A000000226086': "[Feb OY Pick] Bioderma Hydrabio Essence Lotion 200ml Set (+Fine Mist Spray Gift)",
    'A000000217620': "[#1 for 15 Years] Mediheal Essential Mask Pack 1 Sheet High Function 7 Types",
    'A000000232724': "[No.1 Mist Serum] d'Alba First Spray Serum 100ml 2-Pack Set",
    'A000000229513': "[Barrier/Trouble Care] GPDerm Celltrion EGF Skin Barrier Intensive Cream 80ml",
    'A000000190611': "[OY PICK/Purin Edition Launch] Fanel Cica Manu Serum Cushion (Mini/Single/Set)",
    'A000000189261': "[#1 Hydrating Serum/Exclusive Set] Torriden Dive-In Low Molecule Hyaluronic Acid Serum 50ml Refill Set (+Refill 50ml)",
    'A000000204071': "[Deep Hydration] COSRX The 6 Peptide Skin Booster Serum 150ml Set (+30mL)",
    'A000000245463': "[Feb OY Pick] Bioderma Cicabio Pomade 100ml Set (+Gauze Sheet Mask 10 Sheets)",
    'A000000203943': "[OY PICK/Mangom Collab] Etude Curl Fix Mascara 1+1 Set (+Mangom Collab Limited Long Lash Fixer Mini)",
    'A000000233586': "[Toxin Market] Innisfree Green Tea Milk Essence 160ml Set (+25ml)",
    'A000000245447': "[Mangom Collab] Be Plain Mung Bean Cleansing Oil 200ml Double Set (+Mouse Wrist Pad)",
    'A000000245090': "[Feb OY Pick/Large Size] Aestura Atobarrier 365 Lotion 300ml Set (+Ampoule 7ml+Cleansing Milk 9ml)",
    'A000000204014': "[Sebum Absorbing] Hanyul Mugwort Rice Pack Foam 120ml Bonus Gift Set",
    'A000000232394': "Vivriv Low-Sugar High-Protein Snack 40g 6 Types Pick 1",
    'A000000182947': "[Feb OY Pick/Exclusive Set/Mini Gift] Ador Perfume Hair Oil 80ml Set 5 Types Pick 1",
    'A000000245924': "[Mangom Collab] Plush Keyring 5 Types (Baby Angel/Fruity Sweets)",
    'A000000217112': "[Feb OY Pick/Collagen Boost 177%] Arocel Super Collagen Mask 3+1 Sheets Set",
    'A000000109650': "[Feb OY Pick/Brush Gift][Watercolor Blush] 3CE Mood Recipe Face Blush Single/Set",
    'A000000208130': "[2-Week Blemish Cream] Isntree Onion Newpair Gel Cream 50ml Set (+20ml+Pad 2 Sheets)",
    'A000000245691': "[Mangom Collab/Purchase Event] Fwee Glow Smoothie Tinted Lip Balm 9.5g 3 Types (+Mangom Coin Purse)",
    'A000000174309': "[NEW Color] Holika Holika My Fave Piece Eyeshadow/Gel Tail/Piece Beam/Piece Balm",
    'A000000245187': "[Mangom Collab] Be Plain Mung Bean Cooling Moisture Sunscreen 50ml 1+1 Set (+Mangom Sleep Mask)",
    'A000000186409': "[Acne Care/Sebum Control] Blanc Nature Acne Cleansing Foam Single/Set",
    'A000000223388': "[NEW] Good Feel 100% Organic Cotton Sanitary Pads (S/M/L/Super Long)",
    'A000000171371': "[Feb OY Pick/Limited Color] Naming. Fluffy Powder Blush 21 Colors",
    'A000000165598': "[Double Set/1+1] Torriden Dive-In Hyaluronic Acid Soothing Cream Double Set (100ml+100ml)",
    'A000000219553': "[Makeup Primer] Goodal Houttuynia Calming Moisture Sunscreen 50ml 1+1 Set (+25ml Miniature)",
    'A000000232518': "[Feb OY Pick/Mini Lip Gift][Butter Velvet Tint] 3CE Velvet Lip Tint Plush 4g Single/Set",
    'A000000246288': "[Mangom Collab] Peripera Speedy Skinny Brow Mascara",
    'A000000245925': "[Mangom Collab] Random Figure Keyring (Fruity Sweets/6 Types Random)",
    'A000000245031': "All the Better Extra Virgin Olive Oil Capsule 2.1g x 30 Capsules",
    'A000000170042': "Dear Skin Real Modal Sanitary Pad 7 Types Pick 1 (Pad/Liner/Super Long/Wearable)",
    'A000000142709': "[#1 Hand Cream/6.55M Sold] Beyond Classic Hand Cream 100ml 4 Types (Set/Single)",
    'A000000212710': "[Fragrance Bomb] Malcolm Mild Acidic Allergy-Free Body Wash 520ml (5 Scents)",
    'A000000220733': "[#1 False Lashes] Coringco No-Glue/Individual Lashes Pick 1",
    'A000000244830': "[Mangom Collab] Isoi Moisture Dr. Jangsujin Hydration Cream 100ml Large Set (+10ml+MagSafe Card Wallet)",
    'A000000225046': "[Feb OY Pick/Mini Gift] Bbia Over Glaze 16 Types (Set/Single)",
    'A000000241210': "[NEW Color/5 Years Award Winner] Rom&nd The Juicy Lasting Tint Single/Set",
    'A000000188804': "[Feb Olive Better Pick] Ohnist Triple Collagen 14-Day Routine",
    'A000000245459': "[Feb OY Pick] Bioderma Hydrabio Toner 500ml Set (+Foam Bottle)",
    'A000000182630': "[Large 140 Sheets (70+70)] Numbuzin Toner Pad Refill Set (No.1, No.4, No.5)",
    'A000000233576': "[Daily Deal/Vanilla 70% Tint] Fwee 3D Voluming Tint 3.8g 12 Types (Single/Set)",
    'A000000245672': "[Mangom Collab] Abib Heartleaf Teca Capsule Serum Calming Drop 50ml Double Set (+Luggage Tag)",
};

// Cosmetic term translations: English → other languages
const TERM_MAP: Record<string, Record<string, string>> = {
    'Sunscreen': { es: 'Protector Solar', fr: 'Crème Solaire', de: 'Sonnencreme', it: 'Crema Solare', nl: 'Zonnebrandcrème', pl: 'Krem Przeciwsłoneczny', pt: 'Protetor Solar', ru: 'Солнцезащитный крем', tr: 'Güneş Kremi' },
    'Cream': { es: 'Crema', fr: 'Crème', de: 'Creme', it: 'Crema', nl: 'Crème', pl: 'Krem', pt: 'Creme', ru: 'Крем', tr: 'Krem' },
    'Serum': { es: 'Sérum', fr: 'Sérum', de: 'Serum', it: 'Siero', nl: 'Serum', pl: 'Serum', pt: 'Sérum', ru: 'Сыворотка', tr: 'Serum' },
    'Mask': { es: 'Mascarilla', fr: 'Masque', de: 'Maske', it: 'Maschera', nl: 'Masker', pl: 'Maska', pt: 'Máscara', ru: 'Маска', tr: 'Maske' },
    'Toner': { es: 'Tónico', fr: 'Tonique', de: 'Toner', it: 'Tonico', nl: 'Toner', pl: 'Tonik', pt: 'Tônico', ru: 'Тоник', tr: 'Tonik' },
    'Balm': { es: 'Bálsamo', fr: 'Baume', de: 'Balsam', it: 'Balsamo', nl: 'Balsem', pl: 'Balsam', pt: 'Bálsamo', ru: 'Бальзам', tr: 'Balm' },
    'Lotion': { es: 'Loción', fr: 'Lotion', de: 'Lotion', it: 'Lozione', nl: 'Lotion', pl: 'Balsam', pt: 'Loção', ru: 'Лосьон', tr: 'Losyon' },
    'Essence': { es: 'Esencia', fr: 'Essence', de: 'Essenz', it: 'Essenza', nl: 'Essentie', pl: 'Esencja', pt: 'Essência', ru: 'Эссенция', tr: 'Öz' },
    'Ampoule': { es: 'Ampolla', fr: 'Ampoule', de: 'Ampulle', it: 'Fiala', nl: 'Ampul', pl: 'Ampułka', pt: 'Ampola', ru: 'Ампула', tr: 'Ampul' },
    'Cleanser': { es: 'Limpiador', fr: 'Nettoyant', de: 'Reiniger', it: 'Detergente', nl: 'Reiniger', pl: 'Oczyszczacz', pt: 'Limpador', ru: 'Очищающее средство', tr: 'Temizleyici' },
    'Cleansing': { es: 'Limpieza', fr: 'Nettoyant', de: 'Reinigungs', it: 'Detergente', nl: 'Reiniging', pl: 'Oczyszczający', pt: 'Limpeza', ru: 'Очищающий', tr: 'Temizleme' },
    'Cleansing Foam': { es: 'Espuma Limpiadora', fr: 'Mousse Nettoyante', de: 'Reinigungsschaum', it: 'Schiuma Detergente', nl: 'Reinigingsschuim', pl: 'Pianka oczyszczająca', pt: 'Espuma de Limpeza', ru: 'Очищающая пенка', tr: 'Temizleme Köpüğü' },
    'Cleansing Balm': { es: 'Bálsamo Limpiador', fr: 'Baume Nettoyant', de: 'Reinigungsbalsam', it: 'Balsamo Detergente', nl: 'Reinigingsbalsem', pl: 'Balsam oczyszczający', pt: 'Bálsamo de Limpeza', ru: 'Очищающий бальзам', tr: 'Temizleme Balmı' },
    'Cleansing Oil': { es: 'Aceite Limpiador', fr: 'Huile Nettoyante', de: 'Reinigungsöl', it: 'Olio Detergente', nl: 'Reinigingsolie', pl: 'Olejek oczyszczający', pt: 'Óleo de Limpeza', ru: 'Гидрофильное масло', tr: 'Temizleme Yağı' },
    'Shampoo': { es: 'Champú', fr: 'Shampooing', de: 'Shampoo', it: 'Shampoo', nl: 'Shampoo', pl: 'Szampon', pt: 'Shampoo', ru: 'Шампунь', tr: 'Şampuan' },
    'Body Wash': { es: 'Gel de Ducha', fr: 'Gel Douche', de: 'Duschgel', it: 'Bagnoschiuma', nl: 'Douchegel', pl: 'Żel pod prysznic', pt: 'Sabonete Líquido', ru: 'Гель для душа', tr: 'Duş Jeli' },
    'Hand Cream': { es: 'Crema de Manos', fr: 'Crème pour les Mains', de: 'Handcreme', it: 'Crema Mani', nl: 'Handcrème', pl: 'Krem do rąk', pt: 'Creme para Mãos', ru: 'Крем для рук', tr: 'El Kremi' },
    'Hair Oil': { es: 'Aceite Capilar', fr: 'Huile Capillaire', de: 'Haaröl', it: 'Olio per Capelli', nl: 'Haarolie', pl: 'Olejek do włosów', pt: 'Óleo Capilar', ru: 'Масло для волос', tr: 'Saç Yağı' },
    'Hair Treatment': { es: 'Tratamiento Capilar', fr: 'Soin Capillaire', de: 'Haarbehandlung', it: 'Trattamento Capelli', nl: 'Haarmasker', pl: 'Kuracja do włosów', pt: 'Tratamento Capilar', ru: 'Маска для волос', tr: 'Saç Bakımı' },
    'Hair Essence': { es: 'Esencia Capilar', fr: 'Essence Capillaire', de: 'Haaressenz', it: 'Essenza Capelli', nl: 'Haar Essentie', pl: 'Esencja do włosów', pt: 'Essência Capilar', ru: 'Эссенция для волос', tr: 'Saç Özü' },
    'Hair Mist': { es: 'Bruma Capilar', fr: 'Brume Capillaire', de: 'Haarnebel', it: 'Spray Capelli', nl: 'Haar Mist', pl: 'Mgiełka do włosów', pt: 'Bruma Capilar', ru: 'Мист для волос', tr: 'Saç Misti' },
    'Perfume': { es: 'Perfume', fr: 'Parfum', de: 'Parfüm', it: 'Profumo', nl: 'Parfum', pl: 'Perfumy', pt: 'Perfume', ru: 'Парфюм', tr: 'Parfüm' },
    'Mascara': { es: 'Máscara', fr: 'Mascara', de: 'Mascara', it: 'Mascara', nl: 'Mascara', pl: 'Tusz do rzęs', pt: 'Máscara', ru: 'Тушь', tr: 'Maskara' },
    'Blush': { es: 'Rubor', fr: 'Blush', de: 'Rouge', it: 'Blush', nl: 'Blush', pl: 'Róż', pt: 'Blush', ru: 'Румяна', tr: 'Allık' },
    'Tint': { es: 'Tinte', fr: 'Teinte', de: 'Tint', it: 'Tinta', nl: 'Tint', pl: 'Tint', pt: 'Tint', ru: 'Тинт', tr: 'Tint' },
    'Lip Balm': { es: 'Bálsamo Labial', fr: 'Baume à Lèvres', de: 'Lippenbalsam', it: 'Balsamo Labbra', nl: 'Lippenbalsem', pl: 'Balsam do ust', pt: 'Bálsamo Labial', ru: 'Бальзам для губ', tr: 'Dudak Balmı' },
    'Cushion': { es: 'Cojín', fr: 'Cushion', de: 'Cushion', it: 'Cushion', nl: 'Cushion', pl: 'Podkład cushion', pt: 'Cushion', ru: 'Кушон', tr: 'Cushion' },
    'Eyeshadow': { es: 'Sombra de Ojos', fr: 'Fard à Paupières', de: 'Lidschatten', it: 'Ombretto', nl: 'Oogschaduw', pl: 'Cień do powiek', pt: 'Sombra', ru: 'Тени для век', tr: 'Far' },
    'Pad': { es: 'Almohadilla', fr: 'Pad', de: 'Pad', it: 'Dischetto', nl: 'Pad', pl: 'Płatek', pt: 'Almofada', ru: 'Пэд', tr: 'Ped' },
    'Sheets': { es: 'Hojas', fr: 'Feuilles', de: 'Blätter', it: 'Fogli', nl: 'Vellen', pl: 'Sztuk', pt: 'Folhas', ru: 'Шт.', tr: 'Adet' },
    'Set': { es: 'Set', fr: 'Coffret', de: 'Set', it: 'Set', nl: 'Set', pl: 'Zestaw', pt: 'Conjunto', ru: 'Набор', tr: 'Set' },
    'Single': { es: 'Individual', fr: 'Individuel', de: 'Einzeln', it: 'Singolo', nl: 'Enkel', pl: 'Pojedynczy', pt: 'Individual', ru: 'Отдельно', tr: 'Tekli' },
    'Refill': { es: 'Recarga', fr: 'Recharge', de: 'Nachfüllung', it: 'Ricarica', nl: 'Navulling', pl: 'Wkład', pt: 'Recarga', ru: 'Рефил', tr: 'Yedek' },
    'Double Set': { es: 'Set Doble', fr: 'Coffret Double', de: 'Doppelset', it: 'Set Doppio', nl: 'Dubbele Set', pl: 'Zestaw podwójny', pt: 'Conjunto Duplo', ru: 'Двойной набор', tr: 'İkili Set' },
    'Large Size': { es: 'Gran Tamaño', fr: 'Grand Format', de: 'Großpackung', it: 'Grande Formato', nl: 'Groot Formaat', pl: 'Duży rozmiar', pt: 'Tamanho Grande', ru: 'Большой объём', tr: 'Büyük Boy' },
    'Gift': { es: 'Regalo', fr: 'Cadeau', de: 'Geschenk', it: 'Regalo', nl: 'Cadeau', pl: 'Prezent', pt: 'Presente', ru: 'Подарок', tr: 'Hediye' },
    'Limited': { es: 'Limitado', fr: 'Limité', de: 'Limitiert', it: 'Limitato', nl: 'Beperkt', pl: 'Limitowany', pt: 'Limitado', ru: 'Лимитированный', tr: 'Sınırlı' },
    'Exclusive': { es: 'Exclusivo', fr: 'Exclusif', de: 'Exklusiv', it: 'Esclusivo', nl: 'Exclusief', pl: 'Ekskluzywny', pt: 'Exclusivo', ru: 'Эксклюзив', tr: 'Özel' },
    'NEW': { es: 'NUEVO', fr: 'NOUVEAU', de: 'NEU', it: 'NUOVO', nl: 'NIEUW', pl: 'NOWOŚĆ', pt: 'NOVO', ru: 'НОВИНКА', tr: 'YENİ' },
    'Color': { es: 'Color', fr: 'Couleur', de: 'Farbe', it: 'Colore', nl: 'Kleur', pl: 'Kolor', pt: 'Cor', ru: 'Цвет', tr: 'Renk' },
    'Colors': { es: 'Colores', fr: 'Couleurs', de: 'Farben', it: 'Colori', nl: 'Kleuren', pl: 'Kolorów', pt: 'Cores', ru: 'Цветов', tr: 'Renk' },
    'Types': { es: 'Tipos', fr: 'Types', de: 'Typen', it: 'Tipi', nl: 'Soorten', pl: 'Typów', pt: 'Tipos', ru: 'Видов', tr: 'Çeşit' },
    'Pick 1': { es: 'Elige 1', fr: 'Choix 1', de: 'Wähle 1', it: 'Scegli 1', nl: 'Kies 1', pl: 'Wybierz 1', pt: 'Escolha 1', ru: 'Выбери 1', tr: '1 Seç' },
    'Feb OY Pick': { es: 'Selección Feb OY', fr: 'Sélection Fév OY', de: 'Feb OY Auswahl', it: 'Selezione Feb OY', nl: 'Feb OY Keuze', pl: 'Wybór OY Lut', pt: 'Seleção Fev OY', ru: 'Выбор OY Фев', tr: 'Şub OY Seçimi' },
    'Mangom Collab': { es: 'Collab Mangom', fr: 'Collab Mangom', de: 'Mangom Kollab', it: 'Collab Mangom', nl: 'Mangom Collab', pl: 'Kolaboracja Mangom', pt: 'Collab Mangom', ru: 'Коллаб Mangom', tr: 'Mangom İşbirliği' },
    'Daily Deal': { es: 'Oferta del Día', fr: 'Offre du Jour', de: 'Tagesangebot', it: 'Offerta del Giorno', nl: 'Dagdeal', pl: 'Oferta dnia', pt: 'Oferta do Dia', ru: 'Акция дня', tr: 'Günün Fırsatı' },
    'Exclusive Set': { es: 'Set Exclusivo', fr: 'Coffret Exclusif', de: 'Exklusives Set', it: 'Set Esclusivo', nl: 'Exclusieve Set', pl: 'Zestaw ekskluzywny', pt: 'Conjunto Exclusivo', ru: 'Эксклюзивный набор', tr: 'Özel Set' },
    'Purchase Event': { es: 'Evento de Compra', fr: 'Événement Achat', de: 'Kaufaktion', it: 'Evento Acquisto', nl: 'Aankoopactie', pl: 'Promocja zakupowa', pt: 'Evento de Compra', ru: 'Акция при покупке', tr: 'Satın Alma Etkinliği' },
    'Review Event': { es: 'Evento de Reseña', fr: 'Événement Avis', de: 'Bewertungsaktion', it: 'Evento Recensione', nl: 'Review Actie', pl: 'Wydarzenie recenzji', pt: 'Evento de Avaliação', ru: 'Акция за отзыв', tr: 'Yorum Etkinliği' },
    'Sanitary Pads': { es: 'Compresas', fr: 'Serviettes Hygiéniques', de: 'Damenbinden', it: 'Assorbenti', nl: 'Maandverband', pl: 'Podpaski', pt: 'Absorventes', ru: 'Прокладки', tr: 'Hijyenik Ped' },
    'Hydration': { es: 'Hidratación', fr: 'Hydratation', de: 'Feuchtigkeit', it: 'Idratazione', nl: 'Hydratatie', pl: 'Nawilżenie', pt: 'Hidratação', ru: 'Увлажнение', tr: 'Nem' },
    'Moisture': { es: 'Humectante', fr: 'Hydratant', de: 'Feuchtigkeit', it: 'Idratante', nl: 'Vocht', pl: 'Nawilżenie', pt: 'Hidratação', ru: 'Увлажнение', tr: 'Nem' },
    'Calming': { es: 'Calmante', fr: 'Apaisant', de: 'Beruhigend', it: 'Lenitivo', nl: 'Kalmerend', pl: 'Kojący', pt: 'Calmante', ru: 'Успокаивающий', tr: 'Yatıştırıcı' },
    'Soothing': { es: 'Calmante', fr: 'Apaisant', de: 'Beruhigend', it: 'Lenitivo', nl: 'Verzachtend', pl: 'Łagodzący', pt: 'Calmante', ru: 'Успокаивающий', tr: 'Yatıştırıcı' },
    'Tablets': { es: 'Tabletas', fr: 'Comprimés', de: 'Tabletten', it: 'Compresse', nl: 'Tabletten', pl: 'Tabletek', pt: 'Comprimidos', ru: 'Таблеток', tr: 'Tablet' },
    'Capsules': { es: 'Cápsulas', fr: 'Capsules', de: 'Kapseln', it: 'Capsule', nl: 'Capsules', pl: 'Kapsułek', pt: 'Cápsulas', ru: 'Капсул', tr: 'Kapsül' },
    'Collagen': { es: 'Colágeno', fr: 'Collagène', de: 'Kollagen', it: 'Collagene', nl: 'Collageen', pl: 'Kolagen', pt: 'Colágeno', ru: 'Коллаген', tr: 'Kolajen' },
    'Hyaluronic Acid': { es: 'Ácido Hialurónico', fr: 'Acide Hyaluronique', de: 'Hyaluronsäure', it: 'Acido Ialuronico', nl: 'Hyaluronzuur', pl: 'Kwas Hialuronowy', pt: 'Ácido Hialurônico', ru: 'Гиалуроновая кислота', tr: 'Hyaluronik Asit' },
    'Protein Shake': { es: 'Batido de Proteínas', fr: 'Shake Protéiné', de: 'Proteinshake', it: 'Frullato Proteico', nl: 'Eiwitshake', pl: 'Koktajl proteinowy', pt: 'Shake de Proteína', ru: 'Протеиновый коктейль', tr: 'Protein Shake' },
    'Feminine Wash': { es: 'Jabón Íntimo', fr: 'Gel Intime', de: 'Intimwaschgel', it: 'Detergente Intimo', nl: 'Intieme Waslotion', pl: 'Płyn do higieny intymnej', pt: 'Sabonete Íntimo', ru: 'Гель для интимной гигиены', tr: 'Hijyen Yıkama' },
    'Olive Oil': { es: 'Aceite de Oliva', fr: "Huile d'Olive", de: 'Olivenöl', it: 'Olio di Oliva', nl: 'Olijfolie', pl: 'Oliwa z oliwek', pt: 'Azeite de Oliva', ru: 'Оливковое масло', tr: 'Zeytinyağı' },
    'Sanitary Pad': { es: 'Compresa', fr: 'Serviette Hygiénique', de: 'Damenbinde', it: 'Assorbente', nl: 'Maandverband', pl: 'Podpaska', pt: 'Absorvente', ru: 'Прокладка', tr: 'Hijyenik Ped' },
    'False Lashes': { es: 'Pestañas Postizas', fr: 'Faux Cils', de: 'Künstliche Wimpern', it: 'Ciglia Finte', nl: 'Nepwimpers', pl: 'Sztuczne rzęsy', pt: 'Cílios Postiços', ru: 'Накладные ресницы', tr: 'Takma Kirpik' },
};

// Translate an English product name to another language using term substitution
function localizeFromEnglish(enText: string, lang: string): string {
    let result = enText;
    // Sort by length (longest first) to prevent partial matches
    const sortedTerms = Object.keys(TERM_MAP).sort((a, b) => b.length - a.length);
    for (const term of sortedTerms) {
        const translations = TERM_MAP[term];
        if (translations[lang]) {
            result = result.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), translations[lang]);
        }
    }
    return result;
}

/**
 * Get the translated product name for a given product ID and locale.
 * Returns Korean original for 'ko', English for 'en', localized English for others.
 */
export function getProductTranslation(productId: string, koreanName: string, locale: string): string {
    const lang = locale.split('-')[0];
    if (lang === 'ko') return koreanName;

    const enName = EN_TRANSLATIONS[productId];
    if (!enName) return koreanName; // fallback if ID not found

    if (lang === 'en') return enName;

    return localizeFromEnglish(enName, lang);
}

/**
 * Get the translated brand name for a given Korean brand and locale.
 */
export function getBrandTranslation(koreanBrand: string, locale: string): string {
    const lang = locale.split('-')[0];
    if (lang === 'ko') return koreanBrand;

    return BRAND_MAP[koreanBrand] || koreanBrand;
}
