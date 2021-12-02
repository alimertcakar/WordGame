import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import consts from "src/domain/gameConstants";
import { RootState } from "src/store";
import { batch } from "react-redux";

export enum Player {
  Cpu,
  Player,
}
type GameHistoryItem = { player: Player; winner: Player; word: string };
type GameHistory = GameHistoryItem[];

export interface GameState {
  round: number;
  currentWord: string;
  currentPlayer: Player;
  nextPlayer: Player;
  nextStartCharacter: string;
  history: GameHistory;
}

const initialState: GameState = {
  round: 0,
  currentPlayer: Player.Player,
  nextPlayer: Player.Cpu,
  history: [{ player: Player.Cpu, winner: Player.Cpu, word: "Mert" }],
  currentWord: "Mert",
  nextStartCharacter: "t",
};

enum RoundStatus {
  Win,
  Lose,
  Timeout,
}

type RoundPayload = {
  status: RoundStatus;
  word?: string;
};
type HistoryPayload = {
  status: RoundStatus;
  word?: string;
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
    addHistoryEntry: (state, action: PayloadAction<HistoryPayload>) => {
      const { word, status } = action.payload;
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

      if (status === RoundStatus.Lose || status === RoundStatus.Timeout) {
        state.history.push(historyLose());
      } else {
        state.history.push(historyWin());
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
  },
});

export const {
  roundWin,
  roundLose,
  roundTie,
  roundTimeout,
} = gameSlice.actions;

export const gameSelector = (state: RootState): GameState => state.game;

export default gameSlice.reducer;

//

function playRound() {
  return (dispatch, getState) => {
    batch(() => {
      //   dispatch(something())
      //   dispatch(something())
    });
  };
}
