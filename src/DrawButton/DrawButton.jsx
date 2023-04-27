import React, { Component } from "react";
import './DrawButton.css'
import { Vibration } from "react-native"

class DrawButton extends Component{
    constructor(props){
        super(props);

        this.drawCard = this.drawCard.bind(this);
    }

    drawCard(){
        this.props.drawCard();
        Vibration.vibrate(100) //Jeśli nie działa na androidzie ustawić na ponad 1000, niektore telefony mają ustawiony minimalny czas wibracji
    }

    render(props){
        return(
            <div className="buttonContainer">
                <button className="btn" onClick={this.drawCard}>Draw Card</button>
            </div>
        )
    }
}

export default DrawButton