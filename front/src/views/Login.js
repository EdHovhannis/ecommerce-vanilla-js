import { loginFn } from "../api.js"
import { loginError } from "../components/Error.js"
import { getUserInfo, setUserInfo } from './../localStorage.js';
import { hideLoading, showLoading } from "../components/loading.js";

export const Login = {
    after_render: async () => {
        const loginForm = document.querySelector("#loginForm")
        const restore = document.querySelector("#restore")
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault()
            showLoading()
            let { user } = await loginFn({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
            hideLoading()
            if (!user.error) {
                document.getElementById("password").value = ""
                document.getElementById("email").value = ""
                document.location.hash = "/"
                setUserInfo(user)
                window.location.reload()
            } else {
                document.querySelector("#loginForm").innerHTML = loginError.render(user.error)
                document.querySelector("#reloader").onclick = function () { return window.location.reload() }
            }
        })
        restore.addEventListener("click", ()=> {

            document.location.hash = `/restore`
        })
    },
    render: async () => {
        if (getUserInfo().name) {
            document.location.hash = "/"
        }
        return `
        <form class="mt-5 mx-auto w-50 bg-dark p-3" id="loginForm" >
                <div class=" text-secondary m-3">
                    <h1>Sign in</h1>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="email" placeholder="Email . . .">
                    <label for="email">Email address</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="password" placeholder="Password . . .">
                    <label for="password">Password</label>
                </div>
                <div class="mb-3 card-link">
                    <span id="restore" class="text-primary m-1" > Forgot password ? </span>
                </div>
                <div class="form-floating">
                    <button class="btn btn-success w-100"> Sign in </button>
                </div>
       </form>
        `
    }
}