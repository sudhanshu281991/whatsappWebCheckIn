const express = require('express')
const router = express.Router()
const serverController = require('./serverController')


router.route('/getMasterDataAPI').post(serverController.getMasterData)
router.route('/getMonumentListData').post(serverController.getMonumentListData)
router.route('/asiSuggestionsAPI').post(serverController.getAutoSearchResult)
router.route('/getMonumentDetailsAPI').post(serverController.getMonumentDetails)
router.route('/checkMonumentAvailability').post(serverController.checkMonumentAvailability)
router.route('/savePaxDetailsAPI/:superPNR').post(serverController.savePaxDetailsAPI)
router.route('/getBookingSummary').post(serverController.getBookingSummary)
router.route('/getNearbyMonumentAPI').post(serverController.getNearbyMonument)
router.route('/payments/status').post(serverController.postPaymentStatus)
router.route('/payments/status').get(serverController.getPaymentStatus)

module.exports = router