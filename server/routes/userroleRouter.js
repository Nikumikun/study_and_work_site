const Router = require('express')
const router = new Router()
const userroleController = require('../controllers/userroleController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/',checkRole(2), userroleController.create)
router.get('/', userroleController.getAll)
router.delete('/',checkRole(2), userroleController.delete)
router.patch('/', checkRole(2), userroleController.update)
module.exports = router