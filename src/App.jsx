import React, { useEffect, useState } from 'react';
import BellToggle from './components/BellToggle';
import PeekRating from './components/PeekRating';
import logo from './assets/CAR101-Logo-w.png';
import dusterPack from './assets/1.jpg';
import ceramicFeature from './assets/listing zipzap1.jpg';
import beforeAfterClean from './assets/listing zipzap3.jpg';
import rechargeSpray from './assets/listing zipzap6.jpg';
import happyCustomers from './assets/listing zipzap7.jpg';
import waterSaved from './assets/listing zipzap5.jpg';

const PRODUCT = {
  id: 'car101-zip-zap-duster',
  name: 'CAR 101 Zip-Zap Duster',
  description: 'Ceramic-Wax Infused Car Duster Kit',
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
  const [unread] = useState(3);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(() => readStorage('car101-cart', []));
  const [wishlist, setWishlist] = useState(() => readStorage('car101-wishlist', false));
  const [shareMessage, setShareMessage] = useState('');
  const [checkoutMessage, setCheckoutMessage] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [customerReviews, setCustomerReviews] = useState(() => readStorage('car101-customer-reviews', []));
  const pricePerUnit = PRODUCT.price;

  const images = [dusterPack, ceramicFeature, beforeAfterClean, rechargeSpray, happyCustomers];
  const [activeImage, setActiveImage] = useState(0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    try {
      window.localStorage.setItem('car101-cart', JSON.stringify(cart));
    } catch {
      // The cart remains usable for the current session if storage is unavailable.
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem('car101-wishlist', JSON.stringify(wishlist));
    } catch {
      // The wishlist remains usable for the current session if storage is unavailable.
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      window.localStorage.setItem('car101-customer-reviews', JSON.stringify(customerReviews));
    } catch {
      // Reviews remain available for the current session if storage is unavailable.
    }
  }, [customerReviews]);

  const submitReview = (event) => {
    event.preventDefault();
    const name = reviewName.trim();
    const comment = reviewText.trim();
    if (!reviewRating) {
      setReviewMessage('Please choose a star rating first.');
      return;
    }
    if (!name || !comment) {
      setReviewMessage('Please add your name and a short review.');
      return;
    }
    const newReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      comment,
      rating: reviewRating,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setCustomerReviews((current) => [newReview, ...current]);
    setReviewName('');
    setReviewText('');
    setReviewRating(0);
    setReviewMessage('Thanks! Your review has been added on this device.');
  };

  const prevImage = (event) => {
    event?.stopPropagation();
    setActiveImage((previous) => (previous === 0 ? images.length - 1 : previous - 1));
  };

  const nextImage = (event) => {
    event?.stopPropagation();
    setActiveImage((previous) => (previous === images.length - 1 ? 0 : previous + 1));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
        setIsCartOpen(false);
      }
      if (isModalOpen && event.key === 'ArrowLeft') prevImage();
      if (isModalOpen && event.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const addToCart = (quantity = qty) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === PRODUCT.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === PRODUCT.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...currentCart, { ...PRODUCT, quantity }];
    });
    setCheckoutMessage(false);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id, nextQuantity) => {
    if (nextQuantity < 1) {
      setCart((currentCart) => currentCart.filter((item) => item.id !== id));
      return;
    }
    setCart((currentCart) => currentCart.map((item) =>
      item.id === id ? { ...item, quantity: nextQuantity } : item
    ));
  };

  const shareProduct = async () => {
    const shareData = {
      title: PRODUCT.name,
      text: 'Check out the CAR 101 Zip-Zap Duster.',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage('');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        setShareMessage('Product link copied!');
      } else {
        window.prompt('Copy this product link:', shareData.url);
      }
    } catch (error) {
      if (error?.name !== 'AbortError') setShareMessage('Unable to share right now.');
    }
  };

  const buyNow = () => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === PRODUCT.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === PRODUCT.id ? { ...item, quantity: item.quantity + qty } : item
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
        <a className="logo-container" href="#top" aria-label="CAR 101 home">
          <img src={logo} alt="" className="logo" />
          <span className="brand-wordmark"><small>DRIVE CLEAN.<br />DRIVE PROUD.</small></span>
        </a>
        <div className="nav-links">
          <a href="#features">FEATURES</a>
          <a href="#comparison">VS OTHERS</a>
          <a href="#impact">IMPACT</a>
          <a href="#rejuvenate">REJUVENATOR</a>
          <a href="#reviews">REVIEWS</a>
        </div>
        <div className="navbar-actions">
          <BellToggle
            offLabel="Notify me"
            onLabel="You'll be notified"
            color="#f5f5f5"
            background="#27272a"
            onColor="#18181b"
            onBackground="#f5f5f5"
            size="md"
            radius={22}
            ringAmplitude={17}
            ringPasses={5}
            ringDecay={1}
            ringDuration={820}
            ringPivot={16}
            crossfadeMs={200}
            revealBounce={0}
            count={unread}
            badge
            badgeColor="#ff6a1a"
            waves
            clapper={false}
            pressed={notificationsEnabled}
            defaultPressed={false}
            onChange={setNotificationsEnabled}
          />
          <button className="cart-icon-btn" type="button" onClick={() => { setCheckoutMessage(false); setIsCartOpen(true); }} aria-label={`Open cart, ${cartCount} items`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
            <span className="cart-count">{cartCount}</span>
          </button>
          <a href="#buy-section" className="cta-btn-nav">BUY NOW</a>
        </div>
      </nav>

      <main id="top">
        <section className="hero-section">
          <div className="hero-image-box">
            <div className="main-preview-container">
              <button type="button" className="carousel-arrow prev-arrow" onClick={prevImage} aria-label="Previous image">&#10094;</button>
              <img
                src={images[activeImage]}
                alt={`CAR 101 Zip-Zap Duster product view ${activeImage + 1}`}
                className="hero-img zoomable-img"
                onClick={() => setIsModalOpen(true)}
                title="Click to zoom"
              />
              <button type="button" className="carousel-arrow next-arrow" onClick={nextImage} aria-label="Next image">&#10095;</button>
              <span className="image-count">{activeImage + 1} / {images.length}</span>
            </div>
            <div className="thumbnail-track" aria-label="Choose product image">
              {images.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  className={`thumb-btn ${activeImage === index ? 'active-thumb' : ''}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={activeImage === index}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="hero-content">
            <div className="product-eyebrow">CAR101 / ZIP ZAP</div>
            <div className="rating-box">
              <span className="stars" aria-label="Rated 4.6 out of 5">★★★★★</span>
              <span className="rating-text"><strong>4.6/5</strong> · 5 Lakh+ Happy Customers</span>
            </div>
            <h1 className="main-title">ZIP-ZAP <span className="highlight">THE DUST.</span></h1>
            <p className="subtitle">Ceramic-Wax Infused Car Duster Kit</p>
            <p className="description">Engineered for absolute car fanatics. Fights against dust, dirt, and microscopic particles instantly. Clean your vehicle in a single stroke without a drop of water.</p>

            <div className="product-action-row">
              <button type="button" className={`icon-action ${wishlist ? 'is-active' : ''}`} onClick={() => setWishlist((value) => !value)} aria-pressed={wishlist} aria-label={wishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
                <span aria-hidden="true">{wishlist ? '♥' : '♡'}</span><span>{wishlist ? 'Wishlisted' : 'Wishlist'}</span>
              </button>
              <button type="button" className="icon-action" onClick={shareProduct} aria-label="Share product">
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.7 10.6 6.6-4.2M8.7 13.4l6.6 4.2"/></svg><span>Share</span>
              </button>
              {shareMessage && <span className="share-message" role="status">{shareMessage}</span>}
            </div>

            <div className="price-box">
              <span className="current-price">₹{pricePerUnit.toLocaleString('en-IN')}</span>
              <span className="old-price">₹{PRODUCT.oldPrice.toLocaleString('en-IN')}</span>
              <span className="discount-tag">SAVE {Math.round((1 - pricePerUnit / PRODUCT.oldPrice) * 100)}%</span>
            </div>

            <div id="buy-section" className="purchase-box">
              <div className="quantity-block">
                <label htmlFor="product-quantity">QUANTITY</label>
                <div className="qty-selector">
                  <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
                  <span id="product-quantity" aria-live="polite">{qty}</span>
                  <button type="button" onClick={() => setQty((value) => value + 1)} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="purchase-actions">
                <button type="button" className="buy-now-btn" onClick={buyNow}>BUY NOW</button>
                <button type="button" className="add-to-cart-btn" onClick={() => addToCart(qty)}>ADD TO CART</button>
              </div>
            </div>

            <div className="features-pills">
              <div>✨ Ceramic-Wax Infused</div>
              <div>⚡ Electrostatic Power</div>
              <div>🇮🇳 Made in India</div>
            </div>
            <p className="secure-note">Secure checkout · Easy everyday car care</p>
          </div>
        </section>

        <section className="promo-banner" aria-label="CAR 101 promotion">
          <div><span className="promo-kicker">THE CAR-CARE UPGRADE</span><h2>Less water. Less effort. More shine.</h2><p>Make everyday dust removal a smarter part of your routine.</p></div>
          <a href="#buy-section" className="promo-cta">GET YOUR DUSTER <span aria-hidden="true">↗</span></a>
        </section>

        <section id="features" className="section-padded">
          <div className="section-title">
            <span className="tag">Engineering &amp; Tech</span>
            <h2>Built For Auto-Obsessed Minds</h2>
            <p>Professional-grade detailing technology brought right to your home garage.</p>
          </div>
          <div className="grid-2">
            <article className="card">
              <img src={ceramicFeature} alt="CAR 101 ceramic-wax infused duster fibres" loading="lazy" />
              <div className="card-body"><h3>Ceramic-Wax Infused Fibers</h3><p>Micro-wax infused fibres help lift dust while adding an instant gloss to your vehicle's paintwork.</p></div>
            </article>
            <article className="card">
              <img src={beforeAfterClean} alt="CAR 101 one-swipe cleaning product visual" loading="lazy" />
              <div className="card-body"><h3>One-Swipe Clean Technology</h3><p>Clear away everyday road dust, pollen, and debris with a simple sweep—without needing a bucket of water.</p></div>
            </article>
          </div>
        </section>

        <section id="comparison" className="section-padded comparison-section">
          <div className="section-title"><h2>Why Choose CAR 101?</h2><p>See how the Zip-Zap Duster fits into your everyday car-care routine.</p></div>
          <div className="grid-2">
            <article className="compare-card bad"><h3>What to avoid</h3><ul><li>Low-quality fibres that may be rough on paint</li><li>Tools that simply push dust around</li><li>Uncomfortable handles and poor grip</li><li>Single-use products that are hard to maintain</li></ul></article>
            <article className="compare-card good"><span className="badge-gold">CAR 101 PICK</span><h3>Zip-Zap Duster</h3><ul><li>Premium cotton strands</li><li>Ceramic-wax infused formula</li><li>Designed for everyday dust removal</li><li>Ergonomic handle</li><li>Washable and reusable pouch</li></ul></article>
          </div>
        </section>

        <section id="impact" className="dark-section">
          <div className="grid-2 align-center max-w-1200">
            <div><span className="tag">Eco Movement</span><h2 className="text-white">Make Every Clean Count</h2><p className="text-gray">Traditional car washing can use a significant amount of water. A quick duster clean can help reduce the need for a full wash when your car only needs light dust removal.</p></div>
            <div><img src={waterSaved} alt="CAR 101 water-saving car-care visual" className="rounded-img" loading="lazy" /></div>
          </div>
        </section>

        <section id="rejuvenate" className="section-padded">
          <div className="dark-card grid-2 align-center">
            <div className="padding-box"><span className="tag">Recharge &amp; Reuse</span><h2 className="text-white">Revive Your Duster</h2><p className="text-gray">Maintain your duster according to the product care instructions. Clean the fibre pouch when needed and let it air-dry fully before the next use.</p><ul className="checklist"><li>✓ Reusable fibre pouch</li><li>✓ Simple care routine</li><li>✓ Made for repeated everyday use</li></ul></div>
            <div className="img-center"><img src={rechargeSpray} alt="CAR 101 Zip-Zap recharge spray" className="max-h-350" loading="lazy" /></div>
          </div>
        </section>

        <section id="reviews" className="section-padded reviews-section">
          <div className="section-title">
            <span className="tag">THE CAR 101 COMMUNITY</span>
            <h2>Every Drive Has A <span className="highlight-inline">Story.</span></h2>
            <p>Own the Zip-Zap Duster? Share your experience and help other car-care enthusiasts choose with confidence.</p>
          </div>

          <div className="reviews-showcase">
            <div className="reviews-visual">
              <img src={happyCustomers} alt="CAR 101 car-care community" className="reviews-community-img" loading="lazy" />
              <div className="reviews-visual-caption"><span className="reviews-caption-icon">✦</span><div><strong>Made for everyday car care</strong><small>Your experience makes the community better.</small></div></div>
            </div>

            <div className="review-form-card">
              <div className="review-form-heading"><span className="review-step">01 / YOUR FEEDBACK</span><h3>How was your experience?</h3><p>Your honest feedback matters to us.</p></div>
              <div className="review-rating-control">
                <span className="review-field-label">YOUR RATING</span>
                <div className="rating-stars-wrap"><PeekRating value={reviewRating} count={5} shape="star" labels={['Poor', 'Fair', 'Good', 'Great', 'Superb']} activeColor="#ff6a1a" idleColor="#69615d" tipColor="#ff6a1a" tipTextColor="#ffffff" size={34} lift={7} magnify={1.15} riseDuration={320} popScale={1.3} showTip allowClear ariaLabel="Rate your CAR 101 experience" onChange={(value) => { setReviewRating(value); setReviewMessage(''); }} /></div>
                <span className="rating-helper">{reviewRating ? `${reviewRating} out of 5 — ${['', 'Poor', 'Fair', 'Good', 'Great', 'Superb'][reviewRating]}` : 'Tap a star to rate your experience'}</span>
              </div>
              <form className="review-form" onSubmit={submitReview}>
                <label className="review-field-label" htmlFor="review-name">YOUR NAME</label>
                <input id="review-name" value={reviewName} onChange={(event) => setReviewName(event.target.value)} placeholder="Enter your name" maxLength={60} required />
                <label className="review-field-label" htmlFor="review-message">YOUR REVIEW</label>
                <textarea id="review-message" value={reviewText} onChange={(event) => setReviewText(event.target.value)} placeholder="What did you like about the Zip-Zap Duster?" rows={4} maxLength={600} required />
                <div className="review-form-footer"><span>{reviewText.length}/600</span><button type="submit" className="submit-review-btn">SUBMIT REVIEW <span aria-hidden="true">↗</span></button></div>
                {reviewMessage && <p className={`review-feedback ${reviewMessage.startsWith('Thanks') ? 'success' : ''}`} role="status">{reviewMessage}</p>}
                <p className="review-privacy-note">Reviews submitted here are saved in this browser only. Connect a backend to publish them across devices.</p>
              </form>
            </div>
          </div>

          <div className="customer-reviews-heading"><div><span className="tag">COMMUNITY VOICES</span><h3>What drivers are saying</h3></div><span className="review-count-pill">{customerReviews.length} {customerReviews.length === 1 ? 'REVIEW' : 'REVIEWS'}</span></div>
          {customerReviews.length > 0 ? (
            <div className="customer-review-grid">
              {customerReviews.map((review) => (
                <article className="customer-review-card" key={review.id}>
                  <div className="customer-review-card-top"><span className="review-avatar">{review.name.trim().charAt(0).toUpperCase()}</span><div className="review-author"><strong>{review.name}</strong><small>{review.date}</small></div><span className="verified-label">YOUR REVIEW</span></div>
                  <div className="customer-review-stars" aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}<span>{'★'.repeat(5 - review.rating)}</span></div>
                  <p>{review.comment}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="reviews-empty-state"><span aria-hidden="true">✧</span><div><strong>Your voice belongs here.</strong><p>Be the first to leave a review on this device. Customer reviews will appear here after submission.</p></div></div>
          )}
        </section>
      </main>

      <footer className="footer"><p>© 2026 CAR 101 (Motoflux Automotive Solutions Pvt. Ltd.). All rights reserved.</p><a href="#top">Back to top ↑</a></footer>

      {isModalOpen && (
        <div className="image-modal-overlay" onClick={() => setIsModalOpen(false)} role="presentation">
          <div className="image-modal-content" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Product image viewer">
            <button className="modal-close-btn" type="button" onClick={() => setIsModalOpen(false)} aria-label="Close image viewer">&times;</button>
            <button className="modal-nav-arrow modal-prev" type="button" onClick={prevImage} aria-label="Previous image">&#10094;</button>
            <img src={images[activeImage]} alt={`Expanded CAR 101 product image ${activeImage + 1}`} className="modal-image" />
            <button className="modal-nav-arrow modal-next" type="button" onClick={nextImage} aria-label="Next image">&#10095;</button>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)} role="presentation">
          <aside className="cart-drawer" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="cart-drawer-header"><div><span className="cart-eyebrow">YOUR SELECTION</span><h2 id="cart-title">Your Cart <span>({cartCount})</span></h2></div><button type="button" className="drawer-close" onClick={() => setIsCartOpen(false)} aria-label="Close cart">×</button></div>
            {cart.length === 0 ? (
              <div className="empty-cart"><span aria-hidden="true">🛒</span><h3>Your cart is empty</h3><p>Add the Zip-Zap Duster and it will appear here.</p><button type="button" className="buy-now-btn" onClick={() => setIsCartOpen(false)}>CONTINUE SHOPPING</button></div>
            ) : (
              <>
                <div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-item-details"><h3>{item.name}</h3><p className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</p><div className="cart-quantity"><button type="button" onClick={() => updateCartQuantity(item.id, item.quantity - 1)} aria-label="Decrease cart quantity">−</button><span>{item.quantity}</span><button type="button" onClick={() => updateCartQuantity(item.id, item.quantity + 1)} aria-label="Increase cart quantity">+</button></div></div><button type="button" className="remove-item" onClick={() => setCart((items) => items.filter((cartItem) => cartItem.id !== item.id))} aria-label={`Remove ${item.name}`}>Remove</button></div>)}</div>
                <div className="cart-summary"><div className="subtotal-row"><span>Subtotal</span><strong>₹{cartSubtotal.toLocaleString('en-IN')}</strong></div><p>Shipping and final charges are calculated at checkout.</p>{checkoutMessage && <p className="checkout-note" role="status">Your items are ready. Connect the store's checkout/payment provider to place a real order.</p>}<button type="button" className="checkout-btn" onClick={() => setCheckoutMessage(true)}>PROCEED TO CHECKOUT <span aria-hidden="true">→</span></button><button type="button" className="continue-shopping" onClick={() => setIsCartOpen(false)}>Continue shopping</button></div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
