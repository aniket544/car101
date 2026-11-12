import { useRef } from "react";
import { YOU_MAY_ALSO_LIKE } from "../data/youMayAlsoLike";

const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

const renderStars = (rating) => {
  const filled = Math.round(rating);
  return "★".repeat(filled) + "☆".repeat(5 - filled);
};

export default function YouMayAlsoLike({
  products = YOU_MAY_ALSO_LIKE,
  onAddToCart,
}) {
  const trackRef = useRef(null);

  const scrollTrack = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="ymal-section" aria-labelledby="ymal-title">
      <div className="ymal-inner">
        <div className="ymal-header">
          <h2 id="ymal-title" className="ymal-title">
            YOU MAY ALSO LIKE
          </h2>
          <div className="ymal-arrows">
            <button
              type="button"
              className="ymal-arrow"
              onClick={() => scrollTrack(-1)}
              aria-label="Previous products"
            >
              &#10094;
            </button>
            <button
              type="button"
              className="ymal-arrow"
              onClick={() => scrollTrack(1)}
              aria-label="Next products"
            >
              &#10095;
            </button>
          </div>
        </div>

        <div className="ymal-track" ref={trackRef}>
          {products.map((product) => {
            const hasLink = Boolean(product.link);
            const canAdd = product.price !== null && Boolean(onAddToCart);
            const showMrp =
              product.price !== null &&
              product.mrp !== null &&
              product.mrp > product.price;
            const discount = showMrp
              ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
              : null;
            const showRating =
              product.rating !== null && product.reviewCount !== null;

            return (
              <article className="ymal-card" key={product.id}>
                {product.badge && (
                  <span
                    className={`ymal-badge ymal-badge-${product.badgeTone || "default"}`}
                  >
                    {product.badge}
                  </span>
                )}

                <div className="ymal-media">
                  {hasLink ? (
                    <a
                      className="ymal-image"
                      href={product.link}
                      aria-label={product.name}
                    >
                      {product.image && (
                        <img src={product.image} alt={product.name} />
                      )}
                    </a>
                  ) : (
                    <div className="ymal-image">
                      {product.image && (
                        <img src={product.image} alt={product.name} />
                      )}
                    </div>
                  )}
                </div>

                <p className="ymal-name">{product.name}</p>

                {showRating && (
                  <div className="ymal-rating">
                    <span className="ymal-stars">
                      {renderStars(product.rating)}
                    </span>
                    <span className="ymal-review-count">
                      ({product.reviewCount})
                    </span>
                  </div>
                )}

                {product.price !== null && (
                  <div className="ymal-price-row">
                    <span className="ymal-price">
                      {formatPrice(product.price)}
                    </span>
                    {showMrp && (
                      <>
                        <span className="ymal-mrp">
                          {formatPrice(product.mrp)}
                        </span>
                        <span className="ymal-discount">{discount}% off</span>
                      </>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  className="ymal-add-btn"
                  onClick={() => onAddToCart(product)}
                  disabled={!canAdd}
                >
                  ADD TO CART
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}