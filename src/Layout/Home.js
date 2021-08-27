import React from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import "./Home.css";


/*
Shows a list of decks with options to create, study, view, or delete a deck.

The Home screen has the following features:

 - The path to this screen should be /.
 - A "Create Deck" button is shown and clicking it brings the user to the Create Deck screen.
 - Existing decks are each shown with the deck name, the number of cards, and a “Study,” “View,” and “Delete” button.
 - Clicking the “Study” button brings the user to the Study screen.
 - Clicking the “Edit” button brings the user to the Edit Deck screen.
 - Clicking the “Delete” button shows a warning message before deleting the deck.

 Delete Deck prompt
When the user clicks the "Delete" button, a warning message is shown and the user can click "OK" or "Cancel". 
If the user clicks "OK", the deck is deleted and the deleted deck is no longer visible on the Home screen.
You can use window.confirm() to create the modal dialog shown in the screenshot below.
*/

function Home({ decks, deckRender,  setDeckRender }) {

    const history = useHistory();
    const { url} = useRouteMatch();
    

    return (
        <div>
            <div className="create-deck-btn">
                <Link 
                    to={`${url}decks/new`}
                >
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        Create Deck  
                    </button>
                </Link>
            </div>
            <div>
                <ol>
                    <li>
                        {decks.map((deck, index) => {
                            const deckId = deck.id;
                            function deckDeleteHandler() {
                                const confirmBox = window.confirm("Are you sure you want to delete this deck?");
                                if(confirmBox === true) {
                                    deleteDeck(deckId);
                                    setDeckRender(!deckRender);
                                    history.push(`${url}`);
                                }
                            }
                            return (
                                <div key={index} className="deck-container">
                                    <div className="deck-card">
                                        <h4>{deck.name}</h4>
                                        <p>{deck.cards.length} cards</p>
                                    </div>
                                <p>{deck.description}</p>
                                <div className="deck-btn-container">
                                    <div className="deck-link-btns-container">
                                        <div className="view-btn">
                                            <Link 
                                                to={`${url}decks/${deckId}`}
                                            >
                                                <button 
                                                    type="button" 
                                                    className="btn btn-secondary"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                    </svg> 
                                                    View
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="edit-btn">
                                            <Link 
                                                to={`${url}decks/${deckId}/study`}                                   
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
                            )
                        })}
                    </li>
                </ol>  
            </div>   
        </div>
    )
    
};


export default Home; 