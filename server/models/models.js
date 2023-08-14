const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const Feedback = sequelize.define('feedback',{
    FeedbackId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    VK: {type: DataTypes.STRING, unique: true, allowNull: true},
    WhatsApp: {type: DataTypes.STRING, unique: true, allowNull: true},
    Viber: {type: DataTypes.STRING, unique: true, allowNull: true},
    OK: {type: DataTypes.STRING, unique: true, allowNull: true},
    Telegram: {type: DataTypes.STRING, unique: true, allowNull: true}
}, {createdAt: false, updatedAt: false})
const UserRole = sequelize.define('userrole',{
    UserRoleId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false},
    Description: {type: DataTypes.STRING, allowNull: true}
}, {createdAt: false, updatedAt: false})
const User = sequelize.define('user',{
    UserId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    UserName: {type: DataTypes.STRING, allowNull: false},
    Email: {type: DataTypes.STRING, unique: true, allowNull: false},
    Password: {type: DataTypes.STRING, allowNull: false}
}, {createdAt: false, updatedAt: false})
const Decision = sequelize.define('decision',{
    DecisionId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Description: {type: DataTypes.STRING, allowNull: false, default: "Пусто"},
    File: {type: DataTypes.STRING, allowNull: true}
}, {createdAt: false, updatedAt: false})
const TaskRole = sequelize.define('taskrole',{
    TaskRoleId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false},
    Description: {type: DataTypes.STRING, allowNull: true}
}, {createdAt: false, updatedAt: false})
const Colour = sequelize.define('colour',{
    ColourId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false}
}, {createdAt: false, updatedAt: false})
const TaskStatus = sequelize.define('taskstatus',{
    TaskStatusId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false},
    Description: {type: DataTypes.STRING, allowNull: true}
}, {createdAt: false, updatedAt: false})
const Task = sequelize.define('task',{
    TaskId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, allowNull: false},
    Price: {type: DataTypes.INTEGER, allowNull: true},
    Description: {type: DataTypes.STRING, allowNull: true}
}, {createdAt: false, updatedAt: false})

Feedback.hasMany(User)
User.belongsTo(Feedback)

UserRole.hasMany(User)
User.belongsTo(UserRole)

Decision.hasMany(Task)
Task.belongsTo(Decision)

Colour.hasMany(TaskStatus)
TaskStatus.belongsTo(Colour)

TaskStatus.hasMany(Task)
Task.belongsTo(TaskStatus)

TaskRole.hasMany(Task)
Task.belongsTo(TaskRole)

User.hasMany(Task, {foreignKey: 'UserIdCreateTask'})
Task.belongsTo(User,{as: 'UserCreateTask', foreignKey: 'UserIdCreateTask'})

User.hasMany(Task, {foreignKey: 'UserIdTakeTask'})
Task.belongsTo(User,{as: 'UserTakeTask', foreignKey: 'UserIdTakeTask'})

module.exports = {
    Feedback,
    UserRole,
    User,
    Decision,
    TaskRole,
    Colour,
    TaskStatus,
    Task
}