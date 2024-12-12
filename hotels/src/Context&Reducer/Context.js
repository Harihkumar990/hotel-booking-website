import { useContext,createContext, useReducer, useEffect} from "react";
import browserreducer from "./Reducer";
import axios from "axios";
import gsap from "gsap";
const initialvalue = {
    islogin:false,
    hotels:[],
    filterhotels:"",
    timeline: gsap.timeline({paused:true}),
    checkin:"",
    checkout:"",
    listhotel:[],
    login:{email:"",password:""},
    signup:{username:"",email:"",password:"",number:""},
    isverify:false,
    idToken:localStorage.getItem("idToken"),
    area:[],
    numberofbeds:"",
    guestdetails:{firstname:"",lastname:"",phone:"",email:""}
}


const AuthContext = createContext(initialvalue);

const AuthProvider = ({children}) =>{

    const [{guestdetails,area,idToken,checkin,listhotel,filterhotels,checkout,timeline,islogin,hotels,login,signup,isverify},dispatch] = useReducer(browserreducer,initialvalue);
    
    useEffect(() => {
        const gethotel = async () =>{
            try {
                const {data} =  await axios.get("http://localhost:5000/server/hotels")
                dispatch({
                    type:"HotelsList",
                    payload:data.msg
                })
                dispatch({
                    type:"Filter_hotels",
                    payload:data.msg
                })
            } catch (error) {
                console.log("someting wrong to fetch hotels data")
            }
        }
        gethotel();
    },[])
    useEffect(()=> {
        const getlisthotel = async () => {
            try {
                const {data} = await axios.post("http://localhost:5000/server/HotelCategory")
                
                dispatch({
                    type:"Set-Hotel_List",
                    payload:data
                })
            } catch (error) {
                console.log("error to extract  list of hotel")
            }
        }
        getlisthotel();

    },[])

    useEffect(()=>{
        const checkUser = async () => {
           
            try {
                const response = await axios.get("http://localhost:5000/user/User",{
                    headers:{
                        "Authorization":`${idToken}`
                    }
                });
                if(response.status === 201) {
                    
                    dispatch({
                        type:"Set_User",
                        payload:true
                    })
                    
                } else {
                    alert("Error to Verify User")
                }
            } catch (error) {   
                localStorage.removeItem("idToken");
            }

        }
        if(idToken?.length) {
            checkUser();
        }
        
    },[idToken])

    return(
        <AuthContext.Provider value ={{ guestdetails,area,idToken,checkin,filterhotels,listhotel,checkout,timeline,hotels,islogin,login,signup,isverify, dispatch}} >
            {children}
        </AuthContext.Provider>
    )

}

const useAuthContext = () =>{
    const useHook = useContext(AuthContext);
    if(!useHook){
        alert("Server Error")
    }
    return useHook;
}

export {useAuthContext,AuthProvider}

