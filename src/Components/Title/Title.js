import React from 'react'
import './Title.css'

const Title = (props) => {
        
    return (
        <div className="title-text">

            <h3>Find My Barber</h3>

            <div className="text">
                <p>{props.text1}</p>
                <p>{props.text2}</p>
            </div>

        </div>
    )
}

export default Title