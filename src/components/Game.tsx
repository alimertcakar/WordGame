import React, { useEffect } from "react";
import Recognition from "src/audio/Recognition";
import Utterance from "src/audio/Utterance";

interface Props {}

const Game = (props: Props) => {
  useEffect(() => {
    const recognition = new Recognition();
    recognition.start();

    const utterance = new Utterance();
    utterance.speak("merhaba test yapıyorum merhaba");
    setInterval(() => {
      utterance.speak("merhaba test yapıyorum merhaba");
    }, 1500);
  }, []);

  return (
    <div>
      game <button>sdsdss</button>
    </div>
  );
};

export default Game;
