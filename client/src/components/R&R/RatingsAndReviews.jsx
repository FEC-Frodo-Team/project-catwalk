import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from '../AppContext.jsx';
import axios from 'axios';
import {Breakdown} from './Breakdown.jsx';
import {Characteristics} from './Characteristics.jsx';
import {ReviewTile} from './ReviewTile.jsx';
import {ReviewForm} from './ReviewForm.jsx';
import {ReviewContext} from './ReviewContext.jsx';
import Rating from 'react-rating';
import {SearchReviews} from './SearchReviews.jsx';

export const RatingsAndReviews = () => {
  const {reviews, reviewMetaData, products, selectedProductID} = useContext(AppContext);
  const [showMore, setShowMore] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formObj, setFormObj] = useState({'photos': []});
  const [charObj, setCharObj] = useState({});
  const [sortedBy, setSortedBy] = useState('Relevant');
  const [searchTerm, setSearchTerm] = useState('');
  const [nearBottom, setNearBottom] = useState(false);
  const [starSelected, setStarSelected] = useState({anySelected: false, 1: false, 2: false, 3: false, 4: false, 5: false});
  const totalNumberReviews = (Number(reviewMetaData.data.recommended.true)+Number(reviewMetaData.data.recommended.false));
  const percentageRecommend = reviews.data.results.length ?
    100*Number(reviewMetaData.data.recommended.true)/totalNumberReviews : 0;
  const averageRating = (Object.keys(reviewMetaData.data.ratings).reduce((previous, key)=> {
    return (previous+Number(reviewMetaData.data.ratings[key])*Number(key));
  }, 0)/totalNumberReviews).toFixed(1);


  return (
    <ReviewContext.Provider value = {{
      totalNumberReviews,
      showMore, setShowMore,
      showForm, setShowForm,
      formObj, setFormObj,
      charObj, setCharObj,
      searchTerm, setSearchTerm,
      sortedBy, setSortedBy,
      nearBottom, setNearBottom,
      starSelected, setStarSelected,
    }}>
      <div id ='ratings-reviews' style = {{width: '75%', maxWidth: '1220px', left: '15%', margin: 'auto'}}>
        <h2>Ratings & Reviews</h2>
        <div style={{width: '30%', float: 'left'}}>
          <h2>{averageRating}
             <Rating initialRating={averageRating} readonly = {true} fractions = {4}emptySymbol={<div>&#9734;</div>} fullSymbol={<div>&#9733;</div>} style={{color:'cadetblue'}}/>
          </h2>
          <p>{percentageRecommend.toFixed(1)}% of reviews recommend this product</p>
          <Breakdown />
          <Characteristics />
        </div>
        <div style={{width: '70%', float: 'left', marginBottom: '8%'}}>
        <SearchReviews />
        {Object.keys(starSelected).map((key) => {
          return starSelected[key] && key !== 'anySelected' ? <span>{key} Selected   </span>:null;
        })}
          <ReviewTile />
          <span style={{display: 'flex', justifyContent: 'space-between'}}>
            {showMore*2<=reviews.data.results.length ?<button onClick = {() => {
              setShowMore(showMore+1);
            }}>MORE REVIEWS</button>:null}
            <ReviewForm />


            <button style = {{color:'cadetblue'}}
            onClick = {() => setShowForm(!showForm)}
          className="addQ-btn"
          onMouseEnter= {(e)=>{e.target.style.outline = '1px solid', e.target.style.cursor = 'pointer'}}
          onMouseLeave= {(e)=>{e.target.style.outline = 'none'}}>
        ADD A REVIEW +
        </button>

          </span>
        </div>
      </div>
    </ReviewContext.Provider>
  );
};
