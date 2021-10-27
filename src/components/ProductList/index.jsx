import React, { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../../utils/axios';
import './ProductList.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
    Pagination,
    Stack,
    Modal,
    Button,
    IconButton,
} from '@mui/material';
import { Product } from '../Product';
import { Utils } from '../../utils';

// Component to show elements of product list
function RenderProduct(props)  {
    const { activePage, productsPerPage, products, handleModal } = props;

    const renderedProducts = products.slice( activePage * productsPerPage - productsPerPage, activePage * productsPerPage ).map((product) => {
        return(
            <div key={ product.id } className={'product-container'}>
                <img alt={product.shoe} src={product.media.smallImageUrl} className={'product-img'} onClick={() => handleModal(product, true)}></img>
                <div className={'product-details'}>
                    <div className={'product-name'}>{product.shoe} <span className={'product-brand'}>{product.brand}</span></div>
                </div>
                <div className={'product-release-date'}>
                    Released: {Utils.formatDate(product.releaseDate)}
                </div>
                <div className={'product-actions'}>
                    <div className={'product-price'}>{Utils.formatPrice(product.retailPrice)}</div>
                    <Button className={'product-cart-action'} size={'small'} startIcon={ <AddShoppingCartIcon /> } variant="outlined" onClick={() => handleModal(product, true)}>
                        <span>Add to cart</span>
                    </Button>
                </div>
            </div>
        )
    })
    return renderedProducts;
}

// Modal component to show product details and add to cart
function ProductModal(props) {
    const { product, setOpenModal, openModal } = props;

    return (
        <Modal 
            open={openModal}
            onClose={() => setOpenModal(false)} 
        >
            <div className={'product-modal'}>
                <div className={'product-modal-backdrop'} onClick={ () => setOpenModal(false) }>
                </div>
                <div className={'product-modal-content'}>
                        <IconButton aria-label="close" size='small' className={'product-modal-close'}  onClick={ () => setOpenModal(false) }>
                            <HighlightOffIcon />
                        </IconButton>
                        <Product
                            product={product}
                            setOpenModal={setOpenModal}
                        />
                </div>
            </div>
        </Modal>
    )
}

// Component to show the list of products
function ProductList() {
    const [products, setProducts] = useState([]);
    const [modalData, setModalData] = useState({});
    const [page, setPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const productsPerPage = 10;

    useEffect(() => {
        getProducts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // get products available
    const getProducts = useCallback(async () => {
        const res = await fetchProducts();
        setProducts(res.data.result);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    // handle the actual page for pagination
    const handleChange = (event, value) => {
        setPage(value);
    };

    // handle open modal and the information on it
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
