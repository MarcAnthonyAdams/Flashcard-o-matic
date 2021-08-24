import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

/*
allows the user to modify information on an existing card.

path = "/decks/:deckId/cards/:cardId/edit"

The Edit Card screen has the following features:

 - The path to this screen should include the deckId and the cardId (i.e., /decks/:deckId/cards/:cardId/edit).
 - You must use the readDeck() function from src/utils/api/index.js to load the deck that contains the card to be edited. 
 Additionally, you must use the readCard() function from src/utils/api/index.js to load the card that you want to edit.
 - There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member, 
 and finally the text Edit Card :cardId (e.g., Home/Deck React Router/Edit Card 4).
 - It displays the same form as the Add Card screen, except it is pre-filled with information for the existing card. It can be edited and updated.
 - If the user clicks on either "Save" or "Cancel", the user is taken to the Deck screen.
*/

function EditCard({ deck, setDeck, card, deckRender, setDeckRender }) {

    const { deckId, cardId } = useParams();
    const history = useHistory();

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

    useEffect(() => {
        const abortController = new AbortController();
        const settingCard = async () => {
            try {
                const response = await readCard(cardId, abortController.signal);
                setFormData(response)  
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log(error);
                } else {
                    throw error;
                }
            }
        };
        settingCard();
        return () => {
            abortController.abort();
        };
    }, [cardId]);

    const initialFormState = {
        id: Number(cardId),
        front: card.front,
        back: card.back,
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
        await updateCard(formData);
        setDeckRender(!deckRender);
        history.push(`/decks/${deckId}`);
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
                            Edit Card {cardId}
                        </li>
                    </ol>
                </nav>
            </div>
            <div>
                <h2>{deck.name} : Edit Card</h2>
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


export default EditCard;