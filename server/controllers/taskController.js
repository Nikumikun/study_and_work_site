const {Task, Decision, TaskRole, TaskStatus, User, TaskComments, TaskChecker, TaskCategory} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')

class TaskController {
    async create(req,res,next){
        const StatusCreated = await TaskStatus.findOrCreate({
                where: {Name: "Ожидание"}
            })
            try {
            const {Name,Address,Price,Description,CategoryTask,RoleTask,UserIdCreateTask} = req.body
            console.log(Name,Address,Price,Description,CategoryTask,RoleTask,UserIdCreateTask)
            const task = await Task.create({Name,Address,Price,Description,
                taskstatusTaskStatusId:StatusCreated[0].dataValues.TaskStatusId,taskroleTaskRoleId:RoleTask,taskcategoryTaskCategoryId:CategoryTask,UserIdCreateTask:UserIdCreateTask})
            return res.json(task)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async addDecision(req,res, next){
        try {
            const {TaskId,Description,Address} = req.body
            console.log(Description,Address)
            const checker = await TaskChecker.findOrCreate({
                where: {Name: "На проверке"}
            })
            console.log(checker)
            const decision = await Decision.create({Description,Address})
            const task = await Task.update(
                {
                    decisionDecisionId: decision.DecisionId,
                    taskcheckerTaskCheckerId: checker[0].dataValues.TaskCheckerId,
                },
                {
                    where:{TaskId:TaskId}
                }
                )
                
            return res.json(task)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async updateTaskAndDecision(req,res,next){
        try {
            const {TaskId,UserId} = req.body
            const task = await Task.update(
            {
                UserIdTakeTask:UserId,
            },
            {
                where:{TaskId:TaskId}
            }
            )
            return res.json(task)
        } catch (error) {
            next(ApiError.badRequest(e.message))
        }
    }
    async complete(req,res,next){
        try {
            const {Id} = req.body
            const taskchekercomplete = await TaskChecker.findOrCreate({
                where: {Name: "Проверено"}
            })
            const task = await Task.update(
            {
                taskcheckerTaskCheckerId:taskchekercomplete[0].dataValues.TaskCheckerId,
            },
            {
                where:{TaskId:Id}
            }
            )
            return res.json(task)
        } catch (error) {
            next(ApiError.badRequest(e.message))
        }
    }
    async updateTask(req,res,next){
            try {
            const {TaskId,Name,Address,Price,Description,CategoryTask,RoleTask} = req.body
            console.log(TaskId,Name,Address,Price,Description,CategoryTask,RoleTask)
            const task = await Task.update(
                {Name,Address,Price,Description,taskroleTaskRoleId:RoleTask,taskcategoryTaskCategoryId:CategoryTask},
                {
                    where: {TaskId:TaskId}
                }
                )
            return res.json(task)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        let {taskstatusTaskStatusId, taskroleTaskRoleId, limit, page} = req.query
        page = page || 1
        limit = limit || 4
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
                    },
                    {
                        model: TaskCategory,
                    },
                    {
                        model: TaskChecker,
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
                include: [{model:Decision}, {model:TaskCategory}, {model:TaskChecker}, {model:TaskRole}, {model:TaskStatus}, {model:User,as:'UserCreateTask'},
                    {model: User,as: 'UserTakeTask'}]
            },
        )
        return res.json(task)
    }
    async taskcheckers(req,res){
        const taskcheckers = await TaskChecker.findAll()
        return res.json(taskcheckers)
    }
async AllTask(req,res){
    const taskcheckers = await Task.findAll()
    return res.json(taskcheckers)
}
    async history(req,res,next){
        try {
        const task = await Task.findAll(
            {include:[{model:Decision}, {model:TaskCategory}, {model:TaskRole}, {model:TaskStatus}, {model:TaskChecker}, {model:User,as:'UserCreateTask'},
        {model: User,as: 'UserTakeTask'}]})
        return res.json(task)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }
    async delete(req, res, next){
        try {
            const {TaskId} = req.query
            const deleteTask = await Task.destroy({
                where: { TaskId }
            })
            return res.json({message: 'Запись была удалена'})

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new TaskController()