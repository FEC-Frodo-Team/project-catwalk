import React, {useContext, useEffect, useRef} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ReviewContext} from './ReviewContext.jsx';
import Rating from 'react-rating';
import axios from 'axios';
import Popup from 'reactjs-popup';


export const ReviewTile = () => {
  const {reviews, setReviews, selectedProductID} = useContext(AppContext);
  const {showMore, setShowMore, searchTerm,nearBottom, setNearBottom, starSelected} = useContext(ReviewContext);
  const reviewBox = useRef(null);

  const summaryCharBreak = 50;
//the mogen conversion library v.01
const prettifyDate = (date) => {
    if (date) {
      let reviewYear = date.slice(0, 4);
      let reviewMonth = date.slice(5, 7);
      let reviewDay = date.slice(8, 10);
      let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      if (reviewMonth[0] === '0') {
        reviewMonth = monthArray[reviewMonth[1] - 1];
      } else {
        reviewMonth = monthArray[reviewMonth - 1];
      }

      if (reviewDay[0] === '0') {
        reviewDay = reviewDay[1];
      }
      return (`${reviewMonth} ${reviewDay}, ${reviewYear}`);
    }
    return 'Just Posted!';
  };


//figure out word break for summary
  const findWordBreak = (summary) => {
    for (let i = 0; (summaryCharBreak-i)>0; i++) {
      if (summary[summaryCharBreak-i] === ' ') {
        return summaryCharBreak-i;
      }
      return summaryCharBreak;
    }
  };

  const helpful = (e) => {
    console.log('got click on help', e.target.id);
    axios.put(`api/reviews/${e.target.id}/helpful`);
  };

  const report = (e) => {
    axios.put(`api/reviews/${e.target.className}/report`)
        .then(() => {
          console.log('adasdf');
          axios
          .get(`api/reviews?product_id=${selectedProductID}&count=100`)
          .then((results) => {
            console.log('got reviews: ', results);
            setReviews(results);})
          })
  };

  const findSearchHighlight = (bodyText) => {
    if (bodyText.includes(searchTerm) && searchTerm.length>3) {
      reviewBox.current.scrollTop=0;
      const indexes = [...bodyText.matchAll(new RegExp(searchTerm, 'gi'))].map(a => a.index);
      let leftOff =indexes[0];
      console.log(indexes);
        return ( <span>
          <span>{bodyText.substring(0, indexes[0])}</span>
          {indexes.map((index)=>{
                    return (<span>{bodyText.substring(leftOff,index)}<span style={{backgroundColor: "#FFFF00"}}>{bodyText.substring(index,index+searchTerm.length)}</span><span style = {{display: 'none'}}>{leftOff = index+searchTerm.length} </span></span> )})}
                    <span>{bodyText.substring(indexes[indexes.length-1]+searchTerm.length,bodyText.length)}</span>
                </span>
        );

          }
    return bodyText;
  };

//bad dom peeking bad man!!
 // (document.getElementById('reviewBox') && showMore*2<=reviews.data.results.length) ? document.getElementById('reviewBox').addEventListener('scroll',(e) => {((e.target.scrollTop+500)>(.9*e.target.scrollHeight))? throttle():null } ): null;

 const reviewTilesToDisplay = showMore*2<=reviews.data.results.length ? reviews.data.results.slice(0,showMore*2) : reviews.data.results;
  return (
    <div ref = {reviewBox} onScroll={(e)=> {
      if (e.target.scrollHeight-e.target.scrollTop < 700) {
        setShowMore(showMore+1);
      }
    }} style = {{overflow: 'auto', minHeight: '30em',maxHeight: '500px',paddingBottom:'1em'}}>
    {reviewTilesToDisplay.map((oneResult) => {
      if (!starSelected[oneResult.rating] && starSelected.anySelected) {
        return null;
      }
      return (
        <div style = {{borderBottom: "3px solid grey", paddingTop: "20px"}}>
          <div style = {{display: "flex", justifyContent: "space-between"}}>
            <Rating readonly = {true} initialRating = {oneResult.rating} emptySymbol={<div>&#9734;</div>} fullSymbol={<div>&#9733;</div>} style={{color:'cadetblue'}}/>
            <span>{oneResult.reviewer_name || oneResult.name}, {prettifyDate(oneResult.date)}</span>
          </div>
          <div>
            <h2>{oneResult.summary.length <= summaryCharBreak ? findSearchHighlight(oneResult.summary) : findSearchHighlight(oneResult.summary.substring(0,findWordBreak(oneResult.summary)))+'...'}</h2>
          </div>
          <div style = {{paddingBottom:'10px'}}>{oneResult.summary.length > summaryCharBreak ? '...'+oneResult.summary.substring(findWordBreak(oneResult.summary),oneResult.summary.length) : null}</div>
          <div id = {oneResult.body} onClick = {(e) => {e.target.innerText = e.target.id}}>
            {oneResult.body.length <= 250 ? findSearchHighlight(oneResult.body) : <span><span>{findSearchHighlight(oneResult.body.substring(0,250))}</span><span id = {oneResult.body.substring(250,oneResult.body.length)} onClick = {(e) => {e.target.style.color = '#3f696a'; e.target.innerText = e.target.id; }}style ={{color:'blue'}}>...Show More</span></span>}
          </div>
          <div>
            {oneResult.photos.map((onePhoto=> {
                   return (
                    <span>
                      <Popup trigger={<img
                        style={{width: '6em', height: '6em', margin: '1em'}}
                        onMouseEnter= {(e)=>{e.target.style.outline = '3px solid', e.target.style.cursor = 'pointer'}}
                        onMouseLeave= {(e)=>{e.target.style.outline = 'none'}}
                        src={onePhoto.url}/>}
                      modal
                      nested
                      >
                        {(close) => (
                          <div className="modal">
                            <span className="close" onClick={close}>&times;</span>
                            <img className="modal-box"
                              src={onePhoto.url}
                              onClick={close} />
                          </div>
                        )}
                      </Popup>

                    </span>);
              // return (<img src = {onePhoto.url} style = {{width: '10%', height: '10%'}}/>);
            }))}
          </div>
          {oneResult.recommend?<div style = {{padding:'2px'}}>√ I recommend this product</div>:null}
          {oneResult.response?<div style = {{backgroundColor: "grey"}}>
            <h2>Response:</h2>
            <p>{oneResult.response}</p>
            </div>:null}
          <div className="report"><span id = {oneResult.review_id } className = {oneResult.helpfulness}
          onClick= {(e) => {helpful(e);console.log(e.target.className);e.target.innerText = `Helpful? Yes(${Number(e.target.className)+1})`}}
          onMouseEnter= {(e)=>{e.target.style.textDecoration = 'underline', e.target.style.cursor = 'pointer'}}
          onMouseLeave= {(e)=>{e.target.style.textDecoration = 'none'}}>
            Helpful? Yes({oneResult.helpfulness})</span>
            <span className = {oneResult.review_id }
            onClick = {(e)=>{report(e)}}
            onMouseEnter= {(e)=>{e.target.style.textDecoration = 'underline', e.target.style.cursor = 'pointer'}}
           onMouseLeave= {(e)=>{e.target.style.textDecoration = 'none'}}

            >|  Report</span></div>
      </div>);
    })}
  </div>

  );
};

