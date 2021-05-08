import { getUserInfo } from "../localStorage.js"


export const Header_view = {
 after_render: async ()=> {
  const out = document.querySelector("#logOut") 
  out.addEventListener("click", ()=>{
     localStorage.removeItem("userInfo")
     localStorage.removeItem("cartItems")
     localStorage.removeItem("shipping")
  })
 },
 render: async () => {
    return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
    <div class="container-fluid">
      <a class="navbar-brand" href="/#/">Commerce</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        ${getUserInfo().name ?  `<li class="nav-item">
            <a class="nav-link " href="/#/cart">Cart</a>
          </li>` : "" }
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${getUserInfo().name ? getUserInfo().name: "Sign"}  
            </a>
            ${ getUserInfo().name ? `<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                      <li><a class="dropdown-item" href="/#/login" id="logOut">Log out</a></li>
                                      <li><a class="dropdown-item" href="/#/account/${getUserInfo()._id}" id ="account">My Account</a></li>
                                    </ul>
                                    `:  `<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                          <input type="hidden" id="logOut" /> 
                                    <li><a class="dropdown-item" href="/#/login">Sign in</a></li>
                                    <li><a class="dropdown-item" href="/#/register">Create account</a></li>
                                  </ul>` }
           
          
            </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
    `
}
}

