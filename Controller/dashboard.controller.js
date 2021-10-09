const db = require('../Dbconnector/sqlite-connector')
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch")
const multer = require("multer")
const path = require("path");
const { user } = require('../Dbconnector/sqlite-connector');

//SignUp Controller
async function main(req,res,next) {
  // Database query

  let userinfo;
  console.log(req.user)
  try {

  const user = await db.user.findOne({where:{id: req.user._id}});

  userinfo = user;

  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }


  const userinfo2 = {name: userinfo.dataValues.name, email: userinfo.dataValues.email}
  console.log(userinfo2)

  res.render("index", userinfo2)
    
  }
  
//Login Controller
async function login(req,res,next){
    res.render("login")
  }

//Logout
async function logout(req,res,next){
  res.clearCookie('token');
  res.redirect('/');
}

async function login_form(req,res,next){

    const username = req.body.email
    const password = req.body.password
  
    const response = await fetch('http://127.0.0.1:8000/account/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'email': username,
        'password': password
      })
    })
    console.log(response.status)
    if (response.status == "400") {
      next()
    }
    else {
    //...
    // Extract the JWT from the response
    const jwt_token =await  response.headers.get('auth-token')

    res.cookie('token', jwt_token)

    res.redirect('/');
  }

}

  
  
async function contracts(req,res,next){
    res.render("parts/contracts")
  }

  var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        cb(null, "uploads") 
    }, 
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + "-" + Date.now()+".jpg") 
    } 
  }) 
       
  // Define the maximum size for uploading 
  // picture i.e. 1 MB. it is optional 
  const maxSize = 1 * 1000 * 1000; 
    
  var upload = multer({  
    storage: storage, 
    limits: { fileSize: maxSize }, 
    fileFilter: function (req, file, cb){ 
    
        // Set the filetypes, it is optional 
        var filetypes = /jpeg|jpg|png/; 
        var mimetype = filetypes.test(file.mimetype); 
  
        var extname = filetypes.test(path.extname( 
                    file.originalname).toLowerCase()); 
        
        if (mimetype && extname) { 
            return cb(null, true); 
        } 
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes); 
      }  
  
  // mypic is the name of file attribute 
  }).single("mypic");        

  async function uploadFile (req, res, next) { 
        
    // Error MiddleWare for multer file upload, so if any 
    // error occurs, the image would not be uploaded! 
    upload(req,res,function(err) { 
  
        if(err) { 
  
            // ERROR occured (here it can be occured due 
            // to uploading image of size greater than 
            // 1MB or uploading different file type) 
            res.send(err) 
        } 
        else { 
  
            // SUCCESS, image successfully uploaded 
            res.render("parts/successload")
        } 
    }) 
  }

  module.exports = {
    main,
    login,
    logout,
    contracts,
    login_form,
    uploadFile,
  }