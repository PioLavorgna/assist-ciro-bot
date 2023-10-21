const cron = require('node-cron');
/* 

L'espressione cron "0 0 * * *" rappresenta la pianificazione per l'esecuzione di un compito.

Ogni campo dell'espressione rappresenta un'unità di tempo, nell'ordine: minuti (0), ore (0), giorno del mese (), mese () e giorno della settimana (*).

    I primi due campi (minuti e ore) specificano il momento esatto
    in cui il compito deve essere eseguito (0 minuti e 0 ore, ossia mezzanotte).

    I successivi due campi (giorno del mese e mese) sono impostati su *,
    il che significa che il compito deve essere eseguito ogni giorno del mese, in ogni mese.

    Il ultimo campo (giorno della settimana) è anche impostato su *,
    il che significa che il compito deve essere eseguito ogni giorno della settimana.

*/
const {ObjsSFDC} = require('../sfdc_logic/authSfdc')

const objSfdc = new ObjsSFDC();


class StartSchedule{
    constructor() {
        
    }

    sheduleTimeList(){
        cron.schedule("*/300 * * * *", () => {
            console.log('Start schedule');

            objSfdc.get_ListLeads()
                .then((result) => {
                    objSfdc.authSFDC()
                    .then((result) => {
                        //console.log('>>>> ',result);
                        objSfdc.upsertLeads()
                        .then((result) => {
                            
                            objSfdc.get_ListQuestions()
                            .then((result) => {
                                objSfdc.authSFDC()
                                .then((result) => {
                                    //console.log('>>>> ',result);
                                    objSfdc.upsertQuestions()
                                    .then((result) => {
                                        //console.log('>>>> ',result);
                                    }).catch((err) => {
                                        
                                    });
                                }).catch((err) => {
                                    
                                });
                            }).catch((err) => {
                                
                            });

                        }).catch((err) => {
                            
                        });
                    }).catch((err) => {
                        
                    });
                }).catch((err) => {
                    
                });
        });
    }
}

module.exports = {StartSchedule}
