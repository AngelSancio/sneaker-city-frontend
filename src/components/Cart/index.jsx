import React, { useState, useEffect, useCallback } from 'react';
import './Cart.css';
import { fetchCart } from '../../utils/axios'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getCart();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    const getCart = useCallback(async () => {
        const res = await fetchCart();
        setCart(res.data.result);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const getCartItems = () => {
        console.log(cart);
        const cartItemsRender = cart.map( ( product ) => {
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
                                <div className={'cart-product-delete'}>
                                    <DeleteOutlineIcon /> Delete
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'price-col'}>
                        <div className={'cart-product-price'}>
                            {product.retailPrice}
                        </div>
                    </div>
                    <div className={'qty-col'}>
                        <div className={'cart-product-qty'}>
                            <button className={'reduce-qty-btn'}><RemoveIcon /> </button>
                            <span className={'cart-product-qty-label'}>
                                {product.quantity}
                            </span>
                            <button className={'add-qty-btn'}><AddIcon /> </button>
                        </div>
                    </div>
                    <div className={'total-col'}>
                        <div className={'cart-product-price'}>
                            {product.retailPrice * product.quantity}
                        </div>
                    </div>
                </div>
            )
        } );

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
                            0.00
                        </div>
                    </div>
                    <Button size='large' variant='contained' className={'checkout-btn'}>Checkout</Button>
                </aside>
            </div>
        </div>
    )
}

export { Cart }
