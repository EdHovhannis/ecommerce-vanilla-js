
import { getMyProfile, updateUserProfile } from '../api.js';
import { parseRequestUrl, rerenderCartView } from './../utils.js';
import { hideLoading, showLoading } from '../components/loading.js';
import { getUserInfo } from '../localStorage.js';

let check = false

export const Account = {
    after_render: async () => {
        window.addEventListener('resize', () => {
            if (window.screen.width < 600) {
                if(document.getElementById("card")!==null) {
                    document.getElementById("card").classList.add("w-100", "mx-auto")
                }
            } else {
                if(document.getElementById("card")!==null) {
                    document.getElementById("card").classList.remove("w-100", "mx-auto")
                }
            }
        })

        document.querySelector(".check").addEventListener("click", async () => {
            check = !check
            rerenderCartView(Account)
        })

        document.querySelector("#settings").addEventListener("click", async (e) => {
            if (e.target.getAttribute("data-tab")) {
                return false
            } else {
                const profile_name = document.getElementById("profile_name").value
                const profile_email = document.getElementById("profile_email").value
                const profile_image = document.getElementById("profile_image").value
                const id = parseRequestUrl().id
                const data = {
                    name: profile_name,
                    email: profile_email,
                    image: profile_image
                }
                await updateUserProfile(data, id)
                rerenderCartView(Account)
                return
            }

        })

        document.querySelector("#toRepassword").addEventListener("click", () => {
            const id = parseRequestUrl().id
            document.location.hash = `/repassword/${id}`
        })
    },
    render: async () => {
        if (!getUserInfo().name) {
            document.location.hash = "/"
        }
        showLoading()
            const id = parseRequestUrl().id
            const { user } = await getMyProfile(id)
        hideLoading()

        return `
                <div class="card m-3 p-3 profile" style="width: 16rem;" id="card">
                    <img src="${user.image}" class="card-img-top" alt="${user.name}">
                    
                    <div class="card-body">

                        ${check ? `<input type="text" class="form-control mb-2" id="profile_image" value="${user.image}"/>` : ""} 

                        ${check ? `<input type="text" value="${user.name}" class="form-control mb-2" id="profile_name" />` : `<h5 class="card-text">${user.name}</h5>`}

                        ${check ? `<input type="text" value="${user.email}" class="form-control mb-3" id="profile_email" />` : `<div class="card-text mb-3">${user.email}</div>`}

                        <div>
                            ${check ? `<button class="btn btn-success mb-2 check" id="settings"> Change Settings </button>` : `<button class="btn btn-success mb-2 check" id="settings" data-tab="isEdit" > Edit </button>`}
                        </div>

                        <span class="text-primary" id="toRepassword"> Change password? </span>
                    </div>
                </div>
        `
    }
}