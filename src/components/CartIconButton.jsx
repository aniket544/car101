import { ShoppingCart } from "lucide-react";

export default function CartIconButton({ onClick, disabled = false, label }) {
  return (
    <button
      type="button"
      className="cart-icon-btn"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <ShoppingCart size={18} strokeWidth={2} />
    </button>
  );
}