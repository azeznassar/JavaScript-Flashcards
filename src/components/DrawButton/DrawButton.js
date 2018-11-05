import React from 'react';
import './DrawButton.scss';

function DrawButton(props) {

    function drawCard() {
        props.drawCard();
    }

    return  <button className="drawButton" onClick={drawCard}>Next Card</button>
}

export default DrawButton;