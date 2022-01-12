const axios = require('axios');


class ClickUpApi {
    constructor(){
        this.api = axios.create({
            baseURL:'https://api.clickup.com/api/v2/'
        });

    }

    //-----GET ACCESS TOKEN------//
    getAccessToken(clickUpCode) {
        return this.api.post(`/oauth/token?code=${clickUpCode}&client_id=${process.env.CLIENTID}&client_secret=${process.env.CLIENTSECRET}`)
    }

    //-----TEAMS------//
    getTeams(clickUpAccessToken){
        
        return this.api.get('/team',{
            headers:{
                'Authorization': clickUpAccessToken
            }
        })
        
    }

    //-----SPACES------//
    getSpaces(teamId,clickUpAccessToken){
        console.log('THIS.TEAMID',teamId)
        return this.api.get(`/team/${teamId}/space`,{
            headers:{
                'Authorization': clickUpAccessToken
            }
        })
    }

    //-----FOLDERS------//
    getFolders(spaceId,clickUpAccessToken){
        console.log("CLICKUPTOKEN ON APIHANDLER",clickUpAccessToken)
        console.log("spaceId ON APIHANDLER",spaceId)
        return this.api.get(`/space/${spaceId}/folder`,{
            headers:{
                'Authorization': clickUpAccessToken
            }
        })
    }

    getLists(folderId,clickUpAccessToken){
        return this.api.get(`/folder/${folderId}/list`,{
            headers:{
                'Authorization': clickUpAccessToken
            }
        })
    }


}

module.exports = ClickUpApi;