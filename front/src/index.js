import { Error } from './components/Error.js';
import { parseRequestUrl } from './utils.js';
import { Account } from './views/Account.js';
import { Cart } from './views/Cart.js';
import { Home } from './views/Home.js';
import { Login } from './views/Login.js';
import { Order } from './views/Order.js';
import { Payment } from './views/Payment.js';
import { Product } from './views/Product.js';
import { Register } from './views/Register.js';
import { Repassword } from './views/Repassword.js';
import { Restore } from './views/Restore.js';
import { RestoreFinish } from './views/RestoreFinish.js';
import { Shipping } from './views/Shipping.js';
import { ToOrder } from './views/ToOrder.js';

const routes = {
    "/": Home,
    "/product/:id": Product,
    "/cart/:id": Cart,
    "/cart": Cart,
    "/register": Register,
    "/login": Login,
    "/account/:id": Account,
    "/repassword/:id": Repassword,
    "/restore": Restore,
    "/restorefinish": RestoreFinish,
    "/shipping": Shipping,
    "/payment": Payment,
    "/order": Order,
    "/order/:id": ToOrder,
    "err404": Error
}

const router = async () => {
    const request = parseRequestUrl()
    const parseURL = (request.resource ? `/${request.resource}` : "/") + (request.id ? `/:id` : "") + (request.verb ? `/${request.verb}` : '')
    const screen = routes[parseURL] ? routes[parseURL] : routes["err404"]
    const main = document.querySelector("main")
    main.innerHTML = await screen.render()
    await screen.after_render()
}

window.addEventListener("load", router)
window.addEventListener("hashchange", router)
