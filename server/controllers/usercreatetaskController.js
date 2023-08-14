const {UserCreateTask} = require('../models/models')
const ApiError = require('../error/ApiError')
class UserCreateTaskController {
    async create (req,res, next)
    {
        try {
            const {userUserId} = req.body
            const {taskTaskId} = req.body
            const usercreatetask = await UserCreateTask.create({userUserId,taskTaskId})
            return res.json(usercreatetask)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res) {
        const usercreatetasks = await UserCreateTask.findAll()
        return res.json(usercreatetasks)
    }
}
module.exports = new UserCreateTaskController()