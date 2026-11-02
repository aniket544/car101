import { YOU_MAY_ALSO_LIKE } from "../data/youMayAlsoLike";

const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function YouMayAlsoLike({
  products = YOU_MAY_ALSO_LIKE,
  onAddToCart,
}) {
  return (
    <section className="ymal-section" aria-labelledby="ymal-title">
      <div className="ymal-inner">
        <h2 id="ymal-title" className="ymal-title">
          YOU MAY ALSO LIKE
        </h2>

        <div className="ymal-grid">
          {products.map((product) => {
            const hasLink = Boolean(product.link);
            const canAdd = product.price !== null && Boolean(onAddToCart);
            return (
              <article className="ymal-card" key={product.id}>
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

                <p className="ymal-name">{product.name}</p>

                {product.price !== null && (
                  <span className="ymal-price">
                    {formatPrice(product.price)}
                  </span>
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
