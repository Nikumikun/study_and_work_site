const {UserRole, User} = require('../models/models')
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
}
module.exports = new userroleController()