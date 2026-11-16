export const CART_DISCOUNT_TIERS = [
  { threshold: 299, percent: 5, label: "Extra 5% off" },
  { threshold: 799, percent: 7, label: "Extra 7% off" },
  { threshold: 1299, percent: 10, label: "Extra 10% off" },
  { threshold: 1599, percent: 15, label: "Extra 15% off" },
];

export const getActiveTier = (subtotal) => {
  let active = null;
  for (const tier of CART_DISCOUNT_TIERS) {
    if (subtotal >= tier.threshold) active = tier;
  }
  return active;
};

export const getNextTier = (subtotal) =>
  CART_DISCOUNT_TIERS.find((tier) => subtotal < tier.threshold) ?? null;

export const getCartTotals = (subtotal) => {
  const tier = getActiveTier(subtotal);
  const discount = tier ? Math.round((subtotal * tier.percent) / 100) : 0;
  return {
    tier,
    discount,
    total: subtotal - discount,
  };
};