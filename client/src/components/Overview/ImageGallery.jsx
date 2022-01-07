import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import {ExpandView} from './ExpandView.jsx';
import axios from 'axios';

export const ImageGallery = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const {productStyle, setProductStyle} = useContext(ProductContext);
  const {thumbNails, setThumbNails} = useContext(ProductContext);
  const {selectedStyle, setSelectedStyle} = useContext(ProductContext);
  const {mainPic, setMainPic} = useContext(ProductContext);
  const {expandEnabled, setExpand} = useContext(ProductContext);

  useEffect(() => {
    const inputs = Array.from(document.querySelectorAll('.photo-thumbnails-array input'));
    if (inputs.length !== 0) {
      const checkedThumb = inputs.filter((item) => item.checked === true);
      const checkedThumbIndex = inputs.indexOf(checkedThumb[0]);

      setMainPic(checkedThumb[0].value);

      checkedThumb[0].nextElementSibling.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});

      (checkedThumbIndex === 0)? document.getElementsByClassName('main-btn-left')[0].disabled = true: null;
      (checkedThumbIndex !== 0)? document.getElementsByClassName('main-btn-left')[0].disabled = false: null;
      (checkedThumbIndex === inputs.length - 1)? document.getElementsByClassName('main-btn-right')[0].disabled = true: null;
      (checkedThumbIndex !== inputs.length - 1)? document.getElementsByClassName('main-btn-right')[0].disabled = false: null;
    }
  });


  const mapThumbNails = () => {
    let photoArray = productStyle.data.results[0].photos;
    const loadedPics = [];
    let firstThumb = true;

    !(thumbNails.length === 0)? photoArray = thumbNails: null;

    for (let i = 0; i < photoArray.length; i++) {
      loadedPics.push(photoArray[i]);
    }

    return loadedPics.map((thumbPic) => {
      if (firstThumb) {
        firstThumb = false;
        return (
          <label name='thumbs' style={{position: 'relative'}}>
            <img className='main-thumbnail' name='thumbs' src={thumbPic.thumbnail_url}/>
            <input defaultChecked className='thumbradio' type='radio' name='thumbs' onClick={thumbClick} value={thumbPic.url} style={{display: 'none'}}/>
            <div className='thumb-highlight'></div>
          </label>
        );
      } else {
        return (
          <label name='thumbs' style={{position: 'relative'}}>
            <img className='main-thumbnail' name='thumbs' src={thumbPic.thumbnail_url}/>
            <input className='thumbradio' type='radio' name='thumbs' onClick={thumbClick} value={thumbPic.url} style={{display: 'none'}}/>
            <div className='thumb-highlight'></div>
          </label>
        );
      }
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
    inputs[checkedThumbIndex + 1].checked = true;
    setMainPic(inputs[checkedThumbIndex + 1].value);
  };

  const mainPicLeft = (event) => {
    const inputs = Array.from(document.querySelectorAll('.photo-thumbnails-array input'));
    const checkedThumb = inputs.filter((item) => item.checked === true);
    const checkedThumbIndex = inputs.indexOf(checkedThumb[0]);
    inputs[checkedThumbIndex - 1].checked = true;
    setMainPic(inputs[checkedThumbIndex - 1].value);
  };

  const openExandView = (event) => {
    console.log('Expand View: ', event.target);
    setExpand(!expandEnabled);
  };

  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <div className='gallery-container'>
      <button className='main-btn-left' style={{'height': '30px', 'align-self': 'center'}} onClick={mainPicLeft}>{'<'}</button>
      <img src={!mainPic? productStyle.data.results[0].photos[0].url: mainPic} className='main-photo' onClick={openExandView}/>
      <button className='main-btn-right' style={{'height': '30px', 'align-self': 'center'}} onClick={mainPicRight}>{'>'}</button>
      <div className='photo-thumbnails-array'>
        <button id='scroll-left-thumbnails' style={{'height': '25px'}} onClick={thumbLeft}>{'<'}</button>
        <div id='thumbnails-container'>{mapThumbNails()}</div>
        <button id='scroll-right-thumbnails' style={{'height': '25px'}} onClick={thumbRight}>{'>'}</button>
        <ExpandView expandEnabled={expandEnabled} openExandView={openExandView} mainPic={mainPic} setMainPic={setMainPic} mainPicRight={mainPicRight} mainPicLeft={mainPicLeft}/>
      </div>
    </div>
  );
};
