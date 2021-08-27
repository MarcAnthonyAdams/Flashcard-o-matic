import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import FlashCard from "./FlashCard.js";


/*
Allows the user to study the cards from a specified deck.

path = "/decks/:deckId/study"

The Study screen has the following features:

 - The path to this screen should include the deckId (i.e., /decks/:deckId/study).
 - You must use the readDeck() function from src/utils/api/index.js to load the deck that is being studied.
 - There is a breadcrumb navigation bar with links to home /, 
 followed by the name of the deck being studied and finally the text Study (e.g., Home/Rendering In React/Study).
 - The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.
 - Cards are shown one at a time, front-side first.
 - A button at the bottom of each card "flips" it to the other side.
 - After flipping the card, the screen shows a next button (see the "Next button" section below) to continue to the next card.
 - After the final card in the deck has been shown, a message (see the "Restart prompt" section below) 
 is shown offering the user the opportunity to restart the deck.
     - If the user does not restart the deck, they should return to the home screen.
 - Studying a deck with two or fewer cards should display a "Not enough cards" message 
 (see the "Not enough cards" section below) and a button to add cards to the deck.


Next button
 - The next button appears after the card is flipped.

Restart prompt
 - When all cards are finished, a message is shown and the user is offered the opportunity to restart the deck. 
 If the user does not restart the deck, they return to the home screen.

You can use window.confirm() to create the modal dialog shown in the screenshot below.

Not enough cards
 - Studying a Deck with two or fewer cards should display a "Not enough cards" message and a button to add cards to the deck.
 - Clicking the "Add Cards" button should take the user to the Add Card screen.
*/

function Study({ deck, setDeck }) {
    
    const { deckId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        const settingDeck = async () => {
          try {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(() => {
              return response;
            });
          } catch (error) {
            console.log(error)
//             if (error.name === "AbortError") {
//               console.log(error);
//             } else {
//               throw error;
//             }
          }
        };
        settingDeck();
        return () => {
          abortController.abort();
        };
      }, [deckId, setDeck]);
    

      const flashCards = deck.cards;

      if (!flashCards) {
        return null;
      }

      const cardCount = flashCards.length;

     

    if (deck && Object.keys(deck).length > 0) {
        return (
            <div>
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href={`/decks/${deckId}`}>{deck.name}</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                Study
                            </li>
                        </ol>
                    </nav>
                </div>
                <h1>{deck.name}: Study</h1>
                {cardCount < 3 ? (
                    <div>
                        <h2>Not enough cards</h2>
                        <p>You need at least 3 cards to study.</p>
                        {cardCount === 1 ? (
                            <p>There is 1 card in this deck.</p>
                         ) : (
                             <p>There are {cardCount} cards in this deck.</p>
                         ) }
                         <Link 
                            to ={"/decks/:deckId/cards/new"}
                        >
                            <button
                               type="button" 
                               className="btn btn-primary" 
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                                </svg>
                                Add Cards
                            </button>   
                        </Link>
                    </div>
                ) : (
                    <div>
                        <FlashCard flashCards={flashCards}/>
                    </div>
                )}
            </div>
        )
    } else {
        console.log("we got no deck??", deck);
    return <div>loading!</div>;
    }


};



export default Study;