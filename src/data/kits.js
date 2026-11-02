// Fill in image (import from ../assets) and link for each kit. The "View all" button uses KITS_PAGE_LINK.

import ultimateshine from "../assets/image1.png";
import zipzapduster from "../assets/image2.png";
import ciramiccoating from "../assets/image4.png";
import tyertrimcoating from "../assets/image3.png";
import smalltowel from "../assets/image5.png";
import rejuvenator from "../assets/image6.png";

export const KITS_PAGE_LINK = "https://car101.in/collections/combos";

export const KITS = [
  {
    id: "zip-zap-tyre-trim",
    name: "Zip Zap + Tyre Trim",
    price: 1325,
    image: tyertrimcoating,
    link: "",
  },
  {
    id: "zip-zap-rejuvenator",
    name: "Zip Zap + Rejuvenator",
    price: 1159,
    image: rejuvenator,
    link: "",
  },
  {
    id: "ultimate-shine-shield",
    name: "Ultimate Shine Shield",
    price: 1990,
    image: ultimateshine,
    link: "",
  },
  {
    id: "dusting-drying-lite",
    name: "Dusting & Drying Lite",
    price: 1090,
    image: smalltowel,
    link: "",
  },
  {
    id: "zip-zap-500-gsm",
    name: "Zip Zap + 500 GSM",
    price: 1259,
    image: zipzapduster,
    link: "",
  },
];
