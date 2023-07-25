const express= require('express');
const expressLayouts = require('express-ejs-layouts')
const router=express.Router();
const student = require("../models/student")
router.use(express.static('./public'))
router.use(expressLayouts)

router.post("/createsession",async (req,res)=>{
    
    const { rollno, dob} = req.body;

    try {
      const stud = await student.findOne({ rollno, dob });
  
      if (!stud) {
        return res.status(404).json({ error: 'Student not found' });
      }
       res.redirect('/result')
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch result' });
    }
})

router.get('/login', (req, res) => {

    res.render('student_login',{loggedin:false});
});

module.exports = router
