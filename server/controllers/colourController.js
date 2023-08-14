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
}
module.exports = new colourController()