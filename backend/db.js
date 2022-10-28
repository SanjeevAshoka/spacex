const mongoose  = require('mongoose');
const Uri = 'mongodb://localhost:27017/spacex'

const connectToMongo = () => {
    mongoose.connect(Uri, ()=>{
        console.log("Connected to Mongo successfully");
    })
}

module.exports = connectToMongo;