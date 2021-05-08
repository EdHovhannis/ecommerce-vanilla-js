export const Rating = {
    render: (props) => {
        return ` 
        <div class="rating text-warning"> 
                <span><i class="${props.value >= 1 ? "fas fa-star" : props.value >= 0.5 ? "fas fa-star-half-alt" : "far fa-star"}" ></i></span>      
                <span><i class="${props.value >= 2 ? "fas fa-star" : props.value >= 1.5 ? "fas fa-star-half-alt" : "far fa-star"}" ></i></span>      
                <span><i class="${props.value >= 3 ? "fas fa-star" : props.value >= 2.5 ? "fas fa-star-half-alt" : "far fa-star"}" ></i></span>      
                <span><i class="${props.value >= 4 ? "fas fa-star" : props.value >= 3.5 ? "fas fa-star-half-alt" : "far fa-star"}" ></i></span>      
                <span><i class="${props.value >= 5 ? "fas fa-star" : props.value >= 4.5 ? "fas fa-star-half-alt" : "far fa-star"}" ></i></span>      
                <span>${props.text || ''}</span>
          </div>
        `
    }
}