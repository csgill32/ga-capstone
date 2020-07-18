const mongoose = require('mongoose');

require("dotenv").config();

const connectionString = 'mongodb://localhost:27017/'

mongoose.connect(process.env.MONGODB_URI || connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(function () {
        console.log('Mongodb connected...');
    })
    .catch(function (err) {
        console.log('Mongodb Error', err);
    });

module.exports = {
    Recipe: require('./Recipe'),
    Ingredient: require('./Ingredient'),
    User: require('./User'),

};