import { useDispatch, useSelector } from "react-redux";
import { selectIsCartOpen, closeCart } from "../../reducers/uiSlice";
import { selectCartItems, clearCart, selectCartTotalPrice, setQuantity, removeItem } from "../../reducers/cartSlice";
import QuantityStepper from "../QuantityStepper/QuantityStepper";
import "./CartDrawer.css"

function CartDrawer() {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsCartOpen);
    const items = useSelector(selectCartItems)
    const total = useSelector(selectCartTotalPrice)

    return (
        <>
            <div
                className={`cart-drawer__backdrop ${isOpen ? "is-open" : ""}`}
                role="button"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => dispatch(closeCart())}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        dispatch(closeCart());
                    }
                }}
                aria-label="Cerrar carrito"
            />
            <aside
                id="cart-drawer"
                className={`cart-drawer ${isOpen ? "is-open" : ""}`}
                role="dialog"
                aria-modal={isOpen}
                aria-labelledby="cart-heading"
                aria-hidden={!isOpen}
            >
                <div className="cart-drawer__header">
                    <h2 id="cart-heading">Tu carrito</h2>
                    <button
                        type="button"
                        className="cart-drawer__close"
                        onClick={() => dispatch(closeCart())}
                        aria-label="Cerrar carrito"
                    >
                        ×
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="cart-drawer__empty">
                        <p>Todavía no agregaste nada.</p>
                        <span>Explorá el catálogo y sumá alguna pieza que te guste.</span>
                    </div>
                ) : (
                    <>
                        <ul className="cart-drawer__list">
                            {items.map((item) => {
                                const atMax = item.quantity >= item.stock;
                                return (
                                    <li key={item.id} className="cart-drawer__item">
                                        <img src={item.image} alt={item.name} />
                                        <div className="cart-drawer__item-info">
                                            <span className="cart-drawer__item-name">{item.name}</span>
                                            <span className="cart-drawer__item-price">
                                                ${item.price.toLocaleString("es-MX")}
                                            </span>
                                            {atMax && (
                                                <span className="cart-drawer__item-warning">
                                                    Llegaste al máximo disponible ({item.stock})
                                                </span>
                                            )}
                                            <div className="cart-drawer__item-controls">
                                                <QuantityStepper
                                                    quantity={item.quantity}
                                                    min={1}
                                                    max={item.stock}
                                                    onChange={(quantity) =>
                                                        dispatch(setQuantity({ id: item.id, quantity }))
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    className="cart-drawer__remove"
                                                    onClick={() => dispatch(removeItem(item.id))}
                                                >
                                                    Quitar
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="cart-drawer__footer">
                            <div className="cart-drawer__total">
                                <span>Subtotal</span>
                                <span className="cart-drawer__total-value">
                                    ${total.toLocaleString("es-MX")}
                                </span>
                            </div>
                            <button type="button" className="btn btn--primary cart-drawer__checkout">
                                Iniciar compra
                            </button>
                            <button
                                type="button"
                                className="cart-drawer__clear"
                                onClick={() => dispatch(clearCart())}
                            >
                                Vaciar carrito
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </>
    )
}

export default CartDrawer