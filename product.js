const displayContainer = document.querySelector(".display-cont");
let cartList = document.querySelector(".filled-cart");
let cartTotalQuantity = document.querySelector(".cart-total-quantity");
let cartTotalPrice = document.querySelector(".cart-total-price");
let emptyCart = document.querySelector(".empty-cart");

fetch("./data.json", {
  method: "Get",
  headers: {
    accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((desserts) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let content = "";

    for (let i = 0; i < desserts.length; i++) {
      content += `
                    <div class="display-box">
                    <div class="food-image">
                        <img src="${desserts[i].image.desktop}" alt="">
                    </div>
                    <div class="add-cart-group">
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
                    
                    </div>
                    <div class="dessert-info">
                        <p>${desserts[i].name}</p>
                        <h1>${desserts[i].category}</h1>
                        <h2>$ ${Number(desserts[i].price)
                          .toFixed(3)
                          .slice(0, -1)}</h2>
                    </div>
                </div>
                `;
    }

    displayContainer.innerHTML = content;

    let addcartBtn = document.querySelectorAll(".add-cart");
    let selectItem = document.querySelectorAll(".select-item");
    let increaseBtn = document.querySelectorAll(".increase-num");
    let decreaseBtn = document.querySelectorAll(".decrease-num");
    let numDisplay = document.querySelectorAll(".num-display");

    addcartBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        addToCart(desserts[index], index);

        selectItem[index].style.visibility = "visible";
      });

      let existingItem = cart.find(
        (item) => item.name === desserts[index].name
      );
      console.log(existingItem);
      if (existingItem?.name === desserts[index].name) {
        selectItem[index].style.visibility = "visible";
        numDisplay[index].innerHTML = existingItem.quantity;
      }
    });

    increaseBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        increaseProductQuantity(desserts[index], index);
      });
    });

    decreaseBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        decreaseProductQuantity(desserts[index], index);
      });
    });

    //FUNCTIONS
    function saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }

    function addToCart(product, index) {
      cart.push({ ...product, quantity: 1 });
      saveToLocalStorage();

      console.log(cart);
    }

    function increaseProductQuantity(product, index) {
      let existingItem = cart.find((item) => item.name === product.name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        addToCart(product);
      }
      numDisplay[index].innerHTML = existingItem.quantity;
      console.log(cart);
      saveToLocalStorage();
    }

    function decreaseProductQuantity(product, index) {
      let existingItem = cart.find((item) => item.name === product.name);

      if (existingItem) {
        existingItem.quantity--;
      } else {
        addToCart(product);
      }

      if (existingItem.quantity === 0) {
        selectItem[index].style.visibility = "hidden";

        cart.splice(cart.indexOf(existingItem), 1);
        decreaseBtn[index].setAttribute("disabled", true);
        existingItem.quantity = 1;
        loadCart();
      }
      numDisplay[index].innerHTML = existingItem.quantity;
      console.log(cart);
      saveToLocalStorage();
    }
  });

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);
  if (cart.length) {
    let content = "";
    let totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0) || 0;
    let totalPrice = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    for (let i = 0; i < cart.length; i++) {
      content += `
                  <div class="item-box">
                  <h2>${cart[i].name}</h2>
                  <p>${cart[i].category}</p>
                  <p>x ${cart[i].quantity}</p>
                  <p>$ ${Number(cart[i].price).toFixed(2)}</p>
                      <h3>$ ${(
                        Number(cart[i].price) * cart[i].quantity
                      ).toFixed(2)}</h3>
                  </div>
                  `;
    }
    cartList.innerHTML = content;
    cartList.appendChild(cartTotalPrice);
    cartTotalPrice.innerHTML = "Total: $ " + totalPrice.toFixed(2);
    cartTotalQuantity.innerHTML = totalQuantity;
    cartList.style.display = "block";
    emptyCart.style.display = "none";
    return;
  }
  cartList.style.display = "none";
  emptyCart.style.display = "block";
  cartTotalQuantity.innerHTML = 0;
  console.log(cart);
}
loadCart();
