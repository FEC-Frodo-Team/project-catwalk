import React, {useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ReviewContext} from './ReviewContext.jsx';
import axios from 'axios';


export const Breakdown = () => {
  const {reviewMetaData} = useContext(AppContext);
  const {totalNumberReviews} = useContext(ReviewContext);

  const ratingObj = reviewMetaData.data.ratings ?
    reviewMetaData.data.ratings : {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
  return (
    <span>
      {Object.keys(ratingObj).slice(0).reverse().map((key) => {
        return <div style={{width: '80%'}}>
                <span style = {{width: '20%'}}>{key} stars </span>
                {/* The bar itself will be two toned, green and grey. 1.2.4.2. p12*/}
                <span style = {{ color: "green", display: "inline-block",backgroundColor:"green",width: `${80*ratingObj[key]/totalNumberReviews}%`, marginBottom:"10px"}}> .</span>
                <span style = {{ color: "lightgray", display: "inline-block", backgroundColor:"LightGray", width: `${80-(80*ratingObj[key]/totalNumberReviews)}%`, marginBottom:"10px"}}>.</span>
            </div>
              })}
    </span>
  );
};
