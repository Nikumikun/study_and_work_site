const Router = require('express')
const router = new Router()
const feedbackController = require('../controllers/feedbackController')
const checkRole = require("../middleware/checkRoleMiddleware");
router.post('/', feedbackController.create)
router.get('/', feedbackController.getAll)
router.get('/:FeedbackId', feedbackController.getOne)
router.patch('/:FeedbackId', feedbackController.update)
router.delete('/',checkRole(3), feedbackController.delete)
module.exports = router