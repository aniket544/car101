// Fill in image (import from ../assets) and link (product page URL) for each card.
// Price is shown only when set. Leave price null until you have it.

import glasscleaner from "../assets/glasscleaner.png";
import liquidceramicwash from "../assets/shampo.jpg";
import hydrophobicglasscoating from "../assets/hydrofobic.png";
import towel1200gsm from "../assets/1200-gsm-towel.jpg";
import towel550gsm from "../assets/500-gsm.jpg";
import glosslikeaboss from "../assets/ceramic.jpg";
// Each product. Optional fields stay null until you fill real values; the card shows only what is set.
// price: selling price (number). mrp: original/list price (number, must be above price to show discount).
// rating: 0-5 (number). reviewCount: number. badge: short label text, e.g. "New".
export const YOU_MAY_ALSO_LIKE = [
  {
    id: "foam-glass-cleaner",
    name: "Nothing But Clear Foam Glass Cleaner",
    image: glasscleaner,
    price:  389.00,
    mrp: 1299.00,
    rating: 4.6,
    reviewCount: 3245,
    badge:"New",
    badgeTone: "blue",  
    link: "https://car101.in/products/car101-glass-foam-cleaner?_pos=4&_psq=but+clear&_psid=b3aab4728&_ss=e",
  },
  {
    id: "liquid-ceramic-wash",
    name: "Liquid Ceramic Wash",
    image: liquidceramicwash,
    price: 547.00,
    mrp: 1799.00,
    rating: 4.1,
    reviewCount: 766,
    badge: null,
    link: "https://car101.in/products/car101-liquid-ceramic-shampoo?pr_prod_strat=similar&pr_rec_id=887284794&pr_rec_pid=8098237808693&pr_ref_pid=8096718258229&pr_seq=uniform",
  },
  {
    id: "hydrophobic-glass-coating",
    name: "Hydrophobic Glass Coating",
    image: hydrophobicglasscoating,
    price: 517.00,
    mrp: 1799.00,
    rating: 3.6,
    reviewCount: 3454,
    badge: "On-Sale",
    badgeTone: "green",
    link: "https://car101.in/products/glass-coating?_pos=17&_sid=cf9ac22ae&_ss=r",
  },
  {
    id: "towel-1200-gsm",
    name: "1200 GSM Towel",
    image: towel1200gsm,
    price: 549.00,
    mrp: 890.00,
    rating: 4.4,
    reviewCount: 5446,
    badge: "Back in Stock",
    link: "https://car101.in/products/1200-gsm-twisted-loop-microfibre-towel?_pos=1&_sid=341dbdd2b&_ss=r",
  },
  {
    id: "towel-550-gsm",
    name: "550 GSM Towel",
    image: towel550gsm,
    price: 290.00,
    mrp: 499.00,
    rating: 4.8,
    reviewCount: 3456,
    badge: "Back in Stock",
    link: "https://car101.in/products/450-gsm?_pos=1&_sid=eedb3c63a&_ss=r",
  },
  {
    id: "gloss-like-a-boss",
    name: "Gloss Like A Boss Graphene Ceramic Coating",
    image: glosslikeaboss,
    price: 940.00,
    mrp: 1599.00,
    rating: 4.9,
    reviewCount: 6675,
    badge: "Best Seller",
    badgeTone: "red",   
    link: "https://car101.in/products/car01-graphene-ceramic-coating-300ml",
  },
];
