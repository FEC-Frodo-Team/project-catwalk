import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import axios from 'axios';

export const ImageGallery = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const {productStyle, setProductStyle} = useContext(ProductContext);
  const {thumbNails, setThumbNails} = useContext(ProductContext);
  const {selectedStyle, setSelectedStyle} = useContext(ProductContext);
  const [mainPic, setMainPic] = useState([]);
  // const item = products.data.filter((item) => item.id === selectedProductID);

  const mapThumbNails = () => {
    // const item = productStyle.data.results[0].photos.filter((item) => item.url === thumbNails.url);
    let photoArray = productStyle.data.results[0].photos;
    const loadedPics = [];

    !(thumbNails.length === 0)? photoArray = thumbNails: null;

    for (let i = 0; i < photoArray.length; i++) {
      loadedPics.push(photoArray[i]);
    }

    return loadedPics.map((thumbPic) => {
      return (
        <label name='thumbs' style={{position: 'relative'}}>
          <img className='main-thumbnail' name='thumbs' src={thumbPic.thumbnail_url}/>
          <input type='radio' name='thumbs' onClick={thumbClick} value={thumbPic.url} style={{position: 'absolute', left: '30%', top: '-5px'}}/>
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

  const thumbClick = (event) => {
    setMainPic(event.target.value);
  };

  const mainPicRight = (event) => {
    const inputs = Array.from(document.querySelectorAll('.photo-thumbnails-array input'));
    const checkedThumb = inputs.filter((item) => item.checked === true);
    const checkedThumbIndex = inputs.indexOf(checkedThumb[0]);
    console.log(inputs.indexOf(checkedThumb[0]));
    console.log('');
    inputs[checkedThumbIndex + 1].checked = true;
    setMainPic(inputs[checkedThumbIndex + 1].value);
  };

  const mainPicLeft = (event) => {
    const inputs = Array.from(document.querySelectorAll('.photo-thumbnails-array input'));
    const checkedThumb = inputs.filter((item) => item.checked === true);
    const checkedThumbIndex = inputs.indexOf(checkedThumb[0]);
    console.log(inputs.indexOf(checkedThumb[0]));
    console.log('');
    inputs[checkedThumbIndex - 1].checked = true;
    setMainPic(inputs[checkedThumbIndex - 1].value);
  };

  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <div className='gallery-container'>
      <button style={{'height': '30px', 'align-self': 'center'}} onClick={mainPicLeft}>{'<'}</button>
      <img src={!mainPic? productStyle.data.results[0].photos[0].url: mainPic} className='main-photo'/>
      <button style={{'height': '30px', 'align-self': 'center'}} onClick={mainPicRight}>{'>'}</button>
      <div className='photo-thumbnails-array'>
        <button style={{'height': '25px'}} onClick={thumbLeft}>{'<'}</button>
        <div id='thumbnails-container'>{mapThumbNails()}</div>
        <button className='scroll-right-thumbnails' style={{'height': '25px'}} onClick={thumbRight}>{'>'}</button>
      </div>
    </div>
  );
};
