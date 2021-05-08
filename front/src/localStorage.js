export const getCartItems = () => {
    const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    return cartItems 
}
export const setCartItems = (cartItem) => {
    const cartItems =  localStorage.setItem("cartItems", JSON.stringify(cartItem))
    return cartItems
}



export const setUserInfo = (user) => {
    const userInfo =  localStorage.setItem("userInfo", JSON.stringify(user))
    return userInfo
}
export const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {name:"", email: "", password: ""}
    return userInfo 
}


export const setLocal = (temp) => {
    const user =  localStorage.setItem("temp", JSON.stringify(temp))
    return user
}

export const getTemp = () => {
    const temp = localStorage.getItem("temp") ? JSON.parse(localStorage.getItem("temp")) : {name:"", email: "", password: ""}
    return temp 
}

export const getShipping = () => {
    const shipping = localStorage.getItem("shipping") ? JSON.parse(localStorage.getItem("shipping")) : {address:"", postalCode: ""}
    return shipping 
}
export const setShipping = (ship) => {
    const shipInfo =  localStorage.setItem("shipping", JSON.stringify(ship))
    return shipInfo
}

export const getPayment = () => {
    const payment = localStorage.getItem("payment") ? JSON.parse(localStorage.getItem("payment")) : {paypal:"", stripe: ""}
    return payment 
}
export const setPayment = (pm) => {
    const payment =  localStorage.setItem("payment", JSON.stringify(pm))
    return payment
}
export const cleanOrder = () => {
   localStorage.removeItem("cartItems")
}