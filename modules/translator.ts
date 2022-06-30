import * as fs from 'fs';
import * as path from 'path';
import { compMap } from '../maps/comp.map';
import { destMap } from '../maps/dest.map';
import { jumpMap } from '../maps/jump.map';
import { TComp, TDest, TJump } from './parser';

export class Translator{

    constructor(
        private stringToTranslate: string,
        private fileToWriteTo: string,
    ){}

    translateAInstructionAndWriteItToFile(AInstruction: string, filePath: string){
        
        const traduction = this.translateAndReturnAInstruction(AInstruction)
        this.WriteToFile(traduction, filePath)
        
    }

    translateAndReturnDest(dest: TDest){
        const traduction = destMap.get(dest)
        return traduction
    }

    translateAndReturnComp(comp: TComp){
        const traduction = compMap.get(comp)
        return traduction
    }

    translateAndReturnJump(jump: TJump){
        const traduction = jumpMap.get(jump)
        return traduction
    }




    //Helper function/////////////////////////////////////////////

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

