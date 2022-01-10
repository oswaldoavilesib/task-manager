const axios = require('axios');


class ClickUpApi {
    constructor(){
        this.api = axios.create({
            baseURL:'https://api.clickup.com/api/v2/'
        });
    }

    getAccessToken = (clickUpCode) => {
        return this.api.post(`/oauth/token?code=${clickUpCode}&client_id=MTQ6E6ABG2IQZHO4LSAGYKHKY2HAGWCC&client_secret=LRQU1S2ZFFLFAPVW1WYD5BI2DV2UFIBPRU6G4Z024IB01A33GI3598JA2828HWZL`)
    }
    
    getTeams = () => this.api.get('/team')

    //getAllCharacters = () => this.api.get('/characters')

    //getOneCharacter = characterId => this.api.get(`/characters/${characterId}`)

   //getCharacterInfo = characterInfo => this.api.post(`/characters`,characterInfo)

    //editCharacter = (characterId,characterInfo) => this.api.put(`/characters${characterId}`,characterInfo)

    //deleteCharacter = characterId => this.api.delete(`/characters/${characterId}`);
}

module.exports = ClickUpApi;