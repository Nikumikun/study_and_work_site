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
        this._selectedtaskstatus = {}
        this._selectedTaskCategories = {}
        this._selectedTaskRole = {}
        this._taskchecker = []
        this._selectedtaskchecker = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 4
        this._history = []
        this._looktasks = []
        makeAutoObservable(this)
    }
    get looktasks()
    {
        return this._looktasks
    }
    setLookTasks(data){
        this._looktasks = data
    }
    get selectedtaskchecker()
    {
        return this._selectedtaskchecker
    }
    setSelectedTaskChecker(selectedtaskchecker)
    {
        this._selectedtaskchecker = selectedtaskchecker
    }
    setTaskCheckers(taskchecker)
    {
        this._taskchecker = taskchecker
    }
    get taskchecker(){
        return this._taskchecker
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setHistory(historytask){
        this._history = historytask
    }
    setselectedtaskstatus(status) {
        this._selectedtaskstatus = status
    }
    setSelectedTaskCategory(category) {
        this._selectedTaskCategories = category
    }
    setSelectedTaskRole(role) {
        this._selectedTaskRole = role
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
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
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
        return this._selectedtaskstatus
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
}