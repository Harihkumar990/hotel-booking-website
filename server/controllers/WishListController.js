const elem = require("../Schemas/wishlist");


const ItemAddinWishlist = async (req,res,next ) =>{
    try {
        const {email,wishlist} = req.body;
        const existUser = await elem.WishlistModel.find({email});
        let item = [...wishlist]
      
        if(existUser?.length>0){
            await elem.WishlistModel.updateOne({email:email},{$set:{wishlist:item}});
            return res.status(201).json({msg:"Add new item successfull"})
        }

        await elem.WishlistModel.create({email,wishlist});
        return res.status(201).json({msg:"Add Successfull"});
        
       


    } catch (error) {
        console.log(error);
    }

}

const DelteItemInWishlist = async (req,res) =>{
    try {
        const {email,id} = req.body;
        const ExistItem = await elem.WishlistModel.find({email:email});

        if(ExistItem[0].wishlist.length === 1){

            await elem.WishlistModel.deleteOne({email:email})
            return res.status(200).json({msg:"Delte All Wishlist"});
        }else{
            await elem.WishlistModel.updateOne({email:email},{$set:{wishlist:ExistItem[0].wishlist.filter(ID => ID !== id)}})
            return res.status(201).json({msg:"Wishlist Update"});
        }
        
        
        
        

        
            
        
       


    } catch (error) {
        console.log("true")
    }
}

const Orders = async (req,res) =>{
    try {
        const {hotelid,name,email,city,category,numberofBeds,totalnights,price} = req.body;
        
        await elem.OrdersConfirm.create({hotelid,name,email,city,category,numberofBeds,totalnights,isPayment:true,price});
        
        res.status(200).json({msg:"Order Confirem"});
    } catch (error) {
        res.status(500).json({msg:"Error to fetch orders"});
    }
}


module.exports = {ItemAddinWishlist,DelteItemInWishlist,Orders}