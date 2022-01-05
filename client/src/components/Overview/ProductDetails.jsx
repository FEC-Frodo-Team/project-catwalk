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
  const [salePrice, setSalePrice] = useState('');
  const [mainPic, setMainPic] = useState('');
  const [availableQuantity, setQuantity] = useState(1);
  const [expandEnabled, setExpand] = useState(false);

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
    <ProductContext.Provider value={{productStyle, setProductStyle, selectedStyle,
      setSelectedStyle, thumbNails, setThumbNails, salePrice, setSalePrice,
      mainPic, setMainPic, availableQuantity, setQuantity, expandEnabled, setExpand}}>
      <div className='product-wrapper'>
        <ImageGallery />
        <ProductInformation />
      </div>
    </ProductContext.Provider>
  );
};
