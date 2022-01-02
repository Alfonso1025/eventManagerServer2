const {Router}=require('express')
const router=Router()
const validateInfo=require('../middleware/validateInfo')
const authorization= require('../middleware/authorization')
const controller= require('../controllers/users')

router.get('/', controller.test)
router.post('/registeruser',validateInfo,controller.registeruser )
router.post('/login', validateInfo, controller.login)
router.get('/isverified', authorization, controller.isVerified)
module.exports= router
