import React, { useEffect } from "react";
import Recognition from "src/audio/Recognition";

interface Props {}

const Game = (props: Props) => {
  useEffect(() => {
    const recognition = new Recognition();

    return () => {};
  }, []);

  return <div>game</div>;
};

export default Game;
