const {TaskComments} = require('../models/models')
const ApiError = require('../error/ApiError')
class taskcommentsController {
    async addComment(req,res,next){
        try {
        const {TaskId,UserId,Comment} = req.body
        console.log(TaskId,UserId,Comment)
        const taskcomments = await TaskComments.create({TaskId:TaskId,UserIdSendComment:UserId,Comment:Comment})
        return res.json(taskcomments)
        } catch (e) {
        next(ApiError.badRequest(e.message))
        }
    }
    async comments(req,res,next){
    try {
        const {id} = req.params
        const taskcomments = await TaskComments.findAll()
        return res.json(taskcomments)
    } catch (e) {
        next(ApiError.badRequest(e.message))
    }
    }
}

module.exports = new taskcommentsController()