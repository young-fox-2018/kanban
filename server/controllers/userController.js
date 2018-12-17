const User = require('../models/user.js'),
      mailer = require('../helpers/mailer.js'),
      jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {
  static checkUser(req, res){
    User.findOne({_id: req.decoded.id})
        .then(user => {
          if (user.role === 'administrator'){
            res.status(200).json('User authorized')
          } else {
            res.status(500).json('User unauthorize')
          }    
        })
	      .catch(error => {res.status(500).json(error.message)})
  }

  static read(req, res){
    User.findById(req.decoded.id)
        .then(user => {res.status(200).json(user)})
	.catch(error => {res.status(500).json({"error":error.message})})
  }

  static create(req, res){
    User.findOne({email: req.body.email})
        .then( user => {
        if (user){
            res.status(500).json("Email is already exist!")
        }
        else {
          let randomPassword = Math.random().toString(36).slice(-8);
          let user = new User({
              username: req.body.username,
              email: req.body.email,
              password: randomPassword,
              role: req.body.role || 'notAdmin'
          })
          user.save( (err, data) => {
              if (err) {
                  console.log(err)
                  res.status(401).json(err.message)
              }
              else {
                  let subject = `Your teamkanvan information`
                  let resultText = `Your teamkanvan password is ${randomPassword} , please change your password for your account securly..`
                  mailer ( data.email, subject, resultText, (err ) => {
                      if ( err) {
                          console.log(err)
                          res.status(500).json({'found error':err})
                      }
                      else res.status(200).json( "User restration sucess" )
                  })
              }
          })
        };
	  })
	  .catch( error => {
	    console.log(error)
	    res.status(500).json(error.message)
	  });
  }
	
  static login(req, res){
    User.findOne({email:req.body.email})
      .then(user => {
        user.comparePassword(req.body.password, (err, isMatch)=>{
          console.log(user)
          if (err) res.status(500).json({error:"email or password didn't match, please try again!"})
          else{
            if (isMatch){
              let data = {
                id: user._id, 
                email: user.email
              }
              jwt.sign(data, process.env.jSecret,(err, jtoken)=>{
                if(err) {
                  console.log(err)
                  res.status(500).json("Something wrong, please contact developer!")
                } else {
                  res.status(200).json(jtoken)
                }
              });
            } else {
              res.status(500).json("email or password didn't match, please try again!")
            };
          };
        });
      })
      .catch(error => {
	      console.log(error)
        res.status(500).json("email or password didn't match, please try again!")
      })
  }

  static update(req, res){
    User.findOne({_id:req.decode.id})
        .then(user => {
	  user.comparePassword(req.body.passwordLast,(err, isMatch)=>{
	    if (err){
              console.log(err)
              res.status(500).json({error:"Something wrong, please contact developer!"})
            } else {
	      if (isMatch){
	        user.password = req.body.passwordNew
		      user.save().then( result => {
		              res.status(200).json(result)
		            })
		           .catch( error => {
                    res.status(500).json({error:"Something wrong, please contact developer!"})
                })
                } else {
                  res.status(500).json({error:"email or password didn't match, please try again!"})
                }
            }; 
	  })})
  }

  static delete(req, res){
    User.deleteOne({_id:req.decode.id})
	.then(result => {
	  res.status(200).json(result)
	})
	.catch(error => {
	  res.status(500).json({error:"email or password didn't match, please try again!"})
	})
  }

};

module.exports = UserController;
