const UserSchema = require("../Schemas/UserSchemas");

const SignupControl = async (req,res,next) =>{
    try {
                
            const {username,email,phonenumber,password} = req.body;

            const isUserExist = await UserSchema.SignupModel.find({email:email})


           
            if(isUserExist?.length>0){
               const error = {
                message:"Email Exist please login"
               }
               next(error)
            }
            
            
            
           

  
            const NewUserData = await UserSchema.SignupModel.create({username,email,phonenumber,password});
            return res.status(200).json({msg:"User Added",idToken:await NewUserData.genratejsonwebtoken(),ID:NewUserData._id.toString()});

           



    } catch (error) {
      next(error)
    }

}


const LoginUser = async (req,res,next) =>{

    try {
        const {email,password} = req.body
        
        const isUserExist = await UserSchema.SignupModel.find({email});
       
        if(isUserExist?.length<0){
            const error = {
                message:"Email is not exist please signup"
            }
            next(error)
        }
       
        const checkPassword = await isUserExist[0].ComparePassword(password)
        
        if(checkPassword){
            return res.status(200).json({msg:"login Successfull",idToken:await isUserExist[0].genratejsonwebtoken(),ID:isUserExist[0]._id.toString()})
        }

        const error = {
            message:"Email and Password is invalid"
        }

        next(error)
    } catch (error) {
        next(error)
    }
}

const User = async (req,res,next) =>{
    try {

        const userdata = req.user;

        if(!userdata){
            return res.status(500).json({msg:"User have to login again"});
        }
        return res.status(201).json({msg:"User Login"});

        
    } catch (err) {
        const error = {
            message:"User Have to Login Again"
        }
        next(error)
    }
}

const response = async (req,res) =>{
    try{
        res.status(200).json({msg:"Successfull"});
    }catch(err){
        console.log(err);
    }
}

module.exports = {SignupControl,LoginUser,User,response};
