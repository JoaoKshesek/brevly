export class InvalidURLFormat extends Error {
  constructor() {
    super("Formato da url inválido.");
    this.name = "InvalidURLFormat";
  }
}