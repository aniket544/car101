import { VARIANTS } from "../data/variants";

export const BASE_PRODUCT_LABEL = "Zip Zap Duster (Pack of 1)";

export default function VariantSelector({
  variants = VARIANTS,
  selectedId = null,
  onSelect,
}) {
  return (
    <section className="pack-selector" aria-label="Choose a variant">
      <p className="pack-label">Variant</p>

      <div className="pack-options" role="radiogroup" aria-label="Variant options">
        <button
          type="button"
          role="radio"
          aria-checked={selectedId === null}
          className={`pack-option${selectedId === null ? " is-selected" : ""}`}
          onClick={() => onSelect && onSelect(null)}
        >
          {BASE_PRODUCT_LABEL}
        </button>

        {variants.map((variant) => {
          const isSelected = selectedId === variant.id;
          return (
            <button
              key={variant.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`pack-option${isSelected ? " is-selected" : ""}`}
              onClick={() => onSelect && onSelect(variant)}
            >
              {variant.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
