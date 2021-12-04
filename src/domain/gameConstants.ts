const secondToMs = 1000;

const consts = {
  secondToMs,
  timePerRound: 6 * secondToMs,
  timeRoundBreak: 1 * secondToMs,
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

const isDev = process.env.NODE_ENV === "development";

export { isDev };
