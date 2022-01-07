import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import axios from 'axios';

export const AddToCart = (props) => {
  const {productStyle} = useContext(ProductContext);
  const {selectedStyle, setSelectedStyle} = useContext(ProductContext);
  const {availableQuantity, setQuantity} = useContext(ProductContext);
  const [sizeNotSelected, setSize] = useState(true);
  const [sizeWarning, setSizeWarning] = useState(false);
  // const item = products.data.filter((item) => item.id === selectedProductID);

  const mapSizes = () => {
    const item = productStyle.data.results.filter((item) => item.name === selectedStyle);
    let sizeArray = [];
    !(item.length === 0)? sizeArray = item[0].skus: null;
    return Object.values(sizeArray).map((sku) => <option>{sku.size}</option>);
  };

  const selectedSize = (event) => {
    const item = productStyle.data.results.filter((item) => item.name === selectedStyle);
    const selectedSku = Object.values(item[0].skus).filter((sku) => sku.size === event.target.value);
    (event.target.value === 'Select Size')? setQuantity('-'):
    setQuantity(selectedSku[0].quantity);
    setSize(false);
    setSizeWarning(false);
  };

  const mapQuantity = () => {
    let amount = 0;
    const amountArray = [];
    amount = (availableQuantity > 15)? 15: availableQuantity;
    for (let i = 0; i < amount; i++) {
      amountArray.push(i+1);
    }

    if (sizeNotSelected === true) {
      return (<option>{'-'}</option>);
    } else {
      return amountArray.map((num) => <option>{num}</option>);
    }
  };

  const clickAddCart = (event) => {
    sizeNotSelected? setSizeWarning(true): setSizeWarning(false);
  };

  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <>
      <div>{sizeWarning?'Please Select a Size':null}</div>
      <div className='cart-container'>
        <div>

          <select id='select-size' style={{display: 'block'}} onClick={selectedSize}>
            <option>Select Size</option>
            {mapSizes()}
          </select>
        </div>
        <select id='quantity' disabled={sizeNotSelected} style={{height: '19px'}}>
          {mapQuantity()}
        </select>
        <button id='add-to-cart' onClick={clickAddCart}>Add To Cart</button>
      </div>
    </>
  );
};
