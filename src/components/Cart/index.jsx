import React, { useState, useEffect, useCallback } from 'react';
import './Cart.css';
import {
    fetchCart,
    updateProductInCart,
    deleteProductFromCart,
    deleteCart,
} from '../../utils/axios'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';

function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        getCart();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const updateProduct = async (product) => {
        await updateProductInCart(product);
        getCart();
    }

    const addItem = (product) => {
        if (product.quantity < product.stock) {
            product.quantity += 1;
            updateProduct(product);
        }
    }

    const substractItem = (product) => {
        if (product.quantity > 1) {
            product.quantity -= 1;
            updateProduct(product);
        }
    }

    const deleteProduct = async (productId) => {
        await deleteProductFromCart(productId);
        getCart();
    }
    const deleteAllCart = async () => {
        await deleteCart();
        getCart();
        setShowAlert(true)
    }

    const getCart = useCallback(async () => {
        const res = await fetchCart();
        let payment = res.data.result.reduce((a, b) => a + (b.retailPrice * b.quantity), 0);
        setTotal(parseFloat(payment).toFixed(2));
        setCart(res.data.result);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const getCartItems = () => {
        const cartItemsRender = cart.map((product) => {
            return (
                <div className={'d-flex cart-details-item'} key={product.productId}>
                    <div className={'item-col'}>
                        <div className={'d-flex'}>
                            <img alt="product-img" src={product.image}></img>
                            <div className={'card-content'}>
                                <div className={'cart-product-name'}>
                                    {product.shoe}
                                </div>
                                <div className={'cart-product-size'}>Size: {product.size} </div>
                                <div className={'cart-product-delete'} onClick={() => deleteProduct(product.productId)}>
                                    <DeleteOutlineIcon /> Delete
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'price-col'}>
                        <div className={'cart-product-price'}>
                            ${product.retailPrice}
                        </div>
                    </div>
                    <div className={'qty-col'}>
                        <div className={'cart-product-qty'}>
                            <button className={'reduce-qty-btn'} onClick={() => substractItem(product)} disabled={product.quantity === 1}><RemoveIcon /> </button>
                            <span className={'cart-product-qty-label'}>
                                {product.quantity}
                            </span>
                            <button className={'add-qty-btn'} onClick={() => addItem(product)} disabled={product.quantity === product.stock}><AddIcon /> </button>
                        </div>
                    </div>
                    <div className={'total-col'}>
                        <div className={'cart-product-price'}>
                            ${product.retailPrice * product.quantity}
                        </div>
                    </div>
                </div>
            )
        });

        return cartItemsRender;
    }
    return (
        <div className={'cart-main-container'}>
            <div className={'cart-container'}>
                <section>
                    <h1 className={'cart-title'}>Shopping Cart</h1>
                    <div className={'d-flex cart-details-header'}>
                        <div className={'item-col'}>
                            Item
                        </div>
                        <div className={'price-col'}>
                            Price
                        </div>
                        <div className={'qty-col'}>
                            Qty
                        </div>
                        <div className={'total-col'}>
                            Total
                        </div>
                    </div>
                    {getCartItems()}
                </section>
                <aside>
                    <h1 className={'cart-title'}>Order summary</h1>

                    <div className={'d-flex justify-content-between'}>
                        <div className={'cart-subtotal-label'}>
                            Subtotal
                        </div>
                        <div className={'cart-subtotal cart-product-price'}>
                            ${total}
                        </div>
                    </div>
                    <Button size='large' variant='contained' className={'checkout-btn'} onClick={() => deleteAllCart()} disabled={cart.length === 0}>Checkout</Button>
                </aside>
            </div>
            { showAlert ? <Alert severity="success" onClose={() => { setShowAlert(false) }}>Checked Out!</Alert> : '' }
        </div>
    )
}

export { Cart }
