const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const path=require('path')

connectToMongo(); // Connect to MongoDB database

const app = express();
const port = 5000;

// const corsOptions = {
//   origin: "https://inotebook.onrender.com" ,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// };
app.use(cors()); // Enable CORS
// Enable CORS
app.use(express.static(path.join(__dirname,'./build')))
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
// app.use('*',function(req,res){
//   res.sendFile(path.join(__dirname,'./build/index.html'))
// })

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
