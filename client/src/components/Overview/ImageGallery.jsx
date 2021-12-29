import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import axios from 'axios';

export const ImageGallery = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const {productStyle, setProductStyle} = useContext(ProductContext);
  const {mainPic, setMainPic} = useContext(ProductContext);
  const item = products.data.filter((item) => item.id === selectedProductID);

  const styleContainer = {
    'width': '450px',
    'background-color': 'WhiteSmoke',
    'display': 'flex',
    'gap': '10px',
    'justify-content': 'center'};

  const styleImage = {
    'height': '400px',
    'width': '300px',
    'margin': '5px',
    'object-fit': 'cover'};

  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <div style={styleContainer}>
      <button style={{'height': '30px', 'align-self': 'center'}}>{'<'}</button>
      <img src={mainPic || productStyle.data.results[0].photos[0].url} style={styleImage}/>
      <button style={{'height': '30px', 'align-self': 'center'}}>{'>'}</button>
      {console.log('Photo urls: ', productStyle.data.results[0].photos[0])}
    </div>
  );
};
