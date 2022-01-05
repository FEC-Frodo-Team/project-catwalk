import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import {ProductInformation} from './ProductInformation.jsx';
import {ImageGallery} from './ImageGallery.jsx';
import axios from 'axios';

export const ProductDetails = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const [productStyle, setProductStyle] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [thumbNails, setThumbNails] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [mainPic, setMainPic] = useState('');
  const [availableQuantity, setQuantity] = useState(1);
  const [expandEnabled, setExpand] = useState(false);
  const [itemStyle, setItemStyle] = useState('');

  useEffect(() => {
    axios
        .get(`api/products/${selectedProductID}/styles`)
        .then((element) => {
          console.log('got Styles: ', element);
          setProductStyle(element);
          setSelectedStyle(element.data.results[0].name);
          setItemStyle(element.data.results[0]);
        });
  }, [selectedProductID]);

  return (
    !productStyle.data || !itemStyle ? <div>loading product info</div>:
    <ProductContext.Provider value={{productStyle, setProductStyle, selectedStyle,
      setSelectedStyle, thumbNails, setThumbNails, salePrice, setSalePrice,
      mainPic, setMainPic, availableQuantity, setQuantity, expandEnabled, setExpand,
      itemStyle, setItemStyle}}>
      <div className='product-wrapper'>
        <ImageGallery />
        <ProductInformation />
      </div>
    </ProductContext.Provider>
  );
};
