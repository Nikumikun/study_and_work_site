const {Feedback} = require('../models/models')
const ApiError = require('../error/ApiError')
class feedbackController {
    async create(req,res, next){
        try {
            const {VK} = req.body
            const {WhatsApp} = req.body
            const {Viber} = req.body
            const {OK} = req.body
            const {Telegram} = req.body
            const feedback = await Feedback.create({Feedback,VK,WhatsApp,Viber,OK,Telegram})
            return res.json(feedback)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        const feedbacks = await Feedback.findAll()
        return res.json(feedbacks)
    }
}
module.exports = new feedbackController()