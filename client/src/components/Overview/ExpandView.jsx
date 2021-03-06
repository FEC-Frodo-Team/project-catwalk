import React, {useContext, useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import InnerImageZoom from 'react-inner-image-zoom';

export const ExpandView = ({expandEnabled, openExandView, mainPic, mainPicRight, mainPicLeft, setMainPic}) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const {productStyle, setProductStyle} = useContext(ProductContext);
  const {thumbNails, setThumbNails} = useContext(ProductContext);
  const {selectedStyle, setSelectedStyle} = useContext(ProductContext);
  const thumbArray = document.getElementsByClassName('thumbradio');

  useEffect(() => {
    // console.log('ExpandView executed');
    const inputs = Array.from(document.querySelectorAll('.photo-thumbnails-array input'));
    if (inputs.length !== 0) {
      const checkedThumb = inputs.filter((item) => item.checked === true);
      const checkedThumbIndex = inputs.indexOf(checkedThumb[0]);

      // checkedThumb[0].nextElementSibling.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});

      if (expandEnabled) {
        (checkedThumbIndex === 0)? document.getElementById('expand-btn-left').disabled = true: null;
        (checkedThumbIndex !== 0)? document.getElementById('expand-btn-left').disabled = false: null;
        (checkedThumbIndex === inputs.length - 1)? document.getElementById('expand-btn-right').disabled = true: null;
        (checkedThumbIndex !== inputs.length - 1)? document.getElementById('expand-btn-right').disabled = false: null;
      };
    }
  });


  const mapThumbIcons = () => {
    const iconArray = [];
    let counter = -1;

    for (let i = 0; i < thumbArray.length; i++) {
      iconArray.push(thumbArray[i]);
    }
    console.log('thumb icons: ', thumbArray);

    return iconArray.map((icons) => {
      counter++;
      if (icons.checked === true) {
        return (
          <div className='expanded-thumb-icons' data-index={counter} onClick={iconClick}>&#9775;</div>
        );
      } else {
        return (
          <div className='expanded-thumb-icons' data-index={counter} onClick={iconClick}>&#9900;</div>
        );
      };
    });
  };

  const iconClick = (event) => {
    const checkedIndex = event.target.getAttribute('data-index');
    console.log('icon click: ', thumbArray[parseInt(checkedIndex)].checked);
    thumbArray[parseInt(checkedIndex)].checked = true;
    setMainPic(thumbArray[parseInt(checkedIndex)].value);
  };

  const expandStyle = {
    'display': 'flex',
    'position': 'fixed',
    'gap': '10px',
    'top': '50%',
    'left': '50%',
    'transform': 'translate(-50%, -50%)',
    'backgroundColor': '#FFF',
    'width': '900px',
    'height': '90%',
    'padding': '5px',
    // 'text-align': 'center',
    'justify-content': 'center',
    'margin': 'auto',
    'zIndex': '1000',
    'flex-wrap': 'wrap',
    'gap': '20px 15%',
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
    // 'position': 'absolute',
    // 'bottom': '0%',
    // 'left': '50%',
    // 'margin-left': '-150px',
    'width': '300px',
    'height': '40px',
    'gap': '15px',
    'justify-content': 'space-around',
  };

  return !expandEnabled? null: ReactDom.createPortal(
    !productStyle.data ? <div>Loading Image..</div>:
    <>
      <div style={overlayStyle} onClick={openExandView}></div>
      <div id='expand-container'>
        <button id='expand-btn-left' onClick={mainPicLeft} style={{'height': '30px', 'align-self': 'center'}}>{'<'}</button>
        {/* <img id='expanded-photo' src={mainPic} style={imgStyle}/> */}
        <InnerImageZoom src={mainPic} zoomType='click' zoomScale={1.5} hideHint={true} />
        <button id='expand-btn-right' onClick={mainPicRight} style={{'height': '30px', 'align-self': 'center'}}>{'>'}</button>
        <div className='break' style={{'flex-basis': '100%', 'height': '0'}}></div>
        <div style={thumbIcon}>{mapThumbIcons()}</div>
      </div>
    </>,
    document.getElementById('expand-view'),
  );
};
