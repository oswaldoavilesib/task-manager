const axios = require('axios');


class ClickUpApi {
    constructor(){
        this.api = axios.create({
            baseURL:'https://api.clickup.com/api/v2/'
        });

        this.accessToken = ""
    }

    saveAccessToken(code){
        this.api.defaults.headers.common['Authorization'] = code
        //this.accessToken = code;
        console.log("THIS API",this.api)
    }

    getAccessToken(clickUpCode) {
        return this.api.post(`/oauth/token?code=${clickUpCode}&client_id=${process.env.CLIENTID}&client_secret=${process.env.CLIENTSECRET}`)
    }
    
    getTeams(){
        console.log('THIS IS THE APIIIII',this.api)
        // const config = {
        //     headers:{
        //         'Authorization': this.accessToken,
        //     }
        // }
        return this.api.get('/team')
    }

    getSpaces(clickUpAccessToken){

        return this.api.get('/team/12602813/space',{
            headers:{
                'Authorization': clickUpAccessToken
            }
        })
    }

    createSpace(clickUpAccessToken){
        const spaceId = Math.floor(Math.random()*899999 + 100000)
        return this.api.post(`/team/${spaceId}/space`,{
            headers: {
                'Authorization': clickUpAccessToken
            }
        })
    }


    //-----FOLDERS------//
    getFolders(){
        return this.api.get('/team//space',{
            headers:{
                'Authorization': clickUpAccessToken
            }
        })
    }

    //getAllCharacters = () => this.api.get('/characters')

    //getOneCharacter = characterId => this.api.get(`/characters/${characterId}`)

   //getCharacterInfo = characterInfo => this.api.post(`/characters`,characterInfo)

    //editCharacter = (characterId,characterInfo) => this.api.put(`/characters${characterId}`,characterInfo)

    //deleteCharacter = characterId => this.api.delete(`/characters/${characterId}`);
}

module.exports = ClickUpApi;