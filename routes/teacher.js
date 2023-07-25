const express= require('express');
const expressLayouts = require('express-ejs-layouts')
const router=express.Router();
const student = require("../models/student")
var flag = false;
router.use(express.static('./public'))
router.use(expressLayouts)


router.post('/createsession', async (req,res) =>{


    if(req.body.email=="admin@123" && req.body.pwd=="admin"){
       
        res.cookie('admin','true');
        const students = await student.find();
      res.render('student_list',{loggedin:'true',students});
    }
   
    else{

        res.render('loginas',{loggedin:'false'});
    }

})

router.get("/students",async (req,res)=>{

  if(req.cookies.admin == 'true'){
   res.redirect('/teacher/students')
  }
  else{
    res.render('loginas',{loggedin: 'false'})
  }
})

router.get('/addrecord',(req,res)=>{
  if(req.cookies.admin=='true'){
    res.render('add_record',{loggedin:'true'});
  }
  else{
    res.redirect('back');
  }
})



router.get('/login', (req, res) => {

    let flag='false';
    if(req.cookies.admin=='true'){
      flag='true';
    }

    res.render('teacher_login',{loggedin:flag});
});

//add student record
router.post("/create", async (req,res)=>{
  try{
      const stud= await student.create(req.body)
      res.redirect("/teacher/students")
  }catch(err){
      res.json({ error : "Failed to add student"})
  }
});

//update a student

router.put("/:id", (req,res)=>{

  const { id } = req.params

  student.findByIdAndUpdate( id, req.body , { new : true})
  .then((student)=>{
      if(!student){
          res.status(500).json({ error: 'Student not found' })
      }
      res.json(student)
  })
  .catch((err)=>{
      res.status(500).json({ error : "failed to update student"})
  })
});

//delete a student

router.get("/delete/:id",  (req,res)=>{

  const { id } = req.params

  student.findByIdAndRemove(id)
  .then(async (student)=>{
      if(!student){
          res.status(500).json({error : "Student Not Found"})
      }
      res.redirect("/teacher/students")
  })
  .catch((err)=>{
      res.status(500).json({error : "Failed to delete student"})
  })
});



module.exports= router;