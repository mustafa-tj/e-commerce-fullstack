const oparentNode=document.getElementById('order-page')



window.addEventListener('DOMContentLoaded',()=>{
    getOrder();
})


function getOrder(){
    axios.get("http://localhost:3000/cart/get-productsforOrder")
    .then((data)=>{
        console.log(data.data);
        
        for(let i=0;i<data.data.length;i++){
            let totalPriceforOrder=0;
            // console.log(data.data[i]);
            const section=document.createElement('div')
            section.className=("orderDetails");
            section.id=("order-details");
            oparentNode.appendChild(section);
            let body=document.getElementById("order-details");
            const ul=document.createElement('ul')
            ul.className="div-order-cart";
            
        

             for(let j=0;j<data.data[i].length;j++)
             {
                console.log(data.data[i][j])
                totalPriceforOrder=totalPriceforOrder+data.data[i][j].price
                childHTML=`<li class="order-item-list"><img src=${data.data[i][j].imageUrl} alt="">${data.data[i][j].title}</li>`
                ul.innerHTML=ul.innerHTML+childHTML;
                
             }
              
            childHTML=`<h2>ProductID</h2><br></br>
            <h3>Total Order Value:${totalPriceforOrder}</h3>`
            section.innerHTML=section.innerHTML+childHTML;

             
             
            //  section.innerHTML=``
            //  oparentNode.appendChild(section);
            // childHTML=`<h3>Total Order Value:${totalPriceforOrder}</h3>`

            // section.innerHTML=section.innerHTML+childHTML;

            

            
        }


    })
    .catch(err=>console.log(err))
}