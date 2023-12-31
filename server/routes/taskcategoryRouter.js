const Router = require('express')
const router = new Router()
const taskcategoryController = require('../controllers/taskcategoryController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/add', taskcategoryController.create)
router.get('/getAll', taskcategoryController.getAll)
router.get('/:Id',taskcategoryController.getTaskCategory)
router.patch('/',checkRole(2), taskcategoryController.update)
router.delete('/',checkRole(2), taskcategoryController.delete)
module.exports = router