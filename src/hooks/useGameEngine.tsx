import { useEffect, useState } from "react";
import Recognition from "src/util/audio/Recognition";
import { useImmerReducer } from "use-immer";

enum RoundStatus {
  Win,
  Lose,
  Timeout,
}

type gameState = {
  round: number;
  history: [];
  currentWord: string;
  nextStartCharacter: string;
};

const initialGameState: gameState = {
  round: 0,
  history: [],
  currentWord: "Mert",
  nextStartCharacter: "t",
};

enum ActionType {
  Reset,
  NextRound,
}

type ActionPayload = {
  status: RoundStatus;
  nextWord?: string;
};

type Action = {
  type: ActionType;
  payload: ActionPayload;
};

function reducer(draft: gameState, action: Action) {
  switch (action.type) {
    case ActionType.Reset:
      return initialGameState;
    case ActionType.NextRound:
      draft.round++;
      const { nextWord, status } = action.payload;
      if (status === RoundStatus.Win) {
        draft.currentWord = nextWord;
        draft.nextStartCharacter = nextWord.at(-1);
      } else {
      }
      break;
    default:
      throw new Error();
  }
}

export default function useGameEngine() {
  const [state, dispatch] = useImmerReducer(reducer, initialGameState);

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
    let payload;
    if (!word) {
      // handle no answer
    }

    if (word[0] === state.nextStartCharacter) {
      payload = { status: RoundStatus.Win, nextWord: word };
    } else {
      payload = { status: RoundStatus.Lose };
    }

    dispatch({
      type: ActionType.NextRound,
      payload,
    });
  }

  return { state, nextRound };
}
