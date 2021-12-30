import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import axios from 'axios';

export const ImageGallery = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const {productStyle, setProductStyle} = useContext(ProductContext);
  const {mainPic, setMainPic} = useContext(ProductContext);
  const {selectedStyle, setSelectedStyle} = useContext(ProductContext);
  const [thumbNails, setThumbNails] = useState([]);
  // const item = products.data.filter((item) => item.id === selectedProductID);

  const mapThumbNails = () => {
    const item = productStyle.data.results.filter((item) => item.name === selectedStyle);
    let photoArray = productStyle.data.results[0].photos;
    const sevenPics = [];
    const arrayLength = (photoArray.length > 6)? 7: photoArray.length;

    !(item.length === 0)? photoArray = item[0].photos: null;

    for (let i = 0; i < arrayLength; i++) {
      sevenPics.push(photoArray[i].thumbnail_url);
    }

    // console.log('ItemSSSSSS: ', item, 'style:', selectedStyle);
    return sevenPics.map((thumbPic) => {
      return (
        <img className='main-thumbnail' src={thumbPic}/>
      );
    });
  };

  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <div className='gallery-container'>
      <button style={{'height': '30px', 'align-self': 'center'}}>{'<'}</button>
      <img src={mainPic.url || productStyle.data.results[0].photos[0].url} className='main-photo'/>
      <button style={{'height': '30px', 'align-self': 'center'}}>{'>'}</button>
      <div className='photo-thumbnails-array'>
        <button style={{'height': '25px'}}>{'<'}</button>
        {mapThumbNails()}
        <button style={{'height': '25px'}}>{'>'}</button>
      </div>
    </div>
  );
};
