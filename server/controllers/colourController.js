const {Colour} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require("uuid");
const path = require("path");
class colourController {
    async create(req,res,next){
        try {
            const {Name} = req.body
            const colour = await Colour.create({Name})
            return res.json(colour)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        const colours = await Colour.findAll()
        return res.json(colours)
    }
    async delete(req, res, next){
        try {
            const {ColourId} = req.query
            const deleteColour = await Colour.destroy({
                where: { ColourId }
            })
            return res.json({message: 'Запись была удалена'})

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next){
        try {
            const {ColourId, Name} = req.body
            const updateColour = await Colour.update({
                Name: Name,
            },
                {
                where: {ColourId},
                })
            return res.json(updateColour)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new colourController()