import { Fragment, useEffect, useState } from "react";
import HotelBookingDates from "../DatePicker/HotelBooking";
import { useAuthContext } from "../Context&Reducer/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CheckoutPage = ({prop}) => {
    let navigate = useNavigate();
    let {checkin, checkout,isverify,guestdetails,dispatch} = useAuthContext();
    let [Checkin,setCheckin] = useState({month:"",date:"",year:""});
    let [Checkout,setCheckout] = useState({month:"",date:"",year:""});
    let [nights, setnights]  = useState(0);

    useEffect(()=>{
        
        if(checkin) {
            
            setCheckin({
                month:checkin.toLocaleString('en-EN', { month: "long" }),
                date:checkin.toLocaleString("en-US", { day: "2-digit" }),
                year:checkin.getFullYear()
            })
        }
        if(checkout ) {
            
            setCheckout({
                month:checkout.toLocaleString('en-EN', { month: "long" }),
                date:checkout.toLocaleString("en-US", { day: "2-digit" }),
                year:checkout.getFullYear()
            })
        }
        if(checkin && checkout) {
            let diff = checkout.getTime() - checkin.getTime();
            setnights(Math.round(diff / (1000 * 3600 * 24)));
        }
        
    },[checkin,checkout])
    const submit = async (data) =>{
        try {
            let response = await axios.post("http://localhost:5000/user/orders/confirm",data);
            if(response.status == 200) {
                alert("Successfull Reserve");
                dispatch({
                    type:"Empty",
                    payload:""
                })
                setnights(0);
                navigate("/",{replace:true});
                

            }
        } catch (error) {
            console.log("erro to submit")
        } 
    }
    const orderconfirm = () =>{
        if(!isverify || nights === 0) {
            alert("Login First");
        } else {
            let bed = prop[0].numberOfBeds;
            let senddata = {hotelid:prop[0].id,name:guestdetails.firstname + guestdetails.lastname,email:guestdetails.email,city:prop[0].city,category:prop[0].category,numberOfBeds:bed,totalnights:nights,price:nights*prop[0].price}
            submit(senddata);
        }
        


    }
    const handleuserinput = (e) =>{
        dispatch({
            type:"Set_Guest_Detail",
            payload:[e.target.name,e.target.value]
        })
    }
    return (
        
        <Fragment>
            <ToastContainer/>
            <div className="text-center  " >
                <span className="" >Check-In & Check-Out</span>
                <div className="flex justify-center w-[99vw]" >
                    <HotelBookingDates/>
                </div>
            </div>
                            
                    <div className=" flex justify-center">
                        <div className="w-[100vw] bg-white rounded-lg shadow-lg p-8 space-y-8">
                        {/* Page Title */}
                        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
                
                        {/* Booking Details Section */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">Booking Details</h2>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                            <img
                                src={prop[0].imageArr[0]}
                                alt="Hotel"
                                className="w-32 h-32 rounded-lg object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{prop[0].name}</h3>
                                <p className="text-sm text-gray-600">
                                {prop[0].address}
                                </p>
                                <p className="text-sm text-gray-600">Check-in: {Checkin.month} {Checkin.date}, {Checkin.year}</p>
                                <p className="text-sm text-gray-600">Check-out: {Checkout.month} {Checkout.date}, {Checkout.year}</p>
                                <p className="text-sm text-gray-600">Guests: 2 Adults</p>
                            </div>
                            </div>
                        </div>
                
                        {/* Guest Information Section */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">Guest Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                onChange={handleuserinput}
                                value={guestdetails.firstname}
                                name="firstname"
                                type="text"
                                placeholder="First Name"
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                            />
                            <input
                                onChange={handleuserinput}
                                value={guestdetails.lastname}
                                name="lastname"
                                type="text"
                                placeholder="Last Name"
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                            />
                            <input
                                onChange={handleuserinput}
                                value={guestdetails.email}
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                            />
                            <input
                                onChange={handleuserinput}
                                value={guestdetails.phone}
                                name="phone"
                                type="tel"
                                placeholder="Phone Number"
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                            />
                            </div>
                        </div>
                
                        {/* Payment Section */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">Payment</h2>
                            <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="payment" className="accent-indigo-500" />
                                <span>Credit/Debit Card</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="payment" className="accent-indigo-500" />
                                <span>PayPal</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="payment" className="accent-indigo-500" />
                                <span>UPI</span>
                            </label>
                            </div>
                        </div>
                
                        {/* Order Summary */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
                            <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                            <div className="flex justify-between text-gray-800">
                                <span>Price per night</span>
                                <span>₹ {prop[0].price}</span>
                            </div>
                            <div className="flex justify-between text-gray-800">
                                
                                <span>Total nights</span>
                               <div className="flex  items-center gap-6" >
                                    <span>{nights}</span>
                                    
                               </div>
                            </div>
                            <div className="flex justify-between text-gray-800 font-bold">
                                <span>Total</span>
                                <span>₹{nights * prop[0].price}</span>
                            </div>
                            </div>
                        </div>
                
                        {/* Confirm Button */}
                        <div className="text-center">
                            <button  onClick={orderconfirm} className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 transition">
                            Confirm Booking
                            </button>
                        </div>
                        </div>
                    </div>
        </Fragment>
    );
  };
  
  export default CheckoutPage;