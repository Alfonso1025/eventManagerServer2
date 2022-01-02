const {Router}=require('express')
const router=Router()
const controller= require('../controllers/guestCheckIn')

router.get('/:code', controller.guestCheckIn)
router.put('/isattending/:guestId',controller.updateIsAttending)

module.exports=router