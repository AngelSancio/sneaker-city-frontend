import React, { useState, useEffect } from 'react';
import './Product.css';
import { AutocompleteField, NumericTextField } from '../SharedComponents/Fields'
import { Button } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Utils } from '../../utils';
import { addProductToCart } from '../../utils/axios'

// Component to show product detail and add to cart
function Product(props) {
    const [product, setProduct] = useState({});
    const [selected, setSelected] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        // assing product
        setProduct(props.product);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleAddToCart = async () => {
        setErrors({});
        if (selected === null) return setErrors({ selected: "This field is empty" });
        if (selected !== null && selected.stock === 0) {
            return setErrors({ selected: "This size is not in stock" });
        }

        const options = {
            shoe: product.shoe,
            retailPrice: product.retailPrice,
            size: selected.number,
            quantity: quantity,
            productId: product.id,
            image: product.media.thumbUrl,
        }

        const result = await addProductToCart(options)

        return console.log(result.message)
    }

    if (product.media) {
        return (
            <div className={'product-details-container'}>
                <img alt={product.shoe} src={product.media.imageUrl} className={'product-modal-img'}></img>
                <div className={'modal-product-details'}>
                    <div className={'d-flex justify-content-between align-items-center'}>
                        <div className={'product-details-name'}>
                            {product.shoe}
                            <span className={'product-details-brand'} >{product.brand}</span>
                        </div>
                        <div className={'product-details-price primary-text-color'}>${product.retailPrice}</div>
                    </div>
                    <div className={'product-details-release-date'}>Released: {Utils.formatDate(product.releaseDate)}</div>
                    <div className={'d-flex align-items-center mt-3'}>
                        <AutocompleteField
                            xs={4}
                            fieldLabel="Size"
                            fieldID="size"
                            // fieldInnerLabel="Select the size"
                            fieldVariant="outlined"
                            disableClearable={false}
                            value={selected}
                            handleChange={(e, value) => setSelected(value)}
                            options={product.size}
                            getOptionLabel={(option) => option.number}
                            multiple={false}
                            limitTags={1}
                            disabled={false}
                            helperText={errors.selected}
                        />
                        <div className={'product-details-stock'}>Stock: {selected !== null ? selected.stock : 'Agotado'}</div>
                        <NumericTextField
                            xs={4}
                            typeVariant="subtitle1"
                            typeClass="field-label"
                            fieldLabel="Quantity"
                            fieldID="quantity"
                            // margin='dense'
                            fieldVariant="outlined"
                            fullWidth
                            isAllowed={(values) => {
                                const { floatValue } = values
                                return floatValue <= selected.stock
                            }}
                            allowLeadingZeros={false}
                            thousandSeparator={true}
                            decimalScale={0}
                            fixedDecimalScale={true}
                            disabled={selected !== null ? false : true}
                            value={quantity}
                            onChange={(values) => setQuantity(values.floatValue)}
                        />
                        <Button className={'product-details-cart-action'} size={'small'} startIcon={<AddShoppingCartIcon />} variant="outlined" onClick={handleAddToCart}>
                            <span>Add to cart</span>
                        </Button>
                    </div>
                </div>
            </div>

        )
    } else {
        return (
            <div className={'product-modal'}></div>
        )
    }
}

export { Product }
