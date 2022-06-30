import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';

type Command = 'A_COMMAND' | 'C_COMMAND'| 'L_COMMAND';

export class Parser {

    private readyForUseFileData: string[]

    constructor(
        private filePath: string,

    ) {
        this.readyForUseFileData = this.openTheInputFileAndReturnSanitizedData(this.filePath);

        for(let i=0; i<this.readyForUseFileData.length; i++){

            let commandType = this.returnCommandType(this.readyForUseFileData[i])
            console.log('COMMAND TYPE: ', commandType)
        }
    
    }   
    
    private returnCommandType(command: string): Command{
        if(command.startsWith('@')){
            return 'A_COMMAND'
        }else if(command.startsWith('(')){
            return 'L_COMMAND'
        }else{
            return 'C_COMMAND'
        } 
    }
    
    
    
    
    
    
    //Helper functions ////////////////////////////////////////////////////////
    
    private openTheInputFileAndReturnSanitizedData(filePath: string) {
        
        const fileData = fs.readFileSync(path.join(__dirname, filePath), 'utf8')
        const sanitizedFileData = this.sanitizeFileData(fileData)
        return sanitizedFileData        
    }
    

    private sanitizeFileData(data: string){
        
        let rawFileData = [];
        rawFileData = data.split('\r\n');
        _.remove(rawFileData, (ele) => ele.startsWith('//') || ele === '')
        
        for(let i=0; i<rawFileData.length; i++){
            if(rawFileData[i].includes('//')){
                const toto = rawFileData[i].split('//')
                toto.splice(1,1)
                const stringo = toto.join().trim()
                rawFileData[i] = stringo
            }
        }

        return rawFileData
    }

}

const test = new Parser('../add.asm');