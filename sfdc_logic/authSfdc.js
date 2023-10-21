require('dotenv').config()
const {readFile,writeFile , read} = require('fs');
const https = require('https');
const {AuthRespSFDC} = require('../js/classUtils')

let authRespSFDC = new AuthRespSFDC();

class ObjsSFDC{
    constructor() {
        this.body_lead = {}
        this.body_Qsts = {}
    }

    get_ListLeads(){

        return new Promise((res, rej)=>{
            readFile('fileJson/listUsrJson.json', 'utf8' , (error,result)=>{
                if(error){
                    console.log('**Error getJson: ',error);
                    rej(error)
                    return
                }else{

                    const list_lds = []
                    
                    Object.entries(JSON.parse(result)).map((item,number) => {

                        list_lds.push(
                            {
                                method : "PATCH",
                                url : `/services/data/v56.0/sobjects/Lead/ExternalId__c/${item[1].id}`,
                                referenceId : `Lead_${number}`,
                                body : {
                                    Company :"#ND",
                                    Username_Telegram__c :`${item[1].usrName}`,
                                    Telegram_FirstName__c :`${item[1].firstName}`,
                                    Telegram_LastName__c :`${item[1].lastName}`,
                                    FirstName :`${item[1].lastName === '#ND'  ? '' : item[1].firstName }`,
                                    LastName :`${item[1].lastName === '#ND'  ? item[1].firstName : item[1].lastName }`,
                                    Last_Use_Date__c :`${item[1].useDate}`,
                                    Telegram_Lenguage__c :`${item[1].leng}`,
                                    Count_Usr_Send_Msg__c : item[1].countUsrSendMsg,
                                    LeadSource :`Telegram`,
                                    Status :`Start Bot`,
                                    Start__c : item[1]['clickBtn']['start'],
                                    Select_Lenguage__c : item[1]['clickBtn']['selectLeng'],
                                    Who_Is__c : item[1]['clickBtn']['whoIs'],
                                    His_Experiences__c : item[1]['clickBtn']['hisExperiences'],
                                    What_Does_It_Offer__c : item[1]['clickBtn']['whatDoesItOffer'],
                                    Contact_Him__c : item[1]['clickBtn']['contactHim'],
                                    E_Comerce_Integrations__c : item[1]['clickBtn']['eComerceIntegrations'],
                                    Service_Marketing__c : item[1]['clickBtn']['serviceMarketing'],
                                    Data_Migration__c : item[1]['clickBtn']['dataMigration'],
                                    Migration_Call_Back__c : item[1]['clickBtn']['migrationCallBack'],
                                    Team_Leader_Trainer__c : item[1]['clickBtn']['teamLeaderTrainer']
                                }
                            }
                        )

                    })

                    this.body_lead = {
                        allOrNone : true,
                        compositeRequest : list_lds
                    }

                    res( ( list_lds.length > 0 ) )
                    return
                }
            })
        })

    }

    get_ListQuestions(){

        return new Promise((res, rej)=>{
            readFile('fileJson/listQstJson.json', 'utf8' , (error,result)=>{
                if(error){
                    console.log('**Error getJson: ',error);
                    rej(error)
                    return
                }else{

                    const list_qsts = []
                    
                    Object.entries(JSON.parse(result)).map((item,number) => {
                        console.log('>>>> DATETIME: ',item[1]);
                        list_qsts.push(
                            {
                                method : "POST",
                                url : "/services/data/v56.0/sobjects/Question_Bot__c",
                                referenceId : `Qst_${number}`,
                                body : {
                                    Lead__r:{
                                        ExternalId__c:`${item[1].tg_IdUsr}`
                                    },
                                    UsernaName_Telegram__c:`${item[1].tg_Username}`,
                                    Telegram_FirstName__c:`${item[1].tg_firstName}`,
                                    Telegram_LastName__c:`${item[1].tg_lastName}`,
                                    Last_Use_Date__c:`${item[1].tg_last_Use_Date}`,
                                    Telegram_Lenguage__c:`${item[1].tg_lenguage}`,
                                    Salutation__c:`${item[1].Salutation}`,
                                    Name__c:`${item[1].LastName}`,
                                    Title__c:`${item[1].Title}`,
                                    Phone__c:`${item[1].Phone}`,
                                    Mobile__c:`${item[1].Mobile}`,
                                    Email__c:`${item[1].Email}`,
                                    Company__c:`${item[1].NameFactory}`,
                                    Website__c:`${item[1].Website}`,
                                    WebUrlLinkedin__c:`${item[1].WebUrlLinkedin}`,
                                    TimeProgectDuration__c:`${item[1].TimeProgectDuration}`,
                                    Budget__c:`${item[1].Budget}`,
                                    Ral__c:item[1].Ral,
                                    JobDescription__c:`${item[1].JobDescription}`,
                                    Privacy__c:`${item[1].Privacy}`
                                }
                            }
                        )

                    })

                    this.body_Qsts = {
                        allOrNone : true,
                        compositeRequest : list_qsts
                    }

                    res( ( list_qsts.length > 0 ) )
                    return
                }
            })
        })

    }

    authSFDC(){

        return new Promise((res,rej)=>{

            const parametersSFDC = {
                grant_type : process.env.grant_type,
                client_id : process.env.client_id,
                client_secret : process.env.client_secret,
                usernameSFDC : process.env.usernameSFDC,
                password : process.env.password,
            }
        
            const paramsSFDC = encodeURI(`/services/oauth2/token?grant_type=password&client_id=${parametersSFDC.client_id}
            &client_secret=${parametersSFDC.client_secret}
            &username=${parametersSFDC.usernameSFDC}
            &password=${parametersSFDC.password}`)
        
            const options = {
                protocol:'https:',
                host: "login.salesforce.com",
                path:paramsSFDC.replaceAll('%0A%20%20%20%20',''),
                method: 'POST',
            }
        
            console.log('',options);
        
            const request = https.request(options, (response) => {
        
                console.log(`STATUS: ${response.statusCode}`);
                console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
        
                response.setEncoding('utf8');
        
                response.on('data', (chunk) => {
                    console.log(`BODY: ${chunk}`);
                    authRespSFDC.update( JSON.parse(chunk))
                });
        
                response.on('end', () => {
                    console.log('No more data in response.');
                    if( response.statusCode !== 200){
                        //inviare notifica push di errore
                        rej(JSON.parse(resp))
                    }else{
                        console.log('RESP: ',authRespSFDC);
                        res('200')
                    }
                });
                
            });
              
            request.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
            });
              
            request.end();

        })
        
    }

    upsertLeads(){

        return new Promise((res,rej)=>{
            const options = {
                protocol:'https:',
                host: `${authRespSFDC.instance_url}`,
                method: 'POST',
                path: `/services/data/v56.0/composite`,
                headers: {
                    authorization : `Bearer ${authRespSFDC.access_token}`,
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                    'Accept-Charset' : 'UTF-8'
                },
            }
        
            console.log('',options);
        
            const request = https.request(options, (response) => {
        
                console.log(`STATUS: ${response.statusCode}`);
                console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
        
                response.setEncoding('utf8');
        
                response.on('data', (chunk) => {
                    console.log(`BODY: ${chunk}`);
                    //authRespSFDC.update( JSON.parse(chunk))
                });
        
                response.on('end', () => {
                    console.log('No more data in response.');
                    if( response.statusCode !== 200){
                        //inviare notifica push di errore
                        rej(JSON.parse(resp))
                    }else{
                        //console.log('RESP: ',authRespSFDC);
                        res('200')
                    }
                });
                
            });
              
            request.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
            });

            request.write(JSON.stringify(this.body_lead));
              
            request.end();

        })

    }

    upsertQuestions(){

        return new Promise((res,rej)=>{

            if( this.body_Qsts.compositeRequest.length > 0 ){
                const options = {
                    protocol:'https:',
                    host: `${authRespSFDC.instance_url}`,
                    method: 'POST',
                    path: `/services/data/v56.0/composite`,
                    headers: {
                        authorization : `Bearer ${authRespSFDC.access_token}`,
                        Accept : 'application/json',
                        'Content-Type' : 'application/json',
                        'Accept-Charset' : 'UTF-8'
                    },
                }
            
                const request = https.request(options, (response) => {
            
                    console.log(`STATUS: ${response.statusCode}`);
                    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
            
                    response.setEncoding('utf8');
            
                    response.on('data', (chunk) => {
                        console.log(`BODY: ${chunk}`);
                        //authRespSFDC.update( JSON.parse(chunk))
                    });
            
                    response.on('end', () => {
                        console.log('No more data in response.');
                        if( response.statusCode !== 200){
                            //inviare notifica push di errore
                            rej(JSON.parse(resp))
                        }else{
                            //console.log('RESP: ',authRespSFDC);

                            writeFile(
                                'fileJson/listQstJson.json', 
                                JSON.stringify( [] ), 
                                { flag: 'w' },
                                (error,result)=>{
                                if(error){
                                    console.log(error);
                                    return;
                                }else{
                                    res('200')
                                }
                            })

                        }
                    });
                    
                });
                  
                request.on('error', (e) => {
                    console.error(`problem with request: ${e.message}`);
                });
    
                request.write(JSON.stringify(this.body_Qsts));
                  
                request.end();
            }else console.log('JSON VUOTO')
            
        })

    }
}

module.exports = {ObjsSFDC}