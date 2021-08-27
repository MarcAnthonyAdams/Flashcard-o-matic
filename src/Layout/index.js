import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api/index.js";
import Header from "./Header.js";
import NotFound from "./NotFound.js";
import Home from "./Home.js";
import CreateDeck from "./CreateDeck.js";
import Study from "./Study.js";
import Deck from "./Deck.js";
import EditDeck from "./EditDeck.js";
import AddCard from "./AddCard.js";
import EditCard from "./EditCard.js";
import "./index.css";


function Layout() {
  const [ deckRender, setDeckRender ] = useState(false);
  const [ decks, setDecks ] = useState([]);
  const [ deck, setDeck ] = useState({});
  const [ card, setCard ] = useState({});
  
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
  }, [deckRender]);

  return (
    <div>
        <Header />
        <div className="container">
            {/* TODO: Implement the screen starting here */} 
            <div className="app-body">
                <Switch>
                    <Route exact path="/">
                        <Home decks={decks} deckRender={deckRender} setDeckRender={setDeckRender}/>
                    </Route>
                    <Route exact path={"/decks/new"}>
                        <CreateDeck
                            decks={decks}
                            setDecks={setDecks}  
                            deckRender={deckRender} 
                            setDeckRender={setDeckRender} 
                        />
                    </Route>
                    <Route exact path={"/decks/:deckId"}>
                        <Deck
                            deck={deck}
                            setDeck={setDeck}
                            deckRender={deckRender}
                            setDeckRender={setDeckRender}
                        />
                    </Route>
                    <Route exact path={"/decks/:deckId/study"}>
                        <Study 
                            deck={deck}
                            setDeck={setDeck}
                        />
                    </Route>
                    <Route exact path={"/decks/:deckId/edit"}>
                        <EditDeck
                            deck={deck}
                            setDeck={setDeck}
                            deckRender={deckRender}
                            setDeckRender={setDeckRender}
                        />
                    </Route>
                    <Route exact path={"/decks/:deckId/cards/new"}>
                        <AddCard
                            deck={deck}
                            setDeck={setDeck}
                            deckRender={deckRender}
                            setDeckRender={setDeckRender}
                        />
                    </Route>
                    <Route exact path={"/decks/:deckId/cards/:cardId/edit"}>
                        <EditCard
                            deck={deck}
                            setDeck={setDeck}
                            card={card}
                            setCard={setCard}
                            deckRender={deckRender}
                            setDeckRender={setDeckRender}
                        />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </div>       
        </div>
    </div>
  );
};

export default Layout;