const {TaskStatus} = require('../models/models')
const ApiError = require('../error/ApiError')
class taskstatusController {
    async create(req,res,next){
        try {
            const {Name} = req.body
            const {Description} = req.body
            const {colourColourId} = req.body
            const taskstatus = await TaskStatus.create({Name,Description,colourColourId})
            return res.json(taskstatus)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        const taskstatuses = await TaskStatus.findAll()
        return res.json(taskstatuses)
    }
}
module.exports = new taskstatusController()