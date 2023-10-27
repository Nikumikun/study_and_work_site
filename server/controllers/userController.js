const {User,Feedback, UserRole} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {DATEONLY, DataTypes, DATE, NOW} = require("sequelize");
const generateJwt = (UserId,UserName,Birthday,Email,feedbackFeedbackId,userroleUserRoleId,usercategoryUserCategoryId) => {
    return jwt.sign({UserId,UserName,Birthday,Email,feedbackFeedbackId,userroleUserRoleId,usercategoryUserCategoryId},
        process.env.SECRET_KEY, {expiresIn: '24h'})
}
class UserController {
    async registration(req,res,next){
        try {
            const {UserName, Birthday, Email, Password} = req.body
            const dateNow = new Date(Date.now())
            const dateIf = new Date(1950,1,1)
            const birthdayIf = new Date(Date.parse(Birthday))
            if (birthdayIf > dateIf && birthdayIf < dateNow) {
                if (!Email || !Password){
                    return next(ApiError.badRequest('Некорректный email или password'))
                } else {
                    const candidate = await User.findAll({where: {Email}})
                    if (candidate === null) {
                        return next(ApiError.badRequest('Пользователь уже существует с таким email'))
                    } else {
                        const hashPassword = await bcrypt.hash(Password,5)
                        const findRoleAdmin = await UserRole.findOrCreate({
                            where:{
                                Name: "Админ"
                            }, defaults: {Description: "Пользователь с правами админа"}})
                        const findRoleUser = await UserRole.findOrCreate({
                            where:{
                                Name: "Пользователь"
                            }, defaults: {Description: "Пользователь без админ-прав"}})
                        const findRoleWorker = await UserRole.findOrCreate({
                            where:{
                                Name: "Сотрудник",
                            }, defaults: {Description: "Пользователь с ограниченными правами админа"}})
                        const feedback = await Feedback.create()
                        const user = await User.create({UserName,Birthday,Email,Password: hashPassword,
                            feedbackFeedbackId: feedback.FeedbackId, userroleUserRoleId:findRoleUser[0].dataValues.UserRoleId})
                        const token = generateJwt(user.UserId,user.UserName,user.Birthday,user.Email,user.feedbackFeedbackId,
                            user.userroleUserRoleId,user.usercategoryUserCategoryId)
                        return res.json({token})
                        }
                }
            } else {
                return next(ApiError.badRequest('Дата вышла за рамки границы'))
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req,res,next){
        try {
            const findRoleAdmin = await UserRole.findOrCreate({
                where:{
                    Name: "Админ"
                }, defaults: {Description: "Пользователь с правами админа"}})
            const findRoleUser = await UserRole.findOrCreate({
                where:{
                    Name: "Пользователь"
                }, defaults: {Description: "Пользователь без админ-прав"}})
            const findRoleWorker = await UserRole.findOrCreate({
                where:{
                    Name: "Сотрудник",
                }, defaults: {Description: "Пользователь с ограниченными правами админа"}})
            const {Email,Password} = req.body
            const user = await User.findAll({
                where:{Email}
            })
            if (!user) {
                return next(ApiError.internal('Пользователь не существует'))
            }
            let comparePassword = bcrypt.compareSync(Password,user[0].dataValues.Password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(user[0].dataValues.UserId,user[0].dataValues.UserName,user[0].dataValues.Birthday,
                user[0].dataValues.Email, user[0].dataValues.feedbackFeedbackId,user[0].dataValues.userroleUserRoleId,
                user[0].dataValues.usercategoryUserCategoryId)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async check(req,res,next){
        const token = generateJwt(req.user.UserId,req.user.UserName,req.user.Birthday,
            req.user.Email,req.user.feedbackFeedbackId,
            req.user.userroleUserRoleId,req.user.usercategoryUserCategoryId)
        return res.json({token})
    }
    async delete(req, res, next){
        try {
            const {UserId} = req.query
            const deleteUser = await User.destroy({
                where: { UserId }
            })
            return res.json({message: 'Запись была удалена'})

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async updateRole(req,res,next) {
        try {
            
        } catch (error) {
            
        }
    }
    async updateRole(req,res,next){
        try {
            const {UserName,userroleUserRoleId} = req.body
            const updateRole = await User.update({
                userroleUserRoleId: userroleUserRoleId
            },
            {
                where: {UserName}
            })
            return res.json(updateRole)
        } catch (error) {
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next){
        try {
            const {UserId, UserName, Email, Password, feedbackFeedbackId, userroleUserRoleId} = req.body
            const updateUser = await User.update({
                    UserName: UserName,
                    Email: Email,
                    Password: Password,
                    userroleUserRoleId: userroleUserRoleId,
                },
                {
                    where: {UserId},
                })
            return res.json(updateUser)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new UserController()