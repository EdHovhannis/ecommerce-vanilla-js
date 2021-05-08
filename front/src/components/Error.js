export const Error =  {
    after_render: ()=>{
        document.querySelector("#err").addEventListener("click", () => {
            document.location.hash = "/"
        })
    },
    render: () => `<div class="alert alert-danger text-center mt-5 w-50 mx-auto" role="alert">
    Page is not defined 404 <span id="err"> Ok  </span>
</div>`
}

export const loginError =  {
    after_render: ()=>{},
    render: (param) => `<div class="alert alert-primary" role="alert">
                                ${param} <span id="reloader"> OK </span>
                        </div>`
}