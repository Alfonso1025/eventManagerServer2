
const {Router}=require('express')
const router=Router()
const controller= require('../controllers/events')
const { route } = require('./dashboard')
const authorization=require('../middleware/authorization')

router.use(authorization)
router.post('/create',controller.createEvent)
router.get('/list',controller.listEventById)
router.put('/update/:eventId',controller.modifyEvent)
router.delete('/delete/:eventId',controller.deleteEvent)


module.exports=router
