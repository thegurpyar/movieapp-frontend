// add animations
import React, { useState } from "react";
import  secureLocalStorage  from  "react-secure-storage";
import Button from "../Button/Button";
import "./login.css";
import "../Brand/Brand"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Brand from "../Brand/Brand";
import RegisterButton from "../Button/RegisterButton";

const Login=({getUser})=>{
    const navigate=useNavigate()
    const[user,setUser]=useState({
        email:"",
        password:""

    })
    const onChange = (event) => {
        const {value,name} =event.target
        setUser({
            ...user,
            [name]:value
        })
      };
    const handleClick=()=>{
        if(user.email && user.password){
            axios.post("http://localhost:5000/users/login",{user})
            .then((res)=>
            {getUser(res.data.user);
            document.cookie =`token=${res.data.token}`
            
            })
            
            .catch((error)=>alert(error.response.data.message))
            setUser({
                email:"",
                password:""
            });
            
        }else{
            alert("invalid input")
        }

        
    }
    const iconstyle={
        backGroundColor:"black",
        color:"#00A3FF",
        position:"relative",
        left:"25%",
        top:"50px"
    }
    return(
        <div>
        <Brand/>
        <div className="login" style={{marginTop:"10vh"}}>
            <div className="form-group" >
            <input  name="email" type="text" placeholder="Email or Username" value={user.email} onChange={onChange}/>
            <input  name="password" type="password" placeholder="Password" value={user.password} onChange={onChange}/>
            </div>
                <Button text="Log In " onClick={handleClick}/>

                <div style={{display:"flex",flexDirection:"row",alignItems:"baseline",justifyContent:"center"}}>
                <p style={{marginTop:"20vh",textAlign:"center",fontSize:"2.5vh"}}>New to MovieFlix?</p>

                <RegisterButton style={{left:"2px"}} text="Sign Up" onClick={()=>{navigate("/register")}}/>
                    
                    </div>
            
            </div>
            </div>
    )

}

export default Login;