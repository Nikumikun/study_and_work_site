const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const Feedback = sequelize.define('feedback',{
    FeedbackId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    VK: {type: DataTypes.STRING, unique: true, allowNull: true},
    WhatsApp: {type: DataTypes.STRING, unique: true, allowNull: true},
    Viber: {type: DataTypes.STRING, unique: true, allowNull: true},
    OK: {type: DataTypes.STRING, unique: true, allowNull: true},
    Telegram: {type: DataTypes.STRING, unique: true, allowNull: true}
})
const UserRole = sequelize.define('userrole',{
    UserRoleId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false},
    Description: {type: DataTypes.STRING, allowNull: true}
})
const User = sequelize.define('user',{
    UserId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    UserName: {type: DataTypes.STRING, allowNull: false},
    Email: {type: DataTypes.STRING, unique: true, allowNull: false},
    Password: {type: DataTypes.STRING, allowNull: false}
})
const Decision = sequelize.define('decision',{
    DecisionId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Description: {type: DataTypes.STRING, allowNull: false},
    File: {type: DataTypes.STRING, allowNull: true}
})
const TaskRole = sequelize.define('taskrole',{
    TaskRoleId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false},
    Description: {type: DataTypes.STRING, allowNull: true}
})
const Colour = sequelize.define('colour',{
    ColourId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false},
    Red: {type: DataTypes.INTEGER, allowNull: false},
    Green: {type: DataTypes.INTEGER, allowNull: false},
    Blue: {type: DataTypes.INTEGER, allowNull: false}
})
const TaskStatus = sequelize.define('taskstatus',{
    TaskStatusId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true, allowNull: false},
    Description: {type: DataTypes.STRING, allowNull: true}
})
const Task = sequelize.define('task',{
    TaskId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, allowNull: false},
    Price: {type: DataTypes.INTEGER, allowNull: true},
    Description: {type: DataTypes.STRING, allowNull: true}
})
const UserCreateTask = sequelize.define('usercreatetask',{
    UserCreateTaskId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const UserTakeTask = sequelize.define('usertaketask',{
    UserTakeTaskId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
Feedback.hasMany(User)
User.belongsTo(Feedback)

UserRole.hasMany(User)
User.belongsTo(UserRole)

User.hasMany(Task)
Task.belongsTo(User)

Decision.hasMany(Task)
Task.belongsTo(Decision)

Colour.hasMany(TaskStatus)
TaskStatus.belongsTo(Colour)

TaskStatus.hasMany(Task)
Task.belongsTo(TaskStatus)

TaskRole.hasMany(Task)
Task.belongsTo(TaskRole)

User.belongsToMany(Task,{through: UserCreateTask})
Task.belongsToMany(User,{through:UserCreateTask})

User.belongsToMany(Task,{through: UserTakeTask})
Task.belongsToMany(User,{through:UserTakeTask})

module.exports = {
    Feedback,
    UserRole,
    User,
    Decision,
    TaskRole,
    Colour,
    TaskStatus,
    Task,
    UserCreateTask,
    UserTakeTask
}