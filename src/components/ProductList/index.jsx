import React, { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../../utils/axios';
import './ProductList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



function ProductList() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = React.useState(1);
    let productsPerPage = 10;

    useEffect(() => {
        getProducts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getProducts = useCallback(async () => {
        const res = await fetchProducts();
        setProducts(res.data.result);
        console.log(res.data.result);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const renderProduct = ( activePage ) => {
        const renderedProducts = products.slice( activePage * productsPerPage - productsPerPage, activePage * productsPerPage ).map((product) => {
            return(
                <div key={ product.id } className={'product-container'}>
                    <img alt={product.shoe} src={product.media.thumbUrl} className={'product-img'}></img>
                    <div className={'product-details'}>
                        <div className={'product-name'}>{product.shoe}</div>
                    </div>
                    <div className={'product-actions'}>
                        <div className={'product-price'}>${product.retailPrice}</div>
                        <div className={'product-cart-action'} >
                            <FontAwesomeIcon icon={faCartPlus} />
                            <span>Add to cart</span>
                        </div>
                    </div>
                </div>
            )
        })
        return renderedProducts;
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    
    return (
        <div className={'container'}>
            <div className={'product-list-container'}>
                { renderProduct( page ) }
            </div>
            <Stack spacing={2}>
                <Pagination count={productsPerPage} page={page} variant="outlined" onChange={handleChange} />
            </Stack>
        </div>
    )
}

export { ProductList }
