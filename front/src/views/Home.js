import { Rating } from "../components/Rating.js"
import { hideLoading, showLoading } from "../components/loading.js"

export const Home = {
    after_render: async () => { },
    render: async () => {
        showLoading()
        const response = await fetch('http://127.0.0.1:8000/api/products', { headers: { 'Content-Type': 'application/json' } })
        const products = await response.json()
        hideLoading()
        return ` <div class="row row-cols-1 row-cols-md-4 g-4 m-1">
            ${products.map((product, index) => ` 
                            <div class="col m-3 mx-auto ">
                                <div class="card h-100 p-3">
                                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                                <div class="card-body">
                                    <h5 class="card-title"> ${product.name}</h5>
                                    <p class="card-text"> ${product.brand}</p>
                                    <h5 class="card-title"> ${product.price}$</h5>
                                    <div>
                                        ${Rating.render({ value: product.rating, text: `<span class='text-secondary'>${product.numReviews} views</span>` })}
                                    </div>
                                    <a href="/#/product/${product._id}" class="card-link"> Details </a>
                                </div>
                                </div>
                            </div>
                `).join("\n")
            }
        </div>
        `
    }
}

