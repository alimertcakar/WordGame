import { useEffect, useRef, useState } from "react";
import Recognition from "src/util/audio/Recognition";
import { useImmerReducer } from "use-immer";
import constants from "src/domain/gameConstants";

enum RoundStatus {
  Win,
  Lose,
  Timeout,
}
export enum Player {
  Cpu,
  Player,
}
enum ActionType {
  RoundWin,
  RoundLose,
  Reset,
  Timeout,
}
type GameHistoryItem = { player: Player; winner: Player; word: string };
type GameHistory = GameHistoryItem[];
export type GameState = {
  round: number;
  history: GameHistory;
  currentWord: string;
  currentPlayer: Player;
  players: PlayerList[];
  roundEnd: number;
  nextStartCharacter: string;
};
type ActionPayload = {
  status: RoundStatus;
  word?: string;
};
type Action = {
  type: ActionType;
  payload?: ActionPayload;
};
type PlayerList = {
  type: Player;
  lives: number;
  score: number;
};

const initialGameState: GameState = {
  round: 0,
  currentPlayer: Player.Player,
  players: [
    { type: Player.Player, lives: 3, score: 0 },
    { type: Player.Cpu, lives: 1, score: 0 },
  ],
  history: [{ player: Player.Cpu, winner: Player.Cpu, word: "Mert" }],
  roundEnd: Date.now() + constants.game.timePerRound * constants.msToSecond,
  currentWord: "Mert",
  nextStartCharacter: "t",
};

function reducer(draft: GameState, action: Action) {
  if (action.type === ActionType.Reset) {
    return initialGameState;
  }

  const nextPlayer = draft.history.at(-1).player;
  console.log(nextPlayer, "nextPlayer");

  const currentPlayer = nextPlayer === Player.Cpu ? Player.Player : Player.Cpu;

  // UPDATE ROUND
  draft.round++;
  draft.currentPlayer = nextPlayer;
  draft.roundEnd =
    Date.now() + constants.game.timePerRound * constants.msToSecond;

  const historyWin = (word) => {
    return {
      player: currentPlayer,
      winner: currentPlayer,
      word,
    };
  };
  const historyLose = () => {
    return {
      player: currentPlayer,
      winner: nextPlayer,
      word: draft.currentWord,
    };
  };

  switch (action.type) {
    case ActionType.RoundWin:
      {
        const { word } = action.payload;
        draft.currentWord = word;
        draft.nextStartCharacter = word.at(-1);
        draft.history.push(historyWin(word));
      }
      break;
    case ActionType.RoundLose:
      {
        draft.history.push(historyLose());
      }
      break;
    case ActionType.Timeout:
      {
        draft.history.push(historyLose());
        // do timeout
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

  // ROUND TIMEOUT
  useEffect(() => {
    const gameTimeout = setTimeout(() => {
      const payload = { status: RoundStatus.Timeout };
      dispatch({ type: ActionType.Timeout, payload });
    }, constants.game.timePerRound * constants.msToSecond);
    return () => {
      clearTimeout(gameTimeout);
    };
  }, [state.round, dispatch]);

  function listen() {
    recognition.start();
  }

  function playRound(word: string) {
    let payload;
    if (!word) {
      // handle no answer
    }
    const isCorrectWord = word[0] === state.nextStartCharacter; // TODO CHECK JSON, CHECK IF IN HISTORY

    if (isCorrectWord) {
      payload = { status: RoundStatus.Win, word };
      dispatch({
        type: ActionType.RoundWin,
        payload,
      });
    } else {
      payload = { status: RoundStatus.Lose, word };
      dispatch({
        type: ActionType.RoundLose,
        payload,
      });
    }
  }

  function resetGame() {
    dispatch({
      type: ActionType.Reset,
    });
  }

  return { state, nextRound: playRound, resetGame };
}
