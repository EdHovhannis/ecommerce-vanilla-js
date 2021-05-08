import { url } from './config.js';
import { getUserInfo } from './localStorage.js';


export const getProduct = async (id) => {
    try {
        const response = await fetch(`${url}` + `/api/products/${id}`, { headers: { "Content-Type": "application/json" } })
        const data = await response.json()
        return { product: data }
    } catch (error) {
        console.log(error)
        return { error: error.response.data.message || error.message }
    }

}

export const loginFn = async (userInfo) => {
    try {
        const response = await fetch(`${url}` + `/api/user/login`, { method: 'POST', body: JSON.stringify(userInfo), headers: { "Content-Type": "application/json" } })
        const data = await response.json()
        return { user: data }
    } catch (error) {
        console.log(error)
        return { error: error.response.data.message || error.message }
    }

}
export const registerFn = async (registerInfo) => {
    try {
        const response = await fetch(`${url}` + `/api/user/register`, { method: 'POST', body: JSON.stringify(registerInfo), headers: { "Content-Type": "application/json" } })
        const data = await response.json()
        console.log(data)
        return { user: data }
    } catch (error) {
        console.log(error)
        return { error: error.response.data.message || error.message }
    }

}

export const getMyProfile = async (id) => {
    try {
        const { token } = getUserInfo()
        const response = await fetch(`${url}` + `/api/user/profile/${id}`, { method: 'GET', headers: { "Content-Type": "application/json", authenticate: `Bearer ${token}` } })
        const data = await response.json()
        return { user: data }
    } catch (error) {
        console.log(error)
        return { error: error.response.data.message || error.message }
    }
}
export const updateUserProfile = async (update, id) => {
    try {
        const { token } = getUserInfo()
        const response = await fetch(`${url}` + `/api/user/update/${id}`, { method: 'POST', body: JSON.stringify(update), headers: { "Content-Type": "application/json", authenticate: `Bearer ${token}` } })
        const data = await response.json()
        return { user: data }
    } catch (error) {
        console.log(error)
        return { error: error.response.data.message || error.message }
    }
}
export const refreshPassword = async (refreshedPassword, id) => {
    try {
        const { token } = getUserInfo()
        const response = await fetch(`${url}` + `/api/user/refresh_passford/${id}`, { method: 'POST', body: JSON.stringify(refreshedPassword), headers: { "Content-Type": "application/json", authenticate: `Bearer ${token}` } })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return { error: error.response.data.message || error.message }
    }
}

export const restorePassword = async (email) => {
    try {
        const response = await fetch(`${url}` + `/api/user/restore_passford`, { method: 'POST', body: JSON.stringify(email), headers: { "Content-Type": "application/json" } })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return { error: error.response.data.message || error.message }
    }
}
export const restoreFinish = async (restorePass, id) => {
    try {
        const response = await fetch(`${url}` + `/api/user/restore/${id}`, { method: 'POST', body: JSON.stringify(restorePass), headers: { "Content-Type": "application/json" } })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return { error: error.response.data.message || error.message }
    }
}
export const createOrder = async (order) => {
    try {
        const { token } = getUserInfo()
        const response = await fetch(`${url}` + `/api/order/createorder`, { method: 'POST', body: JSON.stringify(order), headers: { "Content-Type": "application/json", authenticate: `Bearer ${token}` } })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return { error: error.response.data.message || error.message }
    }
}
export const getOrder = async (id) => {
    try {
        const { token } = getUserInfo()
        const response = await fetch(`${url}` + `/api/order/getorder/${id}`, { method: 'get', headers: { "Content-Type": "application/json", authenticate: `Bearer ${token}` } })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return { error: error.response.data.message || error.message }
    }
}
export const getpaypalclientid = async () => {
    try {
        const response = await fetch(`${url}` + `/api/paypal/clientid`, { method: 'get', headers: { "Content-Type": "application/json" } })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return { error: error.response.data.message || error.message }
    }
}