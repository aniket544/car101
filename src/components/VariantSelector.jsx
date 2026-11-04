import { VARIANTS } from "../data/variants";

const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function VariantSelector({
  variants = VARIANTS,
  selectedId = null,
  onSelect,
}) {
  return (
    <section className="variant-selector" aria-label="Choose a variant">
      <h3 className="variant-title">Choose Your Variant</h3>
      <div className="variant-grid">
        {variants.map((variant) => {
          const hasLink = Boolean(variant.link);
          const isSelected = selectedId === variant.id;
          return (
            <article
              className={`variant-card${isSelected ? " is-selected" : ""}`}
              key={variant.id}
            >
              {hasLink ? (
                <a
                  className="variant-image-link"
                  href={variant.link}
                  aria-label={variant.name}
                >
                  {variant.image && (
                    <img src={variant.image} alt={variant.name} loading="lazy" />
                  )}
                </a>
              ) : (
                <div className="variant-image-link">
                  {variant.image && (
                    <img src={variant.image} alt={variant.name} loading="lazy" />
                  )}
                </div>
              )}

              <p className="variant-name">{variant.name}</p>

              {variant.price !== null && (
                <div className="variant-price-row">
                  <span className="variant-price">
                    {formatPrice(variant.price)}
                  </span>
                  {variant.originalPrice !== null && (
                    <span className="variant-old-price">
                      {formatPrice(variant.originalPrice)}
                    </span>
                  )}
                </div>
              )}

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
    </section>
  );
}
