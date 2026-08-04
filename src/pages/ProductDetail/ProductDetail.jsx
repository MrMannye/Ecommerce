import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../../reducers/productsApi";
import { addItem, selectQuantityInCart } from "../../reducers/cartSlice";
import { openCart } from "../../reducers/uiSlice";
import { getDeliveryEstimate } from "../../utils/deliveryEstimate";
import StarRating from "../../components/StarRating/StarRating";
import "./ProductDetail.css";

const FALLBACK_VARIANTS = ["Estándar", "Plus", "Pro"];
const SWATCH_COLORS = ["#2c2c2c", "#a8472e", "#565c43", "#cdbfa5", "#e3d9c4"];

export default function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
    const quantityInCart = useSelector(selectQuantityInCart(id));

    const [activeImage, setActiveImage] = useState(0);
    const [qty, setQty] = useState(1);
    const [confirmation, setConfirmation] = useState("");
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveImage(0);
        setQty(1);
        setConfirmation("");
        setSelectedVariant(0);
        setSelectedColor(0);
    }, [id]);

    const delivery = useMemo(() => (product ? getDeliveryEstimate(product.id) : null), [product]);

    const variantOptions = useMemo(() => {
        if (!product?.tags?.length) return FALLBACK_VARIANTS;
        const capitalized = product.tags
            .slice(0, 4)
            .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1));
        return capitalized.length ? capitalized : FALLBACK_VARIANTS;
    }, [product]);

    if (isLoading) {
        return (
            <div className="container product-missing">
                <p>Cargando producto…</p>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="container product-missing">
                <h1>No encontramos esta pieza</h1>
                <p>Puede que el enlace esté roto, que el producto ya no exista o que falle la conexión.</p>
                <Link to="/" className="btn btn--secondary">
                    Volver al catálogo
                </Link>
            </div>
        );
    }

    const remaining = product.stock - quantityInCart;
    const isOutOfStock = product.stock === 0;
    const isMaxedInCart = !isOutOfStock && remaining <= 0;
    const canAdd = !isOutOfStock && !isMaxedInCart;
    const maxSelectable = Math.min(remaining, 10);

    const stockStatus = isOutOfStock
        ? { text: "Actualmente no disponible", tone: "out" }
        : product.stock <= 5
            ? { text: `Disponible — últimas ${product.stock} unidades`, tone: "low" }
            : { text: "Disponible", tone: "ok" };

    const monthlyInstallment = product.price / 12;

    const handleQtyChange = (e) => setQty(Number(e.target.value));

    const commit = (label) => {
        if (!canAdd) return;
        dispatch(addItem(product, qty));
        setConfirmation(label);
        setQty(1);
        dispatch(openCart());
    };

    return (
        <div className="container product-detail">
            <Link to="/" className="product-detail__back">
                ← Volver al catálogo
            </Link>

            <div className="pd-grid">
                {/* Galería */}
                <div className="pd-gallery">
                    <div className="pd-gallery__thumbs">
                        {product.images.map((img, i) => (
                            <button
                                key={img + i}
                                type="button"
                                className={`pd-gallery__thumb ${i === activeImage ? "is-active" : ""}`}
                                onClick={() => setActiveImage(i)}
                                aria-label={`Ver imagen ${i + 1} de ${product.name}`}
                            >
                                <img src={img} alt="" />
                            </button>
                        ))}
                    </div>
                    <div className="pd-gallery__main">
                        <img src={product.images[activeImage] ?? product.image} alt={product.name} />
                    </div>
                </div>

                {/* Info principal */}
                <div className="pd-main">
                    <span className="pd-main__category">{product.category}</span>
                    <h1 className="pd-main__title">{product.name}</h1>

                    <a className="pd-main__seller-link" href="#vendedor">
                        Visita la tienda de {product.seller}
                    </a>

                    <div>
                        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                    </div>

                    <hr className="pd-hr" />

                    {product.discountPercentage > 5 && (
                        <span className="pd-lowest-price-badge">Precio más bajo en los últimos 30 días</span>
                    )}

                    <div className="pd-price-row">
                        {product.previousPrice && (
                            <span className="pd-price-row__discount">
                                -{Math.round(product.discountPercentage)}%
                            </span>
                        )}
                        <span className="pd-price-row__price">
                            ${product.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    {product.previousPrice && (
                        <p className="pd-price-prev">
                            Precio anterior:{" "}
                            <s>${product.previousPrice.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</s>
                        </p>
                    )}

                    <p className="pd-installments">
                        $
                        {monthlyInstallment.toLocaleString("es-MX", { minimumFractionDigits: 2 })}{" "}
                        <span>x12 meses sin intereses</span>
                    </p>

                    <hr className="pd-hr" />

                    <div className="pd-variant">
                        <span className="pd-variant__label">
                            Presentación: <strong>{variantOptions[selectedVariant]}</strong>
                        </span>
                        <div className="pd-variant__options">
                            {variantOptions.map((option, i) => (
                                <button
                                    key={option}
                                    type="button"
                                    className={`pd-variant__chip ${i === selectedVariant ? "is-selected" : ""}`}
                                    onClick={() => setSelectedVariant(i)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pd-variant">
                        <span className="pd-variant__label">Color</span>
                        <div className="pd-variant__swatches">
                            {SWATCH_COLORS.map((color, i) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`pd-variant__swatch ${i === selectedColor ? "is-selected" : ""}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(i)}
                                    aria-label={`Elegir color ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <hr className="pd-hr" />

                    <div className="pd-about">
                        <h2>Acerca de este producto</h2>
                        <p>{product.description}</p>
                        {product.details.length > 0 && (
                            <ul>
                                {product.details.map((line) => (
                                    <li key={line}>{line}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Buy box */}
                <aside className="pd-buybox">
                    <p className="pd-buybox__price">
                        ${product.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                    </p>

                    {!isOutOfStock && delivery && (
                        <p className="pd-buybox__delivery">
                            Entrega <strong>GRATIS</strong> entre el {delivery.rangeText}. Realiza el pedido en{" "}
                            <strong>
                                {delivery.hoursLeft} hrs {delivery.minutesLeft} mins
                            </strong>
                            . <a href="#detalles-envio">Ver detalles</a>
                        </p>
                    )}

                    <p className="pd-buybox__ship-to">
                        <span aria-hidden="true">📍</span> Enviando a <a href="#direccion">tu dirección guardada</a>
                    </p>

                    <p className={`pd-buybox__stock pd-buybox__stock--${stockStatus.tone}`}>
                        {stockStatus.text}
                    </p>

                    {canAdd && (
                        <label className="pd-buybox__qty">
                            Cantidad:
                            <select value={qty} onChange={handleQtyChange}>
                                {Array.from({ length: maxSelectable }, (_, i) => i + 1).map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </label>
                    )}

                    <button
                        type="button"
                        className="pd-buybox__btn pd-buybox__btn--cart"
                        onClick={() => commit("Se agregó al carrito.")}
                        disabled={!canAdd}
                    >
                        {isOutOfStock ? "Sin stock" : isMaxedInCart ? "Ya tenés el máximo en tu carrito" : "Agregar al carrito"}
                    </button>

                    <button
                        type="button"
                        className="pd-buybox__btn pd-buybox__btn--buy"
                        onClick={() => commit("Compra iniciada: revisá tu carrito para finalizar.")}
                        disabled={!canAdd}
                    >
                        Comprar ahora
                    </button>

                    {confirmation && <p className="pd-buybox__confirmation">{confirmation}</p>}

                    <hr className="pd-hr" />

                    <dl className="pd-buybox__meta">
                        <div>
                            <dt>Vendido por</dt>
                            <dd>{product.seller}</dd>
                        </div>
                        <div>
                            <dt>Devoluciones</dt>
                            <dd>Devolución gratuita dentro de los 30 días</dd>
                        </div>
                        <div>
                            <dt>Pago</dt>
                            <dd>Transacción segura</dd>
                        </div>
                    </dl>
                </aside>
            </div>
        </div>
    );
}
