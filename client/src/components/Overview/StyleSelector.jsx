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

  const styleSelectBtn = (event) => {
    // console.log(productStyle.data.results);

    const itemStyle = productStyle.data.results.filter((item) => {
      return JSON.stringify(item.style_id) === event.target.getAttribute('id');
    });
    // console.log('Style Click event:', typeof(item));
    setMainPic(itemStyle[0].photos[0]);
  };

  const thumbNailHover = (event) => {
    setSelectedStyle(event.target.getAttribute('value'));
  };

  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <div>
      <div style={{'background-color': 'Gainsboro', 'height': '2px'}}></div>
      <div>Select Style: {'>'} {!selectedStyle? productStyle.data.results[0].name: selectedStyle}</div>
      <div className='thumbnail-container'>
        {productStyle.data.results.map((item) => {
          return (
            <label name='styles' style={{position: 'relative'}}>
              <img value={item.name} id={item.style_id} className='style-btn' onClick={styleSelectBtn} onMouseOver={thumbNailHover} src={item.photos[0].thumbnail_url}/>
              <input type='radio' name='styles' style={{position: 'absolute', left: '60%', top: '-5px'}}/>
            </label>

          );
        },
        )}
      </div>
    </div>
  );
};
