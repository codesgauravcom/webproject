const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true,useUnifiedTopology: true});

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String,
  });
const Contact = mongoose.model('contact', contactSchema);  


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('home.pug' );
});

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug' );
});

app.post('/contact',(req,res)=>{
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });

    });


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
