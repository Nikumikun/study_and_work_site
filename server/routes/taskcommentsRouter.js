const Router = require('express')
const router = new Router()
const taskcommentsController = require('../controllers/taskcommentsController')
router.post('/add', taskcommentsController.addComment)
router.get('/get', taskcommentsController.comments)
module.exports = router