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
                  <img src={variant.image} alt={variant.name} loading="lazy" />
                )}
              </div>

              <p className="variant-name">{variant.name}</p>
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
