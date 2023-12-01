const {User,Feedback, UserRole, TaskRole, TaskCategory, TaskStatus, UserCategory} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {DATEONLY, DataTypes, DATE, NOW} = require("sequelize");
const generateJwt = (UserId,UserName,Birthday,Email,feedbackFeedbackId,userroleUserRoleId,usercategoryUserCategoryId) => {
    return jwt.sign({UserId,UserName,Birthday,Email,feedbackFeedbackId,userroleUserRoleId,usercategoryUserCategoryId},
        process.env.SECRET_KEY, {expiresIn: '24h'})
}
const addData = async() => {
    const CategoryTaskDoclad = await TaskCategory.findOrCreate({
        where: {Name: "Доклад",StartPrice: 149.99}
    })
    const CategoryTaskEssay = await TaskCategory.findOrCreate({
        where: {Name: "Эссе",StartPrice: 359.99}
    })
    const CategoryTaskCoursework = await TaskCategory.findOrCreate({
        where: {Name: "Курсовые работы",StartPrice: 1500.00}
    })
    const CategoryTaskDiploma = await TaskCategory.findOrCreate({
        where: {Name: "Диплом",StartPrice: 2000.00}
    })
    const CategoryTaskAbstract = await TaskCategory.findOrCreate({
        where: {Name: "Реферат",StartPrice: 255.49}
    })
    const CategoryTaskPresentation = await TaskCategory.findOrCreate({
        where: {Name: "Презентация",StartPrice: 300.50}
    })
    const CategoryTaskOther = await TaskCategory.findOrCreate({
        where: {Name: "Доработка",StartPrice: 300.00}
    })
    const UserCategoryPhisic= await UserCategory.findOrCreate({
        where: {Name: "Физика"}
    })
    const UserCategoryMath= await UserCategory.findOrCreate({
        where: {Name: "Математика"}
    })
    const UserCategorykIT = await UserCategory.findOrCreate({
        where: {Name: "Информатика"}
    })
    const UserCategoryBiology = await UserCategory.findOrCreate({
        where: {Name: "Биология"}
    })
    const UserCategoryChemistryB = await UserCategory.findOrCreate({
        where: {Name: "Химия"}
    })
    const UserCategoryRussian = await UserCategory.findOrCreate({
        where: {Name: "Русский язык"}
    })
    const UserCategoryEnglish = await UserCategory.findOrCreate({
        where: {Name: "Иностранный язык"}
    })
    const UserCategoryHistory = await UserCategory.findOrCreate({
        where: {Name: "История"}
    })
    const UserCategoryCommunity = await UserCategory.findOrCreate({
        where: {Name: "Обществознание"}
    })
    const UserCategoryGeographic= await UserCategory.findOrCreate({
        where: {Name: "География"}
    })
    const UserCategorySocioLiterature = await UserCategory.findOrCreate({
        where: {Name: "Литература"}
    })
    const RoleTaskPhisic= await TaskRole.findOrCreate({
        where: {Name: "Физика"}
    })
    const RoleTaskMath= await TaskRole.findOrCreate({
        where: {Name: "Математика"}
    })
    const RoleTaskIT = await TaskRole.findOrCreate({
        where: {Name: "Информатика"}
    })
    const RoleTaskBiology = await TaskRole.findOrCreate({
        where: {Name: "Биология"}
    })
    const RoleTaskChemistryB = await TaskRole.findOrCreate({
        where: {Name: "Химия"}
    })
    const RoleTaskRussian = await TaskRole.findOrCreate({
        where: {Name: "Русский язык"}
    })
    const RoleTaskEnglish = await TaskRole.findOrCreate({
        where: {Name: "Иностранный язык"}
    })
    const RoleTaskHistory = await TaskRole.findOrCreate({
        where: {Name: "История"}
    })
    const RoleTaskCommunity = await TaskRole.findOrCreate({
        where: {Name: "Обществознание"}
    })
    const RoleTaskGeographic= await TaskRole.findOrCreate({
        where: {Name: "География"}
    })
    const RoleTaskSocioLiterature = await TaskRole.findOrCreate({
        where: {Name: "Литература"}
    })
    const StatusWait = await TaskStatus.findOrCreate({
        where: {Name: "Ожидание"}
    })
    const StatusProcessing = await TaskStatus.findOrCreate({
        where: {Name: "Выполняется"}
    })
    const StatusFinish = await TaskStatus.findOrCreate({
        where: {Name: "Выполнено"}
    })
    
}
const addAdmin = async() => {
    const findRoleAdmin = await UserRole.findOrCreate({
        where:{
            Name: "Админ"
        }})
    const feedback = await Feedback.create()
    const hashPassword = await bcrypt.hash("lovevca2",5)
    const birthdayadmin = new Date(1997,4,6) 
    const admin = await User.findOrCreate({
        where:{UserName:"Кульцев Иван Александрович",Birthday:birthdayadmin,Email:"lovevca@mail.ru",
    Password:hashPassword,feedbackFeedbackId: feedback.FeedbackId, 
    userroleUserRoleId:findRoleAdmin[0].dataValues.UserRoleId}
})
}

class UserController {
    
    async registration(req,res,next){
        addData()
        addAdmin()
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
                        const feedback = await Feedback.create()
                        const findRoleAdmin = await UserRole.findOrCreate({
                            where:{
                                Name: "Админ"
                            }})
                        const findRoleUser = await UserRole.findOrCreate({
                            where:{
                                Name: "Пользователь"
                            }})
                        const findRoleWorker = await UserRole.findOrCreate({
                            where:{
                                Name: "Сотрудник",
                            }})
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
async userList(req,res,next){
        try {
            const data = await User.findAll({
                include: [{model:UserRole},{model:Feedback},{model:UserCategory}]
            })
            return res.json(data)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
    async login(req,res,next){
        try {
            const {Email,Password} = req.body
            
            const user = await User.findAll({
                where:{Email}
            })
            console.log(user)
            if (!user) {
                return c
            } else if (user[0].dataValues.BlackList === true) {
                return next(ApiError.internal("Вы в черном спииске!!"))
            }else
            {
                let comparePassword = bcrypt.compareSync(Password,user[0].dataValues.Password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(user[0].dataValues.UserId,user[0].dataValues.UserName,user[0].dataValues.Birthday,
                user[0].dataValues.Email, user[0].dataValues.feedbackFeedbackId,user[0].dataValues.userroleUserRoleId,
                user[0].dataValues.usercategoryUserCategoryId)
            return res.json({token})
            }
            
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
    async updateRole(req,res,next){
        try {
            const {Id,RoleId,CategoryId} = req.body
            console.log(Id,RoleId,CategoryId)
            const updateRole = await User.update({
                userroleUserRoleId: RoleId,
                usercategoryUserCategoryId: CategoryId,
            },
            {
                where: {UserId:Id}
            })
            return res.json(updateRole)
        } catch (error) {
            next(ApiError.badRequest(e.message))
        }
    }
    async BlackList(req,res,next){
        try {
            const Id = req.body.Id
            console.log(Id)
            const user = await User.findOne({
                where: {UserId: Id}
            })
        if (user.BlackList === false) {
            const userban = await User.update({
                BlackList: true
            },
            {
                where: {UserId:Id}
            })
            return res.json(userban)
        } else {
            const userunban = await User.update({
                BlackList: false
            },
            {
                where: {UserId:Id}
            })
            return res.json(userunban)
        }
            
        } catch (error) {
            next(ApiError.badRequest(error.message))
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