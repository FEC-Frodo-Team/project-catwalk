import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import axios from 'axios';

export const StyleSelector = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const {productStyle, setProductStyle} = useContext(ProductContext);
  const {selectedStyle, setSelectedStyle} = useContext(ProductContext);
  const item = products.data.filter((item) => item.id === selectedProductID);
  const style = {
    'display': 'flex',
    'gap': '5px',
    'flex-wrap': 'wrap',
    'justify-content': 'center',
    'padding': '10px'};
  const styleBtn = {
    'height': '15px',
    'font-size': '0.5em'};

  const styleSelectBtn = (event) => {
    console.log(event.target.textContent);
    setSelectedStyle(event.target.textContent);
  };

  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <div>
      <div style={{'background-color': 'Gainsboro', 'height': '2px'}}></div>
      <div>Selected Style: {'>'} {!selectedStyle? productStyle.data.results[0].name: selectedStyle}</div>
      <div style={style}>
        {productStyle.data.results.map((item) => {
          return (
            <button style={styleBtn} onClick={styleSelectBtn}>{item.name}</button>
          );
        },
        )}
        {console.log('product thumbnail url: ', productStyle.data.results)}
      </div>
    </div>
  );
};
