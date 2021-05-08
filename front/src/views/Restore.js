import { loginError } from '../components/Error.js';
import { restorePassword } from './../api.js';
import { setLocal } from './../localStorage.js';
import { hideLoading, showLoading } from './../components/loading.js';

export const Restore = {
    after_render: async () => {
        document.querySelector("#checkemail").addEventListener("submit", async (e) => {
            e.preventDefault()
            showLoading()
            const reEmail = document.querySelector("#reEmail").value
            const {user, error} = await restorePassword( { email: reEmail } )
            hideLoading()
            if(user) {
                document.location.hash = "/restorefinish"
                setLocal(user)
            } else {
                document.querySelector("#checkemail").innerHTML = loginError.render(error)
                document.querySelector("#reloader").onclick = function() {return window.location.reload()}
            }
        })
        document.querySelector("#backTohome").addEventListener("click", ()=>{
            document.location.hash = "/"
        })
    },
    render: () => {
        return `
        <form class="mt-5 mx-auto w-50 bg-dark p-3" id="checkemail">
                <div class=" text-secondary m-3">
                    <h1> Restore password (check email) </h1>
                </div>
                 <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="reEmail" placeholder="Email . . .">
                    <label for="reEmail">Insert your email address</label>
                 </div>
                <div class="form-floating">
                    <button type="submit" class="btn btn-success w-100 mb-3"> Accept </button>
                </div>
                <div class="form-floating">
                    <button type="button" class="btn btn-secondary w-100" id="backTohome"> Cancel </button>
                </div>
        </form>
        `
    }
}