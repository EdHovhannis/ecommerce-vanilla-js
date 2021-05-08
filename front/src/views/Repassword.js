import { refreshPassword } from "../api.js"
import { loginError } from "../components/Error.js";
import { hideLoading, showLoading } from "../components/loading.js";
import { getUserInfo } from "../localStorage.js"
import { parseRequestUrl } from "../utils.js"
import { SuccessMessage } from './../components/SuccesMessage.js';

export const Repassword = {
    after_render: async () => {
       const refresh = document.querySelector("#refresh")
       const cancel = document.querySelector("#cancel")
       cancel.addEventListener("click", () => {
            showLoading()
            const id = parseRequestUrl().id
            document.location.hash = `/account/${id}`
            hideLoading()
       })
       refresh.addEventListener("submit", async (e) => {
            e.preventDefault()
            const id = parseRequestUrl().id
            const oldpassword = document.querySelector("#oldpassword").value
            const re1 = document.querySelector("#refresh_password1").value
            const re2 = document.querySelector("#refresh_password2").value
            const refreshed = {
                oldpassword,
                re1,
                re2
            }
           showLoading()
           const refreshedPassword = await refreshPassword(refreshed, id)
           const {message, error} = await refreshedPassword
           hideLoading()
           if(message) {
                    refresh.innerHTML =  SuccessMessage.render(message)
                    document.querySelector("#toHome").addEventListener("click", () => {
                    document.location.hash = `/account/${id}`
                })
           } else {
            document.querySelector("#refresh").innerHTML = loginError.render(error)
            document.querySelector("#reloader").onclick = function() {return window.location.reload()}
            }
        })

    },
    render: () => {
        if(!getUserInfo().name) {
            document.location.hash = "/"
        }
        return `
                 <form class="mt-5 mx-auto w-50 bg-dark p-3" id="refresh">
                    <div class=" text-secondary m-3">
                        <h1>Refresh password</h1>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="oldpassword" placeholder="Old password">
                        <label for="password">Type your old password</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="refresh_password1" placeholder="New password">
                        <label for="password">New password</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="refresh_password2" placeholder="New password again">
                        <label for="password">New password again</label>
                    </div>
                    <div class="form-floating mb-3">
                        <button class="btn btn-success w-100"> Refresh password </button>
                    </div>
                    <div class="form-floating">
                        <button type="button" class="btn btn-secondary w-100" id="cancel"> Cancel </button>
                    </div>
                 </form>
        `
    }
}