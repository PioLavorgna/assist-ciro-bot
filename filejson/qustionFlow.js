const {readFile,writeFile , read} = require('fs');
class ObjLead {
    constructor() {

        this.colObj = new CollaborationQuestion()
        this.startQst = false
        this.privacy = true
        this.ckFlowCallBk = [false,false,false,false,false]
        this.ckQst = false
        this.Salutation=''
        this.LastName=''
        this.Title=''
        this.Phone=''
        this.Mobile=''
        this.Email=''
        this.NameFactory=''
        this.Website=''
        this.WebUrlLinkedin=''
        this.TimeProgectDuration=''
        this.Budget=''
        this.Ral=''
        this.JobDescription=''
        this.stepCountQuestion=0
        this.stepQuestion = []
        this.opts_contact_me = {}
        this.text_btn_contact_me = {
            it:[
                [ 'Interrompi il questionario 🛑' ]
            ],
            us:[
                [ 'Interrupt the questionnaire 🛑' ]
            ]
        }
        this.opts_contact_me_skip = {}
        this.text_btn_contact_me_skip = {
            it:[
                [ 'Passa alla prossima domanda ⏭' ],
                [ 'Interrompi il questionario 🛑' ]
            ],
            us:[
                [ 'Move on to the next question ⏭' ],
                [ 'Interrupt the questionnaire 🛑' ]
            ]
        }
        this.text_contact_me = {
            it:'⬇️ <b>Per poter valutare la tua richiesta, ti chiediamo di compilare le seguenti domande</b> ⬇️',
            us:'⬇️ <b>In order to evaluate your request, we ask you to fill out the following questions</b> ⬇️'
        }
        this.opts_cancellQuestion = {}
        this.text_cancelQst = {
            it:'⬇️ <b>Confermi di voler interrompere il questionario</b>❓ ⬇️',
            us:'⬇️ <b>Can you confirm that you want to interrupt the survey ❓</b> ⬇️'
        }
        this.text_btn_cancellQuestion_ok = {
            it:'✅ CONFERMO',
            us:'✅ CONFIRM'
        }
        this.opts_privacy = {}
        this.text_btn_privacy = {
            it:'✅ CONFERMO',
            us:'✅ CONFIRM'
        }
        this.text_btn_info_privacy = {
            it:'INFORMATIVA PRIVACY',
            us:'PRIVACY POLICY'
        }
        this.text_btn_cancellQuestion_ko = {
            it:'➡️ RIPRENDI',
            us:'➡️ RESUME'
        }
        this.opts_timeProgectDuration = {}
        this.text_btn_timeProgectDuration = {
            it:[
                'Da 15 a 30 giorni',
                'Da 1 mese a 3 mesi',
                'Oltre i 3 mesi',
                'Indeterminato',
            ],
            us:[
                'From 15 to 30 days',
                'From 1 month to 3 months',
                'Over 3 months',
                'Indeterminate',
            ]
        }
        this.opts_budget = {}
        this.text_btn_budget = {
            it:[
                'Dai 1000 ai 5000 €',
                'Dai 5000 ai 10000 €',
                'Oltre i 10000 €',
            ],
            us:[
                'From 1000 to 5000 €',
                'From 5000 to 10000 €',
                'Over 10000 €',
            ]
        }
        this.text_endQst = {
            it:'🤝 <b>Grazie per aver dedicato il tuo tempo a compilare le varie domande. Ti informiamo che la tua richiesta verrà esaminata e riceverai una risposta entro le prossime 24/48 ore. Ti ringraziamo per la pazienza e la comprensione</b> 👋',
            us:'🤝 <b>Thank you for taking the time to fill out the various questions. We inform you that your request will be reviewed and you will receive a response within the next 24/48 hours. We thank you for your patience and understanding</b> 👋'
        }
    }
    
    updateContactMe(lang){
        this.opts_contact_me = {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: this.text_btn_contact_me[lang]
            }, 
            parse_mode: 'HTML'
        };

        this.opts_contact_me_skip = {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: this.text_btn_contact_me_skip[lang]
            }, 
            parse_mode: 'HTML'
        };
        this.opts_cancellQuestion = {
            //reply_to_message_id: msg.message_id,
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                inline_keyboard: [ 
                    [
                        {
                            text: this.text_btn_cancellQuestion_ok[lang],
                            callback_data:'cancellQuestion_ok'
                        },
                        {
                            text: this.text_btn_cancellQuestion_ko[lang],
                            callback_data:'cancellQuestion_ko'
                        }
                    ]
                ]
            }, 
            parse_mode: 'HTML'
        };
        this.opts_privacy = {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                inline_keyboard: [ 
                    [
                        {
                            text: this.text_btn_info_privacy[lang],
                            callback_data:'inf_privacy'
                        }
                    ],
                    [
                        {
                            text: this.text_btn_privacy[lang],
                            callback_data:'privacy_ok'
                        }
                    ]
                ]
            }, 
            parse_mode: 'HTML'
        };
        this.opts_salutation = {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: false,
                inline_keyboard: [ 
                    [
                        {
                            text: '➡️   Mr.   ⬅️',
                            callback_data:'salutation_Mr.'
                        }
                    ],
                    [
                        {
                            text: '➡️   Ms.   ⬅️',
                            callback_data:'salutation_Ms.'
                        }
                    ],
                    [
                        {
                            text: '➡️   Mrs.   ⬅️',
                            callback_data:'salutation_Mrs.'
                        }
                    ],
                    [
                        {
                            text: '➡️   Dr.   ⬅️',
                            callback_data:'salutation_Dr.'
                        }
                    ],
                    [
                        {
                            text: '➡️   Prof.   ⬅️',
                            callback_data:'salutation_Prof.'
                        }
                    ],
                ]
            }, 
            parse_mode: 'HTML'
        };
        this.opts_timeProgectDuration = {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: false,
                inline_keyboard: [ 
                    [
                        {
                            text: this.text_btn_timeProgectDuration[lang][0],
                            callback_data:`timeProgectDuration_${this.text_btn_timeProgectDuration[lang][0]}`
                        }
                    ],
                    [
                        {
                            text: this.text_btn_timeProgectDuration[lang][1],
                            callback_data:`timeProgectDuration_${this.text_btn_timeProgectDuration[lang][1]}`
                        }
                    ],
                    [
                        {
                            text: this.text_btn_timeProgectDuration[lang][2],
                            callback_data:`timeProgectDuration_${this.text_btn_timeProgectDuration[lang][2]}`
                        }
                    ],
                    [
                        {
                            text: this.text_btn_timeProgectDuration[lang][3],
                            callback_data:`timeProgectDuration_${this.text_btn_timeProgectDuration[lang][3]}`
                        }
                    ]
                ]
            }, 
            parse_mode: 'HTML'
        };
        this.opts_budget = {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: false,
                inline_keyboard: [ 
                    [
                        {
                            text: this.text_btn_budget[lang][0],
                            callback_data:`budget_${this.text_btn_budget[lang][0]}`
                        }
                    ],
                    [
                        {
                            text: this.text_btn_budget[lang][1],
                            callback_data:`budget_${this.text_btn_budget[lang][1]}`
                        }
                    ],
                    [
                        {
                            text: this.text_btn_budget[lang][2],
                            callback_data:`budget_${this.text_btn_budget[lang][2]}`
                        }
                    ]
                ]
            }, 
            parse_mode: 'HTML'
        };
    }

    flowQuestions(lang){
        this.stepQuestion = [
            this.colObj.text_question_1[lang],
            this.colObj.text_question_2[lang],
            this.colObj.text_question_3[lang],
            this.colObj.text_question_4[lang],
            this.colObj.text_question_5[lang],
            this.colObj.text_question_6[lang],
            this.colObj.text_question_7[lang],
            this.colObj.text_question_8[lang],
            this.colObj.text_question_9[lang],
            this.colObj.text_question_10[lang],
            this.colObj.text_question_11[lang],
            this.colObj.text_question_12[lang],
            this.colObj.text_privacy[lang],
            this.colObj.text_infoprivacy[lang],
        ]

        this.stepCountQuestion = 0

    }

    upsertJsonFile(objUsrTel){
        return new Promise((res,rej)=>{

            const newJson = []
            const ckCharatter = (text)=>{
                let ck_text = text
                ck_text = text.replaceAll('\'','\\\'')
                ck_text = text.replaceAll('\"','\\\"')
                return ck_text
            }
            newJson.push(
                {
                    qstStatus : 'QuestionBot',
                    tg_IdUsr : objUsrTel.id,
                    tg_Username : ckCharatter(objUsrTel.usrName),
                    tg_firstName : ckCharatter(objUsrTel.firstName),
                    tg_lastName : ckCharatter(objUsrTel.lastName),
                    tg_last_Use_Date : objUsrTel.useDate,
                    tg_lenguage : objUsrTel.leng,
                    Salutation : this.Salutation,
                    LastName : ckCharatter(this.LastName),
                    Title : ckCharatter(this.Title),
                    Phone : this.Phone,
                    Mobile : this.Mobile,
                    Email : this.Email,
                    NameFactory : ckCharatter(this.NameFactory),
                    Website : this.Website,
                    WebUrlLinkedin : this.WebUrlLinkedin,
                    TimeProgectDuration : this.TimeProgectDuration,
                    Budget : this.Budget,
                    Ral : this.Ral,
                    JobDescription : ckCharatter(this.JobDescription),
                    Privacy : this.privacy,
                }
            )

            readFile('fileJson/listQstJson.json', 'utf8' , (error,result)=>{
                if(error){
                    console.log('**Error getJson: ',error);
                    rej(error)
                    return
                }else{

                    if( result.length !== 0){
                        Object.entries(JSON.parse(result)).map((item,number) => newJson.push(item[1]) )
                    }

                    writeFile(
                        'fileJson/listQstJson.json', 
                        JSON.stringify( newJson ), 
                        { flag: 'w' },
                        (error,result)=>{
                        if(error){
                            console.log(error);
                            return;
                        }else{
                            res(result)
                        }
                    })

                    return
                }
            })
        })
    }

}
class CollaborationQuestion{
    constructor() {
        this.text_question_1 = 
            {
                it:'<b>Con chi ho il piacere di parlare?( Segli una risposta )</b>',
                us:'<b>With whom do I have the pleasure of speaking?( Select an answer )</b>',
            }
        this.text_question_2 = 
            {
                it:'<b>Scrivi il tuo nome e cognome</b>',
                us:'<b>Write your name and surname</b>',
            }
        this.text_question_3 = 
            {
                it:'<b>Scrivi il ruolo che ricopri nell\'azienda</b>',
                us:'<b>Write down the role you hold in the company</b>',
            }
        this.text_question_4 = 
            {
                it:'<b>Scrivi il numero di telefono ( rete fissa,ex:035-12345678 )</b>',
                us:'<b>Write the phone number (landline, ex:035-12345678)</b>',
            }
        this.text_question_5 = 
            {
                it:'<b>Scrivi il numero di cellulare con il prefisso (ex. +393331112222)</b>',
                us:'<b>Write the mobile number with the prefix (ex. +12023041258)</b>',
            }
        this.text_question_6 = 
            {
                it:'<b>Inserisci la tua email</b>',
                us:'<b>Please enter your email</b>',
            }
        this.text_question_7 = 
            {
                it:'<b>Inserisci il nome della tua azienda</b>',
                us:'<b>Enter the name of your company</b>',
            }
        this.text_question_8 = 
            {
                it:'<b>Inserisci il link del sito web della tua azienda</b>',
                us:'<b>Please enter the website link of your company</b>',
            }
        this.text_question_9 = 
            {
                it:'<b>Inserisci il link al tuo profilo linkedin</b>',
                us:'<b>Please enter the link to your LinkedIn profile</b>',
            }
        this.text_question_10 = 
            {
                it:'<b>Scegli un range di tempo per indicare la durata del progetto</b>',
                us:'<b>Choose a time range to indicate the duration of the project</b>',
            }
        this.text_question_11 = 
            {
                it:'<b>Per evitare perdite di tempo ti chiedo di indicarmi il budget messo a disposizione per la richiesta o offerta che stai inoltrando</b>',
                us:'<b>To avoid wasting time, I ask you to indicate the budget made available for the request or offer that you are submitting</b>',
            }
        this.text_question_12 = 
            {
                it:'<b>Ci può fornire una descrizione delle principali richieste o esigenze per poter valutare se e come possiamo aiutarla?</b>',
                us:'<b>Can you please provide a description of the main requests or needs so that we can assess whether and how we can assist you?</b>',
            }
        this.text_privacy = 
            {
                it:'<b> Acconsento al trattamento dei dati per la gestione della richiesta </b>',
                us:'<b> I consent to the processing of data for the management of the request </b>'
            }
        this.text_infoprivacy =
            {
                it:
                '<b>INFORMATIVA PRIVACY</b>\n'+
                'Informativa resa ai sensi degli articoli 13-14 del GDPR 2016/679 (General Data Protection Regulation)\n'+
                '<b>TITOLARE DEL TRATTAMENTO</b>\n'+
                'Indirizzo e-mail: privacyassistantciro@gmail.com\n'+
                '<b>FINALITÁ DEL TRATTAMENTO</b>\n'+
                'Il trattamento dei dati è finalizzato all’invio di comunicazioni di carattere informativo'+
                'riguardanti la richiesta effettuata.'+
                'I tuoi dati,email e il tuo numero di telefono non verranno ceduti in alcun modo;'+
                'inoltre, nel pieno rispetto del “diritto all’oblio”, puoi smettere di usufruire del servizio in qualsiasi momento, '+
                'inviando una email all’indirizzo: privacyassistantciro@gmail.com\n'+
                '<b>BASE GIURIDICA DEL TRATTAMENTO</b>\n'+
                'Consenso (facoltativo e revocabile in qualsiasi momento)\n'+
                '<b>PERIODO DI CONSERVAZIONE DEI DATI</b>\n'+
                'Fino a revoca del consenso\n'+
                '<b>CONFERIMENTO DEI DATI</b>\n'+
                'Ai sensi dell’art. 13, co. 2, lett. e) del GDPR, ti informiamo che il conferimento del tuo nome, email e numero telefonico è'+
                'facoltativo, ma necessario per espletare correttamente il servizio. Pertanto, l’eventuale rifiuto di fornire tali dati'+
                'comporta l’impossibilità di ricevere tutte le comunicazioni riguardanti la prenotazione e le novità commerciali e'+
                'promozionali di cui sopra.\n'+
                '<b>DESTINATARI DEI DATI</b>\n'+
                'Il dato può essere trattato, per conto della Società, da:'+
                'Soggetti designati come Responsabili, a cui sono impartite adeguate istruzioni operative (quali, a titolo'+
                'esemplificativo, società che svolgono il servizio di gestione e/o manutenzione del sito internet, del servizio Google'+
                'Drive o Telegram);'+
                'Professionisti esterni alla società Titolare del trattamento per la gestione degli adempimenti fiscali;'+
                'Pubbliche Autorità ove richiesto e consentito dalla normativa vigente e in tutti i casi di trattamenti obbligatori;\n'+
                '<b>SOGGETTI AUTORIZZATI AL TRATTAMENTO</b>\n'+
                'I dati potranno essere trattati dai dipendenti della Società, autorizzati ed adeguatamente istruiti, nell’espletamento'+
                'delle attività volte al perseguimento delle finalità sopra indicate.',
                us:
                '<b>PRIVACY POLICY</b>\n'+
                'Information provided under articles 13-14 of GDPR 2016/679 (General Data Protection Regulation)\n'+
                '<b>DATA CONTROLLER</b>\n'+
                'Email address: privacyassistantciro@gmail.com\n'+
                '<b>PURPOSE OF THE PROCESSING</b>\n'+
                'The processing of data is aimed at sending informational communications'+
                'regarding the request made.'+
                'Your data, email and phone number will not be disclosed in any way;'+
                'Furthermore, in full respect of the "right to be forgotten", you can stop using the service at any time,'+
                'by sending an email to the address: privacyassistantciro@gmail.com\n'+
                '<b>LEGAL BASIS OF THE PROCESSING</b>\n'+
                'Consent (optional and revocable at any time)\n'+
                '<b>DATA RETENTION PERIOD</b>\n'+
                'Until revocation of consent\n'+
                '<b>DATA CONFERMENT</b>\n'+
                'Under Article 13, paragraph 2, letter e) of the GDPR, we inform you that the submission of your name, email and phone number is'+
                'optional, but necessary to correctly perform the service. Therefore, the eventual refusal to provide such data'+
                'entails the impossibility of receiving all communications regarding the reservation and the commercial and'+
                'promotional news mentioned above.\n'+
                '<b>DATA RECIPIENTS</b>\n'+
                'The data may be processed, on behalf of the Company, by:'+
                'Subjects designated as Responsible, to whom adequate operational instructions are given (such as, for example, companies that perform the service of managing and/or maintaining the website, the Google Drive or Telegram service);'+
                'External professionals outside the company data controller for the management of tax obligations;'+
                'Public Authorities where required and allowed by the applicable regulations and in all cases of mandatory processing;\n'+
                '<b>AUTHORIZED PERSONS TO THE PROCESSING</b>\n'+
                'The data may be processed by the employees of the Company, authorized and adequately trained, in the performance'+
                'of the activities aimed at achieving the above-mentioned purposes.'
            }
    }
}

module.exports = {ObjLead}