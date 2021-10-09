const db = require('../Dbconnector/sqlite-connector')
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");


//SignUp Controller
async function signup(req,res,next) {

  const salt = await bycrypt.genSalt(10);
  hashpassword = await bycrypt.hash(req.body.password, salt)

  const emailExist = await db.user.findOne({where:{email: req.body.email}})
  if(emailExist){
     res.status(400).json({"error":'Email already Exist'}) 
  }

  const user =  new db.user({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword
  })
  try{
    const userSignup = await user.save()
    const payload = {
      user: {
        id: userSignup.id
      }
    };
    jwt.sign(payload,"anystring",{expiresIn: 10000},function(err, token)    
    {
      if(err){
        res.send(err)
      }
      res.status(200).json({
        token,
        userSignup
      })
    })
  } 
  catch(err){
    res.status(400).json({'error':err})
  }
}

//Login Controller
async function login(req,res,next){
  let emailExist
  try {
    emailExist = await db.user.findOne({where:{email: req.body.email}})
    if(!emailExist){
      res.status(400).json({error:"Email not Found"})
      throw new Error('Email not Found')
    }

  } catch (error) {
    console.log(error.message)
    return
  }

  const checkpassword = await bycrypt.compare(req.body.password, emailExist.password)
  if(!checkpassword){
    return res.status(400).json({error:"Password mismatch"})
  }
  const token = jwt.sign({_id: emailExist.id},'anystring')
  res.header('auth-token',token).json({'Token':token})
}

async function getCurrentUser(req,res){

  try {

    const user = await db.user.findOne({where:{id: req.user._id}});
    res.json(user);


  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}

module.exports = {
  signup,
  login,
  getCurrentUser,
}