import { VARIANTS } from "../data/variants";

const getPackTag = (variant) => {
  const savings = variant.originalPrice - variant.price;

  return {
    savings: `Save Rs. ${savings.toLocaleString("en-IN")}`,
    badge:
      variant.packSize === 2
        ? "Most Popular"
        : variant.packSize === 4
          ? "Best Value"
          : "",
  };
};

export default function VariantSelector({
  variants = VARIANTS,
  selectedId = null,
  onSelect,
}) {
  return (
    <section className="variant-selector" aria-label="Choose a pack">
      <h3 className="variant-title">Choose Your Pack</h3>
      <div className="variant-grid">
        {variants.map((variant, index) => {
          const isSelected =
            selectedId === variant.id || (selectedId === null && index === 0);
          const tag = getPackTag(variant);

          return (
            <article
              className={`variant-card${isSelected ? " is-selected" : ""}`}
              key={variant.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => onSelect && onSelect(variant)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect && onSelect(variant);
                }
              }}
            >
              <div className="variant-image-link">
                {variant.image && (
                  <img src={variant.image} alt={variant.name} loading="eager" />
                )}
              </div>

              <p className="variant-name">{variant.name}</p>

              <div className="variant-tile-tags">
                {tag.badge && (
                  <span className="variant-tile-badge">{tag.badge}</span>
                )}
                <span className="variant-tile-saving">{tag.savings}</span>
              </div>

            </article>
          );
        })}
      </div>

      <a className="variant-kits-link" href="#kits">
        View all kits &amp; combos ↗
      </a>
    </section>
  );
}
