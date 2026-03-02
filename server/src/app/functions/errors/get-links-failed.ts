export class GetLinksFailed extends Error {
    constructor() {
        super("Erro ao carregar links.");
        this.name = "GetLinksFailed";
    }
}