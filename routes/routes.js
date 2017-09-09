/*jshint esversion:6*/
module.exports = function(app, passport){
  app.get('/',(req,res)=>{
    res.render('index.ejs');
  });

  app.get('/login',(req,res)=>{
    res.render('login.ejs',{message : req.flash('loginMessage')});
  });

  // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

  app.get('/register',(req,res)=>{
    res.render('register.ejs',{message : req.flash('registerMessage')});
  });

    // process the register form
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the register page if there is an error
        failureFlash : true // allow flash messages
    }));

  app.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profile.ejs',{user: req.users});
  });

/* --------Can also be done like this-----------------
app.get('/profile',
      function isLoggedIn (req,res,next){
        if (isAuthenticated()) {
          return next;
        }
        res.redirect('/');
      }
      ,(req,res)=>{
    res.render('profile.ejs',{user: req.users});
  });
--------------------------------------------------------*/

  app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn (req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
