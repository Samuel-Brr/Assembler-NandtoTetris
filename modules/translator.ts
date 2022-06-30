import * as fs from 'fs';
import * as path from 'path';

export class Translator{

    constructor(
        private stringToTranslate: string,
        private fileToWriteTo: string,
    ){}

    translateAInstructionAndWriteItToFile(AInstruction: string, filePath: string){
        
        const traduction = this.translateAndReturnAInstruction(AInstruction)
        this.WriteToFile(traduction, filePath)
        
    }

    //Helper function

    translateAndReturnAInstruction(AInstruction: string){

        let parsed = parseInt(AInstruction)
        const restArray = []
        while(parsed>0){
            const rest = parsed % 2
            restArray.unshift(rest)   
            parsed = Math.trunc(parsed/2)
        }

        for(let i=0; restArray.length<16; i++){
                restArray.unshift(0)    
        }

        const traduction = restArray.join('').trim()
        return traduction

    }
    WriteToFile(traduction: string, filepath: string){
        fs.writeFileSync(path.join(__dirname, filepath), traduction, {flag: 'a+'})
        fs.writeFileSync(path.join(__dirname, filepath), '\n',  {flag: 'a+'})
    }
}

const test = new Translator('toto', 'tata')
test.translateAInstructionAndWriteItToFile('13', '../test.txt')