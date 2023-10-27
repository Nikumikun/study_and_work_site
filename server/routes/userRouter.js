const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const {checkAndMakeDir} = require("express-fileupload/lib/utilities");
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.patch('/updateRole', userController.updateRole)
router.get('/auth',authMiddleware, userController.check)
router.delete('/', userController.delete)
module.exports = router