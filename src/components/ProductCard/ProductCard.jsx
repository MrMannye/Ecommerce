import { Link } from "react-router-dom";
import "./ProductCard.css"

function stockLabel(stock) {
    if (stock === 0) return { text: "Agotado", tone: "out" };
    if (stock <= 3) return { text: `Quedan ${stock}`, tone: "low" };
    return { text: "En stock", tone: "ok" };
}

function ProductCard({ product }) {
    const stock = stockLabel(product.stock);

    return (
        <Link to={`/producto/${product.id}`} className="product-card">
            <div className="product-card__image-wrap">
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className={`product-card__tag product-card__tag--${stock.tone}`}>{stock.text}</span>
            </div>
            <div className="product-card__body">
                <span className="product-card__category">{product.category}</span>
                <h3 className="product-card__name">{product.name}</h3>
                <span className="product-card__price">
                    ${product.price.toLocaleString("es-MX")}
                </span>
            </div>
        </Link>
    )
}

export default ProductCard