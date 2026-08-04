import ProductCard from "../../components/ProductCard/ProductCard";
import { useGetProductsQuery, useSearchProductsQuery } from "../../reducers/productsApi";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../../reducers/uiSlice";
import { usePageMetadata } from "../../hooks/usePageMetadata";
import "./Home.css";

function Home() {
    const searchTerm = useSelector(selectSearchTerm);
    const normalizedTerm = searchTerm.trim();

    const {
        data: searchData,
        error: searchError,
        isLoading: isSearchLoading,
        isFetching: isSearchFetching,
    } = useSearchProductsQuery(normalizedTerm, {
        skip: normalizedTerm === "",
    });

    const {
        data: allData,
        error: allError,
        isLoading: isAllLoading,
        isFetching: isAllFetching,
    } = useGetProductsQuery({ limit: 100 }, { skip: normalizedTerm !== "" });

    const data = normalizedTerm ? searchData : allData;
    const error = normalizedTerm ? searchError : allError;
    const isLoading = normalizedTerm ? isSearchLoading : isAllLoading;
    const isFetching = normalizedTerm ? isSearchFetching : isAllFetching;

    usePageMetadata(
        normalizedTerm ? `Resultados para “${normalizedTerm}” · Amazon Shop` : "Amazon Shop · Catálogo de productos",
        normalizedTerm
            ? `Busca productos relacionados con ${normalizedTerm} y descubre las mejores ofertas de la tienda.`
            : "Explora la colección de productos y encuentra lo que necesitas en Amazon Shop."
    );

    const products = data?.items ?? [];

    return (
        <main>
            <section className="container catalog">
                {isLoading && (
                    <div className="catalog__status" role="status" aria-live="polite">
                        <p>Cargando productos…</p>
                    </div>
                )}

                {error && (
                    <div className="catalog__status" role="alert">
                        <p>No se pudo cargar el catálogo. Verifica tu conexión e intenta de nuevo.</p>
                    </div>
                )}

                {!isLoading && !error && products.length === 0 && (
                    <div className="catalog__status" role="status" aria-live="polite">
                        <p>No se encontraron productos para "{searchTerm}".</p>
                    </div>
                )}

                {!isLoading && !error && products.length > 0 && (
                    <div className={`catalog__grid ${isFetching ? "is-refetching" : ""}`}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Home;