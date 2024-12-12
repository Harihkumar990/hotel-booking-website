import { Fragment, useEffect } from "react";
import gsap from "gsap";
import HotelsList from "./HomeList";
import { useAuthContext } from "../Context&Reducer/Context";
import {v4 as uuidv4} from "uuid";
import SubNavBarPage from "./SubnavBar";



let FirstPage = () =>{
   
  
    let {filterhotels} = useAuthContext();
    
    useEffect(()=>{
        let tl = gsap.timeline();
        gsap.registerEffect({
            name:"slide",
            extendTimeline:true,
            effect:(target)=>{
                tl.to(target,{opacity:0,delay:5,duration:10,repeat:-1,yoyo:true,repeatDelay:30,ease:"power3.inOut"});
            }
        })
        tl.slide("#p1");
        tl.slide("#p2");
        tl.slide("#p3");
        tl.slide("#p4");
    },[])
    
   
    return (
        <Fragment>
            <SubNavBarPage/>
            <main  className="relative z-5  "  >
                <div   className="flex border-b-4 h-[22rem] mt-2   w-max border    " >
                    <div  id="p1" className="w-[100vw] h-[20rem]  absolute z-30 bg-center bg-cover bg-no-repeat " style={{backgroundImage:"url('./Slider-Image/p-1.jpg')"}}  ></div>
                    <div id="p2" className="w-[100vw] h-[20rem] absolute z-20  bg-center bg-cover bg-no-repeat " style={{backgroundImage:"url('./Slider-Image/p-2.jpg')"}} ></div>
                    <div  id="p3" className="w-[100vw] h-[20rem] absolute z-10 bg-center bg-cover bg-no-repeat " style={{backgroundImage:"url('./Slider-Image/p-3.jpg')"}} ></div>
                    <div id="p4" className="w-[100vw] h-[20rem] absolute z-5 bg-center bg-cover bg-no-repeat " style={{backgroundImage:"url('./Slider-Image/p-4.jpg')"}} ></div>
                    
                    
                </div>
               
            </main>

            {/* HotelJSx */}
            <div  className="grid grid-cols-3 justify-items-center relative gap-5 mt-7  " >
                {
                    filterhotels && filterhotels.length > 0 ? filterhotels.map(elem => <HotelsList key={uuidv4()} prop={elem}   />)  : <Fragment/>  
                }
            </div>
          
        </Fragment>
    );
    
}

export default FirstPage;