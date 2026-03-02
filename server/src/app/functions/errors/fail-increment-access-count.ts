export class LinkNotFound extends Error {
  constructor() {
    super("URL não encontrada.");
    this.name = "LinkNotFound";
  }
}