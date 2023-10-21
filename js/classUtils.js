class AuthRespSFDC {
    constructor() {
        this.access_token = '';
        this.instance_url = '';
        this.id = '';
        this.token_type = '';
        this.issued_at = '';
        this.signature = '';
    }

    update(jsonRespAuth){
        this.access_token = jsonRespAuth.access_token;
        this.instance_url = jsonRespAuth.instance_url.replaceAll('https://','');
        this.id = jsonRespAuth.id;
        this.token_type = jsonRespAuth.token_type;
        this.issued_at = jsonRespAuth.issued_at;
        this.signature = jsonRespAuth.signature;
    }
}

module.exports = {AuthRespSFDC}