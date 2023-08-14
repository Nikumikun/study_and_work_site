const {TaskRole} = require('../models/models')
const ApiError = require('../error/ApiError')
class taskroleController {
    async create(req,res,next){
        try {
            const {Name} = req.body
            const {Description} = req.body
            const taskrole = await TaskRole.create({Name,Description})
            return res.json(taskrole)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        const taskroles = await TaskRole.findAll()
        return res.json(taskroles)
    }
}
module.exports = new taskroleController()