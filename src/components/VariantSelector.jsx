import { VARIANTS } from "../data/variants";

const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function VariantSelector({ variants = VARIANTS, onAddToCart }) {
  return (
    <section className="variant-selector" aria-label="Choose a variant">
      <h3 className="variant-title">Choose Your Variant</h3>
      <div className="variant-grid">
        {variants.map((variant) => {
          const hasLink = Boolean(variant.link);
          const canAdd = variant.price !== null && Boolean(onAddToCart);
          return (
            <article className="variant-card" key={variant.id}>
              {hasLink ? (
                <a
                  className="variant-image-link"
                  href={variant.link}
                  aria-label={variant.name}
                >
                  {variant.image && (
                    <img src={variant.image} alt={variant.name} />
                  )}
                </a>
              ) : (
                <div className="variant-image-link">
                  {variant.image && (
                    <img src={variant.image} alt={variant.name} />
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
                className="variant-add-btn"
                onClick={() => onAddToCart(variant)}
                disabled={!canAdd}
              >
                ADD TO CART
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
