const Router = require('express')
const router = new Router()
const colourController = require('../controllers/colourController')
router.post('/', colourController.create)
router.get('/', colourController.getOne)
router.delete('/',)
module.exports = router