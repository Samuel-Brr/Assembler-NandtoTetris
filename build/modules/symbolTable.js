"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolTable = void 0;
class SymbolTable {
    constructor() {
        this.symbolTable = new Map();
        this.symbolTable.set('SP', '0000000000000000');
        this.symbolTable.set('LCL', '0000000000000001');
        this.symbolTable.set('ARG', '0000000000000010');
        this.symbolTable.set('THIS', '0000000000000011');
        this.symbolTable.set('THAT', '0000000000000100');
        this.symbolTable.set('R0', '0000000000000000');
        this.symbolTable.set('R1', '0000000000000001');
        this.symbolTable.set('R2', '0000000000000010');
        this.symbolTable.set('R3', '0000000000000011');
        this.symbolTable.set('R4', '0000000000000100');
        this.symbolTable.set('R5', '0000000000000101');
        this.symbolTable.set('R6', '0000000000000110');
        this.symbolTable.set('R7', '0000000000000111');
        this.symbolTable.set('R8', '0000000000001000');
        this.symbolTable.set('R9', '0000000000001001');
        this.symbolTable.set('R10', '0000000000001010');
        this.symbolTable.set('R11', '0000000000001011');
        this.symbolTable.set('R12', '0000000000001100');
        this.symbolTable.set('R13', '0000000000001101');
        this.symbolTable.set('R14', '0000000000001110');
        this.symbolTable.set('R15', '0000000000001111');
        this.symbolTable.set('SCREEN', '0100000000000000');
        this.symbolTable.set('KBD', '0110000000000000');
    }
}
exports.SymbolTable = SymbolTable;
