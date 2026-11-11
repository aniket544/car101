import {
  CART_DISCOUNT_TIERS,
  getActiveTier,
  getNextTier,
} from "../data/cartDiscounts";

const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function CartDiscountBar({ subtotal }) {
  const top = CART_DISCOUNT_TIERS[CART_DISCOUNT_TIERS.length - 1].threshold;
  const active = getActiveTier(subtotal);
  const next = getNextTier(subtotal);
  const fill = Math.min((subtotal / top) * 100, 100);

  const message = next
    ? `You are ${formatPrice(next.threshold - subtotal)} away from ${next.label}`
    : `${active.label} unlocked`;

  return (
    <div className="cart-discount">
      <p className="cart-discount-text">{message}</p>
      <div className="cart-discount-track" aria-hidden="true">
        <div className="cart-discount-fill" style={{ width: `${fill}%` }} />
      </div>
      <div className="cart-discount-marks">
        {CART_DISCOUNT_TIERS.map((tier) => {
          const reached = subtotal >= tier.threshold;
          return (
            <span
              key={tier.threshold}
              className={`cart-discount-mark${reached ? " is-reached" : ""}`}
              style={{ left: `${(tier.threshold / top) * 100}%` }}
            >
              {tier.percent}% · {formatPrice(tier.threshold)}
            </span>
          );
        })}
      </div>
    </div>
  );
}