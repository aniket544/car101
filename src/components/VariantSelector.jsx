import { VARIANTS } from "../data/variants";

export default function VariantSelector({
  variants = VARIANTS,
  selectedId = null,
  onSelect,
}) {
  return (
    <section className="variant-selector" aria-label="Choose a pack">
      <h3 className="variant-title">Choose Your Pack</h3>
      <div className="variant-grid">
        {variants.map((variant) => {
          const isSelected = selectedId === variant.id;
          return (
            <article
              className={`variant-card${isSelected ? " is-selected" : ""}`}
              key={variant.id}
            >
              <div className="variant-image-link">
                {variant.image && (
                  <img src={variant.image} alt={variant.name} loading="lazy" />
                )}
              </div>

              <p className="variant-name">{variant.name}</p>

              <button
                type="button"
                className={`variant-add-btn${isSelected ? " is-selected" : ""}`}
                onClick={() => onSelect && onSelect(variant)}
                aria-pressed={isSelected}
              >
                {isSelected ? "SELECTED" : "SELECT"}
              </button>
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