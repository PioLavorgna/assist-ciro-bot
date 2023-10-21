require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(/* token */process.env.BOT_TOKEN, {polling: true});

const {CiroBot} = require('../js/classCiroBot')
const {UserTelegramInfo} = require('../js/classUser')
const {ReadWriteFileJson} = require('../filejson/upsertJson')
const {ObjLead} = require('../filejson/qustionFlow')

const objCiro = new CiroBot();
const usrTelInfo = new UserTelegramInfo();
const usrUprt = new ReadWriteFileJson();
const objLd = new ObjLead();

let acceptMsg = true

const objFlow = {
    len : objCiro.lang,
    start : false,
    selectLeng : false,
    whoIs : false,
    hisExperiences : false,
    whatDoesItOffer : false,
    contactHim : false,
    eComerceIntegrations : false,
    serviceMarketing : false,
    dataMigration : false,
    migrationCallBack : false,
    teamLeaderTrainer : false,
}

const infoUser = (msg)=>{
    /* console.log(`UserId is ${msg.from.id}`);
    console.log(`User name is ${msg.from.first_name} ${msg.from.last_name !== undefined ? msg.from.last_name : ''}, ${new Date()}`);
    console.log(`Username: ${msg.from.username}`);
    console.log(`Msg: ${msg.text}`); */
    if( msg.from.id !== '5862387942' && msg.from.first_name !== 'Assistant Ciro'){
        usrTelInfo.usrUpdate(msg)
    }
}

bot.setMyCommands([
    {command: '/start', description: 'Avvia/Start'},
    {command: '/lingua_language', description: 'Cambia lingua/Change language'}
]);

bot.on('message', async msg => {
    
    const text = msg.text; 
    const chatId = msg.chat.id;
    infoUser(msg)
    
    if(acceptMsg){
        objCiro.update()
        if ( objCiro.lang.length !== 0 && (msg.document || msg.photo || msg.audio)) {
            if( !objLd.startQst ){
                await bot.sendMessage(chatId, objCiro.text_function_off[objCiro.lang], objCiro.opts_home)
            }else{
                await bot.sendMessage(chatId, objCiro.text_function_off[objCiro.lang], objCiro.opts_home)
                .then((result) => {
                    
                    bot.sendMessage(
                        chatId, 
                        objCiro.lang === 'it' ?
                            `🔵 Prima domanda ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`:
                            `🔵 First question ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`,
                        {parse_mode:'HTML'}
                    )
                    .then((result) => {
                        bot.sendMessage(chatId, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_salutation)
                    }).catch((err) => {
                        
                    });

                }).catch((err) => {
                    
                });
                
            }
        }else{
            let deleteMsg = false
            
            if( text !== undefined && !objLd.startQst && (text.toLowerCase() === '/start' || text.includes('Indietro') || text.includes('Back') )){
        
                if(text.toLowerCase() === '/start'){
                    objFlow['start'] = true
                    updateUsrJS()

                    await bot.sendMessage(chatId, "Ciao, sono <b>Ciro</b> l'assistente virtuale di Pio Lavorgna,clicca su uno dei due bottoni qui sotto per poter scegliere la lingua e interagire con me",{parse_mode: 'HTML'});
                    await bot.sendMessage(chatId, "Hello, I am <b>Ciro</b>, the virtual assistant of Pio Lavorgna, click on one of the two buttons below to choose the language and interact with me 👇", objCiro.opts_select_lang);
                }else{
                    if( objCiro.lang.length === 0 ){
                        
                        await bot.sendMessage(chatId, "Clicca su uno dei due bottoni qui sotto per poter scegliere la lingua");
                        await bot.sendMessage(chatId, "Click on one of the two buttons below to choose the language 👇", objCiro.opts_select_lang);
                        objFlow['selectLeng'] = true
                        updateUsrJS()
                    }else{
                        await bot.sendMessage(chatId, objCiro.text_home[objCiro.lang], objCiro.opts_home);
                    }
                }
            }else if( text !== undefined && !objLd.startQst && objCiro.lang.length !== 0 && (text.includes('Chi è Pio Lavorgna') || text.includes('Who is Pio Lavorgna'))){
        
                let indexMsg = 0;
                acceptMsg = false

                objFlow['whoIs'] = true
                updateUsrJS()

                const timer = ()=>{
                    setTimeout(()=>{
                                        
                        if( (indexMsg+1) === objCiro.who_is_it[0][objCiro.lang].length ){
                            bot.sendMessage(chatId, objCiro.who_is_it[0][objCiro.lang][indexMsg],objCiro.opts_who_is_it)
                            acceptMsg = true
                        }else{
                            bot.sendMessage(chatId, objCiro.who_is_it[0][objCiro.lang][indexMsg],{parse_mode: 'HTML'})
                            indexMsg++
                            timer()
                        }
                        
                    }, 1200)
                }
                timer()
                
            }else if( text !== undefined && !objLd.startQst && objCiro.lang.length !== 0 && (text.includes('Le sue esperienze') || text.includes('His experiences'))){
                objFlow['hisExperiences'] = true
                updateUsrJS()
                await bot.sendMessage(chatId, objCiro.his_experiences[0][objCiro.lang][0],objCiro.opts_his_experiences)
                
            }else if( text !== undefined && !objLd.startQst && objCiro.lang.length !== 0 && (text.includes('Cosa offre') || text.includes('What does it offer'))){
        
                let indexMsg = 0;
                acceptMsg = false

                objFlow['whatDoesItOffer'] = true
                updateUsrJS()

                const timer = ()=>{
                    setTimeout(()=>{
                                        
                        if( (indexMsg+1) === objCiro.what_is_offers[0][objCiro.lang].length ){
                            bot.sendMessage(chatId, objCiro.what_is_offers[0][objCiro.lang][indexMsg],objCiro.opts_home)
                            acceptMsg = true
                        }else{
                            bot.sendMessage(chatId, objCiro.what_is_offers[0][objCiro.lang][indexMsg],{parse_mode: 'HTML'})
                            indexMsg++
                            timer()
                        }
                        
                    }, 1200)
                }
                timer()
                
            }else if( text !== undefined && !objLd.startQst && objCiro.lang.length !== 0 && (text.includes('Contattalo') || text.includes('Contact him'))){
                
                objFlow['contactHim'] = true
                updateUsrJS()
                objLd.startQst = true
                objLd.updateContactMe(objCiro.lang)
                await bot.sendMessage(chatId, objLd.text_contact_me[objCiro.lang],objLd.opts_contact_me)
                
                setTimeout(() => {
                    objLd.flowQuestions(objCiro.lang)
                    bot.sendMessage(
                        chatId, 
                        objCiro.lang === 'it' ?
                            `🔵 Prima domanda ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`:
                            `🔵 First question ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`,
                        {parse_mode:'HTML'}
                    )
                    .then((result) => {
                        bot.sendMessage(chatId, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_salutation)
                    }).catch((err) => {
                        
                    });
                    
                }, 1200);
                
                
            }else if( text !== undefined && objCiro.lang.length !== 0 && 
                (text.includes('Interrompi il questionario') || 
                text.includes('Interrupt the questionnaire'))
            ){
                objLd.updateContactMe(objCiro.lang)
                await bot.sendMessage(chatId, objLd.text_cancelQst[objCiro.lang],objLd.opts_cancellQuestion)
                
            }else if( text !== undefined && objLd.startQst ){
                
                await setQuestions(objLd.stepCountQuestion,text,msg)

                if( !objLd.ckQst && objLd.stepCountQuestion === 12){
                    await bot.sendMessage(chatId, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_privacy)  
                    
                }else if(
                    !objLd.ckQst && objLd.stepCountQuestion === 3 ||
                    !objLd.ckQst && objLd.stepCountQuestion === 7 ||
                    !objLd.ckQst && objLd.stepCountQuestion === 8 
                ){
                    await bot.sendMessage(
                        chatId, 
                        objCiro.lang === 'it' ?
                            `🔵 Prossima domanda ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`:
                            `🔵 Next question ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`,
                        {parse_mode:'HTML'}
                    )                    
                    await bot.sendMessage(chatId, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me_skip)                    
                }else if(
                    !objLd.ckQst && objLd.stepCountQuestion === 9
                ){
                    await bot.sendMessage(
                        chatId, 
                        objCiro.lang === 'it' ?
                            `🔵 Prossima domanda ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`:
                            `🔵 Next question ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`,
                            objLd.opts_contact_me
                    )                    
                    await bot.sendMessage(chatId, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_timeProgectDuration)                    
                }else if(!objLd.ckQst){

                    if( objLd.TimeProgectDuration !== 'Indeterminato' || objLd.TimeProgectDuration !== 'Indeterminate' ){

                        await bot.sendMessage(
                            chatId, 
                            objCiro.lang === 'it' ?
                                `🔵 Prossima domanda ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`:
                                `🔵 Next question ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`,
                            {parse_mode:'HTML'}
                        )                    
                        await bot.sendMessage(chatId, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me)

                    }
                                        
                }else deleteMsg = true
                objLd.ckQst = false
                
            }else if( text !== undefined && !objLd.startQst && objCiro.lang.length !== 0 && (text.includes('E-Comerce e integrazioni') || text.includes('E-commerce and integrations'))){
                
                objFlow['eComerceIntegrations'] = true
                updateUsrJS()
                
                await bot.sendMessage(chatId, objCiro.his_experiences[0][objCiro.lang][1],objCiro.opts_his_experiences)
                
            }else if( text !== undefined && !objLd.startQst && objCiro.lang.length !== 0 && (text.includes('Service e Marketing') || text.includes('Service and Marketing'))){
        
                objFlow['serviceMarketing'] = true
                updateUsrJS()

                await bot.sendMessage(chatId, objCiro.his_experiences[0][objCiro.lang][2],objCiro.opts_his_experiences)
                
            }else if( text !== undefined && !objLd.startQst && objCiro.lang.length !== 0 && (text.includes('Migrazione dati') || text.includes('Data migration'))){
        
                objFlow['dataMigration'] = true
                updateUsrJS()

                await bot.sendMessage(chatId, objCiro.his_experiences[0][objCiro.lang][3],objCiro.opts_help_migration)
                await bot.sendMessage(chatId, objCiro.text_btn_info_migration[objCiro.lang],objCiro.opts_his_experiences)
                
            }else if( text !== undefined && !objLd.startQst && objCiro.lang.length !== 0 && (text.includes('Team leader e formatore') || text.includes('Team leader and trainer'))){
        
                objFlow['teamLeadrTrainer'] = true
                updateUsrJS()

                await bot.sendMessage(chatId, objCiro.his_experiences[0][objCiro.lang][5],objCiro.opts_his_experiences)
                
            }else{
                if( text === '/lingua_language'){
                    await bot.sendMessage(chatId, "Clicca su uno dei due bottoni qui sotto per poter scegliere la lingua");
                    await bot.sendMessage(chatId, "Click on one of the two buttons below to choose the language 👇", objCiro.opts_select_lang);
                    objFlow['selectLeng'] = true
                    updateUsrJS()
                }else if( objCiro.lang.length === 0 ){
                    console.log('**** ',objLd.startQst);
                    objFlow['selectLeng'] = true
                    updateUsrJS()

                    await bot.sendMessage(chatId, "Ciao, sono <b>Ciro</b> l'assistente virtuale di Pio Lavorgna,clicca su uno dei due bottoni qui sotto per poter scegliere la lingua e interagire con me",{parse_mode: 'HTML'});
                    await bot.sendMessage(chatId, "Hello, I am <b>Ciro</b>, the virtual assistant of Pio Lavorgna, click on one of the two buttons below to choose the language and interact with me 👇", objCiro.opts_select_lang);
                    
                }else if( text !== undefined ){
                    usrTelInfo.countUsrSendMsg++
                    await bot.deleteMessage(chatId, msg.message_id)
                    .then(() => deleteMsg = true )
                    .catch((err) => console.log(err));
                    await bot.sendMessage(chatId, objCiro.lang === 'it' ? '❌ Messaggio cancellato ‼️':'❌ Message deleted ‼️', objCiro.opts_home);
                    await bot.sendMessage(chatId, random_phrases_of_apologies(objCiro.lang), objCiro.opts_home);
                }
            }
            if( !deleteMsg ){
                await bot.deleteMessage(chatId, msg.message_id)
                .then(() => console.log('Message deleted'))
                .catch((err) => console.log(err));
            }
            
            
        }

    }else if( text !== undefined ){
        await bot.deleteMessage(chatId, msg.message_id)
        .then(() => console.log('Message deleted'))
        .catch((err) => console.log(err));
    }
    
})

bot.on("callback_query", (callbackQuery) => {
    infoUser(callbackQuery.message)
    
    if( !objLd.startQst && (callbackQuery.data === 'it' || callbackQuery.data === 'us')){
        objCiro.lang = callbackQuery.data
        objCiro.update()
        objFlow['len'] = callbackQuery.data
        updateUsrJS()
        
        bot.answerCallbackQuery(callbackQuery.id)
        .then(() => bot.sendMessage(callbackQuery.message.chat.id, `<b>${objCiro.text_home[objCiro.lang]}</b>`, objCiro.opts_home));
    }else if( !objLd.startQst && callbackQuery.data === 'migration'){
        objCiro.update()
        objFlow['migrationCallBack'] = true
        updateUsrJS()
        bot.answerCallbackQuery(callbackQuery.id)
        .then(() => {
            bot.sendMessage(callbackQuery.message.chat.id, objCiro.his_experiences[0][objCiro.lang][4],objCiro.opts_his_experiences)
            bot.sendMessage(callbackQuery.message.chat.id, objCiro.text_btn_info_migration[objCiro.lang],objCiro.opts_his_experiences)
        })
        
    }else if(objLd.startQst && callbackQuery.data === 'cancellQuestion_ok'){
        bot.answerCallbackQuery(callbackQuery.id)
        .then(() => {
            objLd.startQst = false
            bot.sendMessage(
                callbackQuery.message.chat.id, 
                objCiro.lang === 'it' ? '✅ <b>Questionario interrotto come richiesto</b> ✅' : '✅ <b>Questionnaire terminated as requested</b> ✅', 
                {parse_mode:'HTML'}
            )
            .then((result) => {
                objLd.ckFlowCallBk = [false,false,false,false,false]
                bot.sendMessage(callbackQuery.message.chat.id, objCiro.text_home[objCiro.lang], objCiro.opts_home);
            }).catch((err) => {
                
            });
        })
        
    }else if(objLd.startQst && callbackQuery.data === 'cancellQuestion_ko'){
        bot.answerCallbackQuery(callbackQuery.id)
        .then(() => {
            bot.sendMessage(
                callbackQuery.message.chat.id, 
                objCiro.lang === 'it' ?
                    `🔵 Prossima domanda ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`:
                    `🔵 Next question ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`,
                {parse_mode:'HTML'}
            )
            bot.sendMessage(callbackQuery.message.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me)
        })
        
    }else if(objLd.startQst && !objLd.ckFlowCallBk[0] && callbackQuery.data.includes('salutation')){
        bot.answerCallbackQuery(callbackQuery.id)
        .then(() => {

            setQuestions(objLd.stepCountQuestion,callbackQuery.data.replace('salutation_',''),callbackQuery.message)

            bot.sendMessage(
                callbackQuery.message.chat.id, 
                objCiro.lang === 'it' ?
                    `🔵 Prossima domanda ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`:
                    `🔵 Next question ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`,
                {parse_mode:'HTML'}
            ).then((result) => {
                bot.sendMessage(callbackQuery.message.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me)
            }).catch((err) => {
                
            });
            
            
            
        })
        
    }else if(objLd.startQst && !objLd.ckFlowCallBk[1] && callbackQuery.data.includes('timeProgectDuration')){

        bot.answerCallbackQuery(callbackQuery.id)
        .then(() => {

            setQuestions(objLd.stepCountQuestion,callbackQuery.data.replace('timeProgectDuration_',''),callbackQuery.message)

            .then((result) => {
                bot.sendMessage(
                    callbackQuery.message.chat.id, 
                    objCiro.lang === 'it' ?
                        `🔵 Prossima domanda ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`:
                        `🔵 Next question ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`,
                    {parse_mode:'HTML'}
                ).then((result) => {
                    if( objLd.TimeProgectDuration === 'Indeterminato' || objLd.TimeProgectDuration === 'Indeterminate' ){ 
    
                        bot.sendMessage(callbackQuery.message.chat.id, objCiro.lang === 'it' ? 
                        'Indicami la RAL (ex. 10000,50000)':
                        'Indicate me the RAL (ex. 10000,50000)', objLd.opts_contact_me);
                    }else bot.sendMessage(
                        callbackQuery.message.chat.id, 
                        `${objLd.stepQuestion[objLd.stepCountQuestion]}`,
                        objLd.opts_budget)
                }).catch((err) => {
                    
                });
            }).catch((err) => {
                
            });

        })
        
    }else if(objLd.startQst && !objLd.ckFlowCallBk[2] && callbackQuery.data.includes('budget')){

        bot.answerCallbackQuery(callbackQuery.id)
        .then(() => {

            setQuestions(objLd.stepCountQuestion,callbackQuery.data.replace('budget_',''),callbackQuery.message)

            .then((result) => {
                bot.sendMessage(
                    callbackQuery.message.chat.id, 
                    objCiro.lang === 'it' ?
                        `🔵 Prossima domanda ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`:
                        `🔵 Next question ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`,
                    {parse_mode:'HTML'}
                ).then((result) => {
                    bot.sendMessage(
                        callbackQuery.message.chat.id, 
                        `${objLd.stepQuestion[objLd.stepCountQuestion]}`,
                        objLd.opts_contact_me)
                }).catch((err) => {
                    
                });
            }).catch((err) => {
                
            });

        })
        
    }else if(objLd.startQst && !objLd.ckFlowCallBk[3] && callbackQuery.data.includes('inf_privacy')){
        bot.answerCallbackQuery(callbackQuery.id)
        .then(() => {

            bot.sendMessage(callbackQuery.message.chat.id, `${objLd.stepQuestion[13]}`,objLd.opts_privacy)
            
        })
    }else if(objLd.startQst && !objLd.ckFlowCallBk[4] && callbackQuery.data.includes('privacy_ok')){
        
        bot.answerCallbackQuery(callbackQuery.id)
        .then(() => {

            setQuestions(objLd.stepCountQuestion,callbackQuery.data,callbackQuery.message)
            
        })

    }else if(objLd.startQst){
        bot.sendMessage(
            callbackQuery.message.chat.id, 
            objCiro.lang === 'it' ?
                `⚠️ Hai già dato questa risposta, se credi sia errata ripeti il questionario cliccando su interrompi 🛑`:
                `⚠️ You have already given this answer, if you believe it is incorrect repeat the questionnaire by clicking on interrupt 🛑`,
            {parse_mode:'HTML'}
        )
        .then((result) => {
            bot.sendMessage(
                callbackQuery.message.chat.id, 
                objCiro.lang === 'it' ?
                    `🔵 Prossima domanda ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`:
                    `🔵 Next question ( ${objLd.stepCountQuestion+1}/12 ) ⤵️`,
                {parse_mode:'HTML'}
            )
            .then((result) => {
    
                if( objLd.stepCountQuestion === 0){
                    bot.sendMessage(callbackQuery.message.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_salutation)
                }else if( 
                    objLd.stepCountQuestion === 1 || 
                    objLd.stepCountQuestion === 2 || 
                    objLd.stepCountQuestion === 4 || 
                    objLd.stepCountQuestion === 5 || 
                    objLd.stepCountQuestion === 6  
                ){
                    bot.sendMessage(callbackQuery.message.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me)
                }else if( 
                    objLd.stepCountQuestion === 3 ||  
                    objLd.stepCountQuestion === 7 ||  
                    objLd.stepCountQuestion === 8   
                ){
                    bot.sendMessage(callbackQuery.message.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me_skip)
                }else if( 
                    objLd.stepCountQuestion === 9 ){
                    bot.sendMessage(callbackQuery.message.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_timeProgectDuration)
                }else if( 
                    objLd.stepCountQuestion === 10 ){
    
                    if( objLd.TimeProgectDuration !== 'Indeterminato' || objLd.TimeProgectDuration !== 'Indeterminate' ){
                        bot.sendMessage(callbackQuery.message.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_budget)
                    }else{
                        bot.sendMessage(callbackQuery.message.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me)
                    }
                    
                }else if( 
                    objLd.stepCountQuestion === 11 ){
                    bot.sendMessage(callbackQuery.message.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me)
                }
    
            }).catch((err) => {
                
            });
        }).catch((err) => {
            
        });
        
    }
    
});

const random_phrases_of_apologies = (leng)=>{
    let random_phrasess
    Object.entries(objCiro.phrases_of_apologies).map((item,number) => {

        if( leng === item[1].lang){
            
            while(true){
                //Math.floor(Math.random() * (max - min) + min);
                let cunt_phrases = (Math.floor(Math.random() * (item[1].phrases.length - 1 + 1)) + 1)-1;

                if( !objCiro.count_phrases_of_apologies.includes( cunt_phrases ) ){

                    objCiro.count_phrases_of_apologies.push(cunt_phrases)
                    random_phrasess = item[1].phrases[cunt_phrases]
                    break

                }else if( item[1].phrases.length === objCiro.count_phrases_of_apologies.length ){

                    objCiro.count_phrases_of_apologies = []
                    objCiro.count_phrases_of_apologies.push(cunt_phrases)
                    random_phrasess = item[1].phrases[cunt_phrases]
                    break
                    
                }

            }

        }
    })
    return random_phrasess
}

const updateUsrJS = async ()=>{
    usrTelInfo.flowUpdate(objFlow)
    usrUprt.oldJson = await usrUprt.resolveGetJson()
    await usrUprt.setFileJson_pt_1(usrTelInfo)
    await usrUprt.setFileJson_pt_2()
}

const setQuestions = async (key,text,msg) =>{
    const arraySalutation = [ '_Mr.','_Ms.','_Mrs.','_Dr.','_Prof.' ]
    const arrayTimeProgectDuration = [ 
        '_'+objLd.text_btn_timeProgectDuration[objCiro.lang][0],
        '_'+objLd.text_btn_timeProgectDuration[objCiro.lang][1],
        '_'+objLd.text_btn_timeProgectDuration[objCiro.lang][2],
        '_'+objLd.text_btn_timeProgectDuration[objCiro.lang][3],
    ]
    const arrayBudget = [ 
        '_'+objLd.text_btn_budget[objCiro.lang][0],
        '_'+objLd.text_btn_budget[objCiro.lang][1],
        '_'+objLd.text_btn_budget[objCiro.lang][2],
    ]
    const regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/

    switch (key) {
        case 0:
            if( !arraySalutation.includes(`_${text}`) 
            ){
                objLd.ckQst = true
                await bot.deleteMessage(msg.chat.id, msg.message_id)
                .then(() => deleteMsg = true )
                .catch((err) => console.log(err));
                await bot.sendMessage(msg.chat.id, objCiro.lang === 'it' ? '❌ Messaggio cancellato ‼️':'❌ Message deleted ‼️', objLd.opts_contact_me);
                await bot.sendMessage(msg.chat.id, objCiro.lang === 'it' ? 
                'Clicca su le seguenti risposte suggerite qui in basso ⬇️ ( ti chiederò di scrivere quando servirà, promesso )':
                'Click on the suggested answers below ⬇️ (I will ask you to write when needed, promise)', objLd.opts_salutation);
            }else{
                objLd.ckFlowCallBk[0] = true
                objLd.Salutation = text
                objLd.stepCountQuestion++
            }            
            break;
        case 1:
            if( text.length === 0 || text.length < 4 ){
                objLd.ckQst = true
                await bot.deleteMessage(msg.chat.id, msg.message_id)
                .then(() => deleteMsg = true )
                .catch((err) => console.log(err));
                await bot.sendMessage(msg.chat.id, objCiro.lang === 'it' ? '⚠️ Assicurati di inserire più di quattro caratteri ‼️':'⚠️ Make sure to enter more than four characters ‼️', objLd.opts_contact_me);
                await bot.sendMessage(msg.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me)
            }else{
                objLd.stepCountQuestion++
                objLd.LastName = text
            }
            break;
        case 2:
            if( text.length === 0 || text.length < 4 ){
                objLd.ckQst = true
                await bot.deleteMessage(msg.chat.id, msg.message_id)
                .then(() => deleteMsg = true )
                .catch((err) => console.log(err));
                await bot.sendMessage(msg.chat.id, objCiro.lang === 'it' ? '⚠️ Assicurati di inserire più di quattro caratteri ‼️':'⚠️ Make sure to enter more than four characters ‼️', objLd.opts_contact_me);
                await bot.sendMessage(msg.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me)
            }else{
                objLd.stepCountQuestion++
                objLd.Title = text
            }
            break;
        case 3:
            if( text.includes('Passa alla prossima domanda') || text.includes('Move on to the next question') ){
                objLd.stepCountQuestion++
            }else if( /^(\d{2,5})-(\d{2,5})-(\d{4})$/.test(text)){
                objLd.stepCountQuestion++
                objLd.Phone = text
            }else if( /^(0\d{1,3})-(\d{6,8})$/.test(text) ){
                objLd.stepCountQuestion++
                objLd.Phone = text
            }else{
                objLd.ckQst = true
                await bot.deleteMessage(msg.chat.id, msg.message_id)
                .then(() => deleteMsg = true )
                .catch((err) => console.log(err));
                await bot.sendMessage(
                    msg.chat.id, 
                    objCiro.lang === 'it' ? 
                        '⚠️ Assicurati di inserire un formato valido ‼️':
                        '⚠️ Make sure to enter a valid format ‼️', 
                    objLd.opts_contact_me
                    );
                await bot.sendMessage(msg.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me_skip)
            }
            break;
        case 4:
            if( /^(?:(?:\+|00)39)?[\d]{9,10}$/.test(text)){
                objLd.stepCountQuestion++
                objLd.Mobile = text
            }else if( /^\+(?:[0-9] ?){6,14}[0-9]$/.test(text) ){
                objLd.stepCountQuestion++
                objLd.Mobile = text
            }else{
                objLd.ckQst = true
                await bot.deleteMessage(msg.chat.id, msg.message_id)
                .then(() => deleteMsg = true )
                .catch((err) => console.log(err));
                await bot.sendMessage(
                    msg.chat.id, 
                    objCiro.lang === 'it' ? 
                        '⚠️ Assicurati di inserire un formato valido ‼️':
                        '⚠️ Make sure to enter a valid format ‼️', 
                    objLd.opts_contact_me
                    );
                await bot.sendMessage(msg.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me)
            }
            break;
        case 5:
            let ckFormat = true
            if( /^[a-zA-Z@.\d]*$/.test(text)){
                if( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(text) ){
                    objLd.stepCountQuestion++
                    objLd.Email = text
                }else ckFormat = false
            }else ckFormat = false
            if(!ckFormat){
                objLd.ckQst = true
                await bot.deleteMessage(msg.chat.id, msg.message_id)
                .then(() => deleteMsg = true )
                .catch((err) => console.log(err));
                await bot.sendMessage(
                    msg.chat.id, 
                    objCiro.lang === 'it' ? 
                        '⚠️ Assicurati di inserire un formato valido ‼️':
                        '⚠️ Make sure to enter a valid format ‼️', 
                    objLd.opts_contact_me
                    );
                await bot.sendMessage(msg.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me)
            }
            break;
        case 6:
            if( text.length === 0 || text.length < 3 ){
                objLd.ckQst = true
                await bot.deleteMessage(msg.chat.id, msg.message_id)
                .then(() => deleteMsg = true )
                .catch((err) => console.log(err));
                await bot.sendMessage(msg.chat.id, objCiro.lang === 'it' ? '⚠️ Assicurati di inserire più di tre caratteri ‼️':'⚠️ Make sure to enter more than three characters ‼️', objLd.opts_contact_me);
                await bot.sendMessage(msg.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me)
            }else{
                objLd.stepCountQuestion++
                objLd.NameFactory = text
            }
            break;
        case 7:
            if( text.includes('Passa alla prossima domanda') || text.includes('Move on to the next question') ){
                objLd.stepCountQuestion++
            }else if( regex.test(text)){
                objLd.stepCountQuestion++
                objLd.Website = text
            }else{
                objLd.ckQst = true
                await bot.deleteMessage(msg.chat.id, msg.message_id)
                .then(() => deleteMsg = true )
                .catch((err) => console.log(err));
                await bot.sendMessage(
                    msg.chat.id, 
                    objCiro.lang === 'it' ? 
                        '⚠️ Assicurati di inserire un formato valido ‼️':
                        '⚠️ Make sure to enter a valid format ‼️', 
                    objLd.opts_contact_me
                    );
                await bot.sendMessage(msg.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me_skip)
            }
            break;       
        case 8:
            if( text.includes('Passa alla prossima domanda') || text.includes('Move on to the next question') ){
                objLd.stepCountQuestion++
            }else if( regex.test(text)){
                objLd.stepCountQuestion++
                objLd.WebUrlLinkedin = text
            }else{
                objLd.ckQst = true
                await bot.deleteMessage(msg.chat.id, msg.message_id)
                .then(() => deleteMsg = true )
                .catch((err) => console.log(err));
                await bot.sendMessage(
                    msg.chat.id, 
                    objCiro.lang === 'it' ? 
                        '⚠️ Assicurati di inserire un formato valido ‼️':
                        '⚠️ Make sure to enter a valid format ‼️', 
                    objLd.opts_contact_me
                    );
                await bot.sendMessage(msg.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me_skip)
            }
            break;
        case 9:
            if( !arrayTimeProgectDuration.includes(`_${text}`) 
            ){
                objLd.ckQst = true
                await bot.deleteMessage(msg.chat.id, msg.message_id)
                .then(() => deleteMsg = true )
                .catch((err) => console.log(err));
                await bot.sendMessage(msg.chat.id, objCiro.lang === 'it' ? '❌ Messaggio cancellato ‼️':'❌ Message deleted ‼️', objLd.opts_contact_me);
                await bot.sendMessage(msg.chat.id, objCiro.lang === 'it' ? 
                'Clicca su le seguenti risposte suggerite qui in basso ⬇️ ( ti chiederò di scrivere quando servirà, promesso )':
                'Click on the suggested answers below ⬇️ (I will ask you to write when needed, promise)', objLd.opts_salutation);
            }else{
                
                objLd.ckFlowCallBk[1] = true
                objLd.TimeProgectDuration = text
                objLd.stepCountQuestion++

            }       
            break;
        case 10:

            if( objLd.TimeProgectDuration === 'Indeterminato' || objLd.TimeProgectDuration === 'Indeterminate' ){
                if(/^\d+$/.test( text ) && objLd.Ral.length === 0){
                    objLd.ckFlowCallBk[2] = true
                    objLd.Ral = text
                    objLd.stepCountQuestion++
                }else if(!/^\d+$/.test( text ) && objLd.Ral.length === 0 && (objLd.TimeProgectDuration === 'Indeterminato' || objLd.TimeProgectDuration === 'Indeterminate')){
                    objLd.ckQst = true
                    await bot.deleteMessage(msg.chat.id, msg.message_id)
                    .then(() => deleteMsg = true )
                    .catch((err) => console.log(err));
                    await bot.sendMessage(
                        msg.chat.id, 
                        objCiro.lang === 'it' ? 
                            '⚠️ Assicurati di inserire un formato valido ‼️':
                            '⚠️ Make sure to enter a valid format ‼️', 
                        objLd.opts_contact_me
                        );
                    await bot.sendMessage(msg.chat.id, objCiro.lang === 'it' ? 
                        'Indicami la RAL (ex. 10000,50000)':
                        'Indicate me the RAL (ex. 10000,50000)', objLd.opts_contact_me);
                }
            }else if( !arrayBudget.includes(`_${text}`) 
            ){
                objLd.ckQst = true
                await bot.deleteMessage(msg.chat.id, msg.message_id)
                .then(() => deleteMsg = true )
                .catch((err) => console.log(err));
                await bot.sendMessage(msg.chat.id, objCiro.lang === 'it' ? '❌ Messaggio cancellato ‼️':'❌ Message deleted ‼️', objLd.opts_contact_me);
                await bot.sendMessage(msg.chat.id, objCiro.lang === 'it' ? 
                'Clicca su le seguenti risposte suggerite qui in basso ⬇️ ( ti chiederò di scrivere quando servirà, promesso )':
                'Click on the suggested answers below ⬇️ (I will ask you to write when needed, promise)', objLd.opts_budget);
            }else{
                objLd.ckFlowCallBk[2] = true
                objLd.Budget = text
                objLd.stepCountQuestion++
            }     
            break;
        case 11:
            if( text.length === 0 || text.length < 24 ){
                objLd.ckQst = true
                await bot.deleteMessage(msg.chat.id, msg.message_id)
                .then(() => deleteMsg = true )
                .catch((err) => console.log(err));
                await bot.sendMessage(
                    msg.chat.id, 
                    objCiro.lang === 'it' ? 
                        '⚠️ Assicurati di inserire una descrizione di almeno duecento caratteri, ci aiuterà a valutare la tua proposta ‼️':
                        '⚠️ Make sure to include a description of at least 200 characters, it will help us evaluate your proposal ‼️', 
                    objLd.opts_contact_me
                );
                await bot.sendMessage(msg.chat.id, `${objLd.stepQuestion[objLd.stepCountQuestion]}`,objLd.opts_contact_me)
            }else{
                objLd.JobDescription = text
                objLd.stepCountQuestion++
            }            
            break   
        case 12:
            //frase di chiusura question e invio a SFDC   
            if( text !== 'privacy_ok' ){
                objLd.ckQst = true
                await bot.deleteMessage(msg.chat.id, msg.message_id)
                .then(() => deleteMsg = true )
                .catch((err) => console.log(err));
                await bot.sendMessage(msg.chat.id, objCiro.lang === 'it' ? '❌ Messaggio cancellato ‼️':'❌ Message deleted ‼️', objLd.opts_contact_me);
                await bot.sendMessage(msg.chat.id, objCiro.lang === 'it' ? 
                'Clicca su le seguenti risposte suggerite qui in basso ⬇️ ( ti chiederò di scrivere quando servirà, promesso )':
                'Click on the suggested answers below ⬇️ (I will ask you to write when needed, promise)', objLd.opts_privacy);
            }else{
                objLd.ckFlowCallBk[4] = true
                objLd.startQst = false
                objLd.ckFlowCallBk = [false,false,false,false,false]
                console.log('>>>>>>> ',usrTelInfo);
                await objLd.upsertJsonFile(usrTelInfo)
                .then((result) => {
                    bot.sendMessage(
                        msg.chat.id, 
                        objLd.text_endQst[objCiro.lang],
                        {parse_mode:'HTML'}
                    )
                    .then((result) => {
                        setTimeout(() => {
                            bot.sendMessage(msg.chat.id, objCiro.text_home[objCiro.lang], objCiro.opts_home);
                        }, 1200);
                    }).catch((err) => {
                        
                    });  
                    
                }).catch((err) => {
                    
                });

            }            
            break; 
        default:
            
            break;
    }
}

module.exports = {bot}