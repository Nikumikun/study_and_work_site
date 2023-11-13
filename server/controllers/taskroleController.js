const {TaskRole} = require('../models/models')
const ApiError = require('../error/ApiError')
class taskroleController {
    async create(req,res,next){
        try {
            const {Name,Description} = req.body
            const taskrole = await TaskRole.create(
                {Name:Name,
                Description:Description})
            return res.json(taskrole)
        } catch (e) {
            next(ApiError.badRequest(e.message))
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
            const {TaskRoleId, Name, Description} = req.body
            const updateTaskRole = await TaskRole.update({
                    Name: Name,
                    Description: Description,
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