import {makeAutoObservable} from "mobx";

export default class TaskTaskList {
    constructor() {
        this._tasks = [
            {TaskId:1,Name:"test1",Price:200,Description:"test",decisionDecisionId:1},
            {TaskId:2,Name:"test2",Price:300,Description:"test"},
            {TaskId:3,Name:"test3",Price:400,Description:"test"},
            {TaskId:4,Name:"test4",Price:500,Description:"test"},

        ]
        this._decisions = [
            {DecisionId:1,Description:"test1"}
        ]
        this._taskstatuses = [
            {TaskStatusId:2,Name:"test"},
            {TaskStatusId:3,Name:"123"}
        ]
        this._taskroles = [
            {TaskRoleId:1,Name:"111"}
        ]
        this._taskcategories = [
            {TaskCategoryId:1,Name:"testcategory"}
        ]
        this._usertaketaskes = []
        this._usercreatetaskes = []
        this._selectedTaskStatus = {}
        this._selectedTaskCategories = {}
        this._selectedTaskRole = {}
        makeAutoObservable(this)
    }
    setSelectedTaskStatus(status) {
        this._selectedTaskStatus = status
    }
    setSelectedTaskCategory(status) {
        this._selectedTaskCategories = status
    }
    setSelectedTaskRole(status) {
        this._selectedTaskRole = status
    }
    setTasks(tasks){
        this._tasks = tasks
    }
    setDecision(decisions){
        this._decisions = decisions
    }
    setTaskStatus(taskstatuses){
        this._taskstatuses = taskstatuses
    }
    setTaskCategories(taskcategories){
        this._taskcategories = taskcategories
    }
    setTaskRole(taskroles){
        this._taskroles = taskroles
    }
    setUserCreateTask(usercreatetaskes){
        this._usercreatetaskes = usercreatetaskes
    }
    setUserTakeTask(usertaketaskes){
        this._usertaketaskes = usertaketaskes
    }
    get tasks() {
        return this._tasks
    }
    get decisions() {
        return this._decisions
    }
    get taskstatuses() {
        return this._taskstatuses
    }
    get selectedtaskstatus() {
        return this._selectedTaskStatus
    }
    get selectedtaskcategories() {
        return this._selectedTaskCategories
    }
    get selectedtaskroles() {
        return this._selectedTaskRole
    }
    get taskcategories() {
        return this._taskcategories
    }
    get taskroles() {
        return this._taskroles
    }
    get usercreatetaskes() {
        return this._usercreatetaskes
    }
    get usertaketaskes() {
        return this._usertaketaskes
    }
    get selectedTaskStatus() {
        return this._selectedTaskStatus
    }
}