import { CheckoutSteps } from "../components/CheckoutSteps.js"
import { getUserInfo, getShipping, setShipping } from "../localStorage.js"

export const Shipping = {
    after_render: () => {
        document.querySelector("#shipping").addEventListener("submit", (e) => {
            e.preventDefault()
            setShipping({
                address: document.querySelector("#address").value,
                postalCode: document.querySelector("#postalCode").value,
            })
            document.location.hash = "/payment"
        })
    },
    render: () => {
        const { address, postalCode } = getShipping()
        if (!getUserInfo().name) {
            document.location.hash = "/"
        }
        return `
        ${CheckoutSteps.render({ step1: true, step2: true, step3: false, step4: false })}
        <div class="check_out"></div>
            
            <form class="mt-5 mx-auto w-50 bg-dark p-3 text-light" id="shipping">
                <div class="mb-3 m-1" > 
                    <h2 class="text-secondary"> Shipping </h2>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" aria-describedby="emailHelp" placeholder="address" value=${address}>
                </div>
                <div class="mb-5">
                    <label for="postalCode" class="form-label">Postal code</label>
                    <input type="text" class="form-control" id="postalCode" aria-describedby="emailHelp" placeholder="postal code" value=${postalCode}>
                </div>

                <div> 
                    <button type="submit" class="btn btn-success w-100"> Next </button>
                </div>

            </form>
        `
    }
}