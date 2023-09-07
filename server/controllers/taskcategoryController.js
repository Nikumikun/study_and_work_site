const {TaskCategory} = require('../models/models')
const ApiError = require('../error/ApiError')
class taskcategoryController {
    async create(req,res,next){
        try {
            const {Name} = req.body
            const {Description} = req.body
            const taskcategory = await TaskCategory.create({Name,Description})
            return res.json(taskcategory)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        const taskcategories = await TaskCategory.findAll()
        return res.json(taskcategories)
    }
    async delete(req, res, next){
        try {
            const {TaskCategoryId} = req.query
            const deleteTaskCategory = await TaskCategory.destroy({
                where: { TaskCategoryId }
            })
            return res.json({message: 'Запись была удалена'})

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next){
        try {
            const {TaskCategoryId, Name, Description} = req.body
            const updateTaskCategory = await TaskCategory.update({
                    Name: Name,
                    Description: Description,
                },
                {
                    where: {TaskCategoryId},
                })
            return res.json(updateTaskCategory)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new taskcategoryController()