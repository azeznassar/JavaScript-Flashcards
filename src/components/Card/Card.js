import React from 'react';
import './Card.scss';

function Card(props) {
    return (
        <div className="cardContainer">
            <div className="card">
                <div className="front">
                    <div className="question">{props.question}</div>
                </div>
                <div className="back">
                    <div className="answer">{props.answer}</div>
                </div>
            </div>
        </div>
    );
}

export default Card;