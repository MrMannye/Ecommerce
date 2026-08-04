import { Link } from "react-router-dom";

import "./Header.css"
import { AmazonLogo } from "../../assets/AmazonLogo";
import { CarritoLogo } from "../../assets/CarritoLogo";
import { SearchLogo } from "../../assets/SearchLogo";

import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, selectSearchTerm, toggleCart, selectIsCartOpen } from "../../reducers/uiSlice";
import { selectCartTotalItems } from "../../reducers/cartSlice";

function Header() {

    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);
    const totalItems = useSelector(selectCartTotalItems);
    const isCartOpen = useSelector(selectIsCartOpen);

    return (
        <header className="header">
            <div className="container header__bar">
                <Link to="/" className="header__logo" aria-label="Amazon Shop, ir al inicio">
                    <span className="header__logo-mark" aria-hidden="true">
                        <AmazonLogo />
                    </span>
                    <span className="header__logo-text">
                        Amazon
                    </span>
                </Link>

                <label className="header__search" htmlFor="site-search">
                    <SearchLogo />
                    <input
                        id="site-search"
                        type="search"
                        placeholder="Buscar por nombre, categoría o vendedor…"
                        value={searchTerm}
                        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                        autoComplete="off"
                        aria-label="Buscar productos"
                    />
                </label>

                <button
                    type="button"
                    className="header__cart"
                    aria-expanded={isCartOpen}
                    aria-label={isCartOpen ? "Cerrar carrito" : "Abrir carrito"}
                    aria-controls="cart-drawer"
                    onClick={() => dispatch(toggleCart())}
                >
                    <CarritoLogo />
                    {totalItems > 0 && <span className="header__cart-badge">{totalItems}</span>}
                </button>
            </div>
        </header>
    )
}

export default Header