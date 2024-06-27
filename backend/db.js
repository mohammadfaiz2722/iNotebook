

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

// const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/inotebook');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

module.exports = connectToMongo;
