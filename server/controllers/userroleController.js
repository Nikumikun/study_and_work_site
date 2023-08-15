const {UserRole} = require('../models/models')
const ApiError = require('../error/ApiError')
class userroleController {
    async create(req,res, next){
        try {
            const {Name} = req.body
            const {Description} = req.body
            const userrole = await UserRole.create({Name,Description})
            return res.json(userrole)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        const userroles = await UserRole.findAll()
        return res.json(userroles)
    }
    async delete(req, res, next){
        try {
            const {UserRoleId} = req.query
            const deleteUserRole = await UserRole.destroy({
                where: { UserRoleId }
            })
            return res.json({message: 'Запись была удалена'})

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next){
        try {
            const {UserRoleId, Name, Description} = req.body
            const updateUserRole = await UserRole.update({
                    Name: Name,
                    Description: Description,
                },
                {
                    where: {UserRoleId},
                })
            return res.json(updateUserRole)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new userroleController()