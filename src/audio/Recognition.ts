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
    recognition.lang = "tr";
    this.recognition = recognition;
    recognition.onresult = function (event) {
      alert("xxx");
      console.log(event.results);
    };
    recognition.onerror = function (event) {
      alert("error");
      console.log(event);
    };
    recognition.nomatch = function (event) {
      alert("nomatch");
      console.log(event);
    };
  }

  public start() {
    this.recognition.start();
  }
}
