import { GameStatus, Player, playRound } from "src/slices/game";
import names from "../names.json";
import _ from "lodash";
import consts from "./gameConstants";
import { store } from "src/store";

class ComputerPlayerController {
  constructor() {}

  static handleAction(action, state) {
    const shouldCpuPlay =
      action.type === "game/setStatus" &&
      action.payload.status === GameStatus.Playing &&
      state.game.currentPlayer === Player.Cpu;

    if (shouldCpuPlay) {
      const cpuRandomWait = _.random(0, consts.timePerRound / 1.1); // %10 margin of error
      const randomName = this.getRandomName(state.game.nextStartCharacter);
      const cpuFailRate =
        state.game.round ** consts.cpu.guessFailRateMultiplier;
      const didCpuFail = cpuFailRate / 100 > Math.random();
      console.log(didCpuFail, "didCpuFail");
      console.log(cpuFailRate / 100, "cpuFailRate");
      console.log(Math.random(), "Math.random();");

      if (!didCpuFail) {
        setTimeout(() => {
          // PLAY A ROUND AS CPU
          store.dispatch(playRound(randomName));
        }, cpuRandomWait);
      }
    }
  }

  static getRandomName(letter) {
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
