const sequelize = require('../db')
const {DataTypes, DATEONLY} = require('sequelize')

const Feedback = sequelize.define('feedback',{
    FeedbackId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    VK: {type: DataTypes.STRING, unique: true, allowNull: true},
    WhatsApp: {type: DataTypes.STRING, unique: true, allowNull: true},
    Discord: {type: DataTypes.STRING, unique: true, allowNull: true},
    OK: {type: DataTypes.STRING, unique: true, allowNull: true},
    Telegram: {type: DataTypes.STRING, unique: true, allowNull: true}
}, {createdAt: false, updatedAt: false})
const TaskComments = sequelize.define('taskcomment',{
    CommentsId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    TaskId: {type: DataTypes.INTEGER, allowNull: false},
    UserIdSendComment: {type: DataTypes.INTEGER, allowNull: false},
    Comment: {type: DataTypes.STRING, allowNull: false}
}, {createdAt: false, updatedAt: false})
const UserRole = sequelize.define('userrole',{
    UserRoleId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {createdAt: false, updatedAt: false})
const UserCategory = sequelize.define('usercategory',{
    UserCategoryId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {createdAt: false, updatedAt: false})
const User = sequelize.define('user',{
    UserId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    UserName: {type: DataTypes.STRING, allowNull: false},
    Birthday:{type: DataTypes.DATEONLY,allowNull:false},
    Email: {type: DataTypes.STRING, unique: true, allowNull: false},
    Password: {type: DataTypes.STRING, allowNull: false},
    BlackList:{type:DataTypes.BOOLEAN,allowNull:true, defaultValue: false}
}, {createdAt: false, updatedAt: false})
const Decision = sequelize.define('decision',{
    DecisionId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Description: {type: DataTypes.STRING, allowNull: false, default: "Пусто"},
    Address: {type: DataTypes.STRING, allowNull: true}
}, {createdAt: false, updatedAt: false})
const TaskRole = sequelize.define('taskrole',{
    TaskRoleId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {createdAt: false, updatedAt: false})
const TaskChecker = sequelize.define('taskchecker',{
    TaskCheckerId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {createdAt: false, updatedAt: false})
const TaskStatus = sequelize.define('taskstatus',{
    TaskStatusId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {createdAt: false, updatedAt: false})
const TaskCategory = sequelize.define('taskcategory',{
    TaskCategoryId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false},
    StartPrice: {type: DataTypes.REAL, allowNull: false}
}, {createdAt: false, updatedAt: false})
const Task = sequelize.define('task',{
    TaskId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, allowNull: false},
    Address: {type: DataTypes.STRING, allowNull: true},
    Price: {type: DataTypes.INTEGER, allowNull: true},
    Description: {type: DataTypes.STRING, allowNull: true}
}, {createdAt: false, updatedAt: false})

Feedback.hasMany(User)
User.belongsTo(Feedback)

UserRole.hasMany(User)
User.belongsTo(UserRole)

UserCategory.hasMany(User)
User.belongsTo(UserCategory)

Decision.hasMany(Task)
Task.belongsTo(Decision)

TaskStatus.hasMany(Task)
Task.belongsTo(TaskStatus)

TaskRole.hasMany(Task)
Task.belongsTo(TaskRole)

TaskCategory.hasMany(Task)
Task.belongsTo(TaskCategory)

TaskChecker.hasMany(Task)
Task.belongsTo(TaskChecker)

User.hasMany(Task, {foreignKey: 'UserIdCreateTask'})
Task.belongsTo(User,{as: 'UserCreateTask', foreignKey: 'UserIdCreateTask'})

User.hasMany(Task, {foreignKey: 'UserIdTakeTask'})
Task.belongsTo(User,{as: 'UserTakeTask', foreignKey: 'UserIdTakeTask'})

TaskComments.hasMany(Task)
Task.belongsTo(TaskComments)

module.exports = {
    Feedback,
    TaskChecker,
    TaskComments,
    UserRole,
    UserCategory,
    User,
    Decision,
    TaskRole,
    TaskStatus,
    TaskCategory,
    Task
}