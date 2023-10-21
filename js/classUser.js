class UserTelegramInfo {

    constructor(){
        this.id = '';
        this.firstName = '';
        this.lastName = '';
        this.usrName = '';
        this.useDate = new Date();
        this.leng = '';
        this.countUsrSendMsg = 0;
        this.clickBtn = {
            start:false,
            selectLeng:false,
            whoIs:false,
            hisExperiences:false,
            whatDoesItOffer:false,
            contactHim:false,
            eComerceIntegrations:false,
            serviceMarketing:false,
            dataMigration:false,
            migrationCallBack:false,
            teamLeaderTrainer:false,
        }
    }

    usrUpdate(msg){

        const ckCharatter = (text)=>{
            let ck_text = text
            ck_text = text.replaceAll('\'','\\\'')
            ck_text = text.replaceAll('\"','\\\"')
            return ck_text
        }
        this.id = msg.from.id
        this.firstName = ckCharatter(msg.from.first_name)
        this.lastName = msg.from.last_name !== undefined ? ckCharatter(msg.from.last_name) : '#ND'
        this.usrName = msg.from.username !== undefined ? ckCharatter(msg.from.username) : '#ND';

    }

    flowUpdate(objFlow){
        this.leng = objFlow.len !== undefined ? objFlow.len : '';
        this.clickBtn['start'] = objFlow['start']
        this.clickBtn['selectLeng'] = objFlow['selectLeng']
        this.clickBtn['whoIs'] = objFlow['whoIs']
        this.clickBtn['hisExperiences'] = objFlow['hisExperiences']
        this.clickBtn['whatDoesItOffer'] = objFlow['whatDoesItOffer']
        this.clickBtn['contactHim'] = objFlow['contactHim']
        this.clickBtn['eComerceIntegrations'] = objFlow['eComerceIntegrations']
        this.clickBtn['serviceMarketing'] = objFlow['serviceMarketing']
        this.clickBtn['dataMigration'] = objFlow['dataMigration']
        this.clickBtn['migrationCallBack'] = objFlow['migrationCallBack']
        this.clickBtn['teamLeaderTrainer'] = objFlow['teamLeaderTrainer']
    
    }


}

module.exports = {UserTelegramInfo}