import { Fragment, useEffect, useRef, useState} from "react";
import gsap from "gsap";
import { v4 as uuid } from "uuid";
import { useAuthContext } from "../Context&Reducer/Context";

const SubNavBarPage = () =>{
    const scrollRef = useRef(null);
    let [modal,setmodal] = useState(gsap.timeline({paused:true}))
    let [statemodal,setstatemodal] = useState(gsap.timeline({paused:true}));
    let [rangevalue,setvalue] = useState(500);
    let {listhotel,dispatch,hotels,area} = useAuthContext();
    //Set State 
    useEffect(()=>{
        let tempState = hotels.map(elem => elem.state);
        let s = new Set(tempState);
        let a = [...s];

        dispatch({
            type:"Set_State",
            payload:a
        })
        
    },[hotels,dispatch])
    // Handle scroll functionality
    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: -200,
          behavior: "smooth",
        });
      }
    };
  
    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 200,
          behavior: "smooth",
        });
      }
    };
  
    
    useEffect(()=>{
        modal.to("#filter",{
            opacity:1,
            duration:1,
            zIndex:50,
            
            ease:"power4.out"
        },0)
        statemodal.to("#button",{opacity:0,duration:2})
        statemodal.to("#list",{opacity:1,duration:2},0)
        statemodal.to("#button",{visibility:"hidden"})
    },[modal,statemodal])
    const handlefilter = (id) =>{
       
        setmodal(id === 1 ? modal.play() : modal.reverse());
    }
    const handlefilterlist = (e) =>{
        let templist = hotels.filter(elem => e.target.dataset.id === elem.category);
        dispatch({
            type:"Filter_hotels",
            payload:templist
        })
    }
    const filteroff = () =>{
        dispatch({
            type:"Filter_hotels",
            payload:hotels
        })
        setvalue(500);
        
    }
    const hanlderange = (e) =>{
        setvalue(e.target.value);
        let tempHotel = hotels.filter(elem => e.target.value >= elem.price);
        dispatch({
            type:"Filter_hotels",
            payload:tempHotel
        })
        
    }
    
    const handlestateModel = (e) =>{
        setstatemodal(e === 0 ? statemodal.play() : statemodal.reverse());
       
    }
    const filterstate = (e) =>{
        let state = e.target.innerText;
        let templist = hotels.filter(elem => state === elem.state);
        dispatch({
            type:"Filter_hotels",
            payload:templist
        })
    }
    
    return (
        <Fragment>
             <div className="relative w-[99vw] flex check  bg-gray-100 py-3">
                    
                    <div className="flex items-center space-x-4">
                        {/* Left Scroll Button */}
                        
                        
                        
                        <i  onClick={scrollLeft} className=" cursor-pointer   text-gray-700 rounded-full p-2 focus:outline-none ri-expand-left-fill"></i>
                
                        {/* Scrollable List */}
                        <div
                        ref={scrollRef}
                        className="flex space-x-4 overflow-hiddenscrollbar-hide  scroll-smooth w-[85vw] px-4"
                        >
                        { listhotel && listhotel.length > 0 && listhotel.map((elem,index) => (
                            <div
                            key={index}
                            data-id = {elem.category}
                            onClick={(e)=>handlefilterlist(e)}
                            className="flex-shrink-0 cursor-pointer hover:bg-neutral-200 bg-white rounded-lg shadow-md p-1 text-center text-sm font-semibold w-40 border border-gray-300"
                            >
                            {elem.category}
                            </div>
                        ))}
                        </div>
                
                        {/* Right Scroll Button */}
                    
                        
                        <i  onClick={scrollRight} className=" cursor-pointer   text-gray-700 rounded-full p-2 focus:outline-none ri-expand-right-fill"></i>
                    </div>
                    <div className="mr-3  check  w-[5rem] h-fit gap-2 flex " >
                        <i onClick={() => handlefilter(1)} className=" cursor-pointer ri-filter-2-fill"></i>
                        <i onClick={filteroff} class="ri-filter-off-fill relative bottom-[1px]  cursor-pointer ri-filter-2-fill"></i>
                    </div>
                    
            </div>
            {/* Filter page */}
            <div id="filter" className="w-[20rem]  h-[20rem] right-3 top-18 backdrop-blur-md  bg-transparent   absolute opacity-0 " >
                <i onClick={() => handlefilter(0)} className="cursor-pointer ri-close-circle-fill  text-3xl text-white absolute right-4 top-2 "></i>
                {/* Filter By Price */}
                <div className="text-white mt-12 " >
                    <h1 className="text-center" >Filter By Price</h1>
                    <div className="ml-5 " >
                        <input  type="range" onChange={(e) => hanlderange(e)}   className=" inputrange border w-full custom-slider border-white" min={500} max={50000} value={rangevalue} />
                        <div className="flex  justify-between" >
                            <span>500</span>
                            <span>{rangevalue}</span>
                            <span>50000</span>
                        </div>
                    </div>
                    {/* Filter By State */}
                    <div className="text-center mt-5" >
                        <h3>Filter By State</h3>
                        <button id="button" onClick={() => handlestateModel(0)} className="mt-2 border pl-5 pr-5 rounded-md  hover:bg-white  hover:text-black   " >Click ! <i class="ri-filter-3-fill"></i></button>
                        <ul  id="list" className="flex opacity-0 flex-col check">
                        <i onClick={() => handlestateModel(1)} class="ri-close-circle-fill cursor-pointer "></i>
                            {
                                area.length > 0 ?  area.map(elem => <li onClick={(e) => filterstate(e)} key={uuid()} className="mt-3 hover:bg-white  hover:text-black  cursor-pointer border w-full rounded-md " >{elem} </li>) : <h2>No ELement</h2>
                            }
                        </ul>
                    </div>
                </div>
                
              
            </div>
        </Fragment>
    );
}

export default SubNavBarPage;