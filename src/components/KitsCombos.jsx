import { useRef } from "react";
import { KITS, KITS_PAGE_LINK } from "../data/kits";

const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function KitsCombos({ kits = KITS, onAddToCart }) {
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
    <section id="kits" className="kits-section" aria-labelledby="kits-title">
      <div className="kits-inner">
        <div className="kits-header">
          <div>
            <p className="kits-eyebrow">CAR101 KITS &amp; COMBOS</p>
            <h2 id="kits-title" className="kits-title">
              MORE VALUE. MORE CAR CARE.
            </h2>
          </div>
          <div className="kits-arrows">
            <button
              type="button"
              className="kits-arrow"
              onClick={() => scrollTrack(-1)}
              aria-label="Previous kits"
            >
              &#10094;
            </button>
            <button
              type="button"
              className="kits-arrow"
              onClick={() => scrollTrack(1)}
              aria-label="Next kits"
            >
              &#10095;
            </button>
          </div>
        </div>

        <div className="kits-track" ref={trackRef}>
          {kits.map((kit) => {
            const hasLink = Boolean(kit.link);
            const canAdd = kit.price !== null && Boolean(onAddToCart);
            const mrp = kit.mrp ?? null;
            const showMrp = mrp !== null && mrp > kit.price;
            const discount = showMrp
              ? Math.round(((mrp - kit.price) / mrp) * 100)
              : null;

            const image = kit.image ? (
              <img src={kit.image} alt={kit.name} />
            ) : null;

            return (
              <article className="kits-card" key={kit.id}>
                {hasLink ? (
                  <a className="kits-image" href={kit.link} aria-label={kit.name}>
                    {image}
                  </a>
                ) : (
                  <div className="kits-image">{image}</div>
                )}

                <p className="kits-name">{kit.name}</p>

                <div className="kits-price-row">
                  <span className="kits-price">{formatPrice(kit.price)}</span>
                  {showMrp && (
                    <>
                      <span className="kits-mrp">{formatPrice(mrp)}</span>
                      <span className="kits-discount">{discount}% off</span>
                    </>
                  )}
                </div>

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
