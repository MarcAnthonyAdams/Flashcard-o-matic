import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import DeckForm from "./DeckForm";

/*
Allows the user to modify information on an existing deck.

path = "/decks/:deckId/edit"

The Edit Deck screen has the following features:

 - The path to this screen should include the deckId(i.e., /decks/:deckId/edit).
 - You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
 - There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck being edited, 
 and finally the text Edit Deck (e.g., Home/Rendering in React/Edit Deck).
 - It displays the same form as the Create Deck screen, except it is pre-filled with information for the existing deck.
 - The user can edit and update the form.
 - If the user clicks "Cancel", the user is taken to the Deck screen.
*/

function EditDeck({ deck, setDeck, deckRender, setDeckRender }) {

    const { deckId } = useParams();
    const history = useHistory();

    const initialFormState = {
        id: deck.id,
        name: deck.name,
        description: deck.description,
    };

    const [formData, setFormData] = useState({ ...initialFormState });

    useEffect(() => {
        const abortController = new AbortController();
        const settingDeck = async () => {
            try {
                const response = await readDeck(deckId, abortController.signal);
                setFormData(response);
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

    const handleChange = ({ target }) => {
        const value = target.value;
        setFormData({
          ...formData,
          [target.name]: value,
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const responseUpdateDeck = await updateDeck(formData);
        setDeckRender(!deckRender);
        history.push(`/decks/${responseUpdateDeck.id}`)
    }

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
                            Edit Deck
                        </li>
                    </ol>
                </nav>
            </div>
            <div>
                <h1>Edit Deck</h1>
            </div>
            <div>
                <DeckForm 
                    formData={formData}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </div>
        </div>
    );
};


  


export default EditDeck;