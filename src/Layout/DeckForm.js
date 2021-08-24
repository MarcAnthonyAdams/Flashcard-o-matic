import React from "react";
import { useHistory, useParams } from "react-router-dom";

function DeckForm ({ formData, handleSubmit, handleChange}) {

    const { deckId } = useParams();
    const history = useHistory();

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    placeholder="Deck Name"
                />
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    type="text"
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                    placeholder="Brief description of the deck"
                />
                <button 
                    type="button" 
                    class="btn btn-secondary"
                    onClick={() => deckId ? history.push(`/decks/${deckId}`) : history.push("/")}
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    class="btn btn-primary"
                >
                    Submit
                </button>
            </form>
        </div>
    )
};

export default DeckForm;