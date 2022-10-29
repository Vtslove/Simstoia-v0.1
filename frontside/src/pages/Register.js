import React, { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom"
import {useSelector , useDispatch} from 'react-redux';
import {register} from '../redux/actions/authActions';
import astro from "../images/astro.jpg";

import "../styles/Register.css";

const Register = () => {
  const initialState = {username:'',fullname:'',email:'',password:'',confirmPassword:''}
  
  const [showpass , setShowpass] =useState(false)
  const [showcfpass , setShowcfpass] =useState(false)
  const [userData , setuserData] = useState(initialState)
  const {username,fullname,email,password,confirmPassword} = userData;

  const {auth,alert} = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange= (e) =>{
    const {name,value}= e.target;
    setuserData({...userData, [name]:value})

  }

  useEffect(()=>{
    if(auth.token){
      history.push('/')
    }
  },[auth.token,history])

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    dispatch(register(userData))
   

  }
  return (
    <div className="register">
    <div className="register-container">
    <h3 className="register-header">Simstoria</h3>
    <h6 className="register-subheader">Register</h6>
    
      <form className="register-dataform" onSubmit={handleSubmit}>
      <input 
      className="register-dataformemail"
      type="text" 
      value={fullname}
      name="fullname"
      onChange={handleChange}
      placeholder={alert.fullname ? `${alert.fullname}` : 'Name'}
      style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
      ></input>
     
      <input 
      className="register-dataformpass"
      type="text" 
      name="nickname"
      placeholder={alert.username ? `${alert.username}` : 'Profession'}
      value={username.toLowerCase().replace(/ /g,'')}
      onChange={handleChange}
      style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
      >
      </input>
     
      <input 
      className="register-dataformpass"
      type="email" 
      placeholder={alert.email ? `${alert.email}` : 'Email'}
      style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
      value={email}
      name="email"
      onChange={handleChange}
      >
      </input>
     
      <input 
      className="register-dataformpass"
      type={showpass ? "type" : "password"} 
      placeholder={alert.password ? `${alert.password}` : 'Password'}
      style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
      value={password}
      name="password"
      onChange={handleChange}
      >
      </input>

      <input 
      className="register-dataformpass"
      type={showcfpass ? "type" : "password"} 
      placeholder={alert.confirmPassword ? `${alert.confirmPassword}` : 'Submit password'}
      style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
      value={confirmPassword}
      name="confirmPassword"
      onChange={handleChange}
      >
      </input>

      <button 
      className="register-dataformbtn"
      type="submit" > Sign Up </button>
      <p className="register-small">Already have an account ? <Link to="/" className="go-reg">Sign In</Link></p>
      </form>     
      </div>
      <img className="astronaut" src={astro} />
  </div>
  );
};

export default Register;
