import dusterPack from "../assets/1.jpg";
import pack2Image from "../assets/packof2.png";
import towelcombo from "../assets/image2.png";
const COMBO_PRICE = 1279.0;
const COMBO_MRP = 1849.0;

export const UNIT_PRICE = 826.77;
export const OLD_UNIT_PRICE = 1499.0;

export const VARIANTS = [
  {
    id: "pack-1",
    name: "Pack of 1",
    subtitle: "Zip Zap Duster",
    packSize: 1,
    price: UNIT_PRICE,
    originalPrice: OLD_UNIT_PRICE,
    image: dusterPack,
    link: "",
  },
  {
    id: "pack-2",
    name: "Pack of 2",
    subtitle: "Zip Zap Duster",
    packSize: 2,
    price: UNIT_PRICE * 2,
    originalPrice: OLD_UNIT_PRICE * 2,
    image: pack2Image,
    link: "",
  },
  {
    id: "combo-1200gsm-towel",
    name: "Zip Zap Duster + 1200GSM Towel",
    subtitle: "Combo",
    packSize: null,
    tag: "(+ 1200GSM Towel)",
    price: COMBO_PRICE,
    originalPrice: COMBO_MRP,
    image: towelcombo,
    link: "",
  },
];
