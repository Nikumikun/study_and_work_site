import {$authHost, $host} from "./index";

export const createDecision = async (decision) => {
    const {data} = await $host.post('api/decision/create', decision)
    return data
}

export const createTaskCategory = async (Name,Description) => {
    try {
        const {data} = await $authHost.post('api/taskcategory/add', {Name,Description})
        return data  
    } catch (error) {
        alert(error)
        console.log(error)
    }
}
export const createTaskRole = async (Name,Description) => {
    
    try {
        const {data} = await $authHost.post('api/taskrole/add', {Name,Description})
        return data
    } catch (error) {
        alert(error)
        console.log(error)
    }
}
export const createTaskStatus = async (Name,Description) => {
   
    try {
        const {data} = await $authHost.post('api/taskstatus/add', {Name,Description})
        return data 
    } catch (error) {
        alert(error)
        console.log(error)
    }
}
export const fetchTasks = async () => {
    const {data} = await $host.get('api/task/getAll')
    return data
}
export const fetchTaskStatus = async () => {
    const {data} = await $host.get('api/taskstatus/getAll')
    return data
}
export const fetchTaskHistory = async (UserId) => {
    const {data} = await $host.get('api/task/historytasks',UserId)
    return data
}
export const fetchTaskCategory = async () => {
    const {data} = await $host.get('api/taskcategory/getAll')
    return data
}
export const fetchTaskRole = async () => {
    const {data} = await $host.get('api/taskrole/getAll')
    return data
}
export const fetchDecision = async (decision) => {
    const {data} = await $host.get('api/decision/get', decision)
    return data
}
export const updateDecision = async (decision) => {
    const {data} = await $host.patch('api/decision/update', decision)
    return data
}
export const deleteDecision = async (decision) => {
    const {data} = await $host.patch('api/decision/delete', decision)
    return data
}
