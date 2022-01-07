import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import Rating from 'react-rating';

export const AverageRating = () => {
  const {reviews, reviewMetaData, products, selectedProductID} = useContext(AppContext);
  const totalNumberReviews = (Number(reviewMetaData.data.recommended.true)+Number(reviewMetaData.data.recommended.false));
  const averageRating = (Object.keys(reviewMetaData.data.ratings).reduce((previous, key)=> {
    return (previous+Number(reviewMetaData.data.ratings[key])*Number(key));
  }, 0)/totalNumberReviews).toFixed(1);

  return (
    <div>
      <Rating initialRating={averageRating} readonly = {true} fractions = {4} emptySymbol={<div>&#9734;</div>} fullSymbol={<div>&#9733;</div>}/>
      <a href='#ratings-reviews'>{'Read all reviews (' + totalNumberReviews + ')'}</a>
    </div>
  );
};
