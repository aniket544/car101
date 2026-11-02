// Fill in price, originalPrice, image (import from ../assets) and link for each variant.
// Leave price/link empty until they are ready; the card hides the price and disables the button.
import React from "react";
import ultimateshine from "../assets/image1.png";
import zipzapduster from "../assets/image2.png";
import ciramiccoating from "../assets/image4.png";
import tyertrimcoating from "../assets/image3.png";
import smalltowel from "../assets/image5.png";
import rejuvenator from "../assets/image6.png";
export const VARIANTS = [
  {
    id: "duster-ceramic-tyre-trim",
    name: "Zip Zap Duster + Ceramic Coating + Tyre Trim Coating",
    image: ultimateshine,
    price: 1990,
    originalPrice: 2990,
    link: "",
  },
  {
    id: "duster-1200gsm-towel",
    name: "Zip Zap Duster + 1200GSM Towel",
    image: zipzapduster,
    price: 499,
    originalPrice: 1099,
    link: "",
  },
  {
    id: "duster-tyre-trim",
    name: "Zip Zap Duster + Tyre Trim Coating",
    image: tyertrimcoating,
    price: 1325,
    originalPrice: 2998,
    link: "",
  },
  {
    id: "duster-ceramic",
    name: "Zip Zap Duster + Ceramic Coating",
    image: ciramiccoating,
    price: 1479,
    originalPrice: 2998,
    link: "",
  },
  {
    id: "duster-550gsm-towel",
    name: "Zip Zap Duster + 550GSM Towel",
    image: smalltowel,
    price: 1259,
    originalPrice: 1889,
    link: "",
  },
  {
    id: "duster-rejuvenator",
    name: "Zip Zap Duster + Zip Zap Rejuvenator",
    image: rejuvenator,
    price: 1159,
    originalPrice: 1999,
    link: "",
  },
];
