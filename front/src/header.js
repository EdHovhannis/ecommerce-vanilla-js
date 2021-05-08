// import { Error } from './components/Error.js';
// import { parseRequestUrl } from './utils.js';
// import Cart from './views/Cart.js';
// import Home from './views/Home.js';
// import { Login } from './views/Login.js';
// import Product from './views/Product.js';
// import { Register } from './views/Register.js';

import { Header_view } from "./views/Header_view.js"



const header = async () => {
    const screen = Header_view
    const header = document.querySelector("header")
    header.innerHTML = await screen.render()
    await screen.after_render()
}

window.addEventListener("load", header)
window.addEventListener("hashchange", header)
