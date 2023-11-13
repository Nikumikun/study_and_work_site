const Router = require('express')
const router = new Router()
const taskstatusController = require('../controllers/taskstatusController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/add', taskstatusController.create)
router.get('/getAll', taskstatusController.getAll)
router.patch('/', checkRole(2), taskstatusController.update)
router.delete('/', checkRole(2), taskstatusController.delete)
module.exports = router