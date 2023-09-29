import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const createDecision = async (decision) => {
    const {data} = await $authHost.post('api/decision/create', decision)
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
