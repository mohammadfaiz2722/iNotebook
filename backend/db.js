

const mongoose = require('mongoose');
require('dotenv').config();


// const mongoURI = "mongodb+srv://mohammadFaiz:faizilma@cluster0.1nsmgkt.mongodb.net/productDB"; // Replace with your MongoDB connection string
const mongoURI="mongodb+srv://faiz:faizjarvis@cluster1.lmtoo7r.mongodb.net/iNotebook?retryWrites=true&w=majority&appName=Cluster1"
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
