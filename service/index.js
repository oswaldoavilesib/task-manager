const axios = require('axios');


class ClickUpApi {
    constructor(){
        this.api = axios.create({
            baseURL:'https://api.clickup.com/api/v2/'
        });
    }

    getAccessToken = (code) => {
        return this.api.post(`/oauth/token?code=${code}&client_id=${process.env.CLIENTID}&client_secret=${process.env.CLIENTSECRET}`)
    }
    
    getTeams = () => this.api.get('/team')

    //getAllCharacters = () => this.api.get('/characters')

    //getOneCharacter = characterId => this.api.get(`/characters/${characterId}`)

   //getCharacterInfo = characterInfo => this.api.post(`/characters`,characterInfo)

    //editCharacter = (characterId,characterInfo) => this.api.put(`/characters${characterId}`,characterInfo)

    //deleteCharacter = characterId => this.api.delete(`/characters/${characterId}`);
}

module.exports = ClickUpApi;