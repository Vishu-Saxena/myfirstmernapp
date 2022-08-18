import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import login from '../images/login.png'
import loginCSS from './Login.css'
import { userContext } from "../App";
 
function Login() {

  const {state , dispatch} = useContext(userContext);

  const [user , setUser] = useState({
    email :"" , password : ""
  })

  const navigate = useNavigate(); 

  let nam , value;
  
  const handleInput =(e)=>{
    nam = e.target.name;
    value = e.target.value;
    setUser({...user , [nam]:value});
  }

  const postData = async(e)=>{
    const{email , password } = user;
    e.preventDefault();

    const res = await fetch('/login', {

      method : "POST",

      headers:{
        "Content-Type" : "application/json"
      },

      body : JSON.stringify({
        email , password
      })
    })

    const data = await res.json();
    console.log(data);
    if(data.status === 400){
      window.alert("invalid entry");
      console.log("invalid entry");
      navigate('/registration');
    }else{
      dispatch({type : 'USER' , payload:true})
      console.log('logined');
      window.alert("loggined successfuly");
      navigate('/');
    }
    
  }


  return (
    <body>
      <div className="container con2 mt-5" style={{borderRadius:"10px", paddingTop :"1rem" , paddingBottom:'0.5rem' , backgroundImage: "linear-gradient(to bottom right, lightblue , blue , lightblue)", opacity:'0.7' ,
 boxShadow : "0 0 15px black", padding:"1rem"}}>
        <form action="POST">
          <div className="row mt-4" style={{background: "none"}}>
            <div className="col-md-12 d-flex justify-content-center">
              <img src={login} className='logoimg' style={{borderRadius : "50%"}} alt=""/>
            </div>
          </div>
          <div className="row mt-5" style={{background: "none"}}>
            <div className="col-md-1"></div>
            <div className="col-md-9" style={{background: "none"}}>
              <input className={loginCSS.inp} onChange={handleInput} type="email" name="email" id="" placeholder='USERNAME' style={{background: "none"}}/>
            </div>
            <div className="col-md-2" ></div>
          </div>

          <div className="row mt-3" style={{background: "none"}}>
            <div className="col-md-1"></div>
            <div className="col-md-9" >
              <input className={loginCSS.inp} onChange={handleInput} type="password" name="password" id="" placeholder='PASSWORD' style={{background: "none"}} />
            </div>
            <div className="col-md-2"></div>
          </div>

          <div className="row" style={{background: "none"}}>
            <div className="col-md-1"></div>
            <div className="form-check col-md-9 mt-3 ml-3">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
              <label className="form-check-label lbl" style={{color : "white"}} forhtml="flexCheckDefault">
                remember me
              </label>
            </div>
            <div className="col-md-2"></div>
          </div>

          <div className="row" style={{borderRadius :"0 0 10px 10px" , background :"none"}}>
            <div className="col-md-3 my-4" id='button'>
            <button type="button" classname="btn btn-outline-light" onClick={postData}>Login</button>
            </div>
          </div>

        </form>
      </div>
    </body>

  )
}

export default Login