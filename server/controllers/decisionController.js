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
    async getAll(req,res,next){
        try {
            const {DecisionId} = req.query
            const decision = await Decision.findAll({
                where: { DecisionId }
            })
            return res.json(decision)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res, next){
        try {
            const {DecisionId} = req.query
            const deleteDecision = await Decision.destroy({
                where: { DecisionId }
            })
            return res.json({message: 'Запись была удалена'})

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next){
        try {
            const {DecisionId, Description} = req.body
            const {File} = req.files
            let fileName = uuid.v4() + ".docx"
            await File.mv(path.resolve(__dirname, '..', 'static', fileName))
            const updateDecision = await Decision.update({
                    Description: Description,
                File: File,
                },
                {
                    where: {DecisionId},
                })
            return res.json(updateDecision)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new decisionController()