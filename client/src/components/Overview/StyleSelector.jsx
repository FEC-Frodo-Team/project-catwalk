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
    'gap': '25px',
    'flex-wrap': 'wrap',
    'justify-content': 'center',
    'padding': '10px'};
  const styleBtn = {
    'height': '35px',
    'width': '35px',
    'font-size': '0.5em',
    'border-radius': '50%',
    'object-fit': 'cover'};

  const styleSelectBtn = (event) => {
    // console.log(productStyle.data.results);
    setSelectedStyle(event.target.getAttribute('value'));
    const itemStyle = productStyle.data.results.filter((item) => {
      return item.name === event.target.getAttribute('value');
    });
    // console.log('Style Click event:', event.target.id);
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
            <img value={item.name} id={item.style_id} style={styleBtn} onClick={styleSelectBtn} src={item.photos[0].thumbnail_url}/>
          );
        },
        )}
      </div>
    </div>
  );
};
