import Vue from 'vue'
import {DOMAIN_URL,API_URL} from '../util/constants'
const apiInitialURL = API_URL

export const fetchAutoCompleteAPI = (txt) => {
   return Vue.http.get(`${apiInitialURL}/suggestions/${txt}`)
}
export const fetchMasterDataAPI = () => {
   return Vue.http.get(`${apiInitialURL}/masterdata`)
}

export const fetchMonumentListDataAPI = () => {
     Vue.http.headers['content-type'] = 'application/json'
     return Vue.http.post(`${apiInitialURL}/monuments`,{})
}

export const fetchMonumentDetailsDataAPI = (monumentID) => {
   Vue.http.headers['content-type'] = 'application/json'
   Vue.http.headers.common['com.yatra.tenant.header.tenantId'] = '5405'
   return Vue.http.get(`${apiInitialURL}/monuments/${monumentID}`) 
}
export const checkMonumentAvailabilityAPI = (monumentID) => {
    Vue.http.headers['content-type'] = 'application/json'
    Vue.http.headers.common['com.yatra.tenant.header.tenantId'] = '5405' 
   return Vue.http.get(`${apiInitialURL}/booking/${monumentID}/available`) 
}
export const findNearbyMonumentsAPI = (monumentID) => {
    Vue.http.headers['content-type'] = 'application/json'
    Vue.http.headers.common['com.yatra.tenant.header.tenantId'] = '5405' 
   return Vue.http.get(`${apiInitialURL}/monuments/${monumentID}/nearbymonuments`) 
}

export const savePaxDetailsAPI = (superPNR,paxInfo) => {
   Vue.http.headers['content-type'] = 'application/json'
   Vue.http.headers.common['com.yatra.tenant.header.tenantId'] = '5405'  
   return Vue.http.post(`${apiInitialURL}/booking/${superPNR}/paxdetails`, paxInfo)  
}

export const getBookingSummaryAPI = (superPNR) => {
   Vue.http.headers['content-type'] = 'application/json'
   Vue.http.headers.common['com.yatra.tenant.header.tenantId'] = '5405'  
   return Vue.http.get(`${apiInitialURL}/booking/${superPNR}/summary`)  
}

export const MonumentDetailsDataAPI = (superPNR) => {
    Vue.http.headers['content-type'] = 'application/json'
    Vue.http.headers.common['com.yatra.tenant.header.tenantId'] = '5405'  
    return Vue.http.get(`${apiInitialURL}/booking/${superPNR}/book`)  
 }

 export const submitFeedback = (feedbackData) => {
    Vue.http.headers['content-type'] = 'application/json'
    Vue.http.headers.common['com.yatra.tenant.header.tenantId'] = '5405'  
    return Vue.http.post(`${apiInitialURL}/miscellaneous/feedback`,feedbackData)  
 }
