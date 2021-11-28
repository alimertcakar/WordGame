export default class Utterance {
  private voice;
  private synth;

  constructor() {
    this.synth = window.speechSynthesis;
    this.synth.onvoiceschanged = function () {
      this.voice = this.synth.getVoices()[0];
    };

    console.log(this.synth.getVoices(), "voices");
  }

  public speak(word: string) {
    let utterer = new SpeechSynthesisUtterance(word);
    utterer.voice = this.voice;

    this.synth.speak(utterer);
  }
}
