import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import consts from "src/domain/gameConstants";
import { RootState } from "src/store";
import { batch } from "react-redux";

export enum Player {
  Cpu = "CPU",
  Player = "PLAYER",
}

export enum WinnerType {
  FirstRound = "FIRST_ROUND_NO_WINNER",
}

export type Winner = Player | WinnerType;

export type GameHistoryItem = { player: Player; winner: Winner; word: string };
type GameHistory = GameHistoryItem[];

export interface GameState {
  round: number;
  status: GameStatus;
  currentWord: string;
  currentPlayer: Player;
  nextPlayer: Player;
  nextStartCharacter: string;
  history: GameHistory;
  lives: number;
}
export enum GameStatus {
  NotStarted = "NOT_STARTED",
  Break = "BREAK",
  Playing = "PLAYING",
  GameOver = "GAME_OVER",
}

const initialState: GameState = {
  round: 0,
  status: GameStatus.NotStarted,
  currentPlayer: Player.Player,
  nextPlayer: Player.Cpu,
  history: [
    { player: Player.Cpu, winner: WinnerType.FirstRound, word: "Mert" },
  ],
  currentWord: "Mert",
  nextStartCharacter: "t",
  lives: consts.player.lives,
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

      const { currentPlayer, nextPlayer } = state;
      state.currentPlayer = nextPlayer;
      state.nextPlayer = currentPlayer;
    },
    roundLose: (state, action: PayloadAction) => {
      const { currentPlayer, nextPlayer } = state;
      if (currentPlayer === Player.Player) {
        if (state.lives < 1) {
          state.status = GameStatus.GameOver;
        } else {
          state.lives--;
        }
      } else {
        state.status = GameStatus.GameOver;
      }

      state.currentPlayer = nextPlayer;
      state.nextPlayer = currentPlayer;
    },
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
          word: "TIMEDOUT",
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
    resetGame: (state, action: PayloadAction) => {
      return initialState;
    },
  },
});

export const {
  setStatus,
  addRound,
  roundWin,
  roundLose,
  addHistoryEntry,
  resetGame,
} = gameSlice.actions;

export const gameSelector = (state: RootState): GameState => state.game;
export const historySelector = (state: RootState): GameHistory =>
  state.game.history;

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

      // End the round forcefully, (user response is timed out)
      setTimeout(() => {
        const state = getState();
        if (state.game.status === GameStatus.Playing) {
          // dispatch lose (timed out)
          dispatch(
            addHistoryEntry({
              roundStatus: RoundStatus.Timeout,
            })
          );
          dispatch(setStatus({ status: GameStatus.NotStarted }));
          dispatch(roundLose());
        }
      }, consts.timeRoundBreak + consts.timePerRound);
    });
  };
}

export function playRound(word: string) {
  return (dispatch, getState) => {
    const game: GameState = getState().game;
    const { status, currentWord } = game;
    const targetLetter = currentWord.at(-1);
    let didWin = false;

    if (status !== GameStatus.Playing) {
      throw new Error("Can't play a round if it's not in playing state");
    } else if (!word) {
      // TODO HANDLE EMPTY ANSWER
    } else if (false) {
      // TODO CHECK JSON, CHECK IF IN HISTORY
    } else if (
      word[0].toLocaleLowerCase() !== targetLetter.toLocaleLowerCase()
    ) {
    } else {
      didWin = true;
    }

    if (didWin) {
      // dispatch win
      batch(() => {
        dispatch(addHistoryEntry({ word, roundStatus: RoundStatus.Win }));
        dispatch(setStatus({ status: GameStatus.NotStarted }));
        dispatch(roundWin({ word }));
      });
    } else {
      // dispatch lose
      batch(() => {
        dispatch(addHistoryEntry({ word, roundStatus: RoundStatus.Lose }));
        dispatch(setStatus({ status: GameStatus.NotStarted }));
        dispatch(roundLose());
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
      if (newStatus === GameStatus.NotStarted) return true;
      break;
    default:
      throw new Error(
        "Tried to update status but new status is not compatible with the previous one."
      );
  }
}
