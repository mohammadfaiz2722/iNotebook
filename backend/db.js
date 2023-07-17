

const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/inotebook"; // Replace with your MongoDB connection string
let connectToMongo=()=>
{
    
    mongoose.connect( mongoURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

   
}
module.exports = connectToMongo;
