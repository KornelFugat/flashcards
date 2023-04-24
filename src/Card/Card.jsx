import React from 'react';
import './Card.css';

const Card = (props) => (
    <div className='card-container'>
        <div className="card">
            <div className="front">
                <div className='side1'>{props.side1}</div>
            </div>
            <div className="back">
            <div className='side2'>{props.side2}</div>
            </div>
        </div>
    </div>
)

export default Card