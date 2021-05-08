import { getUserInfo, setPayment } from '../localStorage.js'
import { CheckoutSteps } from './../components/CheckoutSteps.js'

export const Payment = {
    after_render: () => {
        document.querySelector("#payment").addEventListener("submit", (e)=>{
            e.preventDefault()
            let val
            if(document.querySelector("#paypal").checked ) {
                val = document.querySelector("#paypal").value
            } else {
                val = document.querySelector("#stripe").value
            }
          
            const payment = {
                method: val
            }
            setPayment(payment)
            document.location.hash = "/order"
        }) 
    },
    render: () => {
        if(!getUserInfo().name) {
            document.location.hash = "/"
        }
        return `
        ${CheckoutSteps.render({ step1:true, step2:true, step3:true, step4:false})}
            <form class="mt-5 mx-auto w-50 bg-dark p-3 text-light" id="payment">
                <div class=" mb-5">
                    <h1 class="text-secondary"> Payment method </h1>
                </div>
                <div class="form-check form-switch w-75 mx-auto mb-1 p-1">
                    <input required name="payment" class="form-check-input" type="radio" id="paypal" value="paypal">
                    <label class="form-check-label" for="paypal"> Paypal </label>
                </div>
                <div class="form-check form-switch w-75 mx-auto mb-1 p-1">
                    <input required name="payment" class="form-check-input " type="radio" id="stripe" value="stripe">
                    <label class="form-check-label" for="stripe"> Stripe </label>
                </div>

                <div> 
                    <button type="submit" class="btn btn-success w-100"> Next </button>
                </div>
            </form>
        `
    }    
}