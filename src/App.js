import * as React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Card from './Card/Card';
import DrawButton from './DrawButton/DrawButton';
import { db } from './firebase.js';
import { collection, getDocs } from "firebase/firestore";
import Popup from './Popup/Popup';


  function App(){

    const [state,setState] = useState({
      cards: [],
      currentCard: {} 
    })
    const currentCards = state.cards;
    console.log(currentCards)


    const [buttonPopup, setButtonPopup] = useState(false);


  // Component.jsx
  const fetchCards = async () => {
  const classesCollection = await getDocs(collection(db, "cards"));
  classesCollection.forEach((doc) => {
        Object.entries(doc.data()).forEach(([key,value]) => {
          currentCards.push({
            id:doc.id,
            side1: key,
            side2: value
          })
          
          })
          setState(prev => ( {
            ...prev,
            cards: currentCards,
            currentCard: getRandomCard(currentCards)
          }))
        });
        console.log(state)
      }

useEffect(() => {
  fetchCards();
  window.addEventListener('devicemotion', updateCard);
  return () => window.removeEventListener('devicemotion', updateCard);
},[]);
    

  function getRandomCard(currentCards){
    var randomIndex = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomIndex];
    if(card === state.currentCard){
      getRandomCard(currentCards)
    }
    console.log(card);
    return(card);
    
  };

  function updateCard(){
    const currentCards = state.cards;
    setState(prev => ( {
      ...prev,
      cards: currentCards,
      currentCard: getRandomCard(currentCards)
    }))
  }
  
//   render() {
    return (
      <div className="App">
        <h1>Flashcards</h1>
        <div className="cardRow">
          <Card side1={state.currentCard.side1}
            side2={state.currentCard.side2}
          />
        </div>
        <div className="buttonRow">
          <DrawButton drawCard={updateCard}/>
        </div>
      <br></br>

      <button className = "addCardBtn" onClick={() => setButtonPopup(true)}>Add new flashcard</button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>

      </Popup>
      </div>
    );}
//   }

export default App;