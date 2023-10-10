const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/database');
const storeRoutes = require('./Routes/store')


const app = express();

app.use(bodyParser.json({extended:false}));
app.use(cors())
app.use(storeRoutes)

const port = 3000;

sequelize.sync().then((result) => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
        });
    app.get('/', (req, res) => {
        res.send('Hello My Worldddddddddddd!')
        });
    
    app.use((req,res)=>{
        res.send('Page Not Found')
    })
}).catch((err)=> {
    console.log(err);
})


  
