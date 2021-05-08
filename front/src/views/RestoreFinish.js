import { loginError } from "../components/Error.js";
import { getTemp } from "../localStorage.js";
import { restoreFinish } from './../api.js';
import { SuccessMessage } from './../components/SuccesMessage.js';
import { hideLoading, showLoading } from './../components/loading.js';

export const RestoreFinish = {
    after_render: () => {
        const finishRestore = document.querySelector("#finishRestore")
        finishRestore.addEventListener("submit", async (e) => {
            e.preventDefault()
            const restore = document.querySelector("#restorePass").value
            const newPass = {
                newpassword: restore
            }
            showLoading()
            const id = getTemp()._id
            const {message, error} = await restoreFinish( newPass, id)
            hideLoading()
            if(message) {
                localStorage.removeItem("temp")
                finishRestore.innerHTML = SuccessMessage.render1(message) 
                document.querySelector("#toSign").addEventListener("click", () => {
                document.location.hash = `/login`
            })
            }  else {
                document.querySelector("#finishRestore").innerHTML = loginError.render(error)
                document.querySelector("#reloader").onclick = function() {return window.location.reload()}
            }    
        })
      
    },
    render: () => {
        return `
        <form class="mt-5 mx-auto w-50 bg-dark p-3" id="finishRestore">
            <div class=" text-secondary m-3">
                <h1> Restore password (finish) </h1>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="restorePass" placeholder="Email . . .">
                <label for="restorePass">Insert your email address</label>
            </div>
            <div class="form-floating">
                <button type="submit" class="btn btn-success w-100"> Accept </button>
            </div>
        </form>
        `
    }
}