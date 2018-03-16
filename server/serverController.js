const request = require('request')
const middleWareURL = 'get-asi-data/asiAPI'
const domainURL = process.env.NODE_ENV === 'production' ?  'http://asitickets.com' : 'http://asitickets.com     '
const baseURL = 'asi'

module.exports = {
    getMasterData : function(req,res){
        request.get({ url: `${domainURL}/${middleWareURL}/masterdata`},function(error, response, body) {
           handleGETResponse(req,res,error,response,body)
        }) 
    },
    getMonumentListData : function(req,res){
        request.post({
             headers: {'content-type' : 'application/json'},
             url: `${domainURL}/${middleWareURL}/monuments`,
             json : {},
            },function(error, response, body) {
               handlePOSTResponse(req,res,error,response,body)
        }) 
    },
    getAutoSearchResult : function(req,res){
        request.get({
             url: `${domainURL}/${middleWareURL}/suggestions/${req.body.searchedKeyWord}`,
            },function(error, response, body) {
                handleGETResponse(req,res,error,response,body)
        }) 
    },
    getMonumentDetails : function(req,res){
        if(req.body.monumentID == undefined){
           res.redirect(`${domainURL}/${baseURL}/404`) 
        } else {
          request.get({
             url: `${domainURL}/${middleWareURL}/monuments/${req.body.monumentID}`,
             headers: {'content-type' : 'application/json','com.yatra.tenant.header.tenantId':'5405'},
             },function(error, response, body) {
               handleGETResponse(req,res,error,response,body)
        })
        }
    },
     checkMonumentAvailability : function(req,res){
        request.get({
             url: `${domainURL}/${middleWareURL}/booking/${req.body.monumentID}/available`,
             headers: {'content-type' : 'application/json','com.yatra.tenant.header.tenantId':'5405'},
             },function(error, response, body) {
               handleGETResponse(req,res,error,response,body)
        }) 
    },
    savePaxDetailsAPI : function(req,res){
        request.post({
             url: `${domainURL}/${middleWareURL}/booking/${req.params.superPNR}/paxdetails`,
             headers: {'content-type' : 'application/json','com.yatra.tenant.header.tenantId':'5405'},
             json:req.body,
             },function(error, response, body) {
              handlePOSTResponse(req,res,error,response,body)
        }) 
    },
    getBookingSummary : function(req,res){
        request.get({
             url: `${domainURL}/${middleWareURL}/booking/${req.body.superPNR}/summary`,
             headers: {'content-type' : 'application/json','com.yatra.tenant.header.tenantId':'5405'},
             },function(error, response, body) {
               handleGETResponse(req,res,error,response,body)
        }) 
    },
    getNearbyMonument : function(req,res){
        request.get({
             url: `${domainURL}/${middleWareURL}/monuments/${req.body.monumentID}/nearbymonuments`,
             headers: {'content-type' : 'application/json','com.yatra.tenant.header.tenantId':'5405'},
             },function(error, response, body) {
                handleGETResponse(req,res,error,response,body)
        }) 
    },
    postPaymentStatus : function(req,res){
        if(req.body.suc == 'true'){
           res.redirect(`${domainURL}/${baseURL}/confirmation?ttid=`+req.query.ttid)
        } else {
           res.redirect(`${domainURL}/${baseURL}/home`)
        }
    },
    getPaymentStatus : function(req,res){
       res.redirect(`${domainURL}/${baseURL}/home`)
    }
}


function  handleGETResponse (req,res,error,response,body){
            res.json(body) 
}
function  handlePOSTResponse(req,res,error,response,body){
            res.json(body) 
}
