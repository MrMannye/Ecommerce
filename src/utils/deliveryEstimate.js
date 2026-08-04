import { hashStringToInt } from "./hash";

const MONTH_FORMATTER = new Intl.DateTimeFormat("es-MX", { month: "long" });

// Genera una ventana de entrega "gratis" y un cupo de horas para pedir,
// igual que hace Amazon. No viene de ninguna API: es data estática/derivada
// del id del producto, así que es consistente pero no real.
export function getDeliveryEstimate(id) {
  const hash = hashStringToInt(id);

  const startOffsetDays = 2 + (hash % 4); // entre 2 y 5 días
  const endOffsetDays = startOffsetDays + 1 + ((hash >> 3) % 2); // +1 o +2 días más

  const start = new Date();
  start.setDate(start.getDate() + startOffsetDays);
  const end = new Date();
  end.setDate(end.getDate() + endOffsetDays);

  const startMonth = MONTH_FORMATTER.format(start);
  const endMonth = MONTH_FORMATTER.format(end);

  const rangeText =
    startMonth === endMonth
      ? `${start.getDate()} y ${end.getDate()} de ${startMonth}`
      : `${start.getDate()} de ${startMonth} y el ${end.getDate()} de ${endMonth}`;

  const hoursLeft = 2 + (hash % 10);
  const minutesLeft = (hash >> 5) % 60;

  return { rangeText, hoursLeft, minutesLeft };
}

// Cantidad de reseñas "de relleno" cuando la API no trae reviews.
export function getFallbackReviewCount(id) {
  return 8 + (hashStringToInt(id) % 320);
}
