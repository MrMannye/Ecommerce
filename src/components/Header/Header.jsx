import { Link } from "react-router-dom";

import "./Header.css"
import { AmazonLogo } from "../../assets/AmazonLogo";
import { CarritoLogo } from "../../assets/CarritoLogo";
import { SearchLogo } from "../../assets/SearchLogo";

import { useDispatch } from "react-redux";
import { setSearchTerm, selectSearchTerm, toggleCart } from "../../reducers/uiSlice";
import { selectCartTotalItems } from "../../reducers/cartSlice";
import { useSelector } from "react-redux";

function Header() {

    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);
    const totalItems = useSelector(selectCartTotalItems);

    return (
        <header className="header">
            <div className="container header__bar">
                <Link to="/" className="header__logo" aria-label="Terra & Loom, ir al inicio">
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
                    />
                </label>

                <button
                    type="button"
                    className="header__cart"
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