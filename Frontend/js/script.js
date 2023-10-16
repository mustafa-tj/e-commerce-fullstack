totalPrice = 0.00;
const cart = document.getElementsByClassName('cart');

window.addEventListener('DOMContentLoaded',(data)=>{
    axios.get('http://localhost:3000/products/music')
    .then((Music) => {
        Music.data.forEach(data => {
            var parentNode = document.getElementById('music-container')
            var childHTML = `<div class="music-content" id=${data.id}>
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
            var childHTML = `<div class="merch-content" id=${data.id}>
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
    axios.get('http://localhost:3000/cart/get-products')
    .then((Products)=>{
        Products.data.forEach((data)=>{
            var cartList = document.getElementById('cart-list');
            var list = document.createElement('li');
            list.classList.add('cart-items')
            // list.setAttribute('id',data.id);
            list.innerHTML = `
                <div class="cart-items" id=${data.id}>
                    <div class="item-container" id="item-container">
                        <img  src="${data.imageUrl}" alt="">
                        <h5>${data.title}</h5>       
                    </div>

                    <div class="price-container" id="price-container">
                        $${data.price} 
                    </div>

                
                    
                    <div class="quantity-container" id="quantity-container">
                        <input type="number" placeholder="1" min="1" value="${data.quantity}">
                        <button class="remove-from-cart" id="rem">Remove</button>  
                    </div>
                    </div>
                
            `
            
            cartList.appendChild(list);

            const total = document.getElementById('total-price');
            totalPrice = totalPrice + data.price;
            total.innerText = `Total: $${totalPrice}`

        })
    })
    .catch((err)=>{
        console.log(err);
    })
})



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
        const cartList = document.getElementById('cart-list');
        const list = document.createElement('li');
        const id = event.target.parentElement.parentElement.id;
        const imageUrl = event.target.parentElement.parentElement.children[1].children[0].src;
        const price = event.target.parentElement.parentElement.children[2].children[0].innerText;
        const title = event.target.parentElement.parentElement.children[0].innerText;
        const quantity = 1;


        const cart = {id:id,title:title,imageUrl:imageUrl,price:price,quantity:quantity};
        axios.post('http://localhost:3000/cart/add-product',cart)
        .then((data)=> {
            var cartList = document.getElementById('cart-list');
            var list = document.createElement('li');
            list.classList.add('cart-items')
            list.setAttribute('id','cart-items')
            list.innerHTML = `
                <div  class="cart-items" id=${data.data.id}>
                    <div class="item-container" id="item-container">
                        <img  src="${data.data.imageUrl}" alt="">
                        <h5>${title}</h5>       
                    </div>

                    <div class="price-container" id="price-container">
                        $${data.data.price} 
                    </div>

                
                    
                    <div class="quantity-container" id="quantity-container">
                        <input type="number" placeholder="1" min="1" value="${data.data.quantity}">
                        <button class="remove-from-cart" id="rem">Remove</button>  
                    </div>
                </div>
            `
            cartList.appendChild(list);


        })
        .catch((err)=>{
            console.log(err);
        })
        
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
        responseid = event.target.parentElement.parentElement.id;
        const url = 'http://localhost:3000/cart/delete-product/'+responseid
        axios.post(url)
        .then(()=>{
            // const cartList = document.getElementById('cart-list');
            const cartList = event.target.parentElement.parentElement.parentElement.parentElement;
            console.log(cartList);
            
            
            // const cartItems = document.getElementById('cart-items');
            
            const list = event.target.parentElement.parentElement.parentElement;
            console.log(list);
        
            cartList.removeChild(list)
        })
        .catch(err=> console.log(err))

       
        

        // Substracting total price
        const total = document.getElementById('total-price');
        const price = event.target.parentElement.parentElement.children[1].innerText.split('$')[1]
        const fPrice = parseFloat(price)
        totalPrice = totalPrice - fPrice
        

        total.innerText = `Total :$${totalPrice}`
        
    }   
    
}
