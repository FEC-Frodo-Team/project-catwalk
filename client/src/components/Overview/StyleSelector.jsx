import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import axios from 'axios';

export const StyleSelector = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const {productStyle, setProductStyle} = useContext(ProductContext);
  const item = products.data.filter((item) => item.id === selectedProductID);
  const style = {
    'display': 'flex',
    'gap': '25px',
    'flex-wrap': 'wrap',
    'padding': '25px'};

  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <div>
      <div style={{'background-color': 'Gainsboro', 'height': '2px'}}></div>
      <div>Selected Style: {'>'} {productStyle.data.results[0].name}</div>
      <div style={style}>
        {productStyle.data.results.map((item) => <button>B</button>)}
      </div>
    </div>
  );
};
