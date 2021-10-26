import React, { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../../utils/axios';
import './ProductList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import {
    Pagination,
    Stack,
    Modal,
    Button
} from '@mui/material';
import { Product } from '../Product'


function RenderProduct(props)  {
    const { activePage, productsPerPage, products, handleModal } = props;

    const renderedProducts = products.slice( activePage * productsPerPage - productsPerPage, activePage * productsPerPage ).map((product) => {
        return(
            <div key={ product.id } className={'product-container'}>
                <img alt={product.shoe} src={product.media.thumbUrl} className={'product-img'} onClick={() => handleModal(product, true)}></img>
                <div className={'product-details'}>
                    <div className={'product-name'}>{product.shoe}</div>
                </div>
                <div className={'product-actions'}>
                    <div className={'product-price'}>${product.retailPrice}</div>
                    <Button className={'product-cart-action'} onClick={() => handleModal(product, true)}>
                        <FontAwesomeIcon icon={faCartPlus} />
                        <span>Add to cart</span>
                    </Button>
                </div>
            </div>
        )
    })
    return renderedProducts;
}

function ProductModal(props) {
    const { product, setOpenModal, openModal } = props;

    return (
        <Modal 
            open={openModal}
            onClose={() => setOpenModal(false)} 
        >
            <Product
                product={product}
            />
        </Modal>
    )
}

function ProductList() {
    const [products, setProducts] = useState([]);
    const [modalData, setModalData] = useState({});
    const [page, setPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const productsPerPage = 10;

    useEffect(() => {
        getProducts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getProducts = useCallback(async () => {
        const res = await fetchProducts();
        setProducts(res.data.result);
        console.log(res.data.result);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleModal = (product, modal) => {
        setModalData(product);
        setOpenModal(modal)
    };
    
    return (
        <div className={'container'}>
            <div className={'product-list-container'}>
                <RenderProduct
                    activePage={page}
                    productsPerPage={productsPerPage}
                    products={products}
                    handleModal={handleModal}
                />
                <ProductModal
                    product={modalData}
                    setOpenModal={setOpenModal}
                    openModal={openModal}
                />
            </div>
            <Stack spacing={2}>
                <Pagination count={productsPerPage} page={page} variant="outlined" onChange={handleChange.bind(this)} />
            </Stack>
        </div>
    )
}

export { ProductList }
