import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BookCheckIcon,
  DeliveryReturn01Icon,
  HandHeartIcon,
  PackageCheckIcon,
  RefreshCwIcon,
  SparklesIcon,
  TruckDeliveryIcon,
} from "@hugeicons/core-free-icons";

const sections = [
  {
    id: "details",
    eyebrow: "01 / THE ESSENTIALS",
    title: "Product details & information",
    icon: PackageCheckIcon,
    content: (
      <div className="product-details-grid">
        <div className="product-detail-column">
          <h3>
            <HugeiconsIcon icon={SparklesIcon} size={18} color="currentColor" strokeWidth={1.8} /> Product Details
          </h3>
          <ul className="product-detail-list">
            <li>Ultimate car dust cleaner</li>
            <li>Ceramic wax infused bristles</li>
            <li>Ergonomic handle design</li>
            <li>Reusable duster</li>
            <li>Compact and portable</li>
          </ul>
        </div>
        <div className="product-detail-column">
          <h3>
            <HugeiconsIcon icon={BookCheckIcon} size={18} color="currentColor" strokeWidth={1.8} /> Product Information
          </h3>
          <div className="product-info-points">
            <p><strong>Effortless Cleaning:</strong> One wipe is all it takes.</p>
            <p><strong>Scratch-Free:</strong> Ceramic-infused wax fibres protect your car&apos;s finish.</p>
            <p><strong>Easy to Use:</strong> Lightweight and ergonomic handle.</p>
            <p><strong>Made in India:</strong> Quality you can trust.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "care",
    eyebrow: "02 / CARE GUIDE",
    title: "How to use & washing care",
    icon: HandHeartIcon,
    content: (
      <div className="product-details-grid">
        <div className="product-detail-column">
          <h3>
            <HugeiconsIcon icon={SparklesIcon} size={18} color="currentColor" strokeWidth={1.8} /> How To Use
          </h3>
          <ol className="product-step-list">
            <li>Shake the duster gently before use to fluff up the microfiber strands.</li>
            <li>Glide it lightly over dusty surfaces — apply gentle pressure.</li>
            <li>Once done, give it a shake to remove collected dust and store it back.</li>
          </ol>
          <p className="product-pro-tip"><strong>Pro Tip:</strong> Use daily or every alternate day to keep your car showroom-fresh!</p>
        </div>
        <div className="product-detail-column">
          <h3>
            <HugeiconsIcon icon={RefreshCwIcon} size={18} color="currentColor" strokeWidth={1.8} /> Washing &amp; Care Instructions
          </h3>
          <ul className="product-detail-list">
            <li>Do not wash it frequently — the wax treatment helps trap dust effectively.</li>
            <li>If absolutely necessary (after 6 months/1 year of use), hand wash in cold water without detergent.</li>
            <li>Let it air dry naturally — avoid dryers or direct sunlight.</li>
            <li>Use CAR101 Duster ReCharge to make the duster work again.</li>
            <li>Always store it in the provided bag after use to prevent contamination.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "shipping",
    eyebrow: "03 / WE CARE",
    title: "Shipping & return policy",
    icon: TruckDeliveryIcon,
    content: (
      <div className="shipping-policy-content">
        <div className="shipping-timeline">
          <div className="shipping-step">
            <span className="shipping-step-icon"><HugeiconsIcon icon={DeliveryReturn01Icon} size={26} color="currentColor" strokeWidth={1.8} /></span>
            <strong>Raise a request</strong>
            <span>Within 7 days for manufacturing defects</span>
          </div>
          <span className="shipping-step-line" aria-hidden="true" />
          <div className="shipping-step">
            <span className="shipping-step-icon"><HugeiconsIcon icon={PackageCheckIcon} size={26} color="currentColor" strokeWidth={1.8} /></span>
            <strong>Product inspection</strong>
            <span>Keep the original packaging intact</span>
          </div>
          <span className="shipping-step-line" aria-hidden="true" />
          <div className="shipping-step">
            <span className="shipping-step-icon"><HugeiconsIcon icon={RefreshCwIcon} size={26} color="currentColor" strokeWidth={1.8} /></span>
            <strong>Replacement support</strong>
            <span>Eligible cases are resolved after review</span>
          </div>
        </div>
        <div className="shipping-policy-copy">
          <p><strong>Shipping:</strong> Orders leave us within 2–4 business days. Metro delivery usually takes 3–4 days; other cities 4–6 days.</p>
          <p>Delivery may take longer during festivals and promotional periods. Returns apply only to manufacturing defects and products must be unused and undamaged.</p>
        </div>
      </div>
    ),
  },
];

export default function ProductDetailsSection() {
  const [openSection, setOpenSection] = useState(null);

  return (
    <section className="product-details-section" aria-labelledby="product-details-title">
      <div className="product-details-heading">
        <span className="product-details-kicker">KNOW YOUR DUSTER</span>
        <h2 id="product-details-title">Product details</h2>
        <p>Everything you need to get the best performance from your CAR101 Zip-Zap Duster.</p>
      </div>

      <div className="product-details-accordion">
        {sections.map(({ id, eyebrow, title, icon: Icon, content }) => {
          const isOpen = openSection === id;
          return (
            <div className={`product-details-panel${isOpen ? " is-open" : ""}`} key={id}>
              <button
                type="button"
                className="product-details-trigger"
                aria-expanded={isOpen}
                aria-controls={`product-details-${id}`}
                onClick={() => setOpenSection(isOpen ? "" : id)}
              >
                <span className="product-details-trigger-icon"><HugeiconsIcon icon={Icon} size={21} color="currentColor" strokeWidth={1.8} /></span>
                <span className="product-details-trigger-copy">
                  <small>{eyebrow}</small>
                  <strong>{title}</strong>
                </span>
                <span className="product-details-chevron" aria-hidden="true">+</span>
              </button>
              {isOpen && (
                <div className="product-details-content" id={`product-details-${id}`}>
                  {content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
