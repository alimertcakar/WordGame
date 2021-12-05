import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { GameState, playRound } from "src/slices/game";
import Recognition from "src/util/audio/Recognition";
import Utterance from "src/util/audio/Utterance";

export default function useRecognition(
  state: GameState,
  isPlayersTurn: boolean
) {
  const dispatch = useDispatch();
  const recognition = useRef(new Recognition()).current;

  useEffect(() => {
    recognition.emitter.on("recognition", (event) => {
      let results = { confidence: 0, transcript: "" };
      try {
        results = event.results[0][0];
      } catch {}
      const { confidence, transcript } = results;
      if (isPlayersTurn) {
        console.log(transcript, "transcript");
        dispatch(playRound(transcript));
      }
    });
  }, [dispatch, recognition.emitter, isPlayersTurn]);

  useEffect(() => {
    if (isPlayersTurn) {
      recognition.start();
    }
  }, [state.round, dispatch, recognition.emitter, recognition, isPlayersTurn]);

  //   return {};
}
