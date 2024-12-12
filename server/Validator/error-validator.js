const z = require("zod");

const validation_signup = z.object({
    username:z.string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"name must be above 3 words"}),

    email:z.string({required_error:"Email is required"})
    .trim()
    .email({message:"Enter Correct Email"}),


    password:z.string({required_error:"Password required"})
    .trim()
    .min(8,{message:"Password must be 8 character include special character"})


})
const validation_login = z.object({
    email:z.string({required_error:"invalid"})
    .trim()
    .email({message:"invalid email"}),
    password:z.string({required_error:"invalid password"})
    .trim()
})




module.exports = {validation_signup,validation_login};