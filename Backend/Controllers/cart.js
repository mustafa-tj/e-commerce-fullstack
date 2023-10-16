const Cart = require('../Models/cart');

exports.postProduct=((req,res,next)=>{
    console.log(req.body);
    const id = req.body.id
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const quantity = req.body.quantity;

    Cart.create({id:id,title:title,imageUrl:imageUrl,price:price,quantity:quantity})
    .then((result)=> {
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

exports.getProduct = ((req,res,next)=>{
    Cart.findAll()
    .then((result)=> {
        res.json(result)
    }).catch((err)=> {
        console.log(err);
    });
});

exports.postDeleteProducts = ((req,res,next)=>{
    const productid = req.params.productid;

    Cart.findByPk(productid)
    .then(val=>{
        return val.destroy()
    }).then(result => {
        console.log('Product removed from the cart');
        res.json();
    }).catch(err => console.log(err))
})