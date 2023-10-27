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
export const fetchSelectedFeedback = async(id) => {
    const {data} = await $host.get('api/feedback/' + id, id)
    return data
}
export const fetchSelectedUserRoles = async(id) => {
    const {data} = await $host.get('api/userrole/' + id, id)
    return data
}
export const updateFeedback = async(FeedbackId,VK,WhatsApp,
    Discord,OK,Telegram) => {
    const {data} = await $host.patch('api/feedback/' + FeedbackId, {FeedbackId,VK,WhatsApp,
        Discord,OK,Telegram})
    return data
}
export const updateUserRole = async(FullName,UserRoleId) => {
    const {data} = await $host.patch('api/user/updateRole',{FullName,UserRoleId})
    return data
}
export const check = async (User) => {
    try{
        const {data} = await $host.get('api/user/auth', User)
        localStorage.setItem('token',data.token)
        return jwtDecode(data.token)
    }
     catch (e)
     {
        
     }

}