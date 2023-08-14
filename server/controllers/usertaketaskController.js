const {UserTakeTask, UserCreateTask} = require('../models/models')
const ApiError = require('../error/ApiError')
class UserTakeTaskController {
    async create (req,res, next)
    {
        try {
            const {userUserId} = req.body
            const {taskTaskId} = req.body
            const usertaketask = await UserCreateTask.create({userUserId,taskTaskId})
            return res.json(usertaketask)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res) {
        const usertaketaskController = await UserTakeTask.findAll()
        return res.json(usertaketaskController)
    }
}
module.exports = new UserTakeTaskController()