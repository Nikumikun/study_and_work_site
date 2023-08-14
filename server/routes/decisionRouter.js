const Router = require('express')
const router = new Router()
const decisionController = require('../controllers/decisionController')
router.post('/', decisionController.create)
router.get('/', decisionController.getAll)
router.delete('/',)
module.exports = router
