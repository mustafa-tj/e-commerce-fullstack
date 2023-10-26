const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/database');
const storeRoutes = require('./Routes/store');
const cartRoutes = require('./Routes/cart');

const Cart = require('./Models/cart');
const CartMusic = require('./Models/cartMusic');
const Music = require('./Models/music');
const User = require('./Models/usr');
const Orders = require('./Models/order');
const orderMusic = require('./Models/orderMusic');


const app = express();

// Relationships

// One to Many Relationship
Music.belongsTo(User, { constraints:true, onDelete: 'CASCADE'})
User.hasMany(Music);

// One to One Relationship
User.hasOne(Cart);
Cart.belongsTo(User);

// Many to Many Relationship
Cart.belongsToMany(Music, {through: CartMusic});
Music.belongsToMany(Cart, {through: CartMusic});

// One to Many Relationship
Orders.belongsTo(User, { constraints:true, onDelete:'CASCADE'});
User.hasMany(Orders);

// Many to Many
Orders.belongsToMany(Music, {through: orderMusic});
Music.belongsToMany(Orders, {through: orderMusic});



app.use(bodyParser.json({extended:false}));
app.use(cors())
app.use(storeRoutes)
app.use(cartRoutes);



let tempUser;
sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
    return User.findByPk(1);
    })
    .then(user => {
        if (!user){
            return User.create({ name: 'Mustafa', emailid:'mus@gmail.com'});
        }
        return user;
    })
    .then(user => {
        tempUser = user;

        return user.getCart();
    })
    .then(cart => {
        if(!cart){
            tempUser.createCart();
        }
        return;
    })
    .then(cart => {
        app.listen(3000)
        console.log('app started');
    })
    .catch(err => console.log(err))

app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})


