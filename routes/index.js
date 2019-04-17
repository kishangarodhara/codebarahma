var express = require('express');
var router = express.Router();

const db= require("./db");
const collection ="news"  
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WELCOME TO APPLICATION' });
});

/* connection to database*/
router.get('/connect', function(res,res) {
   
  db.connect((err)=>{
    if(err){
      console.log("unable to connect to the database");
      process.exit(1);
    }
    else{
      console.log("connection successfully")
    }
  })
  
});

/*search api search on index */
router.get('/search', function(req, res, next) {
//  var data=req.body.data;
  db.getDB().collection(collection).find({ $text: {$search:req.body.data}}).toArray((err,documents)=>{
    if(err)
      console.log(err);
    else
      res.json(documents);
  })
});

/* router to view collections */
  router.get('/collections',(req,res)=>{
  db.getDB().collection(collection).find({}).toArray((err,documents)=>{
   if(err)
      console.log(err);
  else{
    res.json(documents);
  }  
  });  
});



module.exports = router;