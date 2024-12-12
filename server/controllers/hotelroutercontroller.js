const hotels = require("../hotels");
const HotelSchema = require("../Schemas/hotelschema");
const Hotelcategory = require("../category");
const hotel =  async (req,res) =>{
    try {
        
        res.status(200).json({msg:hotels.data});
    } catch (error) {
        console.log(error);
    }
}


const HotelSendData  = async (req,res) =>{
    try {
        
        const HotelData = hotels.data;
        

        const HotelDataSend = await HotelSchema.HotelModel.create(HotelData);

        if(!HotelDataSend){

           return res.status(404).json({msg:"Erroor Not Send Data"})
        }

        return res.status(200).json({msg:HotelData});


    } catch (error) {
        console.log(error)
    }
}


const Category = async (req,res) =>{

    const Categories = Hotelcategory.data

    const SendCaegoryToDB = await HotelSchema.Category.insertMany(Categories);

    SendCaegoryToDB ? res.status(200).json(SendCaegoryToDB) : res.status(404).json({msg:"Category Not Send To DB"});


}


const SerachHotel =  async (req,res) => {
    const {id} = req.params;

    const searchbyid = await HotelSchema.HotelModel.find({_id:id});

    searchbyid ? res.status(200).json(searchbyid) : res.status(404).json({msg:"Hotel Not Found"});

}

module.exports = {hotel,HotelSendData,Category,SerachHotel};