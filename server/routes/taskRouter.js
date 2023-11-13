const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/add', taskController.create)
router.get('/getAll', taskController.getAll)
// Проверка пользователя
router.get('/historytasks', taskController.getHistory)
router.get('/:TaskId', taskController.getOne)
router.delete('/',taskController.delete)
module.exports = router