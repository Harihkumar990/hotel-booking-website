const MiddleWare = (validation) => async(req,res,next) =>{
    try {
        const parseBody = await validation.parseAsync(req.body);
        req.body = parseBody;
        next()
    } catch (err) {
        const error = {
            message:"sorry",
            status:450
        }
        console.log(err);
               
   }
};

module.exports = MiddleWare;