import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./FlashCard.css";

function FlashCard({ flashCards }) {

    const [ cardNum, setCardNum ] = useState(0);
    const [ flipped, setFlipped] = useState(false);

    const history = useHistory();

    const cardFront = flashCards.map((card) => {return card.front});
    const cardBack = flashCards.map((card) => {return card.back});
    const cardTotal = flashCards.length;
    const cardCount = cardNum + 1;
    
    function flipHandler() {
        setFlipped(!flipped);
    };

    function cardHandler() {
        setCardNum(cardNum + 1);
        setFlipped(!flipped);
        if (cardCount === cardTotal && flipped === true) {
            const confirmBox = window.confirm("Restart cards? \n \n Click 'cancel' to return to the home page")
            confirmBox ? setCardNum(0) : history.push("/");
        }
    };
    
    return (
        <div className="flashcard-container">
            <h2>Card {cardCount} of {cardTotal}</h2>
            {flipped ? (
                <div>
                    <p>{cardBack[cardNum]}</p>
                    <div className="flashcard-btn-container"> 
                        <div className="flip-btn">
                            <button 
                                type="button" 
                                class="btn btn-secondary"
                                onClick={flipHandler}
                            >
                                flip
                            </button>
                        </div>
                        <div className="next-btn">
                            <button 
                                type="button" 
                                class="btn btn-primary"
                                onClick={cardHandler}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p>{cardFront[cardNum]}</p>
                    <button 
                        type="button" 
                        class="btn btn-secondary"
                        onClick={flipHandler}
                    >
                        flip
                    </button>
                </div>
            )} 
        </div>
    )
};

export default FlashCard;