import React from 'react';
import './DrawButton.scss';

class DrawButton extends React.Component {
    constructor(props) {
        super(props);
        this.drawCard = this.drawCard.bind(this);
    }

    drawCard() {
        this.props.drawCard();
    }

    render(props) {
        return  <button className="drawButton" onClick={this.drawCard}>Next Card</button>
    }
}

export default DrawButton;