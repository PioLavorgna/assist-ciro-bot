const {readFile,writeFile , read} = require('fs');
class ReadWriteFileJson{
    constructor() {
        this.oldJson = []
        this.objUsrUpdt = {}
        this.newJson = []
    }

    resolveGetJson(){
        return new Promise((res, rej)=>{
            readFile('fileJson/listUsrJson.json', 'utf8' , (error,result)=>{
                if(error){
                    console.log('**Error getJson: ',error);
                    rej(error)
                    return
                }else{
                    res(result)
                    return
                }
            })
        })
    }

    setFileJson_pt_1(objUsr){

        return new Promise((res,rej)=>{

            const idUsr_ck = []
            this.newJson = []
            
            Object.entries(JSON.parse(this.oldJson)).map((item,number) => {

                if( item[1]['id'] === objUsr['id']){

                    Object.entries(item[1]).map((item_obj,number_obj)=>{

                        if( item_obj[0] !== 'leadStatus' ){
                            if( item_obj[0] === 'clickBtn' && !idUsr_ck.includes(objUsr['id']) ){

                                Object.entries(item_obj[1]).map((cliBtnObj,index)=>{
    
                                    if( 
                                        objUsr[item_obj[0]][cliBtnObj[0]] !== cliBtnObj[1] &&
                                        !idUsr_ck.includes(objUsr['id']) &&
                                        !item_obj[1]
                                    ){
    
                                        idUsr_ck.push(objUsr['id'])
                                        this.newJson.push(objUsr)
                                        this.objUsrUpdt = objUsr
    
                                    }
    
                                })
    
                            }else if(
                                objUsr[item_obj[0]] !== item_obj[1] &&
                                !idUsr_ck.includes(objUsr['id'])
                            ){
    
                                idUsr_ck.push(objUsr['id'])
                                this.newJson.push(objUsr)
                                this.objUsrUpdt = objUsr
    
                            }
                        }
                        
                    })
                }else{
                    this.newJson.push(item[1])
                }
        
            })

            if( !idUsr_ck.includes(objUsr['id']) ){
                this.newJson.push(objUsr)
                this.objUsrUpdt = objUsr
            }      

            res(true)    
        })
    
    }

    setFileJson_pt_2(){

        return new Promise((res, rej)=>{
            writeFile('fileJson/listUsrJson.json', JSON.stringify(this.newJson), { flag: 'w' },(error,result)=>{
                if(error){
                    console.log(error);
                    return;
                }else{
                    res(result)
                }
            })

        })
        
    }

}

module.exports = {ReadWriteFileJson}