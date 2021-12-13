import express from 'express';
import Register from './models/register.js';
import Event from './models/event.js';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
const port = process.env.PORT || 4000

async function ConnectDB() {

    if(mongoose.connections[0].readyState) {
        // already connected
        return;
    }
    await mongoose.connect("mongodb+srv://sapna:chhabi@cluster0.hwg2e.mongodb.net/eventdb?retryWrites=true&w=majority", {
        useNewUrlParser:true,
        // useCreateIndex:true,
        useUnifiedTopology:true,
        
    });
};
ConnectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
  

})


app.post('/register', async (req, res) => {
    try{
        let register = new Register({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
       
        await register.save();
        console.log(req.body)
        res.statusCode = 200;
        res.json({success: true});
    }
    catch(err){
        res.statusCode = 400;
        console.log(err);
        res.json({success: false, error: err});
    }
})

app.post('/login', async (req, res) => {
    try{
        let data = await Register.findOne({email:req.body.email}).exec();
        console.log(data,req.body.email);
        if(data){
            if(data.password === req.body.password){
                res.statusCode = 200;
                res.json({success: true});
            }
            else{
                res.statusCode = 400;
                res.json({success: false, error: "Wrong Password"});
            }
        }
        else{
            res.statusCode = 400;
            res.json({success: false, error: "no such account"});
        }
    }
    catch(err){
        res.statusCode = 400;
        console.log(err);
        res.json({success: false, error: err});
    }
})

app.post('/admin', async (req, res) => {
    try{
        let data = await Register.findOne({email: req.body.email}).exec();
        // console.log(data,req.body.email);

        if(data && data.email ==='sapnachhabi07@gmail.com'){
            res.statusCode = 200;
            res.json({success: true});
        }
        else{
            res.statusCode = 400;
            res.json({success: false, error: "no such account"});
        }
    }
    catch(err){
        res.statusCode = 400;
        console.log(err);
        res.json({success: false, error: err});
    }
})

app.post('/addevent', async (req, res) => {
    try{
        let event = new Event({
            name: req.body.eventname,
            email: req.body.email,
            organisation: req.body.organisation,
            link: req.body.link,
            description: req.body.description, 
            poster: req.body.poster
        });
        await event.save();
        Register.find({},(error,register ) => {
            console.log("users list");
            console.log(register);
            let userEmailsList = [];
            register.forEach(user=>{
                userEmailsList.push(user.email);
            });
            let commaSeparatedEmail = userEmailsList.toString();
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'sapnachhabi07@gmail.com',
                  pass: 'Chhabiii'
                }
              });
              
              let mailOptions = {
                from: 'sapnachhabi07@gmail.com',
                to: commaSeparatedEmail,
                subject: `Upcoming Event  ${event.name} ` ,
                text: 'join the event'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
    
        })
        console.log(req.body)
        res.statusCode = 200;
        res.json({success: true});
    }
    catch(err){
        res.statusCode = 400;
        console.log(err);
        res.json({success: false, error: err});
    }
})

app.get('/getevents', async (req, res) => {
    try{
        let data = [];
        data = await Event.find({}).exec();
        res.status(200);
        if(data){
            res.json({success: true,data:data});
        }
        else{
            res.json({success: true,data:[]});
        }
    }
    catch(err){
        res.status(400);
        console.log(err);
        res.json({success: false, error: err});
    }
})


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
