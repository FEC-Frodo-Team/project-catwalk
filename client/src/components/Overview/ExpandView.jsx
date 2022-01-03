import React, {useContext, useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import axios from 'axios';

export const ExpandView = ({expandEnabled, openExandView, mainPic, mapThumbNails}) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const {productStyle, setProductStyle} = useContext(ProductContext);
  const {thumbNails, setThumbNails} = useContext(ProductContext);
  const {selectedStyle, setSelectedStyle} = useContext(ProductContext);

  const expandStyle = {
    'display': 'relative',
    'position': 'fixed',
    'top': '50%',
    'left': '50%',
    'transform': 'translate(-50%, -50%)',
    'backgroundColor': '#FFF',
    // 'width': '400px',
    'height': '80%',
    'padding': '50px',
    'text-align': 'center',
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
    'bottom': '20%',
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
        <img src={mainPic} style={imgStyle}/>
        <div style={thumbIcon}>Thumbnail Icons</div>

      </div>
    </>,
    document.getElementById('expand-view'),
  );
};
