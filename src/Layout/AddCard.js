import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

/*
Allows the user to add a new card to an existing deck.

path = "/decks/:deckId/cards/new"

The Add Card screen has the following features:

 - The path to this screen should include the deckId (i.e., /decks/:deckId/cards/new).
 - You must use the readDeck() function from src/utils/api/index.js to load the deck that you're adding the card to.
 - There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck to which the cards are being added, 
 and finally the text Add Card (e.g., Home/React Router/Add Card).
 - The screen displays the "React Router: Add Card" deck title.
 - A form is shown with the "front" and "back" fields for a new card. Both fields use a <textarea> tag that can accommodate multiple lines of text.
 - If the user clicks "Save", a new card is created and associated with the relevant deck. 
 Then the form is cleared and the process for adding a card is restarted.
 - If the user clicks "Done", the user is taken to the Deck screen.
*/

function AddCard({ deck, setDeck, deckRender, setDeckRender }) {
  
    const { deckId } = useParams();
  
    useEffect(() => {
        const abortController = new AbortController();
        const settingDeck = async () => {
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
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
    
    const initialFormState = {
        front: "",
        back: "",
        deckId: Number(deckId),
    };

    const [formData, setFormData] = useState({ ...initialFormState });

    const handleChange = ({ target }) => {
        const value = target.value;
        setFormData({
          ...formData,
          [target.name]: value,
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        await createCard(deckId, formData);
        setFormData({ ...initialFormState });
        setDeckRender(!deckRender);
    };  
  
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
                        <li className="breadcrumb-item active" aria-current="page">
                            Add Card
                        </li>
                    </ol>
                </nav>
            </div>
            <div>
                <h3>{deck.name} : Add Card</h3>
            </div>
            <div>
                <CardForm
                    deckId={deckId}
                    formData={formData}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </div>
        </div>
    )
};



export default AddCard;
