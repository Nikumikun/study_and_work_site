const uuid = require('uuid')
const path = require('path')
const {Decision} = require('../models/models')
const ApiError = require('../error/ApiError')
class decisionController {
    async create(req,res, next){
        try {
            const {Description} = req.body
            const {File} = req.files
            let fileName = uuid.v4() + ".docx"
            await File.mv(path.resolve(__dirname, '..', 'static', fileName))
            const decision = await Decision.create({Description,File: fileName})
            return res.json(decision)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req,res){
        const decisions = await Decision.findAll()
        return res.json(decisions)
    }
}
module.exports = new decisionController()