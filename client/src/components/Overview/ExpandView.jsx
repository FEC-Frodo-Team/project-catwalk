import React, {useContext, useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import InnerImageZoom from 'react-inner-image-zoom';

export const ExpandView = ({expandEnabled, openExandView, mainPic, mapThumbNails, mainPicRight, mainPicLeft}) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const {productStyle, setProductStyle} = useContext(ProductContext);
  const {thumbNails, setThumbNails} = useContext(ProductContext);
  const {selectedStyle, setSelectedStyle} = useContext(ProductContext);

  useEffect(() => {
    // console.log('ExpandView executed');
    const inputs = Array.from(document.querySelectorAll('.photo-thumbnails-array input'));
    if (inputs.length !== 0) {
      const checkedThumb = inputs.filter((item) => item.checked === true);
      const checkedThumbIndex = inputs.indexOf(checkedThumb[0]);

      checkedThumb[0].nextElementSibling.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});

      if (expandEnabled) {
        (checkedThumbIndex === 0)? document.getElementById('expand-btn-left').disabled = true: null;
        (checkedThumbIndex !== 0)? document.getElementById('expand-btn-left').disabled = false: null;
        (checkedThumbIndex === inputs.length - 1)? document.getElementById('expand-btn-right').disabled = true: null;
        (checkedThumbIndex !== inputs.length - 1)? document.getElementById('expand-btn-right').disabled = false: null;
      };
    }
  });

  const expandStyle = {
    'display': 'flex',
    'position': 'fixed',
    'gap': '10px',
    'top': '50%',
    'left': '50%',
    'transform': 'translate(-50%, -50%)',
    'backgroundColor': '#FFF',
    // 'width': '400px',
    'height': '90%',
    'padding': '5px',
    // 'text-align': 'center',
    'justify-content': 'center',
    'margin': 'auto',
    'zIndex': '1000',
  };

  const overlayStyle = {
    'position': 'fixed',
    'backgroundColor': 'rgba(0, 0, 0, 0.7)',
    'zIndex': '1000',
    'top': '0',
    'bottom': '0',
    'left': '0',
    'right': '0',
  };

  const imgStyle = {
    'objectFit': 'cover',
    'height': '100%',
    // 'width': '400px',
  };

  const thumbIcon = {
    'display': 'flex',
    'position': 'absolute',
    'bottom': '0%',
    'left': '50%',
    'margin-left': '-150px',
    'width': '300px',
    'height': '40px',
    'border': '2px solid',
    'gap': '15px',
    'overflow-x': 'hidden',
    'scroll-behavior': 'smooth',
  };

  return !expandEnabled? null: ReactDom.createPortal(
    !productStyle.data ? <div>Loading Image..</div>:
    <>
      <div style={overlayStyle} onClick={openExandView}></div>
      <div style={expandStyle}>
        <button id='expand-btn-left' onClick={mainPicLeft} style={{'height': '30px', 'align-self': 'center'}}>{'<'}</button>
        {/* <img id='expanded-photo' src={mainPic} style={imgStyle}/> */}
        <InnerImageZoom src={mainPic} zoomType='click' zoomScale={1.5} hideHint={true} />
        <div style={thumbIcon}></div>
        <button id='expand-btn-right' onClick={mainPicRight} style={{'height': '30px', 'align-self': 'center'}}>{'>'}</button>
      </div>
    </>,
    document.getElementById('expand-view'),
  );
};
