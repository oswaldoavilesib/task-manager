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
        //get spaces//
    getSpaces(teamId,clickUpAccessToken){
        console.log('THIS.TEAMID',teamId)
        return this.api.get(`/team/${teamId}/space`,{
            headers:{
                'Authorization': clickUpAccessToken
            }
        })
    }
        //create spaces//
    createSpace(teamId,clickUpAccessToken,spaceName){
        console.log("TEAM ID",teamId)
        console.log("TOKEN: ",clickUpAccessToken )
        console.log("spaceNAME ON APIHANDLER",spaceName)
        let data = {
            'name': spaceName,
        }
        return this.api.post(`/team/${teamId}/space`,
        data,
        {
            headers:{
                'Authorization': clickUpAccessToken
            }
        })
    }


    //-----FOLDERS------//
    getFolders(spaceId,clickUpAccessToken){
        console.log("CLICKUPTOKEN ON APIHANDLER",clickUpAccessToken)
        console.log("spaceId ON APIHANDLER",spaceId)
        return this.api.get(`/space/${spaceId}/folder`,
        {
            headers:{
                'Authorization': clickUpAccessToken
            }
        })
    }

    
    //-----LISTS------//
    getLists(folderId,clickUpAccessToken){
        return this.api.get(`/folder/${folderId}/list`,{
            headers:{
                'Authorization': clickUpAccessToken
            }
        })
    }

    //-----TASKS------//
    getTasks(listId,clickUpAccessToken){
        console.log("LIST ID EN APIHANDLER",listId)
        console.log("ACCESS TOKEN",clickUpAccessToken)
        return this.api.get(`/list/${listId}/task`,{
            headers:{
                'Authorization': clickUpAccessToken
            }
        })
    }

}

module.exports = ClickUpApi;