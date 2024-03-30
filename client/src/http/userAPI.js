import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (UserName,Birthday,Email,Password,userroleUserRoleId,usercategoryUserCategoryId) => {
    const {data} = await $host.post('api/user/registration', {UserName,Birthday,Email,Password,userroleUserRoleId,usercategoryUserCategoryId})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}
export const createUserCategory = async (Name) => {
    
    try {
        const {data} = await $host.post('api/usercategory/add', {Name})
        return data
    } catch (error) {
        alert(error)
        console.log(error.response.data.message)
    }
}
export const login = async (Email,Password) => {
    const {data} = await $host.post('api/user/login', {Email,Password})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}
export const getAllUsers = async () => {
    const {data} = await $host.get('api/user/userslist')
    return data
}
export const getUserRole = async (Email,Password) => {
    const {data} = await $authHost.post('api/user/auth', {Email,Password})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}
export const fetchSelectedFeedback = async(id) => {
    try {
        const {data} = await $host.get('api/feedback/'+id, {params:{id}})
        return data
    } catch (error) {
       console.log(error.response.data.message) 
    }
    
}
export const fetchUserCategory = async() =>{
    const {data} = await $host.get('api/usercategory/')
    return data
}
export const fetchUserRoles = async() =>{
    const {data} = await $host.get('api/userrole/getAll')
    return data
}
export const fetchSelectedUserRoles = async(id) => {
    const {data} = await $host.get('api/userrole/' + id, {params:{id}})
    return data
}
export const fetchSelectedUserCategory = async(Id) => {
    const {data} = await $host.get('api/usercategory/' + Id, {params:{Id}})
    return data
}
export const updateFeedback = async(FeedbackId,VK,WhatsApp,Discord,OK,Telegram) => {
    const {data} = await $host.patch('api/feedback/' + FeedbackId, {FeedbackId,VK,WhatsApp,
        Discord,OK,Telegram})
    return data
}
export const updateUserRole = async(Id,RoleId,CategoryId) => {
    const {data} = await $host.patch('api/user/updateRole',{Id,RoleId,CategoryId})
    return data
}
export const BlackList = async (Id) =>{
    const {data} = await $host.patch('api/user/blacklist',{Id})
    return data
}
export const check = async (token) => {
    try{
        let User = jwtDecode(token)
        const {data} = await $host.get('api/user/auth', User)
        localStorage.setItem('token',data.token)
        return jwtDecode(data.token)
    }
     catch (e)
     {
        
     }

}