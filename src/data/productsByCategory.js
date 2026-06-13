// ── Mode (17 produits) ────────────────────────────────────────────────────────
import modeSamba from '../assets/mode/baskets-adidas-samba.png'
import modeJordan from '../assets/mode/baskets-air-jordan-3.png'
import modeCardigan from '../assets/mode/cardigan-ami-paris.png'
import modeGilet from '../assets/mode/gilet-argyle.png'
import modeLunettesClub from '../assets/mode/lunettes-clubmaster.png'
import modeLunettesNoir from '../assets/mode/lunettes-noires.png'
import modeMocassins from '../assets/mode/mocassins-tassel.png'
import modePoloKotzeo from '../assets/mode/polo-kotzeo.png'
import modePolosLacoste from '../assets/mode/polos-lacoste.png'
import modeCrocs from '../assets/mode/sabots-crocs.png'
import modeSacHermes from '../assets/mode/sac-hermes-birkin.png'
import modeSacLV from '../assets/mode/sac-louis-vuitton.png'
import modeSandalesChypre from '../assets/mode/sandales-hermes-chypre.png'
import modeSandalesOran from '../assets/mode/sandales-hermes-oran.png'
import modeSandalesSL from '../assets/mode/sandales-saint-laurent.png'
import modeSurvetNike from '../assets/mode/survetement-nike-tech-fleece.png'
import modeSurvetNoir from '../assets/mode/survetement-noir-gris.png'

// ── Électronique (15 produits) ───────────────────────────────────────────────
import elecCasqueSony from '../assets/electronique/casque-sony-wh1000xm4.png'
import elecEnceinte from '../assets/electronique/enceinte-jbl.png'
import elecPS5 from '../assets/electronique/console-ps5.png'
import elecMacbook from '../assets/electronique/ordinateur-macbook-air.png'
import elecDJI from '../assets/electronique/camera-dji-osmo-pocket.png'
import elecAirpods from '../assets/electronique/casque-airpods-max.png'
import elecChargeur from '../assets/electronique/chargeur-usb-c.png'
import elecCleUsb from '../assets/electronique/cle-usb.png'
import elecHuawei from '../assets/electronique/ordinateur-huawei.png'
import elecHasselblad from '../assets/electronique/camera-hasselblad.png'
import elecSouris from '../assets/electronique/souris-logitech-g502.png'
import elecIphone from '../assets/electronique/smartphone-iphone-16.png'
import elecGarmin from '../assets/electronique/montre-garmin-epix.png'
import elecBuds from '../assets/electronique/ecouteurs-samsung-buds.png'
import elecCamImou from '../assets/electronique/camera-securite-imou.png'

// ── Sport (15 produits) ──────────────────────────────────────────────────────
import sportS1 from '../assets/sport/s1.jpeg'
import sportS2 from '../assets/sport/s2.jpeg'
import sportS3 from '../assets/sport/s3.jpeg'
import sportS4 from '../assets/sport/s4.jpeg'
import sportS5 from '../assets/sport/s5.jpeg'
import sportS6 from '../assets/sport/s6.jpeg'
import sportS7 from '../assets/sport/s7.jpeg'
import sportS8 from '../assets/sport/s8.jpeg'
import sportS9 from '../assets/sport/s9.jpeg'
import sportS10 from '../assets/sport/s10.jpeg'
import sportS11 from '../assets/sport/s11.jpeg'
import sportS12 from '../assets/sport/s12.jpeg'
import sportS13 from '../assets/sport/s13.jpeg'
import sportS14 from '../assets/sport/s14.jpeg'
import sportS15 from '../assets/sport/s15.jpeg'

// ── Beauté (15 produits) ─────────────────────────────────────────────────────
import beauteB1 from '../assets/beaute/b1.jpeg'
import beauteB2 from '../assets/beaute/b2.jpeg'
import beauteB3 from '../assets/beaute/b3.jpeg'
import beauteB4 from '../assets/beaute/b4.jpeg'
import beauteB5 from '../assets/beaute/b5.jpeg'
import beauteB6 from '../assets/beaute/b6.jpeg'
import beauteB7 from '../assets/beaute/b7.jpeg'
import beauteB8 from '../assets/beaute/b8.jpeg'
import beauteB9 from '../assets/beaute/b9.jpeg'
import beauteB10 from '../assets/beaute/b10.jpeg'
import beauteB11 from '../assets/beaute/b11.jpeg'
import beauteB12 from '../assets/beaute/b12.jpeg'
import beauteB13 from '../assets/beaute/b13.jpeg'
import beauteB14 from '../assets/beaute/b14.jpeg'
import beauteB15 from '../assets/beaute/b15.jpeg'

// ── Maison (15 produits) ─────────────────────────────────────────────────────
import maisonM1 from '../assets/maison/M1.jpeg'
import maisonM2 from '../assets/maison/M2.jpeg'
import maisonM3 from '../assets/maison/M3.jpeg'
import maisonM4 from '../assets/maison/M4.jpeg'
import maisonM5 from '../assets/maison/M5.jpeg'
import maisonM6 from '../assets/maison/M6.jpeg'
import maisonM7 from '../assets/maison/M7.jpeg'
import maisonM8 from '../assets/maison/M8.jpeg'
import maisonM9 from '../assets/maison/M9.jpeg'
import maisonM10 from '../assets/maison/M10.jpeg'
import maisonM11 from '../assets/maison/M11.jpeg'
import maisonM12 from '../assets/maison/M12.jpeg'
import maisonM13 from '../assets/maison/M13.jpeg'
import maisonM14 from '../assets/maison/M14.jpeg'
import maisonM15 from '../assets/maison/M15.jpeg'

function p(id, name, img, price, oldPrice, rating, reviews, inStock) {
  return { id, name, img, price, oldPrice, rating, reviews, inStock }
}

export const PRODUCTS_BY_CATEGORY = {
  mode: [
    p(1, 'Basket Adidas Samba', modeSamba, 22000, 28000, 4.5, 85, 12),
    p(2, 'Air Jordan 3', modeJordan, 95000, 110000, 4.8, 64, 5),
    p(3, 'Cardigan Ami Paris', modeCardigan, 35000, 45000, 4.6, 28, 7),
    p(4, 'Gilet Argyle', modeGilet, 18000, 24000, 4.3, 19, 14),
    p(5, 'Lunettes Clubmaster', modeLunettesClub, 15000, 20000, 4.7, 92, 20),
    p(6, 'Lunettes noires', modeLunettesNoir, 12000, 16000, 4.4, 55, 18),
    p(7, 'Mocassins Tassel', modeMocassins, 28000, 35000, 4.4, 31, 9),
    p(8, 'Polo Kotzeo', modePoloKotzeo, 14000, 18000, 4.2, 22, 16),
    p(9, 'Polos Lacoste', modePolosLacoste, 25000, 32000, 4.6, 48, 11),
    p(10, 'Sabots Crocs', modeCrocs, 8500, 11000, 4.1, 120, 25),
    p(11, 'Sac Hermès Birkin', modeSacHermes, 120000, 150000, 4.9, 45, 3),
    p(12, 'Sac Louis Vuitton', modeSacLV, 98000, 125000, 4.8, 38, 4),
    p(13, 'Sandales Hermès Chypre', modeSandalesChypre, 42000, 52000, 4.5, 27, 8),
    p(14, 'Sandales Hermès Oran', modeSandalesOran, 38000, 48000, 4.6, 33, 6),
    p(15, 'Sandales Saint Laurent', modeSandalesSL, 55000, 68000, 4.7, 21, 5),
    p(16, 'Survêtement Nike Tech Fleece', modeSurvetNike, 32000, 40000, 4.5, 74, 10),
    p(17, 'Survêtement noir & gris', modeSurvetNoir, 24000, 30000, 4.3, 41, 13),
  ],
  electronique: [
    p(18, 'Casque Sony WH-1000XM4', elecCasqueSony, 45000, 55000, 4.8, 120, 5),
    p(19, 'Enceinte JBL Bluetooth', elecEnceinte, 35000, 40000, 4.7, 200, 8),
    p(20, 'Console PlayStation 5', elecPS5, 180000, 210000, 4.9, 350, 3),
    p(21, 'MacBook Air M3', elecMacbook, 850000, 950000, 4.8, 95, 6),
    p(22, 'Caméra DJI Osmo Pocket', elecDJI, 95000, 120000, 4.6, 67, 4),
    p(23, 'AirPods Max', elecAirpods, 75000, 85000, 4.7, 156, 8),
    p(24, 'Chargeur USB-C', elecChargeur, 4500, 6000, 4.4, 210, 30),
    p(25, 'Clé USB 128 Go', elecCleUsb, 3500, 5000, 4.3, 88, 40),
    p(26, 'Ordinateur Huawei', elecHuawei, 420000, 480000, 4.5, 42, 7),
    p(27, 'Caméra Hasselblad', elecHasselblad, 650000, 720000, 4.9, 18, 2),
    p(28, 'Souris Logitech G502', elecSouris, 12000, 15000, 4.6, 134, 15),
    p(29, 'iPhone 16', elecIphone, 520000, 580000, 4.8, 89, 9),
    p(30, 'Montre Garmin Epix', elecGarmin, 185000, 210000, 4.7, 56, 6),
    p(31, 'Écouteurs Samsung Buds', elecBuds, 28000, 35000, 4.5, 143, 12),
    p(32, 'Caméra sécurité Imou', elecCamImou, 22000, 28000, 4.4, 76, 11),
  ],
  sport: [
    p(33, 'Ballon de basket', sportS1, 8500, 11000, 4.3, 60, 20),
    p(34, 'Lot chaussettes sport', sportS2, 4500, 6000, 4.2, 88, 35),
    p(35, 'Tapis de course DO!T Fortis', sportS3, 320000, 380000, 4.6, 24, 3),
    p(36, 'Haltères 10 lb', sportS4, 12000, 15000, 4.4, 45, 18),
    p(37, 'Baskets Nike Joyride', sportS5, 48000, 58000, 4.5, 72, 8),
    p(38, 'Corde à sauter pro', sportS6, 3500, 5000, 4.1, 95, 40),
    p(39, 'Gourde isotonique', sportS7, 2500, 3500, 4.0, 110, 50),
    p(40, 'Boxers Nike pack x3', sportS8, 9000, 12000, 4.3, 67, 22),
    p(41, 'Raquette de tennis', sportS9, 22000, 28000, 4.5, 34, 10),
    p(42, 'Ballon Adidas Champions League', sportS10, 14000, 18000, 4.6, 91, 16),
    p(43, 'T-shirt running', sportS11, 6500, 8500, 4.2, 58, 28),
    p(44, 'Rack haltères 5–15 lb', sportS12, 45000, 55000, 4.7, 29, 6),
    p(45, 'Sac de sport Luxe Fitness', sportS13, 18000, 25000, 4.4, 60, 15),
    p(46, 'Genouillère sport', sportS14, 5500, 7500, 4.1, 42, 30),
    p(47, 'Montre sport GPS', sportS15, 35000, 42000, 4.6, 38, 9),
  ],
  beaute: [
    p(48, 'Kit soins CeraVe', beauteB1, 18000, 22000, 4.7, 156, 25),
    p(49, 'Crème hydratante visage', beauteB2, 8500, 11000, 4.5, 98, 30),
    p(50, 'Sérum vitamine C', beauteB3, 12000, 15000, 4.6, 78, 28),
    p(51, 'Huile capillaire', beauteB4, 6500, 8500, 4.3, 64, 35),
    p(52, 'Masque visage purifiant', beauteB5, 5500, 7000, 4.4, 82, 40),
    p(53, 'Déodorant roll-on', beauteB6, 3500, 4500, 4.2, 120, 50),
    p(54, 'Parfum eau de toilette', beauteB7, 22000, 28000, 4.8, 45, 12),
    p(55, 'Rouge à lèvres matte', beauteB8, 4500, 6000, 4.5, 93, 38),
    p(56, 'Mascara volume', beauteB9, 4000, 5500, 4.4, 87, 42),
    p(57, 'Lotion tonique', beauteB10, 5000, 6500, 4.3, 71, 33),
    p(58, 'Gommage corps', beauteB11, 6000, 8000, 4.4, 56, 27),
    p(59, 'Shampoing nourrissant', beauteB12, 4500, 6000, 4.2, 105, 45),
    p(60, 'Crème solaire SPF50', beauteB13, 7500, 9500, 4.6, 68, 30),
    p(61, 'Baume lèvres', beauteB14, 2500, 3500, 4.3, 142, 55),
    p(62, 'Set manucure', beauteB15, 3500, 5000, 4.1, 49, 40),
  ],
  maison: [
    p(63, 'Bouilloire électrique Cadence', maisonM1, 12000, 15000, 4.5, 88, 20),
    p(64, 'Mixeur plongeant', maisonM2, 9500, 12000, 4.3, 54, 18),
    p(65, 'Fer à repasser vapeur', maisonM3, 14000, 18000, 4.4, 42, 15),
    p(66, 'Aspirateur compact', maisonM4, 35000, 42000, 4.6, 36, 8),
    p(67, 'Cafetière filtre', maisonM5, 8500, 11000, 4.2, 67, 22),
    p(68, 'Grille-pain 2 fentes', maisonM6, 7500, 9500, 4.1, 73, 25),
    p(69, 'Balance de cuisine', maisonM7, 5500, 7000, 4.3, 91, 30),
    p(70, 'Set casseroles antiadhésives', maisonM8, 28000, 35000, 4.5, 48, 12),
    p(71, 'Lampe LED bureau', maisonM9, 8500, 11000, 4.4, 62, 18),
    p(72, 'Organisateur de bureau', maisonM10, 6500, 8500, 4.2, 39, 24),
    p(73, 'Poubelle automatique', maisonM11, 18000, 22000, 4.3, 28, 10),
    p(74, 'Humidificateur d\'air', maisonM12, 15000, 19000, 4.4, 35, 14),
    p(75, 'Machine à coudre portable', maisonM13, 42000, 50000, 4.6, 19, 6),
    p(76, 'Ventilateur sur pied', maisonM14, 22000, 28000, 4.3, 44, 11),
    p(77, 'Set couteaux cuisine', maisonM15, 16000, 20000, 4.5, 57, 16),
  ],
}

export const CATEGORY_COUNTS = {
  tous: Object.values(PRODUCTS_BY_CATEGORY).flat().length,
  mode: PRODUCTS_BY_CATEGORY.mode.length,
  electronique: PRODUCTS_BY_CATEGORY.electronique.length,
  maison: PRODUCTS_BY_CATEGORY.maison.length,
  beaute: PRODUCTS_BY_CATEGORY.beaute.length,
  sport: PRODUCTS_BY_CATEGORY.sport.length,
}
