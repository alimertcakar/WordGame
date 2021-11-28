import React, { useEffect } from "react";
import Recognition from "src/util/audio/Recognition";
import Utterance from "src/util/audio/Utterance";

interface Props {}

const Game = (props: Props) => {
  useEffect(() => {
    const recognition = new Recognition();
    recognition.emitter.on("recognition", (event) => {
      console.log(event);
    });
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
