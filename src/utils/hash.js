// Hash simple y determinístico: mismo id siempre da el mismo número.
// Lo usamos para generar datos "random" (fecha de entrega, cantidad de
// reseñas, etc.) que no vienen de la API pero que no cambian en cada render.
export function hashStringToInt(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}
