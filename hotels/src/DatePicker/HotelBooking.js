
import DatePicker from "react-datepicker";
import { useAuthContext } from "../Context&Reducer/Context";
import "react-datepicker/dist/react-datepicker.css";

const HotelBookingDates = () => {
  let {dispatch,checkin,checkout} = useAuthContext();
  
  const setCheckIn = (date) => {
   
        dispatch({
            type:"SetCheck-INDate",
            payload:date
        })
    }
    const setCheckOut = (date) => {
      
        dispatch({
            type:"SetCheck-OutDate",
            payload:date
        })
    }
     return( <>
        <div className="flex items-center gap-3  ">
      

      {/* Check-In Date Picker */}
      <div className="z-50">
       
        <DatePicker
          selected={checkin}
          onChange={(date) => setCheckIn(date)}
          selectsStart
          startDate={checkin}
          endDate={checkout}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none    focus:ring focus:ring-indigo-300"
          placeholderText="Select Check-In Date"
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Check-Out Date Picker */}
      <div className="z-50">
       
        <DatePicker
        
          selected={checkout}
          onChange={(date) => setCheckOut(date)}
          selectsEnd
          startDate={checkin}
          endDate={checkout}
          className="border  border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          placeholderText="Select Check-Out Date"
          minDate={checkin || new Date()}
          dateFormat="dd/MM/yyyy"
        />
      </div>

    </div>
    
    </>
  );
};

export default HotelBookingDates;
