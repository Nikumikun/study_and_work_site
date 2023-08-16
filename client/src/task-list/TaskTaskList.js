import {makeAutoObservable} from "mobx";

export default class TaskTaskList {
    constructor() {
        this._tasks = [

        ]
        this._decisions = [

        ]
        this._taskstatus = [

        ]
        this._taskrole = [

        ]
        this._usertaketask = [

        ]
        this._usercreatetask = [

        ]
        makeAutoObservable(this)
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
    get taskroles() {
        return this._taskroles
    }
    get usercreatetaskes() {
        return this._usercreatetaskes
    }
    get usertaketaskes() {
        return this._usertaketaskes
    }
}