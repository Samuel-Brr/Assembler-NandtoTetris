import * as fs from 'fs';
import * as path from 'path';
import { compMap } from '../maps/comp.map';
import { destMap } from '../maps/dest.map';
import { jumpMap } from '../maps/jump.map';
import { TComp, TDest, TJump } from './parser';

export class Instruction{
    
    constructor(
        public dest: TDest,
        public comp: TComp,
        public jump: TJump
        ){}
    
    
}

export class Translator{

    translateAInstructionAndWriteItToFile(AInstruction: string, fileToWriteTo: string){
        
        const traduction = this.translateAndReturnAInstruction(AInstruction)
        this.writeToFile(traduction, fileToWriteTo)
        
    }

    constructAndWriteCInstruction(instruction: Instruction, fileToWriteTo: string){
        const cInstruction = this.constructAndReturnCInstruction(instruction)
        this.writeToFile(cInstruction, fileToWriteTo)
    }

    private constructAndReturnCInstruction(instruction: Instruction){
        const compBinary = this.translateAndReturnComp(instruction.comp)
        const destBinary = this.translateAndReturnDest(instruction.dest)
        const jumpBinary = this.translateAndReturnJump(instruction.jump)
        const cInstruction = `111${compBinary}${destBinary}${jumpBinary}`
        
        return cInstruction
    }

    private translateAndReturnDest(dest: TDest){
        const traduction = destMap.get(dest)
        return traduction as string
    }

    private translateAndReturnComp(comp: TComp){
        const traduction = compMap.get(comp)
        return traduction as string
    }

    private translateAndReturnJump(jump: TJump){
        const traduction = jumpMap.get(jump)
        return traduction as string
    }






    //Helper function/////////////////////////////////////////////

    private translateAndReturnAInstruction(AInstruction: string){

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
    
    private writeToFile(traduction: string, filepath: string){
        fs.writeFileSync(path.join(__dirname, filepath), traduction, {flag: 'a+'})
        fs.writeFileSync(path.join(__dirname, filepath), '\n',  {flag: 'a+'})
    }
}


