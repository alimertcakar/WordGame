import { useEffect, useReducer, useState } from "react";
import Recognition from "src/util/audio/Recognition";

const gameState = {
  round: 0,
  history: [],
  currentWord: "Mert",
  nextStartCharacter: "t",
};

function reducer(state, action) {
  switch (action.type) {
    case "next-round":
      return { round: state.round + 1 };
    default:
      throw new Error();
  }
}

export default function useGameEngine() {
  const [state, dispatch] = useReducer(reducer, gameState);

  useEffect(() => {
    const recognition = new Recognition();
    recognition.emitter.on("recognition", (event) => {
      console.log(event);
    });
    recognition.start();

    // const utterance = new Utterance();
    // utterance.speak("merhaba test yapıyorum merhaba");
  }, []);

  function nextRound(word: string) {
    if (!word) {
      // handle no answer
    }
    if (word[0] === state.nextStartCharacter) {
    }

    dispatch({ type: "next-round", payload: {} });
  }
}
