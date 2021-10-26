import React, { useState, useEffect } from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { AutocompleteField } from '../SharedComponents/Fields'
import { Button } from '@mui/material'



function Product(props) {
    const [product, setProduct] = useState({});
    const [selected, setSelected] = useState(null)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        setProduct(props.product);
        console.log(props)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log(selected)
    }, [selected])

    const handleAddToCart = () => {
        setErrors({});
        if (selected === null) return setErrors({selected: "This field is empty"});
        if (selected !== null && selected.stock === 0) {
            return setErrors({selected: "This size is not in stock"});
        }
        
        return console.log("Agregado al carrito!!!")
    }

    if (product.media) {
        return (
            <div className={'product-modal'}>
                <img alt={product.shoe} src={product.media.thumbUrl} className={'product-modal-img'}></img>
                <div className={'product-details'}>
                    <div className={'product-name'}>{product.shoe}</div>
                </div>
                <AutocompleteField
                    xs={4}
                    fieldLabel="Select the size"
                    fieldID="size"
                    fieldInnerLabel="Select the size"
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
                <div className={'product-actions'}>
                    <div className={'product-price'}>${product.retailPrice}</div>
                    <div className={'product-price'}>Stock: {selected !== null ? selected.stock : 0}</div>
                    <Button className={'product-cart-action'} onClick={handleAddToCart}>
                        <FontAwesomeIcon icon={faCartPlus} />
                        <span>Add to cart</span>
                    </Button>
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
