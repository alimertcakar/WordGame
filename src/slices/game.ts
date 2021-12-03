import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import consts from "src/domain/gameConstants";
import { RootState } from "src/store";
import { batch } from "react-redux";

export enum Player {
  Cpu = "CPU",
  Player = "PLAYER",
}
type GameHistoryItem = { player: Player; winner: Player; word: string };
type GameHistory = GameHistoryItem[];

export interface GameState {
  round: number;
  status: GameStatus;
  currentWord: string;
  currentPlayer: Player;
  nextPlayer: Player;
  nextStartCharacter: string;
  history: GameHistory;
}
export enum GameStatus {
  NotStarted = "NOT_STARTED",
  Break = "BREAK",
  Playing = "PLAYING",
  RoundEnd = "ROUND_END",
}

const initialState: GameState = {
  round: 0,
  status: GameStatus.NotStarted,
  currentPlayer: Player.Player,
  nextPlayer: Player.Cpu,
  history: [{ player: Player.Cpu, winner: Player.Cpu, word: "Mert" }],
  currentWord: "Mert",
  nextStartCharacter: "t",
};

enum RoundStatus {
  Win = "WIN",
  Lose = "LOSE",
  Timeout = "TIMEOUT",
}

type RoundPayload = {
  word?: string;
};
type HistoryPayload = {
  word?: string;
  roundStatus: RoundStatus;
};
type StatusPayload = {
  status: GameStatus;
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addRound: (state, action: PayloadAction) => {
      const { currentPlayer, nextPlayer } = state;
      state.round++;
      state.currentPlayer = nextPlayer;
      state.nextPlayer = currentPlayer;
    },
    setStatus(state, action: PayloadAction<StatusPayload>) {
      const { status } = action.payload;
      const shouldUpdateStatus = statusFilter(state.status, status);
      if (shouldUpdateStatus) {
        state.status = status;
      }
    },
    roundWin: (state, action: PayloadAction<RoundPayload>) => {
      const { word } = action.payload;
      state.currentWord = word;
      state.nextStartCharacter = word.at(-1);
    },
    roundLose: (state, action: PayloadAction) => {},
    roundTie: (state, action: PayloadAction) => {},
    roundTimeout: (state, action: PayloadAction) => {},
    addHistoryEntry: (state, action: PayloadAction<HistoryPayload>) => {
      const { word, roundStatus } = action.payload;
      const { currentPlayer, nextPlayer } = state;

      const historyWin = () => {
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
          word: state.currentWord,
        };
      };

      if (
        roundStatus === RoundStatus.Lose ||
        roundStatus === RoundStatus.Timeout
      ) {
        state.history.push(historyLose());
      } else {
        state.history.push(historyWin());
      }
    },
  },
});

export const {
  setStatus,
  addRound,
  roundWin,
  roundLose,
  roundTie,
  roundTimeout,
  addHistoryEntry,
} = gameSlice.actions;

export const gameSelector = (state: RootState): GameState => state.game;

export default gameSlice.reducer;

//
// thunks
//

export function startRound() {
  return (dispatch, getState) => {
    const state = getState();
    if (state.game.status !== GameStatus.NotStarted) {
      throw new Error(
        "Can't start a new round when the previous is still playing"
      );
    }

    batch(() => {
      // Initiate new round
      dispatch(addRound());
      dispatch(setStatus({ status: GameStatus.Break }));

      // Start the round after break
      setTimeout(() => {
        dispatch(setStatus({ status: GameStatus.Playing }));
      }, consts.timeRoundBreak);

      // End the round
      setTimeout(() => {
        dispatch(setStatus({ status: GameStatus.RoundEnd }));
      }, consts.timeRoundBreak + consts.timePerRound);
    });
  };
}

export function playRound(word: string) {
  return (dispatch, getState) => {
    const state = getState();
    const { status, currentWord } = state.game;
    const targetLetter = currentWord.at(-1);
    let didWin = false;

    if (status !== GameStatus.Playing) {
      throw new Error("Can't play a round if it's not in playing state");
    } else if (!word) {
      // TODO HANDLE EMPTY ANSWER
    } else if (false) {
      // TODO CHECK JSON, CHECK IF IN HISTORY
    } else if (word[0] !== targetLetter) {
    } else {
      didWin = true;
    }

    if (didWin) {
      // dispatch win
      batch(() => {
        dispatch(setStatus({ status: GameStatus.RoundEnd }));
        dispatch(roundWin({ word }));
        dispatch(addHistoryEntry({ word, roundStatus: RoundStatus.Win }));
        // dispatch addHistoryEntry
      });
    } else {
      // dispatch lose
      batch(() => {
        dispatch(setStatus({ status: GameStatus.RoundEnd }));
        dispatch(roundLose());
        dispatch(addHistoryEntry({ word, roundStatus: RoundStatus.Lose }));
      });
    }
  };
}

//
// utilities...
//

function statusFilter(status: GameStatus, newStatus: GameStatus): boolean {
  if (status === GameStatus.NotStarted && newStatus === GameStatus.NotStarted) {
    return false; // Round already ended.
  }

  switch (status) {
    case GameStatus.NotStarted:
      if (newStatus === GameStatus.Break) return true;
      break;
    case GameStatus.Break:
      if (newStatus === GameStatus.Playing) return true;
      break;
    case GameStatus.Playing:
      if (newStatus === GameStatus.RoundEnd) return true;
      break;
    case GameStatus.RoundEnd:
      break;
    default:
      throw new Error(
        "Tried to update status but new status is not compatible with the previous one."
      );
  }
}
