const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce','root','30395141',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;