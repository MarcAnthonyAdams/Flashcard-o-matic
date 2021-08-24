import React from "react";
import { useHistory, useParams } from "react-router-dom";

function CardForm ({ deckId, formData, handleSubmit, handleChange}) {

    const { cardId } = useParams();
    const history = useHistory();

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="front">Front</label>
                <textarea
                    id="front"
                    type="text"
                    name="front"
                    onChange={handleChange}
                    value={formData.front}
                    placeholder="Front side of card"
                />
                <label htmlFor="description">Back</label>
                <textarea
                    id="back"
                    type="text"
                    name="back"
                    onChange={handleChange}
                    value={formData.back}
                    placeholder="Back side of card"
                />
                <button 
                    type="button" 
                    class="btn btn-secondary" 
                    onClick={() => history.push(`/decks/${deckId}`)}
                >
                    {cardId ? "Cancel" : "Done"}
                </button>
                <button 
                    type="submit"
                    class="btn btn-primary"
                >
                    {cardId ? "Submit" : "Save"}
                </button>
            </form>        
        </div>
    )
};

export default CardForm;