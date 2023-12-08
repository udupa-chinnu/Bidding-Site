var express = require('express');
var router = express.Router();
const usermodel = require('./users')
const LocalStrat = require('passport-local');
const passport = require('passport')
passport.use(new LocalStrat(usermodel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register' ,(req, res) => {
  res.render('register');
});

router.get('/login',(req,res) => {
  res.render('login')
})

router.get('/profile',(req,res) => {
  res.render('profile')
})


router.post('/register',(req, res) => {
  var user = new usermodel({
    username:req.body.username,
    password:req.body.password
  });

  usermodel.register(user,req.body.password)
  .then((function(regd){
    passport.authenticate('local')(req,res,function(){
      res,redirect('/profile')
    })
  }))
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:"/login"
}),function(req,res){});

module.exports = router;
