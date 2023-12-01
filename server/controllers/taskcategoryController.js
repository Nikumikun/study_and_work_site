const {TaskCategory} = require('../models/models')
const ApiError = require('../error/ApiError')
class taskcategoryController {
    async create(req,res,next){
        try {
            const {Name} = req.body
            const taskcategory = await TaskCategory.create({Name})
            return res.json(taskcategory)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getTaskCategory(req,res){
        const TaskCategoryId = req.params.Id
        if (TaskCategoryId !== undefined) {
            const selectedCategory = await TaskCategory.findOne(
            {
                where: {TaskCategoryId},
            }
        )
        return res.json(selectedCategory)
        } else {
            return console.log("Пусто")
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
            const {TaskCategoryId, Name} = req.body
            const updateTaskCategory = await TaskCategory.update({
                    Name: Name
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