import { GameStatus, Player, playRound, startRound } from "src/slices/game";
import names from "../names.json";
import _ from "lodash";
import consts from "./gameConstants";
import { store } from "src/store";

class ComputerPlayerController {
  constructor() {}

  static handleAction(action, state): void {
    const shouldCpuPlay =
      action.type === "game/setStatus" &&
      action.payload.status === GameStatus.Playing &&
      state.game.currentPlayer === Player.Cpu;

    const shouldCpuStartRound =
      (action.type === "game/roundWin" || action.type === "game/roundLose") &&
      state.game.status === GameStatus.NotStarted &&
      state.game.currentPlayer === Player.Cpu;

    if (shouldCpuStartRound) {
      store.dispatch(startRound());
    }

    if (shouldCpuPlay) {
      const cpuRandomWait = _.random(0, consts.timePerRound / 2); // %25 margin of error
      const randomName = this.getRandomName(state.game.nextStartCharacter);
      const cpuFailRate =
        state.game.round ** consts.cpu.guessFailRateMultiplier;
      const didCpuFail = cpuFailRate / 100 > Math.random();

      if (!didCpuFail) {
        setTimeout(() => {
          // PLAY A ROUND AS CPU
          store.dispatch(playRound(randomName));
        }, cpuRandomWait);
      }
    }
  }

  static getRandomName(letter: string) {
    const namesStaringWithLetter = names.filter((name) =>
      name.startsWith(letter.toLocaleLowerCase())
    );
    const randomNameIndex = _.random(0, namesStaringWithLetter.length);
    const randomName = namesStaringWithLetter[randomNameIndex];

    return randomName;
  }
}

export function computerPlayerMiddleware({ getState }) {
  return (next) => (action) => {
    const returnValue = next(action);
    ComputerPlayerController.handleAction(action, getState());
    return returnValue;
  };
}
