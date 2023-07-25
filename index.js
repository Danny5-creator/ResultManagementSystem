const express = require('express')
const app = express()
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts')
const teacherRoutes =require('./routes/teacher')
const studentRoutes=require('./routes/student')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
require("dotenv").config()

app.use(cookieParser())

app.use(express.urlencoded({ extended: false }));

app.use('/teacher',teacherRoutes);
app.use('/student',studentRoutes);









app.use(express.static('./public'))
app.use(expressLayouts)

app.set('view engine', 'ejs');

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.get('/', async (req, res) => {

  let flag='false';
  if(req.cookies.admin=='true'){
    flag='true';
    let students = await student.find()
    res.render('student_list',{loggedin:flag,students});
  }
  else{
    res.render('loginas',{loggedin:flag,});
  }


 
})

app.get('/logout',(req,res)=>{
 
  if(req.cookies.admin=='true'){
    res.clearCookie('admin');
    res.render('loginas',{loggedin:'false'});
  }

  else{
   
    res.redirect('back');
  }


})


//Database connection


mongoose.connect(process.env.DB_CONNECTION_URL)
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));




app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})