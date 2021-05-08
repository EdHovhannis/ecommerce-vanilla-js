
export const CheckoutSteps = {
    after_render: () => {},
    render: (props) => {
        return `
        <div class="checkout_steps d-flex align-items-center justify-content-around mt-3 mb-3 border-bottom border-2"> 
            <h2 class=${props.step1 ? "text-warning" : "text-secondary"}> Sign </h2>
            <h2 class=${props.step2 ? "text-warning" : "text-secondary"}> Shipping </h2>
            <h2 class=${props.step3 ? "text-warning" : "text-secondary"}> Payment </h2>
            <h2 class=${props.step4 ? "text-warning" : "text-secondary"}> Place </h2>
        </div>
        `
    }
}