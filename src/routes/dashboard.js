const {Router}=require('express')
const router=Router()
const authorization= require('../middleware/authorization')
const controller= require('../controllers/dashboard')

router.get('/', authorization, controller.dashboard)

module.exports=router