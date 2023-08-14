const {Task, Decision, TaskRole, TaskStatus, User} = require('../models/models')
const ApiError = require('../error/ApiError')
class TaskController {
    async create(req,res,next){
        try {
            let {Name,Price,Description,decisionDecisionId,taskstatusTaskStatusId,taskroleTaskRoleId, info} = req.body
            const task = await Task.create({Name,Price,Description,decisionDecisionId,taskstatusTaskStatusId,taskroleTaskRoleId})
            return res.json(task)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        let {taskstatusTaskStatusId, taskroleTaskRoleId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let tasks;
        if (!taskstatusTaskStatusId && !taskroleTaskRoleId) {
            tasks = await Task.findAndCountAll({limit, offset,include:[
                    {
                        model: Decision,
                    },
                    {
                        model: TaskRole,
                    },
                    {
                        model: TaskStatus,
                    },
                    {
                        model: User,
                        association: 'UserCreateTask'
                    },
                    {
                        model: User,
                        association: 'UserTakeTask'
                    }
                ]})
        }
        if (taskstatusTaskStatusId && !taskroleTaskRoleId) {
            tasks = await Task.findAndCountAll({where: {taskstatusTaskStatusId}, limit, offset})
        }
        if (!taskstatusTaskStatusId && taskroleTaskRoleId) {
            tasks = await Task.findAndCountAll({where: {taskroleTaskRoleId}, limit, offset})
        }
        if (taskstatusTaskStatusId && taskroleTaskRoleId) {
            tasks = await Task.findAndCountAll({where: {taskstatusTaskStatusId,taskroleTaskRoleId}, limit, offset})
        }
        return res.json(tasks)
    }
    async getOne(req,res){
        const {TaskId} = req.params
        const task = await Task.findOne(
            {
                where: {TaskId},
                include: [{model:Decision}, {model:TaskRole}, {model:TaskStatus}, {model:User,as:'UserCreateTask'},
                    {model: User,as: 'UserTakeTask'}]
            },
        )
        return res.json(task)
    }
}
module.exports = new TaskController()