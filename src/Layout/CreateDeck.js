import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listDecks, createDeck } from "../utils/api";
import DeckForm from "./DeckForm";



/*
Allows the user to create a new deck.

path = "/decks/new"

The Create Deck screen has the following features:

 - The path to this screen should be /decks/new.
 - There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck).
 - A form is shown with the appropriate fields for creating a new deck.
    - The name field is an <input> field of type text.
    - The description field is a <textarea> field that can be multiple lines of text.
 - If the user clicks "submit", the user is taken to the Deck screen.
 - If the user clicks "cancel", the user is taken to the Home screen.

Deck
 - The Deck screen displays all of the information about a deck.
*/

function CreateDeck({ decks, setDecks, deckRender, setDeckRender }) {

    const history = useHistory();

    useEffect(() => {
        setDecks([]);
        const abortController = new AbortController();
        const signal = abortController.signal;
        const settingDecks = async () => {
          try {
            const response = await listDecks(signal);
            setDecks(response);
          } catch (error) {
            console.log(error);
          }
        };
        settingDecks();
        return () => {
          abortController.abort();
        };
      }, [deckRender, setDecks]);
    

    const initialFormState = {
        id: decks.index + 1,
        name: "",
        description: "",
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
        console.log( formData.id, formData.name, formData.description);
        setFormData({ ...initialFormState });
        const responseNewDeck = await createDeck(formData);
        setDeckRender(!deckRender);
        history.push(`/decks/${responseNewDeck.id}`)
    };  


    return (
      
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/">Home</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Create Deck
                        </li>
                    </ol>
                </nav>
            </div>
            <div>
                <h1>Create Deck</h1>
                <DeckForm 
                    formData={formData}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </div>
        </div>    
    );
};



export default CreateDeck;