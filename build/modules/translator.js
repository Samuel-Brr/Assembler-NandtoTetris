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
exports.Translator = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const comp_map_1 = require("../maps/comp.map");
const dest_map_1 = require("../maps/dest.map");
class Translator {
    constructor(stringToTranslate, fileToWriteTo) {
        this.stringToTranslate = stringToTranslate;
        this.fileToWriteTo = fileToWriteTo;
    }
    translateAInstructionAndWriteItToFile(AInstruction, filePath) {
        const traduction = this.translateAndReturnAInstruction(AInstruction);
        this.WriteToFile(traduction, filePath);
    }
    translateAndReturnDest(dest) {
        const traduction = dest_map_1.destMap.get(dest);
        return traduction;
    }
    translateAndReturnComp(comp) {
        const traduction = comp_map_1.compMap.get(comp);
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
    WriteToFile(traduction, filepath) {
        fs.writeFileSync(path.join(__dirname, filepath), traduction, { flag: 'a+' });
        fs.writeFileSync(path.join(__dirname, filepath), '\n', { flag: 'a+' });
    }
}
exports.Translator = Translator;
const test = new Translator('toto', 'tata');
test.translateAndReturnComp('A+1');
