const Router = require('express')
const router = new Router()
const taskcategoryController = require('../controllers/taskcategoryController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/',checkRole(2),taskcategoryController.create)
router.get('/', taskcategoryController.getAll)
router.patch('/',checkRole(2), taskcategoryController.update)
router.delete('/',checkRole(2), taskcategoryController.delete)
module.exports = router