import React from 'react';
import './App.scss';
import Card from './components/Card/Card';
import DrawButton from './components/DrawButton/DrawButton';
import firebase from 'firebase/app';
import 'firebase/database';
import { DB_CONFIG } from './firebase/db_config';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref().child('cards');
        this.updateCard = this.updateCard.bind(this);

        this.state = {
            cards: [],
            currentCard: {}
        }
    }

    componentWillMount() {
        const currentCards = this.state.cards;

        this.database.on('child_added', snapshot => {
            currentCards.push({
                id: snapshot.key,
                question: snapshot.val().question,
                answer: snapshot.val().answer
            })

            this.setState({
                cards: currentCards,
                currentCard: this.getRandomCard(currentCards)
            })
        })
    }

    getRandomCard(currentCards) {
        let card = currentCards[Math.floor(Math.random() * currentCards.length)];
        return card;
    }

    updateCard() {
        const currentCards = this.state.cards;
        this.setState({
            currentCard: this.getRandomCard(currentCards)
        })
    }

    render(){
        return (
            <div className="App">
                <h1 className="title">JavaScript Flashcards</h1>
                <div className="cardRow">
                    <Card question={this.state.currentCard.question} answer={this.state.currentCard.answer}/>
                </div>
                <div className="buttonRow">  
                    <DrawButton drawCard={this.updateCard}/>
                </div>
            </div>
        );
    }
}

export default App;