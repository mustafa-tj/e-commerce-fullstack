const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/database');
const storeRoutes = require('./Routes/store')
const cartRoutes = require('./Routes/cart')


const app = express();

app.use(bodyParser.json({extended:false}));
app.use(cors())
app.use(storeRoutes)
app.use(cartRoutes);

const port = 3000;

sequelize.sync().then((result) => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
        });
    // app.get('/', (req, res) => {
    //     res.send('Hello My Worldddddddddddd!')
    //     });
    
    app.use((req,res)=>{
        res.send('Page Not Found')
    })
}).catch((err)=> {
    console.log(err);
})


  
