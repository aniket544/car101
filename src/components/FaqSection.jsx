
const FAQS = [
  {
    question: "Is it washable?",
    answer:
      "Yes. The fibre pouch can be hand or machine washed. Air dry it completely in shade before the next use. You can also recharge the fibres with Zip-Zap Recharge spray.",
  },
  {
    question: "Will it scratch my car?",
    answer:
      "The soft, wax-infused fibres lift dust off the surface in one swipe instead of dragging it across. Before use, check that the duster is free of grit or sand, and clean it first if needed.",
  },
  {
    question: "How do I use it?",
    answer:
      "Glide the duster gently over the surface in one swipe. Dust and particles stick to the fibres, so you do not need water for a quick clean.",
  },
  {
    question: "How long does it last?",
    answer:
      "Lifespan depends on how often you use it and how you care for it. Keep the fibre pouch clean and dry, and recharge the fibres when they lose their grip.",
  },
];

export default function FaqSection() {
  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-inner">
        <h2 id="faq-title" className="faq-title">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        <div className="faq-list">
          {FAQS.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary className="faq-question">{item.question}</summary>
              <p className="faq-answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
