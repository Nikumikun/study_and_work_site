const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const taskRouter = require('./taskRouter')
const decisionRouter = require('./decisionRouter')
const feedbackRouter = require('./feedbackRouter')
const taskroleRouter = require('./taskroleRouter')
const taskstatusRouter = require('./taskstatusRouter')
const userroleRouter = require('./userroleRouter')
router.use('/user',userRouter)
router.use('/task',taskRouter)
router.use('/decision',decisionRouter)
router.use('/feedback',feedbackRouter)
router.use('/taskrole',taskroleRouter)
router.use('/taskstatus',taskstatusRouter)
router.use('/userrole',userroleRouter)
module.exports = router
