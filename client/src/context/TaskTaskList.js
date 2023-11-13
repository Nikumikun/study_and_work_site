import {makeAutoObservable} from "mobx";

export default class TaskTaskList {
    constructor() {
        this._tasks = []
        this._decisions = []
        this._taskstatuses = []
        this._taskroles = []
        this._taskcategories = []
        this._usertaketaskes = []
        this._usercreatetaskes = []
        this._selectedTaskStatus = {}
        this._selectedTaskCategories = {}
        this._selectedTaskRole = {}
        this._history = []
        makeAutoObservable(this)
    }
    setHistory(historytask){
        this._history = historytask
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
    setTaskRoles(taskroles){
        this._taskroles = taskroles
    }
    setUserCreateTask(usercreatetaskes){
        this._usercreatetaskes = usercreatetaskes
    }
    setUserTakeTask(usertaketaskes){
        this._usertaketaskes = usertaketaskes
    }
    get historytask()
    {
        return this._history
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