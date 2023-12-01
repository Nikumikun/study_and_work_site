import {makeAutoObservable} from "mobx";
import jwtDecode from "jwt-decode";

export default class UserTaskList {
        constructor() {
            this._isAuth = localStorage.token ? true : false
            this._userroles = []
            this._userslist = []
            this._users = localStorage.token ? jwtDecode(localStorage.token) : {}
            this._selectedUserRoles = {}
            this._selectedUser = []
            this._selectedTask = {}
            this._selectedtaskcomments = []
            this._selectedFeedback = []
            this._selectedtaskstatus = {}
            this._selectedTaskCategories = {}
            this._selectedTaskRole = {}
            this._updatetask = {}
            this._usercategories = []
            this._selectedusercategory = {}
            makeAutoObservable(this)
        }
        setUserCategory(Category)
        {
            this._usercategories = Category
        }
        get usercategory(){
            return this._usercategories
        }
        setselectedusercategory(selectedusercategory){
            this._selectedusercategory = selectedusercategory
        }
        get selectedusercategory()
        {
            return this._selectedusercategory
        }
        get userslist(){
            return this._userslist
        }
        setUsersList(userslist){
            this._userslist = userslist
        }
        get updatetask(){
            return this._updatetask
        }
        setUpdateTask(update){
            this._updatetask = update
        }
        setTaskComments(taskcomments){
            this._selectedtaskcomments = taskcomments
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
        setSelectedFeedback(feedback){
            this._selectedFeedback = feedback
        }
        setSelectedTask(task) {
            this._selectedTask = task
        }
        setSelectedUser(users)
        {
            this._selectedUser = users
        }
        setSelectedUserRole(role)
        {
            this._selectedUserRoles = role
        }
        setIsAuth(bool){
            this._isAuth = bool
        }
        setLogOut(){
            this._users = {}
            this._isAuth = false
            localStorage.removeItem("token")
        }
        setUser(user){
        this._users = user
        }
        setUserRoles(userroles){
            this._userroles = userroles
        }
        get selectedtaskcomments()
        {
            return this._selectedtaskcomments
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
        get selectedTask() {
            return this._selectedTask
        }
        get selectedfeedback()
        {
            return this._selectedFeedback
        }
        get selecteduser() {
            return this._selectedUser
        }
        get selecteduserrole() {
            return this._selectedUserRoles
        }
        get userroles() {
            return this._userroles
        }
        get isAuth() {
            return this._isAuth
        }
        get user() {
            return this._user
        }
        get users() {
            return this._users
        }
}