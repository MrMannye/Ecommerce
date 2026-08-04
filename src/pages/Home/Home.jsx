import { useState } from "react"
import { useEffect } from "react"

function Home() {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`https://dummyjson.com/products?limit=${10}&skip=${0}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProducts(data.products)
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(true)
            })
    }, [])

    return (
        <div>
            <section className="container catalog">
                {isLoading && (
                    <div className="catalog__status">
                        <p>Cargando productos…</p>
                    </div>
                )}
                <div className={`catalog__grid "}`}>
                    {products.map((product) => (
                        // <ProductCard key={product.id} product={product} />
                        <div key={product.id}>{product.title}</div>
                    ))}
                </div>
            </section>
        </div >
    )
}

export default Home