const Router = require('express')
const router = new Router()
const taskroleController = require('../controllers/taskroleController')
router.post('/', taskroleController.create)
router.get('/', taskroleController.getOne)
router.delete('/',)
module.exports = router