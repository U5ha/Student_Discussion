const express = require("express");
const app = express();
const path = require('path');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/HACK_NOV', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

//define mongoose schema
const signupSchema = new mongoose.Schema({
    email: String,
    psw: String,
    psw_repeat: String
  });

  const Signups = mongoose.model('Signups', signupSchema);

//EXPRESS RELATED STUFF
app.use(express.urlencoded());

//PUG RELATED STUFF
app.set('view engine', 'pug');  //setting template engine as pug
app.set('views', path.join(__dirname, 'views'));  //setting views directory

//ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('index.pug');
});

app.get('/signup', (req, res) => {
        res.status(200).render('signup.pug');
    });

app.post('/signup', (req, res) => {
    var myData = new Signups(req.body);
    myData.save().then(()=>{
        res.send("You have successfully registered");
    }).catch(()=>{
        res.status(400).send("Item was not saved")
    });
    //res.status(200).render('signup.pug');
    });

app.get('/login', (req, res) => {
        res.status(200).render('login.pug');
    });

app.get('/FLIP', (req, res) => {
        res.status(200).render('FLIP.pug');
});

app.post('/login', async(req, res) => {
        try {

            const email = req.body.email;
            const password = req.body.psw;

            const userEmail = await Signups.findOne({email : email});
            // res.send(userEmail.psw_repeat);
            if(userEmail.psw === password) {
                res.status(201).render("FLIP");
            }
            else {
                res.send("Password Incorrect");
            }
            
        } catch (error) {
            res.status(400).send("Invalid Credentials");
        }
        //res.status(200).render('login.pug');
    });

app.get('/index', (req, res) => {
        res.status(202).render('index.html');
    });

app.get('/contact', (req, res) => {
        res.status(200).render('contact.pug');
});


//start server
app.listen(port , ()=> {
        console.log(`The application is running on port number : ${port}`);
    });