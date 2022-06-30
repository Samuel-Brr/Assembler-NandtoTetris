"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translator = exports.Instruction = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const comp_map_1 = require("../maps/comp.map");
const dest_map_1 = require("../maps/dest.map");
const jump_map_1 = require("../maps/jump.map");
class Instruction {
    constructor(dest, comp, jump) {
        this.dest = dest;
        this.comp = comp;
        this.jump = jump;
    }
}
exports.Instruction = Instruction;
class Translator {
    translateAInstructionAndWriteItToFile(AInstruction, fileToWriteTo) {
        const traduction = this.translateAndReturnAInstruction(AInstruction);
        this.writeToFile(traduction, fileToWriteTo);
    }
    constructAndWriteCInstruction(instruction, fileToWriteTo) {
        const cInstruction = this.constructAndReturnCInstruction(instruction);
        this.writeToFile(cInstruction, fileToWriteTo);
    }
    constructAndReturnCInstruction(instruction) {
        const compBinary = this.translateAndReturnComp(instruction.comp);
        const destBinary = this.translateAndReturnDest(instruction.dest);
        const jumpBinary = this.translateAndReturnJump(instruction.jump);
        const cInstruction = `111${compBinary}${destBinary}${jumpBinary}`;
        return cInstruction;
    }
    translateAndReturnDest(dest) {
        const traduction = dest_map_1.destMap.get(dest);
        return traduction;
    }
    translateAndReturnComp(comp) {
        const traduction = comp_map_1.compMap.get(comp);
        return traduction;
    }
    translateAndReturnJump(jump) {
        const traduction = jump_map_1.jumpMap.get(jump);
        return traduction;
    }
    //Helper function/////////////////////////////////////////////
    translateAndReturnAInstruction(AInstruction) {
        let parsed = parseInt(AInstruction);
        const restArray = [];
        while (parsed > 0) {
            const rest = parsed % 2;
            restArray.unshift(rest);
            parsed = Math.trunc(parsed / 2);
        }
        for (let i = 0; restArray.length < 16; i++) {
            restArray.unshift(0);
        }
        const traduction = restArray.join('').trim();
        return traduction;
    }
    writeToFile(traduction, filepath) {
        fs.writeFileSync(path.join(__dirname, filepath), traduction, { flag: 'a+' });
        fs.writeFileSync(path.join(__dirname, filepath), '\n', { flag: 'a+' });
    }
}
exports.Translator = Translator;
