
export default function MidGallery({ images = [] }) {
  return (
    <section className="mid-gallery" aria-label="CAR101 product gallery">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`CAR101 product visual ${index + 1}`}
          className="mid-gallery-img"
          loading="lazy"
        />
      ))}
    </section>
  );
}
