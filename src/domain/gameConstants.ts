const secondToMs = 1000;

const consts = {
  secondToMs,
  timePerRound: 3 * secondToMs,
  timeRoundBreak: 10 * secondToMs,
  game: {
    maxRoundsUntilTie: 20,
  },
  cpu: {
    guessFailRateMultiplier: 1.03,
  },
  player: {
    lives: 3,
  },
};

export default consts;
