const {Router}=require('express')
const router=Router()
const controller= require('../controllers/guestCheckIn')

router.get('/:code', controller.guestCheckIn)
router.put('/isattending/:guestId',controller.updateIsAttending)
router.get('/getevent/:weddingId',controller.getEvent)
module.exports=router