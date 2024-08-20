const displayContainer = document.querySelector('.display-cont');
let cartList = document.querySelector('.filled-cart')
let cart = [];
fetch('./data.json', {
    method: 'Get',
    headers: {
        accept: 'application/json'
    },
    
})
.then((response) => response.json())
.then((desserts) => {
        
        let content = '';

        for (let i = 0; i < desserts.length; i++) {
            content += `
                    <div class="display-box">
                    <div class="food-image">
                        <img src="${desserts[i].image.desktop}" alt="">
                    </div>
                    <button class="add-cart">
                        <img src="./assets/images/icon-add-to-cart.svg" alt="">
                        <p>Add To Cart</p>
                    </button>
                    <div class="select-item">
                        <button class="decrease-num">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2">
                                <path d="M0 .375h10v1.25H0V.375Z" />
                            </svg>
                        </button>
                        <p class="num-display">1</p>
                        <button class="increase-num">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                                <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
                            </svg>
                        </button>
                    </div>
                    <div class="dessert-info">
                        <p>${desserts[i].name}</p>
                        <h1>${desserts[i].category}</h1>
                        <h2>$ ${(Number(desserts[i].price).toFixed(3).slice(0, -1))}</h2>
                    </div>
                </div>
                `}
                
                

        displayContainer.innerHTML = content;

        // addcart.addEventListener('click', addToCart);
    });


    function addToCart(product) {
        let addcart = document.querySelector('.add-cart');
        console.log(addcart)
        cart.push(product)
console.log(cart)
    }
    addToCart({})

   
    

    

    // addcart.forEach(function () {
    //     addcart.addEventListener('click', function () {
    //         addcart.style.display = none;
    //     });
    // });
