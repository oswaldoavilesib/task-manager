const axios = require('axios');


class ClickUpApi {
    constructor(){
        this.api = axios.create({
            baseURL:'https://api.clickup.com/api/v2/'
        });

    }

    // saveAccessToken(code){
    //     this.api.defaults.headers['Authorization'] = code
    //     this.accessToken = code;
    //     console.log("THIS API",this.api.defaults.headers)
    // }

    // getTeamsId(teamId){
    //     return this.teamId = teamId;
    // }

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

    getSpaces(clickUpAccessToken){
        console.log('THIS.TEAMID',this.teamId)
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
    getFolders(spaceId,clickUpAccessToken){
        console.log("CLICKUPTOKEN ON APIHANDLER",clickUpAccessToken)
        console.log("spaceId ON APIHANDLER",spaceId)
        return this.api.get(`/team/${spaceId}/space`,{
            headers:{
                'Authorization': clickUpAccessToken
            }
        })
    }


}

module.exports = ClickUpApi;