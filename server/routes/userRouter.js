const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const {checkAndMakeDir} = require("express-fileupload/lib/utilities");
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.patch('/updateRole', userController.updateRole)
router.patch('/blacklist', userController.BlackList)
router.get('/auth',authMiddleware, userController.check)
router.get('/userslist',userController.userList)
router.delete('/', userController.delete)
module.exports = router