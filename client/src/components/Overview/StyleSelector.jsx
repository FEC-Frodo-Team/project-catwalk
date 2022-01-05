import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import axios from 'axios';

export const StyleSelector = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const {productStyle, setProductStyle} = useContext(ProductContext);
  const {selectedStyle, setSelectedStyle} = useContext(ProductContext);
  const {thumbNails, setThumbNails} = useContext(ProductContext);
  const {itemStyle, setItemStyle} = useContext(ProductContext);
  let firstPic = true;

  const styleSelectBtn = (event) => {
    const selectedItem = productStyle.data.results.filter((item) => {
      return JSON.stringify(item.style_id) === event.target.getAttribute('id');
    });
    // console.log('Jeff: ', selectedItem);
    setItemStyle(selectedItem[0]);
    setThumbNails(selectedItem[0].photos);
  };


  const thumbNailHover = (event) => {
    setSelectedStyle(event.target.getAttribute('value'));
  };

  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <div>
      <hr></hr>
      <div>Select Style: {'>'} {!selectedStyle? productStyle.data.results[0].name: selectedStyle}</div>
      <div className='thumbnail-container'>
        {productStyle.data.results.map((item) => {
          if (firstPic) {
            firstPic = false;
            return (
              <label name='styles' style={{position: 'relative'}}>
                <img value={item.name} className='style-btn' onMouseOver={thumbNailHover} src={item.photos[0].thumbnail_url}/>
                <input defaultChecked className='style-radio' type='radio' name='styles' style={{display: 'none'}} onClick={styleSelectBtn} id={item.style_id}/>
                <div className='style-highlight'></div>
              </label>
            );
          } else {
            return (
              <label name='styles' style={{position: 'relative'}}>
                <img value={item.name} className='style-btn' onMouseOver={thumbNailHover} src={item.photos[0].thumbnail_url}/>
                <input className='style-radio' type='radio' name='styles' style={{display: 'none'}} onClick={styleSelectBtn} id={item.style_id}/>
                <div className='style-highlight'></div>
              </label>
            );
          }
        },
        )}
      </div>
    </div>
  );
};
