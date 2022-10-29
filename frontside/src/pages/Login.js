import React , {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom"
import "../styles/Login.css";
import {login} from '../redux/actions/authActions';
import {useDispatch, useSelector} from 'react-redux'

const Login = () => {
  const initialState = {email: '', password: ''}
 const history = useHistory();
 const {auth} = useSelector(state => state)
  const [showpass , setShowpass] =useState(false)
  const [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(auth.token){
      history.push('/')
    }
  })
const {email, password} = userData;
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData({...userData , [name]:value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
   
    dispatch(login(userData));
  }

  return (
    <div className="login">
      <div className="login-container">
      <h3 className="login-header">Simstoria</h3>
      <h6 className="login-subheader">Вход в систему</h6>
      
        <form className="login-dataform" onSubmit={handleSubmit}>
        <input 
        className="login-dataformemail"
        type="email" 
        name='email'
        value={email}
        onChange={handleChange}
        placeholder="Введите почту"></input>
        <input 
        className="login-dataformpass"
        type= {showpass ? "type" : "password"}
        placeholder="Введите пароль"
        value={password}
        name='password'
        onChange={handleChange}
        >
            
        </input>

        <small className="login-showpass"onClick={()=>setShowpass(!showpass)}> {showpass ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C6.40848 3 1.71018 6.82432 0.378052 12C1.71018 17.1757 6.40848 21 12 21C17.5915 21 22.2898 17.1757 23.6219 12C22.2898 6.82432 17.5915 3 12 3ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" fill="currentColor" /></svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C17.5915 3 22.2898 6.82432 23.6219 12C22.2898 17.1757 17.5915 21 12 21C6.40848 21 1.71018 17.1757 0.378052 12C1.71018 6.82432 6.40848 3 12 3ZM12 19C7.52443 19 3.73132 16.0581 2.45723 12C3.73132 7.94186 7.52443 5 12 5C16.4756 5 20.2687 7.94186 21.5428 12C20.2687 16.0581 16.4756 19 12 19Z" fill="currentColor" /></svg>} </small>

        <button 
        className="login-dataformbtn"
        type="submit" > Войти </button>
            <p className="login-small">Нет своего аккаунта?<Link className="create-account" to="/register"> Создать аккаунт </Link></p>
        </form>     
        </div>
    </div>
  );
};

export default Login;
