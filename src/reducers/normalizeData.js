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

    return {
        id: String(raw.id),
        name: raw.title,
        category: raw.category,
        price: raw.price,
        stock: raw.stock ?? 0,
        // No todas las categorías de DummyJSON traen "brand" (por ejemplo,
        // "groceries"). Si falta, mostramos la categoría como referencia.
        seller: raw.brand || `Proveedor de ${raw.category}`,
        image: raw.thumbnail,
        images: raw.images ?? (raw.thumbnail ? [raw.thumbnail] : []),
        description: raw.description,
        rating: raw.rating,
        details,
    };
}