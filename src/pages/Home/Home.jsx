import { useState } from "react"
import { useEffect } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import { normalizeProduct } from "../../reducers/normalizeData"
import "./Home.css"

import { useSelector } from "react-redux"
import { selectSearchTerm } from "../../reducers/uiSlice"


function Home() {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const searchTerm = useSelector(selectSearchTerm);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}&limit=100`)
            .then(response => response.json())
            .then(data => {
                let normailizedProducts = data.products.map(product => normalizeProduct(product))
                setProducts(normailizedProducts)
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(true)
            })
    }, [searchTerm])

    return (
        <div>
            <section className="container catalog">
                {isLoading && (
                    <div className="catalog__status">
                        <p>Cargando productos…</p>
                    </div>
                )}
                {!isLoading && products.length > 0 && (
                    <div className={`catalog__grid ${isLoading ? "is-refetching" : ""}`}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div >
    )
}

export default Home