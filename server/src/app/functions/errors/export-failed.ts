
export class ExportFailed extends Error {
    constructor() {
        super("Erro ao exportar CSV.");
        this.name = "ExportFailed";
    }
}