require('dotenv').config();
const express = require('express');
const db = require('./config/mongoose');
const Contact = require('./models/contactSchema');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contacts = [
    {
        name:"Sai",
        mob: "123456789"
    },
    {
        name:"Rush",
        mob: "987654321"
    },
    {
        name:"Git",
        mob: "975312468"
    }
]

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/',(req,res)=>{

    Contact.find({},(err,contactsList)=>{
        if(err){
            console.log('Error in Fetching data from db', err);
        }
        else{
            return res.render('home',{
                title:"Contact Manager",
                contacts:contactsList
            });    
        }
    })
});

app.post('/newContact',(req,res)=>{
    console.log(req.body);
    // contacts.push(req.body);
    Contact.create(req.body, 
        (err,newContact)=>{
        if(err){
            return console.log('Error in creating the Contact!');
        }
        else{
            console.log('Contact Created', newContact);
            return res.redirect('back');
        }
    })
})

// app.get('/deleteContact/:mob',(req,res)=>{
//     console.log(req.params.mob)
//     let mob =req.params.mob;
// })

app.get('/deleteContact/',(req,res)=>{
    console.log(req.query.mob)
    let id =req.query.id;

    // let contactIndex = contacts.findIndex(contact => contact.mob==mob);
    Contact.findByIdAndDelete(id,(err)=>{
        if(err){
           return console.log('Error in Deleting the Contact in db', err);
        }
        return res.redirect('back');
    });
})

app.get('/play',(req,res)=>{

    return res.render('play',{
        title:"Play with EJS"
    });

});


app.listen(port,(err)=>{

    if(err){
        return console.log('Error running the Server:', err);
    }
    
    else{
        return console.log('Server is running on Port', port);
    }

});