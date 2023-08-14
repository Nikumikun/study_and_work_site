const Router = require('express')
const router = new Router()
const taskstatusController = require('../controllers/taskstatusController')
router.post('/', taskstatusController.create)
router.get('/', taskstatusController.getAll)
router.delete('/',)
module.exports = router