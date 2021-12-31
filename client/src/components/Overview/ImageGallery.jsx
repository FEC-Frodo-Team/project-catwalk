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
    // const item = productStyle.data.results[0].photos.filter((item) => item.url === mainPic.url);
    let photoArray = productStyle.data.results[0].photos;
    const loadedPics = [];

    !(mainPic.length === 0)? photoArray = mainPic: null;

    for (let i = 0; i < photoArray.length; i++) {
      loadedPics.push(photoArray[i].thumbnail_url);
    }

    return loadedPics.map((thumbPic) => {
      return (
        <label name='thumbs' style={{position: 'relative'}}>
          <img className='main-thumbnail' name='thumbs' src={thumbPic}/>
          <input type='radio' name='thumbs' style={{position: 'absolute', left: '30%', top: '-5px'}}/>
        </label>
      );
    });
  };

  const thumbRight = (event) => {
    document.getElementById('thumbnails-container').scrollLeft += 45;
  };

  const thumbLeft = (event) => {
    document.getElementById('thumbnails-container').scrollLeft -= 45;
  };

  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <div className='gallery-container'>
      <button style={{'height': '30px', 'align-self': 'center'}}>{'<'}</button>
      <img src={!mainPic[0]? productStyle.data.results[0].photos[0].url: mainPic[0].url} className='main-photo'/>
      <button style={{'height': '30px', 'align-self': 'center'}}>{'>'}</button>
      <div className='photo-thumbnails-array'>
        <button style={{'height': '25px'}} onClick={thumbLeft}>{'<'}</button>
        <div id='thumbnails-container'>{mapThumbNails()}</div>
        <button className='scroll-right-thumbnails' style={{'height': '25px'}} onClick={thumbRight}>{'>'}</button>
      </div>
    </div>
  );
};
