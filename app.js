const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DanzikContact', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;


//MONGOOSE SPECIFIC STUFF
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  const Contact = mongoose.model('contact', contactSchema); //'contact' collection_name=contacts,plural

// EXPRESS SPECIFIC STUFF
app.use("/static",express.static('static')); // For serving static files
app.use(express.urlencoded());

// ENDPOINTS
app.get("/",(req,res)=>{
    res.status(200).render('home.pug');
});
app.get("/contact",(req,res)=>{
    res.status(200).render('contact.pug');
});
app.post("/contact",(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.status(200).render('contact.pug');
        // res.send("Data has been saved on database successfully");
    }).catch(()=>{
        res.status(400).send("Not Saved");
    })
    // res.status(200).render('contact.pug');
});
app.get("/class",(req,res)=>{
    res.status(200).render('class.pug');
});

//START THE SERVER
app.listen(port,()=>{
    console.log(`The application is started successfully on port ${port}`);
});
