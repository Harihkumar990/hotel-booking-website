import { useNavigate } from "react-router-dom";

const HotelsList = ({prop})  => {
    const navigate = useNavigate();
    const {image,country,state,city,rating,name,price,id} = prop;
   
    const Navigation = (e) => {
      
       navigate("/details",{
            replace:true,
            state:{id:e.target.dataset.key}
        }) 
    }

    
   
    return (
        <div id="hotel" className="max-w-sm w-[20em]   rounded-lg overflow-hidden shadow-lg bg-white  hover:shadow-2xl">
        {/* Image */}
        <img  data-key = {id}   onClick={(e) => Navigation(e)} className=" cursor-pointer w-full h-48 object-cover hover:scale-110 transform transition duration-300" src={image} alt={name} />
        
        {/* Card Body */}
        <div className="p-6">
          {/* Name */}
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
  
          {/* Location */}
          <p className="text-sm text-gray-600">
            {city}, {state}, {country}
          </p>
  
          {/* Rating */}
          <div className="flex items-center mt-2">
            <span className="text-yellow-400">
              {"★".repeat(rating)}{" "}
              <span className="text-gray-400">{"☆".repeat(5 - rating)}</span>
            </span>
            <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
          </div>
  
          {/* Price */}
          <div className="mt-4">
            <span className="text-xl font-bold text-indigo-500">₹{price}</span>
          </div>
        </div>
      </div>
    );
  };

export default HotelsList;