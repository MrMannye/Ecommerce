import "./QuantityStepper.css";

// Selector de cantidad genérico. Nunca permite bajar de `min` ni
// superar `max` (stock disponible).
export default function QuantityStepper({ quantity, min = 1, max, onChange }) {
  const atMin = quantity <= min;
  const atMax = quantity >= max;

  const handleInput = (e) => {
    const raw = e.target.value;
    if (raw === "") return;
    const value = Number(raw);
    if (Number.isNaN(value)) return;
    onChange(Math.min(Math.max(value, min), max));
  };

  return (
    <div className="stepper" role="group" aria-label="Seleccionar cantidad">
      <button
        type="button"
        className="stepper__btn"
        onClick={() => onChange(Math.max(quantity - 1, min))}
        disabled={atMin}
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <input
        className="stepper__value"
        type="number"
        inputMode="numeric"
        value={quantity}
        min={min}
        max={max}
        onChange={handleInput}
        aria-label="Cantidad"
      />
      <button
        type="button"
        className="stepper__btn"
        onClick={() => onChange(Math.min(quantity + 1, max))}
        disabled={atMax}
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}
