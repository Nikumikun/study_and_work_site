const Router = require('express')
const router = new Router()
const decisionController = require('../controllers/decisionController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/create', decisionController.create)
router.get('/get', decisionController.getAll)
router.patch('/update',checkRole(3), decisionController.update)
router.delete('/delete',checkRole(3), decisionController.delete)
module.exports = router
