import React, { useState } from "react";
import firebase from "firebase/compat/app"
import { DB_CONFIG } from "../Config/Firebase/db_config";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './CardForm.css'

const CardForm = () => {
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const cardValues = {};
  
    var firebaseApp = firebase.initializeApp(DB_CONFIG)
    var db = firebaseApp.firestore()
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      cardValues[front] = back;
  
      // Save the card values to the database using the cardValues object
      db.collection('cards').add(cardValues)
        .then(() => {
          alert('Flashcard added!');
        })
        .catch((error) => {
          alert(error.message);
        });
  
      setFront("");
      setBack("");
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            {/* <h1>Add new flashcard</h1> */}

            <label>Front side</label>
            <input placeholder="front" value={front}
            onChange={(e) => setFront(e.target.value)}></input>
            <br></br>
            <label>Back side</label>
            <input placeholder="back" value={back}
            onChange={(e) => setBack(e.target.value)}></input>
            <br></br>
            <button className ="submitBtn" type="submit">Submit</button>
        </form>

    )
}

export default CardForm