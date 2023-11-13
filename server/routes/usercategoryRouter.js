const Router = require('express')
const router = new Router()
const usercategoryController = require('../controllers/usercategoryController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/', usercategoryController.create)
router.get('/', usercategoryController.getAll)
router.delete('/',checkRole(2), usercategoryController.delete)
router.patch('/', checkRole(2), usercategoryController.update)
module.exports = router