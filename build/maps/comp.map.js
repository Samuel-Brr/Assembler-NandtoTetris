"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compMap = void 0;
exports.compMap = new Map();
exports.compMap.set('0', '0101010');
exports.compMap.set('1', '0111111');
exports.compMap.set('-1', '0111010');
exports.compMap.set('D', '0001100');
exports.compMap.set('A', '0110000');
exports.compMap.set('!D', '0001101');
exports.compMap.set('!A', '0110001');
exports.compMap.set('-D', '0001111');
exports.compMap.set('-A', '0110011');
exports.compMap.set('D+1', '0011111');
exports.compMap.set('A+1', '0110111');
exports.compMap.set('D-1', '0001110');
exports.compMap.set('A-1', '0110010');
exports.compMap.set('D+A', '0000010');
exports.compMap.set('D-A', '0010011');
exports.compMap.set('A-D', '0000111');
exports.compMap.set('D&A', '0000000');
exports.compMap.set('D|A', '0010101');
exports.compMap.set('M-1', '1110010');
exports.compMap.set('D+M', '1000010');
exports.compMap.set('D-M', '1010011');
exports.compMap.set('M-D', '1000111');
exports.compMap.set('D&M', '1000000');
exports.compMap.set('D|M', '1010101');
exports.compMap.set('M', '1110000');
exports.compMap.set('!M', '1110001');
exports.compMap.set('-M', '1110011');
exports.compMap.set('M+1', '1110111');
