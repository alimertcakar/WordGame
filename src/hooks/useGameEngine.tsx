import { useEffect, useState } from "react";
import Recognition from "src/util/audio/Recognition";
import { useImmerReducer } from "use-immer";

enum RoundStatus {
  Win,
  Lose,
  Timeout,
}

enum Player {
  Cpu,
  Player,
}

type GameHistoryItem = { player: Player; winner: Player; word: string };
type GameHistory = GameHistoryItem[];

type gameState = {
  round: number;
  history: GameHistory;
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
  word?: string;
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
      const nextPlayer = draft.history.at(-1).player;
      const currentPlayer = nextPlayer === Player.Cpu && Player.Player;
      draft.round++;
      const { word, status } = action.payload;

      if (status === RoundStatus.Win) {
        draft.currentWord = word;
        draft.nextStartCharacter = word.at(-1);
        const newHistoryItem = {
          player: currentPlayer,
          winner: currentPlayer,
          word,
        };
        draft.history.push(newHistoryItem);
      } else {
        const newHistoryItem = {
          player: currentPlayer,
          winner: nextPlayer,
          word: draft.currentWord,
        };
        draft.history.push(newHistoryItem);
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
      payload = { status: RoundStatus.Win, word };
    } else {
      payload = { status: RoundStatus.Lose, word };
    }

    // TODO HANDLE TIMEOUT

    dispatch({
      type: ActionType.NextRound,
      payload,
    });
  }

  return { state, nextRound };
}
