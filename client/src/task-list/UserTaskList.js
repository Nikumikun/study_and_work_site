import {makeAutoObservable} from "mobx";
import jwtDecode from "jwt-decode";

export default class UserTaskList {
        constructor() {
            this._isAuth = localStorage.token ? true : false
            console.log(localStorage.token)
            this._userroles = []
            this._users = localStorage.token ? jwtDecode(localStorage.token) : {}
            this._selectedUserRoles = []
            this._selectedUser = []
            makeAutoObservable(this)
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
        get users() {
            return this._users
        }
}