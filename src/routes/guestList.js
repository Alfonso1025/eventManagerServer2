const {Router}=require('express')
const router=Router()
const controller= require('../controllers/guestList')


router.post('/:eventId', controller.createGuest)
router.get('/:eventId', controller.listGuestByEvent)
router.put('/:guestId',controller.modifyGuest)
router.delete('/:guestId',controller.deleteGuest)

module.exports=router