const {User,Feedback} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateJwt = (UserId,Email,userroleUserRole) => {
    return jwt.sign({UserId, Email, userroleUserRole},
        process.env.SECRET_KEY, {expiresIn: '24h'})
}
class UserController {
    async registration(req,res, next){
        const {UserName, Email, Password, feedbackFeedbackId, userroleUserRoleId} = req.body
        if (!Email || !Password){
            return next(ApiError.badRequest('Некоррекстный email или password'))
        }
        const candidate = await User.findOne({where: {Email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь уже существует с таким email'))
        }
        const hashPassword = await bcrypt.hash(Password,5)
        const feedback = await Feedback.create()
        const user = await User.create({UserName,Email,Password: hashPassword,
            feedbackFeedbackId: feedback.FeedbackId, userroleUserRoleId})
        const token = generateJwt(user.UserId,user.Email,user.userroleUserRoleId)
        return res.json({token})
    }

    async login(req,res,next){
        const {Email,Password} = req.body
        const user = await User.findOne({where: {Email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не существует'))
        }
        let comparePassword = bcrypt.compareSync(Password,user.Password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.UserId, user.Email, user.userroleUserRole)
        return res.json(token)
    }
    async check(req,res,next){
        const token = generateJwt(req.user.UserId,req.user.Email,req.user.userroleUserRole)
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