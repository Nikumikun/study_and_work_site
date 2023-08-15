const Router = require('express')
const router = new Router()
const decisionController = require('../controllers/decisionController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/', checkRole(3), decisionController.create)
router.get('/', decisionController.getAll)
router.patch('/',checkRole(3), decisionController.update)
router.delete('/',checkRole(3), decisionController.delete)
module.exports = router
