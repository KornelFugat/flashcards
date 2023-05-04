import * as React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Card from './Card/Card';
import DrawButton from './DrawButton/DrawButton';
import { db } from './firebase.js';
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router";
import { useUserAuth } from "./UserAuthContext";
import { Button } from "react-bootstrap";
import Popup from './Popup/Popup';
import Popup2 from './PopUp2/Popup2';
    
  function App(){
    const [state,setState] = useState({
      cards: [],
      currentCard: {},
      currentCardIndex: 0,
    })
    const currentCards = state.cards;
    const currentCardIndex = state.currentCardIndex;

    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonPopup2, setButtonPopup2] = useState(false);
    const { user } = useUserAuth();
    const userId = user ? user.uid : null;
  
  // Component.jsx
  const fetchCards = async (userId) => {
    const classesCollection = await getDocs(collection(db, "cards"));
    console.log(userId);
    currentCards.length = 0;
    console.log(currentCards);
    classesCollection.forEach((doc) => {
      if (doc.data().userId === userId) {
        Object.entries(doc.data()).forEach(([key, value]) => {
          if (key !== "userId") {
            currentCards.push({
              id: doc.id,
              side1: key,
              side2: value,
            });
          }
        });}
    });
    if (currentCards.length === 0) {
      currentCards.push({
        id: undefined,
        side1: "Twoja pierwsza karta",
        side2: "Stwórz nową",
      });
    }
    
  
    setState((prev) => ({
      ...prev,
      cards: currentCards,
      currentCard: currentCards[0],
    }));
    console.log(currentCards);
  };

useEffect(() => {

  fetchCards(userId);
},[userId]);

  function updateCard() {
    const newIndex = (currentCardIndex + 1) % currentCards.length;
    setState((prev) => ({
      ...prev,
      currentCardIndex: newIndex,
      currentCard: currentCards[newIndex],
    }));
  }
  
  const navigate = useNavigate();

  const goProfile = async () => {
    try {
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
    }
  }
  
//   render() {
    return (
      <div className="App">
        <h1>Flashcards</h1>
        <div className="topLeft">
        <Button variant="primary" onClick={goProfile}>
          Profile
        </Button>
      </div>
      <div className="bottomRight">
      <button className = "addCardBtn2" onClick={() => setButtonPopup2(true)}>Add feedback</button>
      </div>
        <div className="cardRow">
          <Card side1={state.currentCard.side1}
            side2={state.currentCard.side2}
          />
        </div>
        <div>{state.currentCardIndex+1} / {state.cards.length}</div>
        <div className="buttonRow">
          <DrawButton drawCard={updateCard}/>
        </div>
        <button className = "addCardBtn" onClick={() => setButtonPopup(true)}>Add new flashcard</button>
      
      <br></br>
      
      
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>

      </Popup>
      <Popup2 trigger={buttonPopup2} setTrigger={setButtonPopup2}>

      </Popup2>
        
      </div>
    );}
//   }

export default App;