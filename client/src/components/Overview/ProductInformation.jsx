import React, {useContext, useEffect, useState} from 'react';
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
  // const item = products.data.filter((item) => item.id === selectedProductID);
  // const itemStyle = productStyle.data.results.filter((item) => {
  //   return JSON.stringify(item.style_id) === event.target.getAttribute('id');
  // });

  // if (!!productStyle.data.results) {
  //   console.log('Item: ', productStyle.data.results);
  // };


  console.log('ItemStyle Ezra: ', itemStyle);
  console.log('productsyle data: ', itemStyle.sale_price);


  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <div className='product-info-container'>
      <h2 id='product-info-header'>Product Details</h2>
      <div>{currentProduct.data.category + ': ' + currentProduct.data.name}</div>
      <div>{'Price: $' + currentProduct.data.default_price}</div>
      <i><h4>{currentProduct.data.slogan}</h4></i>
      <div>{'Description: ' + currentProduct.data.description}</div>
      <StyleSelector />
      <AddToCart />
    </div>
  );
};
