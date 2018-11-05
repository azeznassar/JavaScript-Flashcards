import React, { useState, useEffect }  from 'react';
import './App.scss';
import Card from './components/Card/Card';
import DrawButton from './components/DrawButton/DrawButton';
import firebase from 'firebase/app';
import 'firebase/database';
import { DB_CONFIG } from './firebase/db_config';

const app = firebase.initializeApp(DB_CONFIG);
const database = app.database().ref().child('cards');

function App () {

    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState({ question: 'Draw a card to begin', answer: ''});

    useEffect(() => {
        const currentCards = cards;

        database.on('child_added', snapshot => {
            currentCards.push({
                id: snapshot.key,
                question: snapshot.val().question,
                answer: snapshot.val().answer
            });

            setCards(currentCards);
        });           
        
    });

    function getRandomCard(currentCards) {
        let card = currentCards[Math.floor(Math.random() * currentCards.length)];
        return card;
    }

    function updateCard() {
        const currentCards = cards;
        setCurrentCard(getRandomCard(currentCards));
    }

    return (
        <div className="App">
            <h1 className="title">JavaScript Flashcards</h1>
            <div className="cardRow">
                <Card question={currentCard.question} answer={currentCard.answer}/>
            </div>
            <div className="buttonRow">  
                <DrawButton drawCard={updateCard}/>
            </div>
        </div>
    );
}

export default App;