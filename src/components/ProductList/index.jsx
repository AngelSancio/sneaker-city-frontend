import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../../utils/axios';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getProducts = useCallback(async () => {
        const res = await fetchProducts();
        setProducts(res.data.result);
        console.log(res.data.result);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        products.map((product) => {
            return (
                <div key={product.id}>{product.colorway}</div>
            )
        })
    )
}

export { ProductList }
