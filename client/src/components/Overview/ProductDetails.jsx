import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductInformation} from './ProductInformation.jsx';
import {ImageGallery} from './ImageGallery.jsx';
import axios from 'axios';

export const ProductDetails = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const style = {
    'display': 'flex',
    'padding': '5px',
    'justify-content': 'center'};

  return (
    <div className='wrapper' style={style}>
      <ImageGallery />
      <ProductInformation />
    </div>
  );
};
