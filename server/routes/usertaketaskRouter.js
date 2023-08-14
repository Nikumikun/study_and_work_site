const Router = require('express')
const router = new Router()
const usertaketaskController = require('../controllers/usertaketaskController')
router.post('/', usertaketaskController.create)
router.get('/', usertaketaskController.getAll)
router.delete('/',)
module.exports = router