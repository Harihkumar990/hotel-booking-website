

const browserreducer = (state,{type,payload}) =>{
  
    switch(type){
       case "IsLogin" :
            return {
                ...state,
                islogin:!state.islogin
            }
            
        case "HotelsList":
            return{
                ...state,
                hotels:payload
            }
        case "Animation":
            return{
                ...state,
                timeline:payload === 0 ? state.timeline.play() : state.timeline.reverse()
            }
        case "SetCheck-INDate":
            return {
                ...state,
                checkin:payload
            }
        case "SetCheck-OutDate":
            return {
                ...state,
                checkout:payload
            }
        case "Set-Hotel_List":
            return {
                ...state,
                listhotel:payload
            }
        case "Filter_hotels":
            return {
                ...state,
                filterhotels:payload
            }
        case "Login_Data":
            return {
                ...state,
                login:{
                    ...state.login,
                    [payload[0]]:payload[1]
                }
            }
        case "Signup_Data":
            return {
                ...state,
                signup:{
                    ...state.signup,
                    [payload[0]]:payload[1]
                }
            }
        case "Clear_Signup_Data":
            return {
                ...state,
                signup:{username:"",email:"",password:"",number:""}
            }
        case "Clear_Login_Data":
            return {
                ...state,
                login:{email:"",password:""}
            }
        case "Set_User":
            return {
                ...state,
                isverify:payload
            }
        case "Set_State":
            return {
                ...state,
                area:payload
                
            }
        case "Set_Guest_Detail":
            return {
                ...state,
                guestdetails:{
                    ...state.guestdetails,
                    [payload[0]] : payload[1]
                }
            }
        case "Empty":
            return{
                ...state,
                guestdetails:{firstname:"",lastname:"",phone:"",email:""},
                checkout:"",
                checkin:""
            }
        
        default:
            return state
    }
}

export default browserreducer