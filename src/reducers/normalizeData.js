/**
 * Convierte un producto sin procesar en un objeto normalizado para la UI.
 * Normaliza campos de la API, proporciona valores por defecto y crea un listado de detalles.
 * @param {Object} raw - Producto recibido desde la API.
 * @returns {Object} Producto normalizado usado en la aplicación.
 */
export function normalizeProduct(raw) {
    const details = [];

    if (raw.brand) details.push(`Marca: ${raw.brand}`);
    if (raw.sku) details.push(`SKU: ${raw.sku}`);
    if (raw.weight) details.push(`Peso: ${raw.weight} g`);
    if (raw.dimensions) {
        const { width, height, depth } = raw.dimensions;
        if (width && height && depth) {
            details.push(`Medidas: ${width} x ${height} x ${depth} cm`);
        }
    }
    if (raw.warrantyInformation) details.push(raw.warrantyInformation);
    if (raw.shippingInformation) details.push(raw.shippingInformation);
    if (raw.returnPolicy) details.push(raw.returnPolicy);
    if (raw.minimumOrderQuantity) {
        details.push(`Cantidad mínima de compra: ${raw.minimumOrderQuantity}`);
    }

    const fallbackImage = raw.thumbnail || (Array.isArray(raw.images) && raw.images[0]) || "";

    return {
        id: String(raw.id),
        name: raw.title || "Producto sin nombre",
        category: raw.category || "Uncategorized",
        price: raw.price ?? 0,
        stock: raw.stock ?? 0,
        seller: raw.brand || `Proveedor de ${raw.category || "productos"}`,
        image: fallbackImage,
        images: Array.isArray(raw.images)
            ? raw.images
            : raw.thumbnail
                ? [raw.thumbnail]
                : fallbackImage
                    ? [fallbackImage]
                    : [],
        description: raw.description || "Descripción no disponible.",
        rating: Number.isFinite(raw.rating) ? raw.rating : 0,
        reviewCount: raw.reviewCount ?? 0,
        details,
    };
}