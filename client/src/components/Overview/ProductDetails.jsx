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
  const [thumbNails, setThumbNails] = useState('');

  useEffect(() => {
    axios
        .get(`api/products/${selectedProductID}/styles`)
        .then((element) => {
          console.log('got Styles: ', element);
          setProductStyle(element);
          setSelectedStyle(element.data.results[0].name);
        });
  }, [selectedProductID]);

  return (
    <ProductContext.Provider value={{productStyle, setProductStyle, selectedStyle, setSelectedStyle, thumbNails, setThumbNails}}>
      <div className='product-wrapper'>
        <ImageGallery />
        <ProductInformation />
      </div>
    </ProductContext.Provider>
  );
};
