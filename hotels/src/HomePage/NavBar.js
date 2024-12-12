import { Fragment,useRef,useEffect } from "react";
import gsap from "gsap";
import { useAuthContext } from "../Context&Reducer/Context";
import { useNavigate } from "react-router-dom";
import HotelBookingDates from "../DatePicker/HotelBooking";
import SplitText from "gsap-trial/SplitText";

gsap.registerPlugin(SplitText);
const NavBarPage = () =>{
    const {dispatch,isverify} = useAuthContext();
    const com = useRef();
    const navigate = useNavigate();

 
    const slideMenu = () =>{
        dispatch({
            type:"Animation",
            payload:0
        })
    }
    useEffect(()=>{
        const ctx = gsap.context(()=>{
            
            var split1 = new SplitText("#name1",{type:"chars",charsClass:"size1"});
            var split2 = new SplitText("#name2",{type:"chars",charsClass:"size2"})
            let tl = gsap.timeline();
            
            tl.from(split1.chars,{duration:0.4,opacity:0,y:30,stagger:0.3,ease:"back.inOut"})
            tl.from(split2.chars,{duration:0.4,opacity:0,y:30,stagger:-0.3,ease:"back.inOut"},0)
           
        
        },com)

        return () => ctx.revert();
       
    },[])
    const logoutuser = () => {
        dispatch({
            type:"Clear_Signup_Data",
            payload:""
        })
        dispatch({
            type:"Clear_Login_Data",
            payload:""
        })
        dispatch({
            type:"Set_User",
            payload:false
        })
        localStorage.removeItem("idToken");
    }
    
    return (
        <Fragment>
             <nav ref={com} className="p-6 flex justify-between  items-center" >
                    <div onClick={() => navigate("./",{replace:true}) } className=" cursor-pointer flex gap-3 items-center overflow-hidden h-10 " >
                        <h1 id="name1" className="overflow-y-hidden   "  >Skyline</h1>
                        <h1 id="name2" className="overflow-y-hidden mt-2  ">Suites</h1>
                    </div>
                   
                    <div className=" w-[40em] mr-10 flex h-fit items-center  justify-center gap-3 " >
                        <i className="ri-calendar-2-line mb-3 "></i> <HotelBookingDates   />
                    </div>
                   {
                        !isverify ?  (<i onClick={()=>{
                            slideMenu()
                        }}  className="ri-menu-3-line cursor-pointer"></i>) : (<div className="flex flex-col items-center hover:scale-110 hover:shadow-lg cursor-pointer rounded-md  " >
                            <i onClick={logoutuser} class="ri-user-received-fill  text-2xl  cursor-pointer"></i>
                            
                        </div>)
                   }
                </nav>
                
               
        </Fragment>
    )
}

export default NavBarPage;