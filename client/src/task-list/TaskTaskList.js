import {makeAutoObservable} from "mobx";

export default class TaskTaskList {
    constructor() {
        this._tasks = [
            {id: 1, name: "test"}
        ]
        this._decisions = []
        this._taskstatus = [
            {id: 1, name: "123"}
        ]
        this._taskrole = []
        this._taskcategories = []
        this._usertaketask = []
        this._usercreatetask = []
        this._selectedTaskStatus = {}
        makeAutoObservable(this)
    }
    setSelectedTaskStatus(status) {
        this._selectedTaskStatus = status
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