import { CheckoutSteps } from './../components/CheckoutSteps.js'
import { getCartItems, getPayment, getShipping, cleanOrder, getUserInfo } from '../localStorage.js'
import { hideLoading, showLoading } from './../components/loading.js';
import { loginError } from '../components/Error.js';
import { createOrder } from './../api.js';

const Allitems = () => {
    const order = getCartItems()
    const shipping = getShipping()
    const payment = getPayment()

    const price = order.reduce((a, x) => a + x.price * x.qty, 0)
    return {
        order,
        shipping,
        payment,
        price,
    }
}
Allitems()
export const Order = {

    after_render: async () => {
        document.querySelector("#placeOrder").addEventListener("click", async () => {
            const clientOrder = Allitems()
            showLoading()
            const { order, error } = await createOrder(clientOrder)
            if (error) {
                loginError.render(error)
            } else {
                // cleanOrder()
                document.location.hash = `/order/${order._id}`
            }
            hideLoading()
        })
    },

    render: () => {
        const { order, shipping, payment, price } = Allitems()
        if (!getUserInfo().name) {
            document.location.hash = "/"
        }
        return `
        ${CheckoutSteps.render({ step1: true, step2: true, step3: true, step4: true })}
        <div>  
            <div class="d-flex align-items-start flex-wrap ">
            <table class="table table-light table-hover m-3 text-center tableOFcart">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Amount</th>
                </tr>
                    </thead>
                    ${order.map((ord, i) => `<tbody>
<tr>
    <th scope="row">${i + 1}</th>
    <td>${ord.name}</td>
    <td> <img style="max-Width: 2rem" src="${ord.image}" alt="${ord.name}"/></td>
    <td>${ord.qty}</td>
</tr>
</tbody>`

        ).join("\n")
            }
              
                
                </table>
                <div class="card m-2 mx-auto" style="width: 14rem;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><h4 class="text-secondary">Shipping</h4></li>
                        <li class="list-group-item">${shipping.address}</li>
                        <li class="list-group-item">${shipping.postalCode}</li>
                    </ul>
                </div>
                <div class="card m-2 mx-auto" style="width: 14rem;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><h4 class="text-secondary">Payment method</h4></li>
                        <li class="list-group-item mb-lg-3">${payment.method}</li>
                        <li class="list-group-item"> <span style = "font-weight:700;" >${price}</span>  $</li>
                    </ul>
                    <div class="mt-3">
                        <button class="btn btn-primary w-100" id="placeOrder"> Accept </button>
                    </div> 
                </div>
            </div>  
            
        </div>
        `
    }
}




