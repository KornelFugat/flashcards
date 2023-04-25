import React from 'react'
import './Popup.css'
import CardForm from '../CardForm/CardForm';

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
            <h2>Add new flashcard</h2>
            <CardForm />
            <button className='close-btn' onClick={() => props.setTrigger(false)}>Close</button>
            {props.children}
        </div>
    </div>
  ) : "";
}

export default Popup