import {useEffect, useState} from 'react';
import './Shop.css'
import StarRatings from 'react-star-ratings';
import phone from '../../Assets/phone.svg';
import website from '../../Assets/website.svg';

const Shop = (props) => {

    return (

        <div className="shop">

            <div className="info">

                <div className="title">
                    <h4><span id="blue">{props.name}</span> &nbsp; &#8226; &nbsp; <span id="distance">{props.distance}km away</span></h4>
                </div>

                <div className="ratings">
                    <p id="l">{props.o_rating}</p>

                    <StarRatings
                        rating={props.o_rating}
                        starRatedColor="rgb(242, 201, 76)"
                        numberOfStars={5}
                        name='rating'
                        starDimension="25px"
                        starSpacing="1px"
                      
                    />
                    
                    <p id='r'>({props.t_ratings})</p>
                </div>

               
                <p>{props.addy}</p>

            
                <div className="linkss">

                    <img src={phone}/>
                    <img src={website}/>

                </div>

                <p id='button'>See Reviews</p>


            </div>

        </div>

    )
}

export default Shop;