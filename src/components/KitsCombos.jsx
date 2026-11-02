import { KITS, KITS_PAGE_LINK } from "../data/kits";

const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function KitsCombos({ kits = KITS, onAddToCart }) {
  return (
    <section className="kits-section" aria-labelledby="kits-title">
      <div className="kits-inner">
        <p className="kits-eyebrow">CAR101 KITS &amp; COMBOS</p>
        <h2 id="kits-title" className="kits-title">
          MORE VALUE. MORE CAR CARE.
        </h2>
        <p className="kits-subtitle">
          Explore CAR101's popular combos and kits with current product images
          and pricing.
        </p>

        <div className="kits-grid">
          {kits.map((kit) => {
            const hasLink = Boolean(kit.link);
            const canAdd = kit.price !== null && Boolean(onAddToCart);
            return (
              <article className="kits-card" key={kit.id}>
                {hasLink ? (
                  <a className="kits-image" href={kit.link} aria-label={kit.name}>
                    {kit.image && <img src={kit.image} alt={kit.name} />}
                  </a>
                ) : (
                  <div className="kits-image">
                    {kit.image && <img src={kit.image} alt={kit.name} />}
                  </div>
                )}

                <p className="kits-item-name">{kit.name}</p>
                <span className="kits-item-price">{formatPrice(kit.price)}</span>

                <button
                  type="button"
                  className="kits-add-btn"
                  onClick={() => onAddToCart(kit)}
                  disabled={!canAdd}
                >
                  ADD TO CART
                </button>
              </article>
            );
          })}
        </div>

        <a className="kits-view-all" href={KITS_PAGE_LINK}>
          View all kits &amp; combos ↗
        </a>
      </div>
    </section>
  );
}
