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
    async delete(req, res, next){
        try {
            const {FeedbackId} = req.query
            const deleteFeedback = await Feedback.destroy({
                where: { FeedbackId }
            })
            return res.json({message: 'Запись была удалена'})

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next){
        try {
            const {FeedbackId, VK, WhatsApp, Viber, OK, Telegram} = req.body
            const updateFeedback = await Feedback.update({
                    VK: VK,
                    WhatsApp: WhatsApp,
                    Viber: Viber,
                    OK: OK,
                    Telegram: Telegram,
                },
                {
                    where: {FeedbackId},
                })
            return res.json(updateFeedback)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new feedbackController()