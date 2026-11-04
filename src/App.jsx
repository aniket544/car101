import React, { useEffect, useRef, useState } from "react";
import BellToggle from "./components/BellToggle";
import PeekRating from "./components/PeekRating";
import VariantSelector from "./components/VariantSelector";
import logo from "./assets/CAR101-Logo-w.png";
import dusterPack from "./assets/1.jpg";
import ceramicFeature from "./assets/listing zipzap1.jpg";
import beforeAfterClean from "./assets/listing zipzap3.jpg";
import rechargeSpray from "./assets/listing zipzap6.jpg";
import happyCustomers from "./assets/listing zipzap7.jpg";
import waterSaved from "./assets/listing zipzap5.jpg";
import videoShowcase from "./assets/car101-showcase.mp4";
import { Share2 } from "lucide-react";
import comparisonImage from "./assets/5.jpg";
import KitsCombos from "./components/KitsCombos";
import YouMayAlsoLike from "./components/YouMayAlsoLike";
import FreeShippingBar from "./components/FreeShippingBar";

const PRODUCT = {
  id: "car101-zip-zap-duster",
  name: "CAR 101 Zip-Zap Duster",
  description: "Ceramic-Wax Infused Car Duster Kit",
  price: 849,
  oldPrice: 1499,
  image: dusterPack,
};

const readStorage = (key, fallback) => {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [qty, setQty] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [unread] = useState(3);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(() => readStorage("car101-cart", []));
  const [wishlist, setWishlist] = useState(() =>
    readStorage("car101-wishlist", false),
  );
  const [shareMessage, setShareMessage] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");
  const [customerReviews, setCustomerReviews] = useState(() =>
    readStorage("car101-customer-reviews", []),
  );
  const pricePerUnit = PRODUCT.price;

  const discountPercentage = Math.round(
    ((PRODUCT.oldPrice - pricePerUnit) / PRODUCT.oldPrice) * 100,
  );

  const savingsPerUnit = PRODUCT.oldPrice - pricePerUnit;

  const selectedTotal = pricePerUnit * qty;

  const selectedSavings = savingsPerUnit * qty;
  const images = [
    dusterPack,
    ceramicFeature,
    beforeAfterClean,
    rechargeSpray,
    happyCustomers,
  ];
  const [activeImage, setActiveImage] = useState(0);
  const touchStartX = useRef(null);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    try {
      window.localStorage.setItem("car101-cart", JSON.stringify(cart));
    } catch {
      // The cart remains usable for the current session if storage is unavailable.
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem("car101-wishlist", JSON.stringify(wishlist));
    } catch {
      // The wishlist remains usable for the current session if storage is unavailable.
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "car101-customer-reviews",
        JSON.stringify(customerReviews),
      );
    } catch {
      // Reviews remain available for the current session if storage is unavailable.
    }
  }, [customerReviews]);
  const purchaseActionsRef = useRef(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const element = purchaseActionsRef.current;
    if (!element) return;

    let hasBeenVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasBeenVisible = true;
          setShowStickyBar(false);
        } else if (hasBeenVisible) {
          setShowStickyBar(true);
        }
      },
      { threshold: 0 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const submitReview = (event) => {
    event.preventDefault();
    const name = reviewName.trim();
    const comment = reviewText.trim();
    if (!reviewRating) {
      setReviewMessage("Please choose a star rating first.");
      return;
    }
    if (!name || !comment) {
      setReviewMessage("Please add your name and a short review.");
      return;
    }
    const newReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      comment,
      rating: reviewRating,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
    setCustomerReviews((current) => [newReview, ...current]);
    setReviewName("");
    setReviewText("");
    setReviewRating(0);
    setReviewMessage("Thanks! Your review has been added on this device.");
  };

  const prevImage = (event) => {
    event?.stopPropagation();
    setActiveImage((previous) =>
      previous === 0 ? images.length - 1 : previous - 1,
    );
  };
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [slideDir, setSlideDir] = useState(0);
  const [noAnim, setNoAnim] = useState(false);

  const prevIndex = (activeImage - 1 + images.length) % images.length;
  const nextIndex = (activeImage + 1) % images.length;

  useEffect(() => {
    if (!noAnim) return;
    const frame = requestAnimationFrame(() => setNoAnim(false));
    return () => cancelAnimationFrame(frame);
  }, [noAnim]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (event) => {
    if (touchStartX.current === null) return;
    setDragX(event.touches[0].clientX - touchStartX.current);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const width = event.currentTarget.offsetWidth;
    const distance = dragX;
    touchStartX.current = null;
    setIsDragging(false);
    if (Math.abs(distance) > width * 0.2) {
      setSlideDir(distance < 0 ? -1 : 1);
      setDragX(distance < 0 ? -width : width);
    } else {
      setDragX(0);
    }
  };

  const handleSlideEnd = () => {
    if (slideDir === 0) return;
    const dir = slideDir;
    setSlideDir(0);
    setNoAnim(true);
    setDragX(0);
    setActiveImage((prev) =>
      dir < 0
        ? (prev + 1) % images.length
        : (prev - 1 + images.length) % images.length,
    );
  };
  const nextImage = (event) => {
    event?.stopPropagation();
    setActiveImage((previous) =>
      previous === images.length - 1 ? 0 : previous + 1,
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setIsCartOpen(false);
      }
      if (isModalOpen && event.key === "ArrowLeft") prevImage();
      if (isModalOpen && event.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const addToCart = (quantity = qty) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === PRODUCT.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === PRODUCT.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...currentCart, { ...PRODUCT, quantity }];
    });
    setCheckoutMessage(false);
    setIsCartOpen(true);
  };

  const addVariantToCart = (variant) => {
    if (variant.price === null) return;
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === variant.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...currentCart,
        {
          id: variant.id,
          name: variant.name,
          price: variant.price,
          image: variant.image,
          quantity: 1,
        },
      ];
    });
    setCheckoutMessage(false);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id, nextQuantity) => {
    if (nextQuantity < 1) {
      setCart((currentCart) => currentCart.filter((item) => item.id !== id));
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  };

  const shareProduct = async () => {
    const shareData = {
      title: PRODUCT.name,
      text: "Check out the CAR 101 Zip-Zap Duster.",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage("");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        setShareMessage("Product link copied!");
      } else {
        window.prompt("Copy this product link:", shareData.url);
      }
    } catch (error) {
      if (error?.name !== "AbortError")
        setShareMessage("Unable to share right now.");
    }
  };

  const buyNow = () => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === PRODUCT.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === PRODUCT.id
            ? { ...item, quantity: item.quantity + qty }
            : item,
        );
      }
      return [...currentCart, { ...PRODUCT, quantity: qty }];
    });
    setCheckoutMessage(true);
    setIsCartOpen(true);
  };

  return (
    <div className="car101-container">
      <div className="announcement-bar" aria-label="CAR 101 announcement">
        <div className="ticker-text">
          <span>💧 JOIN THE MOVEMENT, SAVE WATER</span>
          <span aria-hidden="true">&nbsp; • &nbsp;</span>
          <span>TRUSTED BY 5 LAKH+ CAR OWNERS ACROSS INDIA 🇮🇳</span>
        </div>
      </div>

      <nav className="navbar" aria-label="Main navigation">
        <button
          className="menu-trigger"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <a className="logo-container" href="#top" aria-label="CAR 101 home">
          <img src={logo} alt="" className="logo" />
        </a>
        <div className="navbar-actions">
          <button
            className="cart-icon-btn"
            type="button"
            onClick={() => {
              setCheckoutMessage(false);
              setIsCartOpen(true);
            }}
            aria-label={`Open cart, ${cartCount} items`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </nav>

      <main id="top">
        <section className="hero-section">
          <div className="hero-media-column">
            <div className="hero-image-box">
              <div
                className="main-preview-container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <button
                  type="button"
                  className="carousel-arrow prev-arrow"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  &#10094;
                </button>
                <div
                  className="hero-viewport"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    className={`hero-track${isDragging || noAnim ? " no-anim" : " is-animated"}`}
                    style={{
                      transform: `translate3d(calc(-100% / 3 + ${dragX}px), 0, 0)`,
                    }}
                    onTransitionEnd={handleSlideEnd}
                  >
                    <img
                      src={images[prevIndex]}
                      alt=""
                      aria-hidden="true"
                      className="hero-slide"
                      draggable={false}
                    />
                    <img
                      src={images[activeImage]}
                      alt={`CAR 101 Zip-Zap Duster product view ${activeImage + 1}`}
                      className="hero-slide zoomable-img"
                      draggable={false}
                      onClick={() => setIsModalOpen(true)}
                      title="Click to zoom"
                    />
                    <img
                      src={images[nextIndex]}
                      alt=""
                      aria-hidden="true"
                      className="hero-slide"
                      draggable={false}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="carousel-arrow next-arrow"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  &#10095;
                </button>
                <span className="image-count">
                  {activeImage + 1} / {images.length}
                </span>
              </div>
              <div
                className="thumbnail-track"
                aria-label="Choose product image"
              >
                {images.map((img, index) => (
                  <button
                    key={img}
                    type="button"
                    className={`thumb-btn ${activeImage === index ? "active-thumb" : ""}`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show product image ${index + 1}`}
                    aria-pressed={activeImage === index}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            </div>
            <section
              className="car101-video-section desktop-hero-video"
              aria-label="The CAR101 experience"
            >
              <div className="video-heading">
                <span>THE CAR101 EXPERIENCE</span>
                <h2>See, That's The Point.</h2>
              </div>
              <div className="car101-video-wrapper">
                <video
                  className="car101-showcase-video"
                  src={videoShowcase}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </div>
            </section>
            <div className="desktop-hero-kits">
              <KitsCombos onAddToCart={addVariantToCart} />
            </div>
          </div>
          {menuOpen && (
            <div className="menu-backdrop" onClick={() => setMenuOpen(false)}>
              <aside
                className="side-menu"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="menu-heading">
                  <strong>Menu</strong>
                  <button
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    ×
                  </button>
                </div>
                {[
                  ["All Products", "#top"],
                  ["Super Saver", "#buy-section"],
                  ["New Launches", "#features"],
                  ["Kits and Combos", "#features"],
                  ["Collection · Car Exterior", "#comparison"],
                  ["Collection · Microfiber Cloths", "#features"],
                  ["Collection · Car Perfumes", "#rejuvenate"],
                  ["About us", "#impact"],
                  ["Contact", "#footer"],
                  ["Blogs", "#reviews"],
                  ["How to use", "#rejuvenate"],
                  ["Track your order", "#footer"],
                ].map(([label, href]) => (
                  <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                    {label}
                    <span>↗</span>
                  </a>
                ))}
                <button
                  className="menu-login"
                  onClick={() => setMenuOpen(false)}
                >
                  Log in <span>↗</span>
                </button>
              </aside>
            </div>
          )}

          <div className="hero-content">
            <div className="product-eyebrow">CAR101 / ZIP ZAP</div>
            <div className="rating-box">
              <span className="stars" aria-label="Rated 4.6 out of 5">
                ★★★★★
              </span>
              <span className="rating-text">
                <strong>4.6/5</strong> · 5 Lakh+ Happy Customers
              </span>
            </div>
            <div className="product-title-row">
              <h1 className="main-title">
                ZIP-ZAP <span className="highlight">DUSTER.</span>
              </h1>

              <button
                className="product-share-icon"
                onClick={shareProduct}
                aria-label="Share product"
              >
                <Share2 size={21} />
              </button>
            </div>
            <p className="subtitle">Ceramic-Wax Infused Car Duster Kit</p>
            <p className="description">
              Engineered for absolute car fanatics. Fights against dust, dirt,
              and microscopic particles instantly. Clean your vehicle in a
              single stroke without a drop of water.
            </p>
            <VariantSelector
              selectedId={selectedVariantId}
              onSelect={(variant) => setSelectedVariantId(variant.id)}
            />
            <div className="price-box">
              <div className="price-main-row">
                <span className="current-price">
                  ₹{pricePerUnit.toLocaleString("en-IN")}
                </span>

                <span className="old-price">
                  ₹{PRODUCT.oldPrice.toLocaleString("en-IN")}
                </span>

                <span className="discount-tag">SAVE {discountPercentage}%</span>
              </div>

              <div className="price-extra-row">
                <span>
                  Total for {qty} {qty === 1 ? "item" : "items"}
                </span>

                <strong>₹{selectedTotal.toLocaleString("en-IN")}</strong>
              </div>

              <div className="price-saving">
                You save ₹{selectedSavings.toLocaleString("en-IN")}
              </div>
            </div>

            <div
              id="buy-section"
              className="purchase-box"
              ref={purchaseActionsRef}
            >
              <div className="quantity-block">
                <label htmlFor="product-quantity">QUANTITY</label>
                <div className="qty-selector">
                  <button
                    type="button"
                    onClick={() => setQty((value) => Math.max(1, value - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span id="product-quantity" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((value) => value + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="purchase-actions">
                <button
                  type="button"
                  className="add-to-cart-btn"
                  onClick={() => addToCart(qty)}
                >
                  ADD TO CART
                </button>
                <button type="button" className="buy-now-btn" onClick={buyNow}>
                  BUY NOW
                </button>
              </div>
            </div>

            <div className="product-features-grid">
              <div className="product-feature">✨ Ceramic-Wax Infused</div>

              <div className="product-feature">⚡ Electrostatic Power</div>

              <div className="product-feature">🇮🇳 Made in India</div>

              <div className="product-feature">💧 Waterless Cleaning</div>
            </div>
          </div>
        </section>

        <section className="car101-video-section mobile-flow-video">
          <div className="video-heading">
            <span>THE CAR101 EXPERIENCE</span>
            <h2>See, That's The Point.</h2>
          </div>

          <div className="car101-video-wrapper">
            <video
              className="car101-showcase-video"
              src={videoShowcase}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
        </section>
        <div className="mobile-flow-kits">
          <KitsCombos onAddToCart={addVariantToCart} />
        </div>
        <section id="features" className="section-padded">
          <div className="section-title">
            <span className="tag">Engineering &amp; Tech</span>
            <h2>Built For Auto-Obsessed Minds</h2>
            <p>
              Professional-grade detailing technology brought right to your home
              garage.
            </p>
          </div>
          <div className="grid-2">
            <article className="card">
              <img
                src={ceramicFeature}
                alt="CAR 101 ceramic-wax infused duster fibres"
                loading="lazy"
              />
              <div className="card-body">
                <h3>Ceramic-Wax Infused Fibers</h3>
                <p>
                  Micro-wax infused fibres help lift dust while adding an
                  instant gloss to your vehicle's paintwork.
                </p>
              </div>
            </article>
            <article className="card">
              <img
                src={beforeAfterClean}
                alt="CAR 101 one-swipe cleaning product visual"
                loading="lazy"
              />
              <div className="card-body">
                <h3>One-Swipe Clean Technology</h3>
                <p>
                  Clear away everyday road dust, pollen, and debris with a
                  simple sweep—without needing a bucket of water.
                </p>
              </div>
            </article>
          </div>
        </section>
        <section className="comparison-section">
          <div className="comparison-image-wrapper">
            <img
              src={comparisonImage}
              alt="CAR101 Zip-Zap Duster vs Other Brands comparison"
              className="comparison-image"
              loading="lazy"
            />
          </div>
        </section>

        <section id="rejuvenate" className="section-padded">
          <div className="dark-card grid-2 align-center">
            <div className="padding-box">
              <span className="tag">Recharge &amp; Reuse</span>
              <h2 className="text-white">Revive Your Duster</h2>
              <p className="text-gray">
                Maintain your duster according to the product care instructions.
                Clean the fibre pouch when needed and let it air-dry fully
                before the next use.
              </p>
              <ul className="checklist">
                <li>✓ Reusable fibre pouch</li>
                <li>✓ Simple care routine</li>
                <li>✓ Made for repeated everyday use</li>
              </ul>
            </div>
            <div className="img-center">
              <img
                src={rechargeSpray}
                alt="CAR 101 Zip-Zap recharge spray"
                className="max-h-350"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <YouMayAlsoLike onAddToCart={addVariantToCart} />

        <section id="reviews" className="section-padded reviews-section">
          <div className="section-title">
            <span className="tag">THE CAR 101 COMMUNITY</span>
            <h2>
              Every Drive Has A <span className="highlight-inline">Story.</span>
            </h2>
            <p>
              Own the Zip-Zap Duster? Share your experience and help other
              car-care enthusiasts choose with confidence.
            </p>
          </div>

          <div className="reviews-showcase">
            <div className="reviews-banner-img shadow">
              <img
                src={happyCustomers}
                alt="CAR 101 car-care community"
                className="reviews-community-img"
                loading="lazy"
              />
              <div className="reviews-banner-caption">
                <div>
                  <strong>Made for everyday car care</strong>
                  <small>Your experience makes the community better.</small>
                </div>
              </div>
            </div>
            <div className="customer-reviews-heading">
              <div>
                <span className="tag">COMMUNITY VOICES</span>
                <h3>What drivers are saying</h3>
              </div>
              <span className="review-count-pill">
                {customerReviews.length}{" "}
                {customerReviews.length === 1 ? "REVIEW" : "REVIEWS"}
              </span>
            </div>
            {customerReviews.length > 0 ? (
              <div className="customer-review-grid">
                {customerReviews.map((review) => (
                  <article className="customer-review-card" key={review.id}>
                    <div className="customer-review-card-top">
                      <span className="review-avatar">
                        {review.name.trim().charAt(0).toUpperCase()}
                      </span>
                      <div className="review-author">
                        <strong>{review.name}</strong>
                        <small>{review.date}</small>
                      </div>
                      <span className="verified-label">YOUR REVIEW</span>
                    </div>
                    <div
                      className="customer-review-stars"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {"★".repeat(review.rating)}
                      <span>{"★".repeat(5 - review.rating)}</span>
                    </div>
                    <p>{review.comment}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="reviews-empty-state">
                <span aria-hidden="true">✧</span>
                <div>
                  <strong>Your voice belongs here.</strong>
                  <p>
                    Be the first to leave a review on this device. Customer
                    reviews will appear here after submission.
                  </p>
                </div>
              </div>
            )}

            <div className="review-form-card">
              <div className="review-form-heading">
                <span className="review-step">01 / YOUR FEEDBACK</span>
                <h3>How was your experience?</h3>
                <p>Your honest feedback matters to us.</p>
              </div>
              <div className="review-rating-control">
                <span className="review-field-label">YOUR RATING</span>
                <div className="rating-stars-wrap">
                  <PeekRating
                    value={reviewRating}
                    count={5}
                    shape="star"
                    labels={["Poor", "Fair", "Good", "Great", "Superb"]}
                    activeColor="#ff6a1a"
                    idleColor="#69615d"
                    tipColor="#ff6a1a"
                    tipTextColor="#ffffff"
                    size={34}
                    lift={7}
                    magnify={1.15}
                    riseDuration={320}
                    popScale={1.3}
                    showTip
                    allowClear
                    ariaLabel="Rate your CAR 101 experience"
                    onChange={(value) => {
                      setReviewRating(value);
                      setReviewMessage("");
                    }}
                  />
                </div>
                <span className="rating-helper">
                  {reviewRating
                    ? `${reviewRating} out of 5 — ${["", "Poor", "Fair", "Good", "Great", "Superb"][reviewRating]}`
                    : "Tap a star to rate your experience"}
                </span>
              </div>
              <form className="review-form" onSubmit={submitReview}>
                <label className="review-field-label" htmlFor="review-name">
                  YOUR NAME
                </label>
                <input
                  id="review-name"
                  value={reviewName}
                  onChange={(event) => setReviewName(event.target.value)}
                  placeholder="Enter your name"
                  maxLength={60}
                  required
                />
                <label className="review-field-label" htmlFor="review-message">
                  YOUR REVIEW
                </label>
                <textarea
                  id="review-message"
                  value={reviewText}
                  onChange={(event) => setReviewText(event.target.value)}
                  placeholder="What did you like about the Zip-Zap Duster?"
                  rows={4}
                  maxLength={600}
                  required
                />
                <div className="review-form-footer">
                  <span>{reviewText.length}/600</span>
                  <button type="submit" className="submit-review-btn">
                    SUBMIT REVIEW <span aria-hidden="true">↗</span>
                  </button>
                </div>
                {reviewMessage && (
                  <p
                    className={`review-feedback ${reviewMessage.startsWith("Thanks") ? "success" : ""}`}
                    role="status"
                  >
                    {reviewMessage}
                  </p>
                )}
                <p className="review-privacy-note">
                  Reviews submitted here are saved in this browser only. Connect
                  a backend to publish them across devices.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © 2026 CAR 101 (Motoflux Automotive Solutions Pvt. Ltd.). All rights
          reserved.
        </p>
        <a href="#top">Back to top ↑</a>
      </footer>

      {isModalOpen && (
        <div
          className="image-modal-overlay"
          onClick={() => setIsModalOpen(false)}
          role="presentation"
        >
          <div
            className="image-modal-content"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Product image viewer"
          >
            <button
              className="modal-close-btn"
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close image viewer"
            >
              &times;
            </button>
            <button
              className="modal-nav-arrow modal-prev"
              type="button"
              onClick={prevImage}
              aria-label="Previous image"
            >
              &#10094;
            </button>
            <img
              src={images[activeImage]}
              alt={`Expanded CAR 101 product image ${activeImage + 1}`}
              className="modal-image"
            />
            <button
              className="modal-nav-arrow modal-next"
              type="button"
              onClick={nextImage}
              aria-label="Next image"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setIsCartOpen(false)}
          role="presentation"
        >
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="cart-drawer-header">
              <div>
                <span className="cart-eyebrow">YOUR SELECTION</span>
                <h2 id="cart-title">
                  Your Cart <span>({cartCount})</span>
                </h2>
              </div>
              <button
                type="button"
                className="drawer-close"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <span aria-hidden="true">🛒</span>
                <h3>Your cart is empty</h3>
                <p>Add the Zip-Zap Duster and it will appear here.</p>
                <button
                  type="button"
                  className="buy-now-btn"
                  onClick={() => setIsCartOpen(false)}
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p className="cart-item-price">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>
                        <div className="cart-quantity">
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                            aria-label="Decrease cart quantity"
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase cart quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() =>
                          setCart((items) =>
                            items.filter((cartItem) => cartItem.id !== item.id),
                          )
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <FreeShippingBar subtotal={cartSubtotal} />
                  <div className="subtotal-row">
                    <span>Subtotal</span>
                    <strong>₹{cartSubtotal.toLocaleString("en-IN")}</strong>
                  </div>
                  <p>Shipping and final charges are calculated at checkout.</p>
                  {checkoutMessage && (
                    <p className="checkout-note" role="status">
                      Your items are ready. Connect the store's checkout/payment
                      provider to place a real order.
                    </p>
                  )}
                  <button
                    type="button"
                    className="checkout-btn"
                    onClick={() => setCheckoutMessage(true)}
                  >
                    PROCEED TO CHECKOUT <span aria-hidden="true">→</span>
                  </button>
                  <button
                    type="button"
                    className="continue-shopping"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {showStickyBar && (
        <div className="sticky-purchase-bar">
          <div className="sticky-purchase-inner">
            <div className="sticky-product-info">
              <span className="sticky-product-name">{PRODUCT.name}</span>
              <span className="sticky-product-price">
                ₹{PRODUCT.price.toLocaleString("en-IN")}
              </span>
            </div>
            <button type="button" className="sticky-buy-btn" onClick={buyNow}>
              ADD TO CART
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
