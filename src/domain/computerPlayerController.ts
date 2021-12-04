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
      const randomName = this.getRandomName(state.game.nextStartCharacter);
      store.dispatch(playRound(randomName));
    }

    const cpuRandomWait = _.random(
      consts.timePerRound / 2, // half
      consts.timePerRound - 450 // -450ms for margin of error
    );

    setTimeout(() => {
      // PLAY A ROUND AS CPU
    }, cpuRandomWait);
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
