import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import axios from 'axios';

export const ProductInformation = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  console.log(selectedProductID);
  const item = products.data.filter((item) => item.id === selectedProductID);
  const style = {'width': '300px'};
  return (
    <div style={style}>
      <h2>Product Details</h2>
      <div>{item[0].category + ': ' + item[0].name}</div>
      <div>{'Price: $' + item[0].default_price}</div>
      <h4>{item[0].slogan}</h4>
      <div>{'Description: ' + item[0].description}</div>
    </div>
  );
};
