export const showLoading = () => {
    document.querySelector(".loader").classList.remove("hideload") 
    document.querySelector(".loader").classList.add("showload") 
}
export const hideLoading = () => {
    document.querySelector(".loader").classList.remove("showload") 
    document.querySelector(".loader").classList.add("hideload") 
}