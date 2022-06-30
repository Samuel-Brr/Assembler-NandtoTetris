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
exports.Parser = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const _ = __importStar(require("lodash"));
class Parser {
    constructor(filePath) {
        this.filePath = filePath;
        this.readyForUseFileData = this.openTheInputFileAndReturnSanitizedData(this.filePath);
        for (let i = 0; i < this.readyForUseFileData.length; i++) {
            let commandType = this.returnCommandType(this.readyForUseFileData[i]);
            if (commandType === 'A_COMMAND' || commandType === 'L_COMMAND') {
                let symbol = this.returnSymbol(this.readyForUseFileData[i]);
            }
            else {
                let dest = this.returnDest(this.readyForUseFileData[i]);
                let comp = this.returnComp(this.readyForUseFileData[i]);
                console.log(comp);
            }
        }
    }
    returnCommandType(command) {
        if (command.startsWith('@')) {
            return 'A_COMMAND';
        }
        else if (command.startsWith('(')) {
            return 'L_COMMAND';
        }
        else {
            return 'C_COMMAND';
        }
    }
    returnSymbol(rawCommand) {
        if (rawCommand.startsWith('@')) {
            const symbol = rawCommand.replace('@', '').trim();
            return symbol;
        }
        else {
            const symbol = rawCommand.replace('(', '').replace(')', '').trim();
            return symbol;
        }
    }
    returnDest(command) {
        if (!command.includes('=')) {
            return null;
        }
        else {
            const temporaryArray = command.split('=');
            const dest = temporaryArray[0].trim();
            return dest;
        }
    }
    returnComp(command) {
        if (!command.includes('=')) {
            const temporaryArray = command.split(';');
            const comp = temporaryArray[0].trim();
            return comp;
        }
        else if (!command.includes(';')) {
            const temporaryArray = command.split('=');
            const comp = temporaryArray[1].trim();
            return comp;
        }
        else {
            const temporaryArray = command.split(/=|;/);
            const comp = temporaryArray[1].trim();
            return comp;
        }
    }
    //Helper functions ////////////////////////////////////////////////////////
    openTheInputFileAndReturnSanitizedData(filePath) {
        const fileData = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
        const sanitizedFileData = this.sanitizeFileData(fileData);
        return sanitizedFileData;
    }
    sanitizeFileData(data) {
        let rawFileData = [];
        rawFileData = data.split('\r\n');
        _.remove(rawFileData, (ele) => ele.startsWith('//') || ele === '');
        for (let i = 0; i < rawFileData.length; i++) {
            if (rawFileData[i].includes('//')) {
                const toto = rawFileData[i].split('//');
                toto.splice(1, 1);
                const stringo = toto.join().trim();
                rawFileData[i] = stringo;
            }
        }
        return rawFileData;
    }
}
exports.Parser = Parser;
const test = new Parser('../add.asm');
