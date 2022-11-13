

export const checkStringSize = (sizeOfText:number,text:string) =>{

    let returnText = text

    if(text.length > sizeOfText){
        returnText = '...' + text.substring(0,sizeOfText) 
    }

    return returnText

}