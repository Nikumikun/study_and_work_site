import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (UserName,Birthday,Email,Password,userroleUserRoleId,usercategoryUserCategoryId) => {
    const {data} = await $host.post('api/user/registration', {UserName,Birthday,Email,Password,userroleUserRoleId,usercategoryUserCategoryId})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}

export const login = async (Email,Password) => {
    const {data} = await $host.post('api/user/login', {Email,Password})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}
export const getUserRole = async (Email,Password) => {
    const {data} = await $authHost.post('api/user/auth', {Email,Password})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}

export const check = async (User) => {
    try{
        const {data} = await $authHost.get('api/user/auth', User)
        localStorage.setItem('token',data.token)
        return jwtDecode(data.token)
    }
     catch (e)
     {
         console.log(e)
     }

}