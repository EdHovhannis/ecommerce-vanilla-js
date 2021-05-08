import { getProduct } from "../api.js"
import { Rating } from "../components/Rating.js";
import { parseRequestUrl } from './../utils.js';
import { hideLoading, showLoading } from "../components/loading.js";
import { getUserInfo } from "../localStorage.js";

export const Product = {
    after_render: async () => {
        const request = parseRequestUrl()
        if (document.querySelector("#addtocart") !== null) {
            document.querySelector("#addtocart").addEventListener("click", () => {
                document.location.hash = `/cart/${request.id}`
            })
        }
    },
    render: async () => {
        showLoading()
        const { id } = parseRequestUrl()
        const { product } = await getProduct(id)
        hideLoading()
        return `
        <h1 class="mt-3 m-3 p-0 w-75 mx-auto">${product.name}</h1>
        <div class="d-flex align-items-start justify-content-around flex-wrap">
        <div class="card mt-1 m-3 p-5 w-100 product_info mx-auto" style="max-width: 1000px;">
                <div class="row g-0">
                <div class="col-md-4">
                <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">Brand: ${product.brand}</h5>
                <p class="card-text">Category: ${product.category}</p>
                  ${Rating.render({ value: product.rating })} 
                </div>
                </div>
            </div>
        </div>

    <div class="card border-light mb-3 w-100 me-5" style="max-width: 18rem;">
            <div class="card-header">Add to cart ?</div>
            <div class="card-body">
            <h5 class="card-title">Price: ${product.price}$ </h5>
            <p class="card-text">In stock: ${product.countInStock} </p>
            ${getUserInfo().name ? `${product.countInStock > 0 ? `<div class="mb-3"> <a href="/#/" class="card-link"> bact to shop </a></div> <input type="button" id="addtocart" class="btn btn-success w-100" value="Add"/>` : ` <div class="mb-3"> <a href="/#/" class="card-link"> bact to shop </a></div> <input disabled type="button" id="addtocart" class="btn btn-secondary w-100" value="Unavailable"/>`}` : `<div class="text-secondary mx-auto"> Sign in to add </div>`}
    </div>
        `
    }
}
