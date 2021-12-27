import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductInformation} from './ProductInformation.jsx';
import {ImageGallery} from './ImageGallery.jsx';
import axios from 'axios';

export const ProductDetails = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  return (
    <div>
      <h2>Product Details</h2>
      <ProductInformation />
      <ImageGallery />
    </div>
  );
};
