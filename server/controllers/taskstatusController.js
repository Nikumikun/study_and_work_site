const {TaskStatus} = require('../models/models')
const ApiError = require('../error/ApiError')
class taskstatusController {
    async create(req,res,next){
        try {
            const {Name} = req.body
            const taskstatus = await TaskStatus.create({Name})
            return res.json(taskstatus)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getTaskStatus(req,res){
        const TaskStatusId = req.params.Id
        console.log(TaskStatusId)
        if (TaskStatusId !== undefined) {
            const selectedStatus = await TaskStatus.findOne(
            {
                where: {TaskStatusId},
            }
        )
        return res.json(selectedStatus)
        } else {
            return console.log("Пусто")
        }
    }
    async getAll(req,res){
        const taskstatuses = await TaskStatus.findAll()
        return res.json(taskstatuses)
    }
    async delete(req, res, next){
        try {
            const {TaskStatusId} = req.query
            const deleteTaskStatus = await TaskStatus.destroy({
                where: { TaskStatusId }
            })
            return res.json({message: 'Запись была удалена'})

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next){
        try {
            const {TaskStatusId, Name} = req.body
            const updateTaskStatus = await TaskStatus.update({
                    Name: Name
                },
                {
                    where: {TaskStatusId},
                })
            return res.json(updateTaskStatus)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new taskstatusController()