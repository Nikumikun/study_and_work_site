const Router = require('express')
const router = new Router()
const colourController = require('../controllers/colourController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.post('/',checkRole(2), colourController.create)
router.get('/', colourController.getAll)
router.patch('/',checkRole(2), colourController.update)
router.delete('/',checkRole(2),colourController.delete)
module.exports = router