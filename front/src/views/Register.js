import { registerFn } from "../api.js"
import { loginError } from "../components/Error.js"
import { getUserInfo, setUserInfo } from "../localStorage.js"

export const Register = {
    after_render: async () => {
      const registerForm = document.querySelector("#registerForm")
      registerForm.addEventListener("submit", async (e) => {
         e.preventDefault() 
         if(document.querySelector("#password").value!==document.querySelector("#repassword").value) {
           document.querySelector("#registerForm").innerHTML = loginError.render("Passwords are not equal!")
           document.querySelector("#reloader").onclick = function() {return window.location.reload()}
         } 
         let {user} = await registerFn({
            name: document.querySelector("#name").value,
            email: document.querySelector("#email").value, 
            password: document.querySelector("#password").value, 
            repassword: document.querySelector("#repassword").value
         })
         if(!user.error) {
           document.getElementById("password").value = ""
           document.getElementById("repassword").value = ""
           document.getElementById("email").value = ""
           document.getElementById("name").value = ""
           document.location.hash = "/"
           setUserInfo(user)
           window.location.reload()
       } else {
           document.querySelector("#registerForm").innerHTML = loginError.render(user.error)
           document.querySelector("#reloader").onclick = function() {return window.location.reload()}
       }
      })
    },
    render: ()=> {
      if(getUserInfo().name) {
         document.location.hash("/")
     }
        return `
        <form class="mt-5 mx-auto w-50 bg-dark p-3"  id="registerForm">
        <div class=" text-secondary m-3">
            <h1>Sign up</h1>
        </div>
        <div class="form-floating mb-3">
           <input type="text" class="form-control" id="name" placeholder="Name . . .">
           <label for="name">Name</label>
        </div>
        <div class="form-floating mb-3">
           <input type="email" class="form-control" id="email" placeholder="Email . . .">
           <label for="email">Email address</label>
        </div>
       <div class="form-floating mb-3">
          <input type="password" class="form-control" id="password" placeholder="Password . . .">
          <label for="password">Password</label>
       </div>
       <div class="form-floating mb-3">
          <input type="password" class="form-control" id="repassword" placeholder="Repeat password . . .">
          <label for="repassword">Repeat Password</label>
       </div>
       <div class="mb-3 card-link">
         <a href="/forgot"> Forgot password ? </a>
       </div>
       <div class="form-floating">
          <button class="btn btn-success w-100"> Sign up </button>
       </div>
       </form>
      `
    }
}