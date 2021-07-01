'use strict';
let product_imageDom =document.getElementById('product_image');
//this is declare to place checkout product below it
let checkoutHeader = document.querySelector('.chekout_banner');
//get the price element
let total_price =document.getElementById('Total_price');
let cart_Arr = localStorage.getItem('products')? JSON.parse(localStorage.getItem('products')): [];
let setStorage = localStorage.setItem('products', JSON.stringify(cart_Arr));



//looping all the item to select each item clicked
const cart = document.querySelectorAll('#add_to_cart');
cart.forEach(item=>{
    item.addEventListener('click', (e)=>{
        numCart();
        getProductFromCart(e);
        displayCartProductToCheckPage();
   
     
    })
})



function  getProductFromCart(e){
  
    // declare object that store the product cart
    let cart_obj = {
        id:'',
        image:'',
        price:''
    };
   
       let parent = e.target.parentElement;
        //product image
       let product_image = parent.previousElementSibling.firstChild.src;
      

        //product price
        let product_price = parent.children[1].textContent.substr(1);

        let product_id = ID();
       
    //  add values to the cart object
        cart_obj.id = product_id;
        cart_obj.image = product_image;
        cart_obj.price = +product_price;
        cart_Arr.push(cart_obj);
        let setStorage = localStorage.setItem('products', JSON.stringify(cart_Arr));
        alert('product added to cart');
    
   }



//display product to checkout page
   function displayCartProductToCheckPage(){
    cart_Arr.forEach(item =>{     
        if(checkoutHeader){
            checkoutHeader.insertAdjacentHTML('afterend', `
            <div class="container display_product_container">
                      <div class="products_wrapper" id ="${item.id}">
                          <div class="product_image_wrapper" id="product_image_wrapper">
                              <img class="product_image" id="product_image" src="${item.image}" alt="">
                          </div>
                          
                          <div class="product_price_wrapper" id="product_price_wrapper">
                              <h3 class="product_price" id="product_price">$ ${item.price}</h3>
                          </div>
                            <h3 class="product_delete" id="product_delete" Onclick ='product_delete(event);'>Delete</h3>
                      </div>
                      <hr>
      
                     
             </div>`
             );
             totalpriceProduct()
        }
    })
   }
  

   //delete product from checkout page
    function product_delete(e){
        let parent = e.target.parentElement;
        let specific_product_to_delete = e.target.parentElement.id;
         cart_Arr = cart_Arr.filter(removeItem => removeItem.id != specific_product_to_delete);
         let setStorage = localStorage.setItem('products', JSON.stringify(cart_Arr));
         parent.remove();
         parent.style.display = 'none';
         decreaseCartNum();
         addNumOfCartToCartDom();
         totalpriceProduct()
  }


  function decreaseCartNum(){
    let productNum = +localStorage.getItem('numProduct');
    if(productNum){
        localStorage.setItem('numProduct', productNum - 1);
    }
    
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
    addNumOfCartToCartDom()
}


//get the number of product in cart after the browner refreshes
function addNumOfCartToCartDom(){
    let productNum = +localStorage.getItem('numProduct');

    const checkoutDom = document.querySelector('.checkout');
    checkoutDom.innerHTML =`<i style="color: red;" class="fas fa-shopping-cart">${productNum}</i>`;
}
addNumOfCartToCartDom()


//total price to display at the total element in checkout page 
function totalpriceProduct(){
   let totalLocalstorage = JSON.parse(localStorage.getItem('products'))
    //total price of product
    total_price.value= '$'+totalLocalstorage.reduce((a, b) => a + b.price, 0);
    document.getElementById('price').textContent = total_price.value;
   
}


// unique id
var ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

displayCartProductToCheckPage()

