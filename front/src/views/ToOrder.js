import { getOrder } from "../api.js"
import { parseRequestUrl } from './../utils.js'
import { loginError } from '../components/Error.js';
// import { cleanOrder } from "../localStorage.js";
// import { getpaypalclientid } from './../api.js';
// import { hideLoading, showLoading } from './../components/loading.js';
// import { SuccessMessage } from './../components/SuccesMessage';

const PaypalFn = async () => {
    const clientid = await getpaypalclientid()
    showLoading()
    if (!window.paypal) {
        const script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "https://www.paypal.com/sdk/js?client-id=test"
        script.async = true
        script.onload = () => PaymentHandler(clientid)
        document.body.appendChild(script)
    } else {
        PaymentHandler(clientid)
    }
}

export const ToOrder = {
    after_render: async () => {
        if (document.querySelector("#reloader") !== null) {
            document.querySelector("#reloader").addEventListener("click", () => {
                document.location.hash = "/"
            })
        }
        // let pay = document.getElementById("pay_pal")
        // paypal.Buttons().render(pay)
    },
    render: async () => {
        const id = parseRequestUrl().id
        const { order, error } = await getOrder(id)
        console.log(order)
        if (error) {
            return loginError.render(error)
        } else {

            return `
                <div class="d-flex flex-wrap align-items-start">
                    <div class="card mt-5 m-2" style="width: 20rem;">
                        <h5 class="card-header">
                            Shipping
                        </h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${order.shipping.address}</li>
                            <li class="list-group-item">${order.shipping.postalCode}</li>
                           ${!order.isDelivered ? `<li class="list-group-item text-danger">Not delivered yet</li>` : `<li class="list-group-item text-success">Delivered</li>`} 
                        </ul>
                    </div>
                    <div class="card mt-5 m-2" style="width: 20rem;">
                        <h5 class="card-header">
                            Payment method
                        </h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${order.payment.method}</li>
                           ${!order.isPaid ? `<li class="list-group-item text-danger">Not delivered yet</li>` : `<li class="list-group-item text-success">Delivered</li>`} 
                        </ul>
                    </div>
                    
                    <div class="card mt-5 m-2" style="width: 20rem;">
                        <h5 class="card-header">
                            Order
                        </h5>
                        <h6><em class="text-secondary">Total price</em> <span class="text-danger">${order.price}$</span></h6>
                            ${order.order.map((x, i) => `   
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item bg-secondary"> ${i + 1 + ")&nbsp;ID:&nbsp;"} ${x._id}</li >
                                    <li class="list-group-item">${x.name}</li>
                                    <li class="list-group-item">${x.qty}</li>
                                    <li class="list-group-item">
                                    <img src="${x.image}" style="max-width: 2rem" alt="${x.name}" /> 
                                    </li>
                                </ul >`).join("\n")
                }
                    </div>

                <div class="card mt-5 m-2" style="width: 20rem;">
                    <h5 class="card-header">
                        PayPal System
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" id="pay_pal"></li>
                    </ul>
                </div>

                </div>
            `
        }

    }
}







