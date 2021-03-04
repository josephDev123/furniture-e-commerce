'use strict';
const cart = document.querySelectorAll('#add_to_cart');
cart.forEach(item=>{
    item.addEventListener('click', (e)=>{
        numCart()
        getProductFromCart(e)
    })
})



function  getProductFromCart(e){
       let parent = e.target.parentElement;
       const product_image = parent.previousElementSibling.firstChild.src;
   }



//show number of product in cart
function numCart(){
    //Note: you can use parseInt to convert string to integer
    let productNum = +localStorage.getItem('numProduct');
    if(productNum){
        localStorage.setItem('numProduct', productNum + 1);
    }else{
        localStorage.setItem('numProduct', 1);
    }

    const checkoutDom = document.querySelector('.checkout');
    checkoutDom.innerHTML =`<i style="color: red;" class="fas fa-shopping-cart">${productNum}</i>`;
    addNumCartToCartDom()
}

//get the number of product in cart after thre browner refreshes
function addNumCartToCartDom(){
    let productNum = +localStorage.getItem('numProduct');

    const checkoutDom = document.querySelector('.checkout');
    checkoutDom.innerHTML =`<i style="color: red;" class="fas fa-shopping-cart">${productNum}</i>`;
}
addNumCartToCartDom()