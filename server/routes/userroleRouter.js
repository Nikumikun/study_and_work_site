const Router = require('express')
const router = new Router()
const userroleController = require('../controllers/userroleController')
router.post('/', userroleController.create)
router.get('/', userroleController.getAll)
router.delete('/',)
module.exports = router