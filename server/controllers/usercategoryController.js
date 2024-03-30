const {UserCategory} = require('../models/models')
const ApiError = require('../error/ApiError')
class usercategoryController {
    async create(req,res, next){
        try {
            const {Name} = req.body
            const usercategory = await UserCategory.create({Name:Name})
            return res.json(usercategory)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        const usercategories = await UserCategory.findAll()
        return res.json(usercategories)
    }
    async getOne(req,res){
        const Id = req.params.Id
        const usercategories = await UserCategory.findOne({
            where: {UserCategoryId:Id}
        })
        return res.json(usercategories)
    }
    async delete(req, res, next){
        try {
            const {UserCategoryId} = req.query
            const deleteUserCategory = await UserCategory.destroy({
                where: { UserCategoryId }
            })
            return res.json({message: 'Запись была удалена'})

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next){
        try {
            const {UserCategoryId, Name, Description} = req.body
            const updateUserCategory = await UserCategory.update({
                    Name: Name,
                    Description: Description,
                },
                {
                    where: {UserCategoryId},
                })
            return res.json(updateUserCategory)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new usercategoryController()