const axios = require('axios');


class ClickUpApi {
    constructor(){
        this.api = axios.create({
            baseURL:'https://api.clickup.com/api/v2/'
        });

        this.accessToken = ""
    }

    saveAccessToken(code){
        this.api.defaults.headers['Authorization'] = code
        //this.accessToken = code;
        console.log("THIS API",this.api.defaults.headers)
    }

    getAccessToken(clickUpCode) {
        return this.api.post(`/oauth/token?code=${clickUpCode}&client_id=${process.env.CLIENTID}&client_secret=${process.env.CLIENTSECRET}`)
    }
    
    getTeams(clickUpAccessToken){
        
        return this.api.get('/team',{
            headers:{
                'Authorization': clickUpAccessToken
            }
        })
    }

    getSpaces(clickUpAccessToken,callback){
        console.log("LA CALLBACK",callback)
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


}

module.exports = ClickUpApi;