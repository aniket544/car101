import { KITS, KITS_PAGE_LINK } from "../data/kits";

const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function KitsCombos({ kits = KITS }) {
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

        <ul className="kits-list">
          {kits.map((kit) => {
            const Tag = kit.link ? "a" : "div";
            const linkProps = kit.link ? { href: kit.link } : {};
            return (
              <li key={kit.id}>
                <Tag className="kits-item" {...linkProps}>
                  <div className="kits-item-image">
                    {kit.image && <img src={kit.image} alt={kit.name} />}
                  </div>
                  <div className="kits-item-info">
                    <span className="kits-item-name">{kit.name}</span>
                    <span className="kits-item-price">
                      {formatPrice(kit.price)}
                    </span>
                  </div>
                </Tag>
              </li>
            );
          })}
        </ul>

        <a className="kits-view-all" href={KITS_PAGE_LINK}>
          View all kits &amp; combos ↗
        </a>
      </div>
    </section>
  );
}
