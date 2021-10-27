import React, { useState, useEffect } from 'react';
import './Product.css';
import { AutocompleteField } from '../SharedComponents/Fields'
import { Button } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Utils } from '../../utils';


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
                    <div className={'product-details-release-date'}>Released: { Utils.formatDate(product.releaseDate) }</div>
                    <div className={'d-flex align-items-center mt-3'}>
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
                        <div className={'product-details-stock'}>Stock: {selected !== null ? selected.stock : 'Agotado'}</div>
                        
                        <Button className={'product-details-cart-action'} size={'small'} startIcon={ <AddShoppingCartIcon /> } variant="outlined" onClick={handleAddToCart}>
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
