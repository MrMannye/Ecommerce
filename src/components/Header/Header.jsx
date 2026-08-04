import { Link } from "react-router-dom";

import "./Header.css"
import { AmazonLogo } from "../../assets/AmazonLogo";
import { CarritoLogo } from "../../assets/CarritoLogo";
import { SearchLogo } from "../../assets/SearchLogo";

function Header() {
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
                        value={"searchTerm"}
                        autoComplete="off"
                    />
                </label>

                <button
                    type="button"
                    className="header__cart"
                >
                    <CarritoLogo />
                </button>
            </div>
        </header>
    )
}

export default Header