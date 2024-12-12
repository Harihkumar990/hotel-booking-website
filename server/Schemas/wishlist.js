const {Schema,model} = require("mongoose");


const WishlistSchema = new Schema({
    email:{type:String,require:true},
    wishlist:{type:Array,require:true}
})
const Orders = new Schema({
    hotelid:{type:String,require:true},
    name:{type:String,require:true},
    email:{type:String,require:true},
    city:{type:String,require:true},
    category:{type:String,require:true},
    numberofBeds:{type:Number,require:true},
    totalnights:{type:Number,requre:true},
    isPayment:{type:Boolean,require:true},
    price:{type:Number,require:true}
})
const WishlistModel = new model("wishlist",WishlistSchema);
const OrdersConfirm = new model("orders",Orders);
module.exports = {WishlistModel,OrdersConfirm};