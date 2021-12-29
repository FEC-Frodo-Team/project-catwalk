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

  const styleContainer = {
    'width': '450px',
    'background-color': 'WhiteSmoke',
    'display': 'flex',
    'gap': '10px',
    'justify-content': 'center',
    'flex-wrap': 'wrap'};

  const styleImage = {
    'height': '400px',
    'width': '300px',
    'margin': '5px',
    'object-fit': 'cover'};

  const styleThumbNails = {
    'display': 'flex',
    'width': '400px',
    'height': '40px',
    'justify-content':
    'center',
    'gap': '10px'};

  const mapThumbNails = () => {
    const item = productStyle.data.results.filter((item) => item.name === selectedStyle);
    const photoArray = productStyle.data.results[0].photos;
    const sevenPics = [];
    for (let i = 0; i < 7; i++) {
      sevenPics.push(photoArray[i].thumbnail_url);
    }
    !item[0]? console.log('LOADING'): console.log('ItemSSSSSS: ', item[0]);
    return sevenPics.map((thumbPic) => <img style={{'height': '25px', 'width': '30px', 'object-fit': 'cover'}} src={thumbPic}/>);
  };

  return (
    !productStyle.data ? <div>Loading Image..</div>:
    <div style={styleContainer}>
      <button style={{'height': '30px', 'align-self': 'center'}}>{'<'}</button>
      <img src={mainPic.url || productStyle.data.results[0].photos[0].url} style={styleImage}/>
      <button style={{'height': '30px', 'align-self': 'center'}}>{'>'}</button>
      {console.log('Photo urls: ', productStyle.data.results[0].photos[0])}
      <div style={styleThumbNails}>
        <button style={{'height': '25px'}}>{'<'}</button>
        {mapThumbNails()}
        <button style={{'height': '25px'}}>{'>'}</button>
      </div>
    </div>
  );
};
