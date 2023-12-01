const Router = require('express')
const router = new Router()
const taskroleController = require('../controllers/taskroleController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/add',taskroleController.create)
router.get('/getAll', taskroleController.getAll)
router.get('/:Id',taskroleController.getTaskRole)
router.patch('/',checkRole(2), taskroleController.update)
router.delete('/',checkRole(2), taskroleController.delete)
module.exports = router