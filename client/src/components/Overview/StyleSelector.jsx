import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import axios from 'axios';

export const StyleSelector = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const {productStyle, setProductStyle} = useContext(ProductContext);
  const {selectedStyle, setSelectedStyle} = useContext(ProductContext);
  const {mainPic, setMainPic} = useContext(ProductContext);
  // const item = productStyle.data.results.filter((item) => item.style_id === setSelectedStyle);
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
    // console.log(productStyle.data.results);
    setSelectedStyle(event.target.textContent);
    const itemStyle = productStyle.data.results.filter((item) => {
      return JSON.stringify(item.style_id) === event.target.getAttribute('value');
    });
    console.log('itemstyle:', itemStyle);
    setMainPic(itemStyle[0].photos[0]);
  };

  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <div>
      <div style={{'background-color': 'Gainsboro', 'height': '2px'}}></div>
      <div>Selected Style: {'>'} {!selectedStyle? productStyle.data.results[0].name: selectedStyle}</div>
      <div style={style}>
        {productStyle.data.results.map((item) => {
          return (
            <button value={item.style_id} style={styleBtn} onClick={styleSelectBtn}>{item.name}</button>
          );
        },
        )}
        {console.log('product thumbnail url: ', productStyle.data.results)}
      </div>
    </div>
  );
};
