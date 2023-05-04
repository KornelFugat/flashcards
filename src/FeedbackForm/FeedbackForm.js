import React, { useState } from "react";
import Rating from "react-rating-stars-component";
import firebase from "firebase/compat/app"
import { DB_CONFIG } from "../Config/Firebase/db_config";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './FeedbackForm.css';
import { useUserAuth } from "../UserAuthContext"

const FeedbackForm = () => {
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState("");
    const feedbackValues = {};
    const currentDate = new Date().toLocaleDateString();
    const { user } = useUserAuth();
    const userId = user.uid;

  
    var firebaseApp = firebase.initializeApp(DB_CONFIG)
    var db = firebaseApp.firestore()
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      feedbackValues.userId = userId;
      feedbackValues.rating = rating;
      feedbackValues.comments = comments;
      feedbackValues.date = currentDate;
      


      // Save the card values to the database using the cardValues object
      db.collection('feedback').add(feedbackValues)
        .then(() => {
          alert('Feedback added!');
        })
        .catch((error) => {
          alert(error.message);
        });
  
      setRating(0);
      setComments("");
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
          <label>Rating:</label>
          <Rating
            value={rating}
            size={40}
            activeColor="#ffd700"
            onChange={(value) => setRating(value)}
          />
          <br />
          <label>Comments:</label>
          <textarea
            placeholder="Enter your comments here"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
          <br />
          <button className="submitBtn" type="submit">
            Submit
          </button>
        </form>
      );
}

export default FeedbackForm