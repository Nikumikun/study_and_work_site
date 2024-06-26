import {$host} from "./index";

export const createDecision = async (decision) => {
    const {data} = await $host.post('api/decision/create', decision)
    return data
}
export const createTask = async (Name,Address,Price,Description,CategoryTask,RoleTask,UserIdCreateTask) => {
    try {
        const {data} = await $host.post('api/task/add', {Name,Address,Price,Description,CategoryTask,RoleTask,UserIdCreateTask})
        return data 
    } catch (error) {
        console.log(error.response.data.message)
    }
}
export const addDecision = async (TaskId,Description,Address) => {
    try {
        const {data} = await $host.patch('api/task/addDecision',{TaskId,Description,Address})
        return data
    } catch (error) {
        console.log(error.response.data.message)
    }
}
export const updateTaskAndDecision = async (TaskId,UserId) => {
    try {
        const {data} = await $host.patch('api/task/updateTaskAndDecision',{TaskId,UserId})
        alert("Вы взяли задание")
        return data
    } catch (error) {
        console.log(error.response.data.message)
    }
}
export const updateTask = async (TaskId,Name,Address,Price,Description,CategoryTask,RoleTask) => {
    try {
        const {data} = await $host.patch('api/task/updateTask', {TaskId,Name,Address,Price,Description,CategoryTask,RoleTask})
        return data 
    } catch (error) {
        console.log(error.response.data.message)
    }
}
export const addComment = async (TaskId,UserId,Comment) =>{
try {
    const {data} = await $host.post('api/taskcomments/add', {TaskId,UserId,Comment})
    return data
} catch (error) {
    console.log(error.response.data.message)
}
}
export const fetchSelectedTaskComments = async (TaskId) => {
        const {data} = await $host.get('api/taskcomments/get', {params:{TaskId}})
        return data 
}

export const createTaskCategory = async (Name,StartPrice) => {
    try {
        const {data} = await $host.post('api/taskcategory/add', {Name,StartPrice})
        return data  
    } catch (error) {
        console.log(error.response.data.message)
    }
}
export const createTaskRole = async (Name) => {
    
    try {
        const {data} = await $host.post('api/taskrole/add', {Name})
        return data
    } catch (error) {
        alert(error)
        console.log(error.response.data.message)
    }
}
export const createTaskStatus = async (Name) => {
   
    try {
        const {data} = await $host.post('api/taskstatus/add', {Name})
        return data 
    } catch (error) {
        alert(error)
        console.log(error.response.data.message)
    }
}
export const completeTask = async (Id) => {
    const {data} = await $host.patch('api/task/complete',{Id})
    return data
}
export const fetchAllTask = async () => {
    const {data} = await $host.get('api/task/AllTask')
    return data
}
export const fetchTaskCheckers = async () => {
    const {data} = await $host.get('api/task/taskcheckers')
    return data
}
export const fetchTasks = async (TaskStatusId,TaskCategoryId, TaskRoleId, page,limit=4) => {
    const {data} = await $host.get('api/task/getAll',{params:{TaskStatusId,TaskCategoryId, TaskRoleId, page,limit}})
    return data
}
export const fetchSelectedTask = async (TaskId) => {
    const {data} = await $host.get('api/task/' + TaskId,{params:{TaskId}})
    return data
}
export const fetchSelectedTaskStatus = async (Id) => {
    const {data} = await $host.get('api/taskstatus/' + Id,{params:{Id}})
    return data
}
export const fetchSelectedTaskCategory = async (Id) => {
    const {data} = await $host.get('api/taskcategory/' + Id,{params:{Id}})
    return data
}
export const fetchSelectedTaskRole = async (Id) => {
    const {data} = await $host.get('api/taskrole/' + Id,{params:{Id}})
    return data
}
export const fetchTaskStatus = async () => {
    const {data} = await $host.get('api/taskstatus/getAll')
    return data
}
export const fetchTaskHistory = async () => {
    const {data} = await $host.get('api/task/history')
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
