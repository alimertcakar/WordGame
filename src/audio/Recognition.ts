import names from "src/names.json";
let mappedNames = names.join(" | ");

export default class RecognitionControler {
  private recognition;
  constructor() {
    // let names = "x | y | z.";

    var grammar =
      "#JSGF V1.0; grammar names; public <name> =" + mappedNames + " ;";
    var recognition = new window["webkitSpeechRecognition"]();
    var speechRecognitionList = new window["webkitSpeechGrammarList"]();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = "tr-TR";
    this.recognition = recognition;
    recognition.onresult = function (event) {
      console.log(event.results);
    };
  }

  public start() {
    this.recognition.start();
  }
}
