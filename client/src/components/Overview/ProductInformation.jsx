import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {StyleSelector} from './StyleSelector.jsx';
import {AddToCart} from './AddToCart.jsx';
import axios from 'axios';

export const ProductInformation = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const item = products.data.filter((item) => item.id === selectedProductID);

  return (
    <div className='product-info-container'>
      <h2 id='product-info-header'>Product Details</h2>
      <div>{item[0].category + ': ' + item[0].name}</div>
      <div>{'Price: $' + item[0].default_price}</div>
      <i><h4>{item[0].slogan}</h4></i>
      <div>{'Description: ' + item[0].description}</div>
      <StyleSelector />
      <AddToCart />
    </div>
  );
};
