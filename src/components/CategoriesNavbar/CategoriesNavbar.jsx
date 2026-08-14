import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory, selectSelectedCategory, setSearchTerm } from "../../reducers/uiSlice";
import "./CategoriesNavbar.css";

const CATEGORIES = [
    "Skin-care",
    "Smartphones",
    "Sports-accessories",
    "Sunglasses",
    "Tablets",
];

function CategoriesNavbar() {
    const dispatch = useDispatch();
    const active = useSelector(selectSelectedCategory);

    function handleClick(category) {
        dispatch(setSearchTerm(""));
        dispatch(setSelectedCategory(category === active ? "" : category));
    }

    return (
        <nav className="categories-navbar" aria-label="Categories">
            <ul className="categories-navbar__list">
                {CATEGORIES.map((cat) => (
                    <li key={cat} className={`categories-navbar__item ${active === cat ? "is-active" : ""}`}>
                        <button type="button" onClick={() => handleClick(cat)} className={`categories-navbar__button ${active === cat ? "is-active" : ""}`}>
                            {cat.replace(/-/g, " ")}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default CategoriesNavbar;
