import { useEffect, useRef, useState } from "react";
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
enum ActionType {
  RoundWin,
  RoundLose,
  Reset,
}
type GameHistoryItem = { player: Player; winner: Player; word: string };
type GameHistory = GameHistoryItem[];
type gameState = {
  round: number;
  history: GameHistory;
  currentWord: string;
  currentPlayer: Player;
  nextStartCharacter: string;
};
type ActionPayload = {
  status: RoundStatus;
  word?: string;
};
type Action = {
  type: ActionType;
  payload: ActionPayload;
};

const initialGameState: gameState = {
  round: 0,
  history: [{ player: Player.Cpu, winner: Player.Cpu, word: "Mert" }],
  currentPlayer: Player.Cpu,
  currentWord: "Mert",
  nextStartCharacter: "t",
};

function reducer(draft: gameState, action: Action) {
  const nextPlayer = draft.history.at(-1).player;
  const currentPlayer = nextPlayer === Player.Cpu && Player.Player;

  // update next round
  draft.round++;
  draft.currentPlayer = nextPlayer;

  switch (action.type) {
    case ActionType.Reset:
      return initialGameState;
    case ActionType.RoundWin:
      {
        const { word } = action.payload;
        draft.currentWord = word;
        draft.nextStartCharacter = word.at(-1);
        const newHistoryItem = {
          player: currentPlayer,
          winner: currentPlayer,
          word,
        };
        draft.history.push(newHistoryItem);
      }
      break;
    case ActionType.RoundLose:
      {
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
  const recognition = useRef(new Recognition()).current;

  useEffect(() => {
    // recognition.emitter.on("recognition", (event) => {
    //   console.log(event, "event");
    //   const { confidence, transcript } = event.results[0][0];
    //   playRound(transcript);
    // });
    // listen();
    // const utterance = new Utterance();
    // utterance.speak("merhaba test yapıyorum merhaba");
  }, []);

  function listen() {
    recognition.start();
  }

  function playRound(word: string) {
    let payload;
    if (!word) {
      // handle no answer
    }
    const isCorrectWord = word[0] === state.nextStartCharacter; // TODO CHECK DATABASE, CHECK IF IN HISTORY

    if (isCorrectWord) {
      payload = { status: RoundStatus.Win, word };
      dispatch({
        type: ActionType.RoundWin,
        payload,
      });
    }
    // TODO ELSE IF: HANDLE TIMEOUT
    else {
      payload = { status: RoundStatus.Lose, word };
      dispatch({
        type: ActionType.RoundLose,
        payload,
      });
    }
  }

  return { state, nextRound: playRound };
}
