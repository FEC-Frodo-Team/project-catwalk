import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import {ProductInformation} from './ProductInformation.jsx';
import {ImageGallery} from './ImageGallery.jsx';
import axios from 'axios';

export const ProductDetails = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const [productStyle, setProductStyle] = useState('Default');
  const [selectedStyle, setSelectedStyle] = useState('');
  const style = {
    'display': 'flex',
    'padding': '5px',
    'justify-content': 'center',
    'font-size': '0.75em'};

  useEffect(() => {
    axios
        .get(`api/products/${selectedProductID}/styles`)
        .then((element) => {
          console.log('got Styles: ', element);
          setProductStyle(element);
        });
  }, [selectedProductID]);

  return (
    <ProductContext.Provider value={{productStyle, setProductStyle, selectedStyle, setSelectedStyle}}>
      <div className='wrapper' style={style}>
        <ImageGallery />
        <ProductInformation />
      </div>
    </ProductContext.Provider>
  );
};
