import { Fragment, useEffect } from "react"
import { useAuthContext } from "../Context&Reducer/Context"
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sliderpage = () => {

    const {dispatch,islogin,timeline,login,signup} = useAuthContext();
    const slideMenu = () =>{
        dispatch({
            type:"Animation",
            payload:1
        })
    }
   
    useEffect(() =>{
        timeline.to("#slider",{
            transform:"translateX(0)",
            duration:"0.5",
            ease:"sine.out"
        })
    },[timeline])
    const handlelogin = (e)  =>{
        dispatch({
            type:"Login_Data",
            payload:[e.target.name,e.target.value]
        })
    }
    const handleSignupt = (e) => {
        dispatch({
            type:"Signup_Data",
            payload:[e.target.name,e.target.value]
        })
    }
    const submitlogin = async (e) =>{
       
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/user/Login",login);
            if(response.statusText === "OK") {
                toast(response.data.msg);
                
            } else {
                toast("Error to Login");
                return;
            }
            localStorage.setItem("idToken",response.data.idToken);
            dispatch({
                type:"Clear_Login_Data",
                payload:""
            })
            dispatch({
                type:"Animation",
                payload:1
            })
            
            dispatch({
                type:"Set_User",
                payload:""
            })
        } catch (error) {
            toast("error to login")
        }
    }
    const submitsignup = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/user/Signup",signup);
            if(response.statusText === "OK") {
                toast(response.data.msg);
             
            } else {
                toast("Error to Sign-Up");
                return;
            }
            
            localStorage.setItem("idToken",response.data.idToken);
            dispatch({
                type:"Clear_Signup_Data",
                payload:""
            })
            dispatch({
                type:"Animation",
                payload:1
            })
            
            dispatch({
                type:"Set_User",
                payload:""
            })
        } catch (error) {
            toast("error to signup")
        }
    }
    return(
        <Fragment>
            <ToastContainer/>
                <div id="slider" className="  translate-x-[100%] backdrop-blur-md w-[35rem] z-50 h-full absolute top-0 right-0  bg-transparent" >
                    
                <i  onClick={() => slideMenu(1)} className="cursor-pointer ri-close-circle-fill absolute right-3 top-4 text-3xl "></i>
                {
                    islogin ? <div>
                            <div className="flex items-center justify-center min-h-screen ">
                                <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                                    <h2 className="text-2xl font-bold text-center text-gray-700">
                                    Login to Your Account
                                    </h2>
                                    <form className="mt-8 space-y-4">
                                    <div>
                                        <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-600"
                                        >
                                        Email
                                        </label>
                                        <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={(e) => handlelogin(e)}
                                        value={login.email}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                        required
                                        />
                                    </div>
                                    <div>
                                        <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-600"
                                        >
                                        Password
                                        </label>
                                        <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={login.password}
                                        onChange={(e) => handlelogin(e)}
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                        required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 text-white z-50  bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
                                        onClick={(e) => submitlogin(e)}
                                    >
                                        Login
                                    </button>
                                    </form>
                                    <div className="text-sm text-center text-gray-600">
                                    Don't have an account?{" "}
                                        <button
                                        onClick={() => {
                                                
                                            dispatch({
                                                type:"IsLogin",
                                                payload:""
                                            }) 
                                        }}
                                        className="font-medium text-indigo-500 hover:underline" >Sign Up
                                        </button>
                                    </div>
                                </div>
                        </div>
                        
                        </div> : 
                                
                            <div   >  
                                    
                                    <div className="flex items-center justify-center min-h-screen   ">
                                    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                                        <h2 className="text-2xl font-bold text-center text-gray-700">
                                        Create an Account
                                        </h2>
                                        <form className="mt-8 space-y-4">
                                        <div>
                                            <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-600"
                                            >
                                            Full Name
                                            </label>
                                            <input
                                            type="text"
                                            id="name"
                                            name="username"
                                            value={signup.username}
                                            onChange={(e)=>handleSignupt(e)}
                                            placeholder="Enter your full name"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                            required
                                            />
                                        </div>
                                        <div>
                                            <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-600"
                                            >
                                            Email
                                            </label>
                                            <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={signup.email}
                                            onChange={(e)=>handleSignupt(e)}
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                            required
                                            />
                                        </div>
                                        <div>
                                            <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-600"
                                            >
                                            Password
                                            </label>
                                            <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={signup.password}
                                            onChange={(e)=>handleSignupt(e)}
                                            placeholder="Create a password"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                            required
                                            />
                                        </div>
                                        <div>
                                            <label
                                            htmlFor="number"
                                            className="block text-sm font-medium text-gray-600"
                                            >
                                            Phone Number
                                            </label>
                                            <input
                                            type="number"
                                            id="number"
                                            name="number"
                                            value={signup.number}
                                            onChange={(e)=>handleSignupt(e)}
                                            placeholder="Enter Phone Number"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                            required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
                                            onClick={(e)=>submitsignup(e)}
                                        >
                                            Sign Up
                                        </button>
                                        </form>
                                        <div className="text-sm text-center text-gray-600">
                                        Already have an account?{" "}
                                        <button onClick={() => {
                                            dispatch({
                                                type:"IsLogin",
                                                payload:""
                                            })
                                        }}   className="font-medium text-indigo-500 hover:underline">
                                            Login
                                        </button>
                                        </div>
                                    </div>
                                    </div>
                                                    
                            </div> 
            
        
                }
                
            
            </div>
        
        </Fragment>
    )
}

export default Sliderpage;