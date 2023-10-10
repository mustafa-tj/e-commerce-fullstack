var totalPrice = 0.00;
const cart = document.getElementsByClassName('cart');

function popupCart(event) {
    if (event.target.id === "nav-cart" || event.target.id === "see-the-cart" ) {
        const mainCart = document.getElementById('main-cart');
        // if (mainCart.style.display=='block'){
        //     mainCart.style.display='none'
        // }
        (mainCart.style.display=='block' ? mainCart.style.display='none' : mainCart.style.display='block ')
    }
    if (event.target.id === "close-btn") {
        const mainCart = document.getElementById('main-cart');
        mainCart.style.display='none'
    }

    if (event.target.id === "shop-btn") {
        // Adding product to cart
        const cartList = document.getElementById('cart-list')
        const list = document.createElement('li');
        const imgSrc = event.target.parentElement.parentElement.children[1].children[0].src
        const price = event.target.parentElement.parentElement.children[2].children[0].innerText
        const title = event.target.parentElement.parentElement.children[0].innerText

        list.classList.add('cart-items')
        list.innerHTML = `
        <div class="item-container" id="item-container">
            <img  src="${imgSrc}" alt="">
            <h5>${title}</h5>       
        </div>

        <div class="price-container" id="price-container">
            $${price} 
        </div>

    
        
        <div class="quantity-container" id="quantity-container">
            <input type="number" placeholder="1" min="1">
            <button class="remove-from-cart" id="rem">Remove</button>  
        </div>
        `
        cartList.appendChild(list);

        // Adding total price
        const total = document.getElementById('total-price');
        const fPrice = parseFloat(price)
        totalPrice = totalPrice + fPrice

        total.innerText = `Total :$${totalPrice}`

        // Notification
        const notification = document.getElementById('not');
        notification.style.display='flex';
        const p = document.getElementById('notif-p')
        p.innerText = `Your Product: ${title} is Added to the Cart`
        setTimeout(()=> {
            notification.style.display='none';
        },1000)
        
    }
    if (event.target.id === "rem"){
        const cartList = document.getElementById('cart-list')
        // const ul = event.target.parentElement.parentElement.parentElement
        const li = event.target.parentElement.parentElement
        // console.log(li);
        cartList.removeChild(li);

        // Substracting total price
        const total = document.getElementById('total-price');
        const price = event.target.parentElement.parentElement.children[1].innerText.split('$')[1]
        const fPrice = parseFloat(price)
        totalPrice = totalPrice - fPrice
        

        total.innerText = `Total :$${totalPrice}`
        
    }   
    
}
window.addEventListener('DOMContentLoaded',(data)=>{
    axios.get('http://localhost:3000/products/music')
    .then((Music) => {
        Music.data.forEach(data => {
            var parentNode = document.getElementById('music-container')
            var childHTML = `<div class="music-content">
            <h2>${data.title}</h2>
            <div class="product-img-container">
                <img src="${data.imageUrl}" alt="">
            </div>
            <div class="product-details">
                $<span class="s2">${data.price}</span>
                <button class="shop-btn" id="shop-btn" type='button'>ADD TO CART</button>
            </div>     
        </div>`
        parentNode.innerHTML = parentNode.innerHTML + childHTML
        })
    })
    .catch((err)=>{
        console.log(err);
    })
    axios.get('http://localhost:3000/products/merch')
    .then((Merch) => {
        Merch.data.forEach(data => {
            var merchContainer = document.getElementById('merch-container');
            var childHTML = `<div class="merch-content">
            <h2>${data.title}</h2>
            <div class="product-img-container">
                <img src="${data.imageUrl}" alt="">
            </div>
            <div class="product-details">
                $<span class="s2">${data.price}</span>
                
                <button class="shop-btn" id="shop-btn" type='button'>ADD TO CART</button>
            </div>     
        </div>`
        merchContainer.innerHTML = merchContainer.innerHTML + childHTML
        })
    })
})