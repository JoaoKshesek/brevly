export class InvalidSlugFormat extends Error {
  constructor() {
    super("Formato do link encurtado inválido.");
    this.name = "InvalidSlugFormat";
  }
}