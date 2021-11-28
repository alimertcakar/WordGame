import names from "src/names.json";
let mappedNames = names.join(" | ");
import EventEmitter from "events";

// used custom events impl. cuz EventTarget is not supported yet on nextjs.

export default class RecognitionControler {
  private recognition;
  public emitter;

  constructor() {
    this.emitter = new EventEmitter();
    // var grammar =
    //   "#JSGF V1.0; grammar names; public <name> =" + mappedNames + " ;";
    let recognition = new window["webkitSpeechRecognition"]();
    // var speechRecognitionList = new window["webkitSpeechGrammarList"]();
    // speechRecognitionList.addFromString(grammar, 1);
    // recognition.grammars = speechRecognitionList;
    //! grammars ile kullanınca "network" hatası veriyor. Henüz yapılmamış bir özellik (work in progress) olabilir?

    recognition.lang = "tr";
    this.recognition = recognition;

    recognition.onresult = this.recognitionEventHandler;
    recognition.onerror = this.recognitionEventHandler;
    recognition.nomatch = this.recognitionEventHandler;
  }

  private recognitionEventHandler = (event) => {
    console.log(this, "thişs");
    console.log(this.emitter, "this.emitter");
    this.emitter.emit("recognition", event);
  };

  public start() {
    this.recognition.start();
  }
}
