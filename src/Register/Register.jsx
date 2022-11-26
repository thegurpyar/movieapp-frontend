// add animations
import React, { useState } from "react";
import validator from "validator";
import axios from "axios"
import {Link, Navigate } from "react-router-dom";
import Brand from "../Brand/Brand";
import RegisterButton from "../Button/RegisterButton";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
const Login=()=>{
    const Navigate=useNavigate()
    const[user,setUser]=useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:""

    })
    const onChange = (event) => {
        const {value,name} =event.target
        setUser({
            ...user,
            [name]:value
        })
      };
    const handleClick=()=>{
        
        if (user.email && user.username && user.password && user.confirmpassword){
            if (user.password!==user.confirmpassword){
                alert("Passwords do not match ")
            }else{
                if (validator.isEmail(user.email)){


                    axios.post("http://localhost:5000/users/register",{user})
                    .then((res)=>console.log(res.data.message))
                    setUser({
                        username:"",
                        email:"",
                        password:"",
                        confirmpassword:""
                        })
                }else{
                    alert("enter a valid email")
                }
            }



        }else{
            alert("invalid input")

        }


    }
    return(
        <div>
        <Brand/>
        <div className="login" style={{marginTop:"10vh"}}>
            <div className="form-group" >
            <input name="username" type="text" placeholder="Username" value={user.username} onChange={onChange} required/>
            <input name="email" type="text" placeholder="Email " value={user.email} onChange={onChange} required/>
            <input name="password" type="password" placeholder="Password" value={user.password} onChange={onChange} required/>
            <input name="confirmpassword" type="password" placeholder="Confirm Password" value={user.confirmpassword} onChange={onChange} required/>
            </div>
                <Button  text="Sign Up" onClick={handleClick}/>
                
                <div style={{display:"flex",flexDirection:"row",alignItems:"baseline",justifyContent:"center"}}>
                <p style={{marginTop:"20vh",textAlign:"center",fontSize:"2.5vh"}}>Already Registered?</p>

                <RegisterButton style={{left:"2px"}} text="Log In" onClick={()=>{Navigate("/")}}/>
                    
                    </div>
                
            
            </div>
            </div>
    )

}

export default Login;