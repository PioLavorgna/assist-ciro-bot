class CiroBot {
    constructor(){
        this.runStartBot = false;
        this.lang = '';
        this.opts_select_lang = {};
        this.opts_home = {};
        this.opts_who_is_it = {};
        this.opts_his_experiences = {};
        this.opts_help_migration = {};
        this.opts_contact_me = {};
        this.text_home = {
            it:'Come posso esserti utile? Clicca sui bottoni qui sotto 👇',
            us:'How can I be of assistance? Click on the buttons below 👇'
        };
        this.text_function_off = {
            it:'‼️ <b>La funzione non è momentaneamente disponibile, clicca sui bottoni qui in basso</b> 👇',
            us:'‼️ <b>The function is not currently available, please click on the buttons below</b> 👇'
        };
        this.phrases_of_apologies = [
            {
                lang:"it",
                phrases:[
                    `Mi dispiace, non ho la conoscenza per rispondere a questa domanda, ma le funzioni qui in basso potrebbero aiutarti  👇`,
                    `Sfortunatamente, non ho informazioni sufficienti per rispondere, ma le funzioni qui in basso potrebbero essere utili  👇`,
                    `Non ho la capacità di fornirti una risposta, ma le funzioni qui in basso potrebbero aiutarti a trovare quello che stai cercando  👇`,
                    `Mi dispiace, non ho la competenza per rispondere a questa domanda, ma le funzioni qui in basso potrebbero essere utili  👇`,
                    `Sfortunatamente, non sono in grado di rispondere, ma le funzioni qui in basso potrebbero aiutarti a trovare quello che stai cercando  👇`,
                    `Non ho la capacità di rispondere a questa domanda, ma le funzioni qui in basso potrebbero essere utili  👇`,
                    `Mi dispiace, non ho la conoscenza per fornirti una risposta, ma le funzioni qui in basso potrebbero aiutarti  👇`,
                    `Sfortunatamente, non ho informazioni sufficienti per rispondere, ma le funzioni qui in basso potrebbero essere utili  👇`,
                    `Non ho la capacità di fornirti una risposta, ma le funzioni qui in basso potrebbero aiutarti a trovare quello che stai cercando  👇`,
                    `Mi dispiace, non ho le informazioni adeguate per rispondere a questa domanda, ma le funzioni qui in basso potrebbero essere utili  👇`,
                    `Sfortunatamente, non ho la conoscenza necessaria per fornirti una risposta, ma le funzioni qui in basso potrebbero aiutarti  👇`,
                    `Non ho la competenza per rispondere a questa domanda, ma le funzioni qui in basso potrebbero essere utili  👇`,
                    `Mi dispiace, non ho le informazioni necessarie per fornirti una risposta, ma le funzioni qui in basso potrebbero aiutarti  👇`,
                    `Sfortunatamente, non ho la conoscenza adeguata per rispondere, ma le funzioni qui in basso potrebbero essere utili  👇`,
                    `Non ho la capacità per fornirti una risposta a questa domanda, ma le funzioni qui in basso potrebbero aiutarti  👇`,
                    `Mi dispiace, non ho la competenza necessaria per rispondere, ma le funzioni qui in basso potrebbero essere utili  👇`,
                    `Sfortunatamente, non ho le informazioni adeguate per fornirti una risposta, ma le funzioni qui in basso potrebbero aiutarti  👇`,
                    `Non ho la conoscenza per rispondere a questa domanda, ma le funzioni qui in basso potrebbero essere utili  👇`,
                    `Mi dispiace, non ho la capacità per fornirti una risposta, ma le funzioni qui in basso potrebbero aiutarti  👇`,
                    `Sfortunatamente, non ho la competenza necessaria per rispondere, ma le funzioni qui in basso potrebbero essere utili  👇`,
                    `Mi dispiace, non ho la conoscenza sufficiente per fornirti una risposta, ma usa le funzioni qui sotto per trovare maggiori informazioni  👇`,
                    `Sfortunatamente, non sono in grado di rispondere, ma usa le funzioni qui sotto per trovare ciò che stai cercando  👇`,
                    `Non ho la capacità per rispondere a questa domanda, ma usa le funzioni qui sotto per ottenere maggiori informazioni  👇`,
                    `Mi dispiace, non ho la competenza per fornirti una risposta, ma usa le funzioni qui sotto per trovare ciò che stai cercando  👇`,
                ]
            },
            {
                lang:"us",
                phrases:[
                    `I'm sorry, I do not have the knowledge to answer this question, but the functions below may help you  👇`,
                    `Unfortunately, I do not have enough information to answer, but the functions below may be useful  👇`,
                    `I do not have the ability to provide you with an answer, but the functions below may help you find what you are looking for  👇`,
                    `I apologize, I do not have the expertise to answer this question, but the functions below may be useful  👇`,
                    `Unfortunately, I am not able to answer, but the functions below may help you find what you are looking for  👇`,
                    `I do not have the ability to answer this question, but the functions below may be useful  👇`,
                    `I'm sorry, I do not have the knowledge to provide you with an answer, but the functions below may help you  👇`,
                    `Unfortunately, I do not have sufficient information to answer, but the functions below may be useful  👇`,
                    `I do not have the ability to provide you with an answer, but the functions below may help you find what you are looking for  👇`,
                    `I'm sorry, I do not have the appropriate information to answer this question, but the functions below may be useful  👇`,
                    `Unfortunately, I do not have the necessary knowledge to provide you with an answer, but the functions below may help you  👇`,
                    `I do not have the expertise to answer this question, but the functions below may be useful  👇`,
                    `I'm sorry, I do not have the necessary information to provide you with an answer, but the functions below may help you  👇`,
                    `Unfortunately, I do not have the adequate knowledge to answer, but the functions below may be useful  👇`,
                    `I do not have the ability to provide you with an answer to this question, but the functions below may help you  👇`,
                    `I'm sorry, I do not have the necessary expertise to answer, but the functions below may be useful  👇`,
                    `Unfortunately, I do not have the adequate information to provide you with an answer, but the functions below may help you  👇`,
                    `I do not have the knowledge to answer this question, but the functions below may be useful  👇`,
                    `I'm sorry, I do not have the ability to provide you with an answer, but the functions below may help you  👇`,
                    `Unfortunately, I do not have the necessary expertise to answer, but the functions below may be useful  👇`,
                    `I'm sorry, I do not have enough knowledge to provide you with an answer, but use the functions below to find more information  👇`,
                    `Unfortunately, I am not able to answer, but use the functions below to find what you are looking for  👇`,
                    `I do not have the ability to answer this question, but use the functions below to obtain more information  👇`,
                    `Unfortunately, I am not able to answer or help you, but use the functions below to find what you are looking for  👇`,
                ]
            }

        ];
        this.count_phrases_of_apologies = [];
        this.who_is_it =[
            {
                it:[
                    `<b>🎤 Ecco a te una breve intervista fatta a Pio Lavorgna dove ci parla delle sue esperienze 🎬</b>`,
                    `💬 Sono un esperto nello sviluppo e programmazione della piattaforma <b>Salesforce.com</b>, con particolari competenza nella configurazione e personalizzazioni sia lato frontend e backend, mediante l'uso delle best practice`,
                    `Ho esperienza nell'utilizzo di <b>Apex, trigger, batch,Javascript</b> e altri strumenti per ottimizzare la piattaforma come <b>Visualforce Page, Lightning Component e Lightning web component</b>`,
                    `Inoltre, ho esperienza nell'integrazione con sistemi esterni per la condivisione dei dati mediante <b>le SOAP e le REST API</b> sia lato <b>STANDARD</b> che <b>CUSTOM ( Apex )</b> `,
                    `Posso garantire un'implementazione efficiente e sicura della piattaforma, per soddisfare le esigenze del cliente.`,
                    `Ho maturato molta esperienza sulla piattaforma Salesforce.com nella gestione dei flussi di vendita dei clienti, seguendo diversi progetti in cui ho importato e adattato i flussi <b>per sfruttare al massimo le sue funzionalità</b>`,
                    `Lavorando a stretto contatto con i clienti, sono riuscito a comprendere le loro esigenze e personalizzare i flussi in base ai requisiti raccolti, mettendo a loro disposizione le mie competenze e esperienze nella configurazione e personalizzazione di <b>Salesforce.com</b> per creare soluzioni efficaci e scalabili. `,
                    `Su diversi progetti di integrazione, ho utilizzato le mie competenze tecniche per connettere i sistemi e allineare informazioni tra ambienti differenti, monitorando i flussi per garantire  che funzionassero correttamente e che i clienti fossero <b>soddisfatti delle soluzioni implementate</b>`,
                    `<b>⏹ FINE INTERVISTA ⏹</b>`,
                ],
                us:[
                    `<b>🎤 Here is a short interview with Pio Lavorgna where he talks about his experiences 🎬</b>`,
                    `💬 I am an expert in the development and programming of the <b>Salesforce.com</b> platform, with particular expertise in configuration and customization on both the frontend and backend, using best practices`,
                    `I have experience using <b>Apex, triggers, batch, Javascript</b> and other tools to optimize the platform such as <b>Visualforce Page, Lightning Component, and Lightning web component</b>`,
                    `In addition, I have experience in integrating with external systems for data sharing using <b>SOAP and REST API</b> on both <b>STANDARD</b> and <b>CUSTOM (Apex)</b> sides`,
                    `I can ensure efficient and secure implementation of the platform, to meet the customer's needs`,
                    `I have gained a lot of experience on the Salesforce.com platform in managing customer sales flows, following various projects where I imported and adapted the flows <b>to make the most of its features</b>`,
                    `Working closely with customers, I have been able to understand their needs and customize the flows based on the requirements collected, providing them with my skills and experiences in configuring and customizing <b>Salesforce.com</b> to create effective and scalable solutions`,
                    `On several integration projects, I used my technical skills to connect systems and align information between different environments, monitoring the flows to ensure they worked correctly and that customers <b>were satisfied with the solutions implemented</b>`,
                    `<b>⏹ END OF INTERVIEW ⏹</b>`,
                ]
            }
        ];
        this.what_is_offers =[
            {
                it:[
                    '💬 Dopo anni di esperienze passate nel settore della consulenza in ambito cloud, '+
                    'posso mettere a disposizione le mie competenze per venire incontro alle seguenti domande:',

                    '➡️ Digitalizzazione dei flussi di lavoro',

                    '➡️ Migrare delle funzionalità di una piattaforma esterna, riadattandole in Salesfoce.com',

                    '➡️ Creare automatismi per:'+
                    '\n🔹la gestione e manipolazione dei dati'+
                    '\n🔹condizioni di controllo'+
                    '\n🔹invio notifiche o email'+
                    '\n🔹controlli temporizzati'+
                    '\n🔹creazione di file pdf, csv, json, excel, txt, xml, ecc…',
                    
                    '➡️ Creazione di integrazioni con la gran parte delle piattaforme esistenti:'+
                    '\n🔹Shopify'+
                    '\n🔹AWS'+
                    '\n🔹Telegram'+
                    '\n🔹altro…',

                    '➡️ Creazione di bot tramite il pacchetto service di salesforce e telegram',

                    '➡️ Gestione delle integrazioni in INBOUND e OUTBOUND, ex: '+
                    '\n🔹da piattaforme esterne verso Salesforce'+
                    '\n🔹da Salesforce verso piattaforme esterne',

                    '➡️ Migrazione dati massive con riadattamento ( dove serve ) per poter gestire al meglio i '+
                    'dati e sfruttare tutte le funzionalità utili di Salesforce.com',

                    '➡️ Personalizzazione della piattaforma per poter andare oltre i limiti dello standard, '+
                    'creando pagine ben precise basandosi sui bisogni del cliente',

                    '➡️ Creazione di report personalizzati con schedulazione per invio o download',

                    '➡️ Revisione e manutenzione di piattaforme già avviate da tempo per risoluzione bug o nuove aggiunte',

                    '➡️ Formazione di profili junior per inserimento in nuovi progetti Salesforce, nel caso specifico:'+
                    '\n🔹amministratori della piattaforma e configuratori'+
                    '\n🔹sviluppatori salesforce.com dalle basi fino alle gestione di flussi avanzati',

                ],
                us:[
                    '💬 After years of past experiences in the cloud consulting industry. '+
                    'I can make my skills available to meet the following needs:',

                    '➡️ Digitization of workflow',

                    '➡️ Migration of features from an external platform to Salesforce.com, '+
                    'adapting them as necessary',

                    '➡️ Creation of automation for:'+
                    '\n🔹Data management and manipulation'+
                    '\n🔹Control conditions'+
                    '\n🔹Sending notifications or emails'+
                    '\n🔹Timed controls'+
                    '\n🔹Creation of pdf, csv, json, excel, txt, xml, etc…',

                    '➡️ Creation of integrations with a majority of existing platforms such as Shopify, AWS, Telegram, and others',

                    '➡️ Creation of bots using Salesforce and Telegram\'s service package',

                    '➡️ Management of integrations for both inbound and outbound, for example:'+
                    '\n🔹From external platforms to Salesforce'+
                    '\n🔹From Salesforce to external platforms',

                    '➡️ Massive data migration with adaptation (as needed) to better manage and utilize all of Salesforce.com\'s useful features',

                    '➡️ Platform customization to go beyond standard limits, creating specific pages based on agreed upon specifications',

                    '➡️ Creation of customized reports with scheduling options for sending or downloading',

                    '➡️ Review and maintenance of previously launched platforms to resolve bugs and add new features',

                    '➡️ Training of junior profiles for insertion into new Salesforce projects, specifically:'+
                    '\n🔹Platform administrators and configurators'+
                    '\n🔹Salesforce developers, from basics to advanced flow management.',

                ]
            }
        ];
        this.his_experiences = [
            {
                it:[
                    '<b>Qui potrai trovare alcune delle sue esperienze organizzate per tematiche</b>',

                    '<b>E-Comerce e integrazioni</b>\n\n'+
                    'Sono esperto nella gestione delle integrazioni tra Salesforce e piattaforme di e-commerce come Shopify, AWS Amazon e piattaforme di pagamento.\n\n'+
                    'Ho lavorato a stretto contatto con i clienti per comprendere le loro esigenze e personalizzare le integrazioni in base alle loro necessità di piattaforma,'+
                    'tra cui SOAP, REST, webhook e middleware in generale\n\n'+
                    'Ho gestito e monitorato le integrazioni per garantire che funzionassero correttamente e che i clienti fossero soddisfatti delle soluzioni implementate'+
                    'per garantire una perfetta sincronizzazione delle informazioni tra Salesforce e le piattaforme di e-commerce\n\n',

                    '<b>Service e Marketing</b>\n\n'+
                    'Ho una vasta esperienza nella configurazione del pacchetto Service di Salesforce,'+
                    'dando supporto alle figure di marketing e comunicazione per implementare le loro specifiche e gestire i loro flussi tramite l\'uso di codice Apex, trigger e batch \n\n'+
                    'Grazie al utilizzo di Apex, trigger e batch per automatizzare i processi e ottimizzare le funzionalità del pacchetto Service,'+
                    'mi sono assicurato che i team di marketing e comunicazione fossero in grado di utilizzare al meglio la piattaforma personalizzata.\n\n'+
                    'Ho sempre cercato di creare soluzioni efficaci e scalabili per i miei clienti, per soddisfare le loro esigenze e renderli autonomi sull\'uso della piattaforma\n',

                    '<b>Migrazione dati</b>\n\n'+
                    'Come esperto in migrazione dei dati,'+
                    'ho maturato una significativa esperienza nell\'utilizzo degli strumenti messi a disposizione da Salesforce.com e altri software per la manipolazione di dati massivi dei miei clienti,'+
                    'gestendo numerosi progetti di migrazione dei dati da piattaforme esterne a Salesforce\n\n'+
                    'Ho iniziato ogni progetto di migrazione dei dati con un\'analisi dei dati del cliente per identificare eventuali problemi o questioni che potevano influire sul processo di migrazione,'+
                    'formatando i dati in modo da rendili compatibili con il sistema Salesforce\n\n'+
                    'Ho utilizzato inoltre gli strumenti di Salesforce e le sue configurazioni, per eseguire la pulizia dei dati e la deduplicazione per eliminare eventuali duplicati,'+
                    'garantendo la qualità e l\'integrità dei dati importati\n\n '+
                    'Ho lavorato con una vasta gamma di clienti e ho sempre mantenuto un elevato livello di soddisfazione del cliente, '+
                    'raggiungendo i risultati desiderati\n\n',

                    '<b>Cosa è una migrazione dati e quali potrebbero essere gli strumenti da usare?</b>\n\n'+
                    'La migrazione dei dati da una piattaforma esterna a Salesforce può essere un processo complesso che richiede la manipolazione di grandi quantità di dati\n\n '+
                    'Utilizzando gli strumenti forniti da Salesforce, come Data Loader e Apex Data Loader, è possibile automatizzare il processo di importazione e trasformazione dei dati\n\n'+
                    'Il primo passo nella migrazione dei dati è quello di preparare i dati per l\'importazione, '+
                    'utilizzando il Data Loader per pulire e formattare i dati in modo che siano compatibili con il sistema Salesforce\n\n '+
                    'Una volta preparati i dati, possono essere importati utilizzando il Data Loader o Apex Data Loader, '+
                    'che consentono la gestione di grandi quantità di dati in modo efficiente\n\n'+
                    'Durante il processo di migrazione, '+
                    'è importante testare i dati per assicurarsi che siano stati importati correttamente e che siano completi e precisi\n\n'+
                    'Inoltre è possibile utilizzare gli strumenti di Salesforce per eseguire la pulizia dei dati e la deduplicazione per eliminare eventuali duplicati\n\n'+
                    'In generale, utilizzando gli strumenti forniti da Salesforce per la manipolazione di dati massivi, '+
                    'è possibile automatizzare e semplificare il processo di migrazione dei dati da una piattaforma esterna a Salesforce, '+
                    'garantendo la qualità e l\'integrità dei dati importati\n\n',

                    '<b>Team leader e formatore</b>\n\n'+
                    'Ho una vasta esperienza come team leader e formatore di profili junior e oltre 🚀 , '+
                    'avendo gestito diverse squadre sui progetti che ho coordinato\n\n'+
                    'Riesco a motivare e supportare i miei colleghi per raggiungere gli obiettivi del progetto,'+
                    'con una forte attitudine al problem solving e alla risoluzione di conflitti, '+
                    'grazie alle mie capacità di comunicazione e di ascolto attivo\n\n'+
                    'Ho sempre cercato di creare un ambiente di lavoro collaborativo e positivo per il mio team, '+
                    'fornendo feedback costruttivi e incoraggiando l\'apprendimento continuo cercando di mettere in prima linea i successi del singolo e i risultati del team\n\n '+
                    'Ho sempre fatto in modo che il team crescesse professionalmente e tecnicamente, '+
                    'attraverso la formazione e l\'esperienza sul campo'
                ],
                us:[
                    '<b>Here you will find some of his experiences organized by themes</b>',

                    '<b>E-Commerce and Integrations</b>\n\n'+
                    'I am an expert in managing integrations between Salesforce and e-commerce platforms such as Shopify, AWS Amazon and payment platforms\n\n'+
                    'I have worked closely with customers to understand their needs and customize integrations to their platform requirements,'+
                    'including SOAP, REST, webhooks, and general middleware\n\n'+
                    'I have managed and monitored integrations to ensure they were working properly and that customers were satisfied with the solutions implemented'+
                    'to ensure perfect synchronization of information between Salesforce and e-commerce platforms\n\n',

                    '<b>Service and Marketing</b>\n\n'+
                    'I have extensive experience in configuring the Salesforce Service package, '+
                    'providing support to marketing and communication figures to implement their '+
                    'specifications and manage their flows through the use of Apex code, triggers, and batches\n\n'+
                    'By using Apex, triggers, and batches to automate processes and optimize the functionality of the Service package, '+
                    'I have ensured that marketing and communication teams are able to make the best use of the customized platform\n\n'+
                    'I have always aimed to create effective and scalable solutions for my clients, '+
                    'to meet their needs and make them self-sufficient in using the platform\n\n',

                    '<b>Data migration</b>\n\n'+
                    'As an expert in data migration, I have gained significant experience in using the tools provided by Salesforce.com '+
                    'and other software for manipulating large data sets of my clients, '+
                    'managing numerous data migration projects from external platforms to Salesforce\n\n'+
                    'I began every data migration project with a customer data analysis to identify any issues or '+
                    'concerns that could impact the migration process, '+
                    'formatting the data to make it compatible with the Salesforce system\n\n'+
                    'I also used Salesforce tools and configurations to perform data cleaning and '+
                    'deduplication to eliminate any duplicates, '+
                    'ensuring the quality and integrity of the imported data\n\n'+
                    'I have worked with a wide range of clients '+
                    'and have always maintained a high level of customer satisfaction, '+
                    'achieving the desired results',

                    '<b>What is data migration and what tools could be used?</b>\n\n'+
                    'Data migration from an external platform to Salesforce can be a complex '+
                    'process that requires manipulating large amounts of data.'+
                    'By using tools provided by Salesforce, such as Data Loader and Apex Data Loader, '+
                    'it is possible to automate the process of importing and transforming data\n\n'+
                    'The first step in data migration is to prepare the data for import, '+
                    'using the Data Loader to clean and format the data so that it is compatible with the Salesforce system\n\n'+
                    'Once the data is prepared, it can be imported using the Data Loader '+
                    'or Apex Data Loader, which allow for efficient management of large amounts of data\n\n'+
                    'During the migration process, it is important to test the data to '+
                    'ensure that it has been imported correctly and that it is complete and accurate\n\n'+
                    'In addition, you can use Salesforce tools to perform data cleaning and deduplication to eliminate any duplicates\n\n'+
                    'In general, by using the tools provided by Salesforce for manipulating '+
                    'large data sets, it is possible to automate and simplify the '+
                    'process of migrating data from an external platform to Salesforce, '+
                    'ensuring the quality and integrity of the imported data',

                    '<b>Team leader and trainer</b>\n\n'+
                    'I have extensive experience as a team leader and trainer for junior to senior profiles, '+
                    'having managed various teams on the projects that I have coordinated\n\n'+
                    'I am able to motivate and support my colleagues in achieving project goals, '+
                    'with a strong attitude towards problem-solving and conflict resolution, '+
                    'thanks to my communication and active listening skills\n\n'+
                    'I have always sought to create a collaborative and positive work environment for my team, '+
                    'providing constructive feedback and encouraging continuous learning, '+
                    'highlighting individual successes and team results\n\n'+
                    'I have always made sure that the team grows professionally and technically, '+
                    'through training and on-the-job experience'
                ]
            }
        ];
        this.text_btn_home = {
            it:[
                [ 'Chi è Pio Lavorgna❓' , '📖 Le sue esperienze' ],
                [ 'Cosa offre❓' , '📩 Contattalo' ]
            ],
            us:[
                [ 'Who is Pio Lavorgna❓' , '📖 His experiences'],
                [ 'What does it offer❓' , '📩 Contact him' ]
            ]
        };
        this.text_btn_his_experiences = {
            it:[ 
                ['📦 E-Comerce e integrazioni' , '🎭 Service e Marketing' ],
                ['📥 Migrazione dati' , '🚀 Team leader e formatore' ],
                [ '⬅️ Indietro' ]
            ],
            us:[ 
                ['📦 E-commerce and integrations' , '🎭 Service and Marketing' ],
                ['📥 Data migration' , '🚀 Team leader and trainer' ],
                [ '⬅️ Back' ]
            ]
        };
        this.text_btn_who_is_it = {
            it:[ '⬅️ Indietro' , '📖 Le sue esperienze' ],
            us:[ '⬅️ Back' , '📖 His experiences' ]
        };
        this.text_btn_helpMIgration = {
            it:'➡️ Clicca qui per maggiori info ⬅️',
            us:'➡️ Click here for more information ⬅️'
        };
        
        this.text_btn_info_migration = {
            it:'<b>Clicca sui bottoni qui sotto per proseguire con le sue esperienze</b> 👇',
            us:'<b>Click on the buttons below to proceed with your experiences</b> 👇'
        };
        
    }

    update(){
        this.opts_select_lang = {
            //reply_to_message_id: msg.message_id,
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: false,
                inline_keyboard: [ 
                    [
                        {
                            text: "🇮🇹 Italiano",
                            callback_data:'it'
                        },
                        {
                            text: "🇺🇸 English",
                            callback_data:'us'
                        }
                    ]
                ]
            }, 
            parse_mode: 'HTML'
        };

        this.opts_home = {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: this.text_btn_home[this.lang]
            }, 
            parse_mode: 'HTML'
        };
        
        this.opts_who_is_it = {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: false,
                keyboard: [ 
                    this.text_btn_who_is_it[this.lang]
                ]
            }, 
            parse_mode: 'HTML'
        };
  
        this.opts_his_experiences = {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: this.text_btn_his_experiences[this.lang]
            }, 
            parse_mode: 'HTML'
        };
        this.opts_help_migration = {
            //reply_to_message_id: msg.message_id,
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: false,
                inline_keyboard: [ 
                    [
                        {
                            text: this.text_btn_helpMIgration[this.lang],
                            callback_data:'migration'
                        }
                    ]
                ]
            }, 
            parse_mode: 'HTML'
        };
    }
}

module.exports = {CiroBot}