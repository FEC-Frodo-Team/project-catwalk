import React, {useContext, useEffect, useState} from 'react';
import {BsTwitter, BsPinterest, BsFacebook} from 'react-icons/bs';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import {StyleSelector} from './StyleSelector.jsx';
import {AddToCart} from './AddToCart.jsx';

export const ProductInformation = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {currentProduct} = useContext(AppContext);
  const {productStyle} = useContext(ProductContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const {salePrice, setSalePrice} = useContext(ProductContext);
  const {itemStyle, setItemStyle} = useContext(ProductContext);

  const checkSale = () => {
    if (itemStyle.sale_price) {
      return (
        <div>{'Price: $'}
          <s>{currentProduct.data.default_price}</s>
          {' $' + itemStyle.sale_price}
        </div>);
    } else {
      return (
        <div>{'Price: $' + currentProduct.data.default_price}</div>
      );
    }
  };

  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <div className='product-info-container'>
      <h2 id='product-info-header'>Product Details</h2>
      <div>{currentProduct.data.category + ': ' + currentProduct.data.name}</div>
      {checkSale()}
      <i><h4>{currentProduct.data.slogan}</h4></i>
      <div>{'Description: ' + currentProduct.data.description}</div>
      <div>Share on:
        <a href="https://twitter.com" target="_blank" rel="noreferrer"><BsTwitter/></a>
        <a href="https://pinterest.com" target="_blank" rel="noreferrer"><BsPinterest/></a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer"><BsFacebook/></a>
      </div>
      <StyleSelector />
      <AddToCart />
    </div>
  );
};
