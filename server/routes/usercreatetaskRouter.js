const Router = require('express')
const router = new Router()
const usercreatetaskController = require('../controllers/usercreatetaskController')
router.post('/', usercreatetaskController.create)
router.get('/', usercreatetaskController.getAll)
router.delete('/',)
module.exports = router