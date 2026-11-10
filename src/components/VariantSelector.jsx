import { VARIANTS } from "../data/variants";

const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

const BANDS = {
  2: { key: "popular", label: "Most Popular" },
  4: { key: "value", label: "Best Value" },
};

export default function VariantSelector({
  variants = VARIANTS,
  selectedId = null,
  onSelect,
}) {
  const activeId = selectedId ?? variants[0]?.id;

  return (
    <section className="pk-select" aria-labelledby="pk-select-title">
      <h3 id="pk-select-title" className="pk-title">
        Select Your Quantity:
      </h3>

      <div className="pk-list" role="radiogroup" aria-label="Pack options">
        {variants.map((variant) => {
          const isSelected = variant.id === activeId;
          const band = BANDS[variant.packSize];
          const savings = variant.originalPrice - variant.price;

          return (
            <div
              key={variant.id}
              role="radio"
              aria-checked={isSelected}
              aria-label={variant.name}
              tabIndex={0}
              className={`pk-tile${isSelected ? " is-selected" : ""}`}
              onClick={() => onSelect && onSelect(variant)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect && onSelect(variant);
                }
              }}
            >
              <div className="pk-tags">
                {band && (
                  <span className={`pk-band pk-band-${band.key}`}>
                    {band.label}
                  </span>
                )}
                <span className="pk-save">Save {formatPrice(savings)}</span>
              </div>

              <div className="pk-row">
                <div className="pk-image">
                  {variant.image && (
                    <img src={variant.image} alt="" loading="lazy" />
                  )}
                </div>

                <div className="pk-info">
                  <p className="pk-name">Pack of {variant.packSize}</p>
                  <p className="pk-sub">Zip Zap Duster</p>
                </div>

                <div className="pk-prices">
                  <span className="pk-price">{formatPrice(variant.price)}</span>
                  <span className="pk-old">{formatPrice(variant.originalPrice)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <a className="variant-kits-link" href="#kits">
        View all kits &amp; combos ↗
      </a>
    </section>
  );
}
