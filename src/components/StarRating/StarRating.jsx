import "./StarRating.css";

// Muestra un puntaje tipo Amazon: número, estrellas llenas/vacías y
// cantidad de reseñas entre paréntesis.
export default function StarRating({ rating = 0, reviewCount, size = "md" }) {
  const rounded = Math.round(rating);

  return (
    <span className={`star-rating star-rating--${size}`}>
      <span className="star-rating__value">{rating.toFixed(1)}</span>
      <span className="star-rating__stars" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" width="1em" height="1em">
            <path
              d="M10 1.5l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6L1.4 7.8l6-.7L10 1.5z"
              fill={i < rounded ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        ))}
      </span>
      {reviewCount != null && (
        <span className="star-rating__count">
          ({reviewCount.toLocaleString("es-MX")})
        </span>
      )}
    </span>
  );
}
