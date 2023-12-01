const {TaskRole} = require('../models/models')
const ApiError = require('../error/ApiError')
class taskroleController {
    async create(req,res,next){
        try {
            const {Name} = req.body
            const taskrole = await TaskRole.create(
                {Name:Name})
            return res.json(taskrole)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getTaskRole(req,res){
        const TaskRoleId = req.params.Id
        if (TaskRoleId !== undefined) {
            const selectedRole= await TaskRole.findOne(
            {
                where: {TaskRoleId},
            }
        )
        return res.json(selectedRole)
        } else {
            return console.log("Пусто")
        }
    }
    async getAll(req,res){
        const taskroles = await TaskRole.findAll()
        return res.json(taskroles)
    }
    async delete(req, res, next){
        try {
            const {TaskRoleId} = req.query
            const deleteTaskRole = await TaskRole.destroy({
                where: { TaskRoleId }
            })
            return res.json({message: 'Запись была удалена'})

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next){
        try {
            const {TaskRoleId, Name} = req.body
            const updateTaskRole = await TaskRole.update({
                    Name: Name
                },
                {
                    where: {TaskRoleId},
                })
            return res.json(updateTaskRole)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new taskroleController()