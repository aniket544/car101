export const FREE_SHIPPING_THRESHOLD = 1999;

const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function FreeShippingBar({ subtotal }) {
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const unlocked = remaining === 0;

  return (
    <div className="free-shipping">
      <p className="free-shipping-text">
        {unlocked
          ? "Aapko free delivery mil gayi hai"
          : `${formatPrice(remaining)} aur daalein aur free delivery paayein`}
      </p>
      <div
        className="free-shipping-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={FREE_SHIPPING_THRESHOLD}
        aria-valuenow={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)}
      >
        <div
          className="free-shipping-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
