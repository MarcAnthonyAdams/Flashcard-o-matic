import React, { useEffect } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index.js";
import Card from "./Card.js";
import "./Deck.css";

/*
Shows all of the information about a specified deck with options to edit or add cards to the deck, 
navigate to the study screen, or delete the deck.

path = "/decks/:deckId"

The Deck screen has the following features:

 - The path to this screen should include the deckId (i.e., /decks/:deckId).
 - You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
 - There is a breadcrumb navigation bar with a link to home / followed by the name of the deck (e.g., Home/React Router).
 - The screen includes the deck name (e.g., "React Router") and deck description 
 (e.g., "React Router is a collection of navigational components that compose declaratively in your application").
 - The screen includes "Edit", "Study", "Add Cards", and "Delete" buttons. Each button takes the user to a different destination, as follows:

| Button Clicked | Destination |
| -------------- | ---------------------------------------------------------------------------------------------- |
| "Edit" | Edit Deck Screen |
| "Study" | Study screen |
| "Add Cards" | Add Card screen |
| "Delete" | Shows a warning message before deleting the deck]( See the "Delete Card Prompt" section below) |

Each card in the deck:

 - is listed on the page under the "Cards" heading.
 - shows a question and the answer to the question.
 - has an “Edit” button that takes the user to the Edit Card screen when clicked.
 - has a “Delete” button that allows that card to be deleted.

Delete Card Prompt
 - When the user clicks the "Delete" button associated with a card, a warning message is shown and the user can click "OK" or "Cancel". 
 If the user clicks "OK", the card is deleted.

You can use window.confirm() to create the modal dialog shown in the screenshot below.


*/

function Deck({ deck, setDeck, deckRender, setDeckRender }) {

    const { deckId } = useParams();
    const history = useHistory();
    const { url } = useRouteMatch();
   
    useEffect(() => {
        setDeck({});
        const abortController = new AbortController();
        const settingDeck = async () => {
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(() => {
                    return response;
                });
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log(error);
                } else {
                    throw error;
                }
            }
        };
        settingDeck();
        return () => {
            abortController.abort();
        };
    }, [deckId, setDeck]);

    const cards = deck.cards;

    if (!cards) {
        return null;
    }
    
    function deckDeleteHandler() {
        const confirmBox = window.confirm("Are you sure you want to delete this deck?");
        if(confirmBox === true) {
            deleteDeck(deckId);
            setDeckRender(!deckRender);
            history.push("/");
        }
    }

    
      return (
         <div>
             <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/">Home</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {deck.name}
                        </li>
                    </ol>
                </nav>
            </div>
            <div>
                <h1>{deck.name}</h1>
                <p>{deck.description}</p>
                <div className="deck-btn-container">
                    <div className="deck-link-btns-container">
                        <div className="edit-btn">
                            <Link 
                                to={`${url}/edit`}
                            >
                                <button
                                    type="button" 
                                    className="btn btn-secondary"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                    Edit
                                </button>
                            </Link>
                        </div>
                        <div className="study-btn">
                            <Link 
                                to={`${url}/study`}
                            >
                                <button
                                    type="button" 
                                    className="btn btn-primary"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
                                    <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                    </svg>
                                    Study
                                </button>
                            </Link>
                        </div>
                        <div className="add-cards-btn">
                            <Link 
                                to={`${url}/cards/new`}
                            >
                                <button
                                    type="button" 
                                    className="btn btn-primary"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                                    </svg>
                                    Add Cards
                                </button>
                            </Link>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={deckDeleteHandler}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button> 
                </div>     
            </div>
            <div className="cards-container">
                <h2>Cards</h2>
                <ol>
                    <li>
                        {cards.map((card, index) => {
                            return (
                                <div key={index}>
                                   <Card card={card} deckRender={deckRender} setDeckRender={setDeckRender} />
                                </div>
                            )
                        })}
                    </li>
                </ol>
            </div>  
        </div>
    );   
};

export default Deck;