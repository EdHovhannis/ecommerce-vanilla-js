
import { parseRequestUrl, rerenderCartView } from './../utils.js'
import { getProduct } from './../api.js'
import { getCartItems, getUserInfo, setCartItems } from '../localStorage.js'
import { hideLoading, showLoading } from '../components/loading.js'


const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems()
    const existItem = cartItems.find(x => x.productId === item.productId)
    if (existItem) {
        if (forceUpdate) {
            cartItems = cartItems.map(x => x.productId === existItem.productId ? item : x)
        }
    } else {
        cartItems = [...cartItems, item]
    }
    setCartItems(cartItems)
    if (forceUpdate) {
        rerenderCartView(Cart)
    }

}

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter(x => x.productId !== id))
    if (id == parseRequestUrl().id) {
        document.location.hash = `/cart`
    } else {
        rerenderCartView(Cart)
    }
}

export const Cart = {
    after_render: async () => {

        let det = document.querySelectorAll(".productDet")
        for (let i = 0; i < det.length; i++) {
            det[i].onclick = function (e) {
                if (e.target.tagName === "TD" || e.target.tagName === "IMG" || e.target.tagName === "TH") {
                    document.location.hash = `/product/${this.id}`
                }

            }
        }

        let selectQty = document.getElementsByClassName("qty-select")
        for (let i = 0; i < selectQty.length; i++) {
            selectQty[i].onchange = function (e) {
                const item = getCartItems().find(x => x.productId === selectQty[i].id)
                addToCart({ ...item, qty: +e.target.value }, true)
            }
        }

        let deleteButton = document.querySelectorAll(".deleteButton")
        for (let i = 0; i < deleteButton.length; i++) {
            deleteButton[i].onclick = function (e) {
                removeFromCart(e.target.getAttribute("data-tab"))
            }
        }
        if (document.querySelector(".proceedToCheckOut") !== null) {
            document.querySelector(".proceedToCheckOut").addEventListener("click", () => {
                if (getUserInfo().name) {
                    document.location.hash = "/shipping"
                } else {
                    document.location.hash = "/login"
                }
            })
        }
    },
    render: async () => {
        showLoading()
        const request = parseRequestUrl()
        if (request.id) {
            const { product } = await getProduct(request.id)
            addToCart({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                countInStock: product.countInStock,
                qty: 1
            })
        }
        hideLoading()
        const cartItems = getCartItems()
        return `
            ${cartItems.length ? `<div> 
            <div class="d-flex flex-wrap align-items-center justify-content-center">
                <table class="table table-dark table-hover m-3 text-center tableOFcart">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Price</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    ${cartItems.map((product, i) => `
                        
                        <tbody class="productDet" id="${product.productId}">
                            <tr>
                                <th scope="row">${i + 1}</th>
                                <td>
                                    <img style="max-Width: 2rem" src="${product.image}" alt="${product.name}" />
                                </td>
                                <td>${product.name}</td>
                                <td>
                                   <select value="${product.qty}" class="qty-select" id=${product.productId}>
                                    ${Array(product.countInStock).fill(product.countInStock).map((x, i) => product.qty === i + 1 ? `
                                        <option selected value="${i + 1}">${i + 1}</option>
                                    `: `<option value="${i + 1}">${i + 1}</option>`).join("\n")
            }
                                   </select>
                                </td>
                                <td>${product.price}</td>
                                <td>
                                    <button class="btn btn-danger deleteButton" data-tab="${product.productId}"> Delete </button>
                                </td>
                            </tr>
                    </tbody>
                        `).join("\n")
                } 
                   
                </table>

                <div class="col-sm-6  m-3 cartHandler">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Total price: ${cartItems.reduce((total, x) => total + x.price * x.qty, 0)} $ </h5>
                    <p class="card-text">${cartItems.length} items</p>
                   
                    <button class="btn btn-primary w-100 proceedToCheckOut"> Proceed to Chect out </button>
                  </div>
                </div>
              </div>
            </div> 
        </div>` : `<div class="alert alert-primary w-75 mx-auto mt-5 text-center" role="alert">
       Cart is empty
      </div>
      `
            }
        `
    }
}
