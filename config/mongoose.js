const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('error',console.error.bind('Error connecting to db'));

db.once('open',()=>{
    console.log('Successfully connected to the Database');
});