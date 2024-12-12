import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../Context&Reducer/Context";
import CheckoutPage from "./CheckOut";
const DescriptionPage = () =>{
    let [singlehotel,setsinglehotel] = useState([]);
    let {hotels} = useAuthContext();
    const {state} = useLocation();
    useEffect(() =>{
        let tempList = hotels.filter(elem => elem.id === state.id);
        setsinglehotel(tempList);
      
    },[hotels,state.id])
    
    return(
        <Fragment>
            <main className="bg-slate-200" >
                {
                    singlehotel && singlehotel.length > 0 && singlehotel.map(data => <div className="mt-4"  key={data.id}  >
                        {/* Image Container */}
                        <div className=" shadow-2xl bg-white  shadow-white w-[99vw] max-h-[25rem] overflow-hidden  " >
                            <section className="grid   gap-2 border rounded-xl overflow-hidden grid-cols-2 p-2" >
                                <div className="overflow-hidden" > 
                                <img className="w-full max-h-[24rem] transform transition-all duration-250  h-full hover:scale-105 p-2 " src={data.imageArr[1]}  alt="noImage"  ></img>
                                </div>
                                <div className="grid rounded-md max-h-[24rem] gap-2 p-2 " >
                                    <div className="flex gap-3  max-h-[12rem] overflow-hidden" >
                                        <img className="rounded-md w-[20rem]  transition-all duration-250 hover:scale-105" src={data.imageArr[0]} alt={"NoImage"}    ></img>
                                        <img className="rounded-md w-[20rem] hover:scale-105 transition-all duration-250" src={data.imageArr[2]} alt="noImage"    ></img>
                                    </div>
                                    <img className=" max-h-[12rem] col-span-2 hover:scale-105 transition-all duration-250 rounded-xl w-full h-[14rem] bg-cover bg-center" alt="noImage" src={data.imageArr[3]}    ></img>
                                </div>
                            </section>
                        </div>
                        {/* Hotels Details like Host Name */}
                        <section className=" flex  rounded-lg justify-center p-1 mt-3   w-[99vw] " >
                                <div className="  bg-white  shadow-xl " >
                                    <div className="flex   flex-col w-[95vw] border-b-4 p-4 m-3" >
                                        <span className="p-2" >Hosted By: {data.hostName}</span>
                                        <span>{data.numberOfguest} Guest,  {data.numberOfBedrooms} Bedroom,  {data.numberOfBeds} Beds,  {data.numberOfBathrooms} Bathrooms</span>
                                    </div>
                                </div>
                        </section>
                        {/* Some Benefits */}
                        <section className=" rounded-lg bg-white mt-5 m-4  p-5 " >
                            
                            <div className="flex m-3 gap-5  " >
                                 <i class="ri-list-radio"></i>
                                <span>Dedicated WorkShop</span>
                            </div>
                            <span className="m-10 " > {data.ameneties.includes("Wifi") ? "A common area with wifi well suited for working" : "A common area with comfort and well suited for fun" } </span>
                    
                            
                            <div className="flex gap-5  m-3" >
                                 <i class="ri-list-radio"></i>
                                <span>Great Location</span>
                            </div>
                            <span className="m-9" >80% of recent guest gave the rating</span>
                            <span className="text-yellow-400 text-2xl">
                              {"★".repeat(data.rating)}{" "}
                                <span className="text-gray-400"> {"☆".repeat(5 - data.rating)}</span>
                            </span>
                            <div className="flex gap-5 m-3  " >
                            
                                <i class="ri-list-radio"></i>
                                <span> {data.isCancelable ? "Free Cancelation within 24hours before Checkin" :"Cancelation Charge will be 20% " }   </span>
                        
                            </div>
                            <div className="border-b-4 mt-5" ></div>
                        </section>
                        {/* Which benefits Provide  */}
                        <div className=" rounded-lg p-4 border-b-4 m-4 bg-white mt-3 " >
                            <span className="p-3 " >What Place Offers</span>
                            <ul className="grid grid-cols-2 m-3  " >
                                {
                                    data.ameneties.map(elem => <li key={elem} className=" flex" >
                                       <i class="ri-arrow-right-s-fill"></i> {elem}
                                    </li>)
                                    
                                }
                            </ul>
                            <span className=" p-3" >Extra Details</span>
                            <ul className="grid grid-cols-2 m-3" >
                                {
                                    data.healthAndSafety.map(elem =><li  key={elem} className="flex" >
                                    <i class="ri-arrow-right-s-fill"></i> {elem}
                                    </li>)

                                }  
                            </ul>
                        </div>
                        {/* Book Hotels Form Tag */}
                    </div>          
                )
                }

                {
                    singlehotel?.length > 0 && <CheckoutPage prop={singlehotel} key={singlehotel[0].id} />  
                }
            </main>
        </Fragment>
    );
}

export default DescriptionPage;