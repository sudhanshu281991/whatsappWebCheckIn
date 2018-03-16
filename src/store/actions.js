import Vue from 'vue'
import {fetchMasterDataAPI,fetchMonumentListDataAPI,fetchMonumentDetailsDataAPI} from '../api/api'
export default {
 fetchMonumentListData :(context) => {
   return Promise.all([fetchMasterDataAPI(),fetchMonumentListDataAPI()]).then(values => { 
        context.commit('setMasterData', JSON.parse(values[0].body).data)
        context.commit('setMonumentListData',values[1].body.data)
    })
 },
 fetchMonumentDetailsData : (context,monumentID) =>{
    return Promise.all([fetchMonumentDetailsDataAPI(monumentID)]).then(values => { 
        context.commit('setMonumentDetailsData', JSON.parse(values[0].body).data)
     })
  }
}




