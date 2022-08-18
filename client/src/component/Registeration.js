import React, { useState } from 'react';
import header from '../images/profile.jpg';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';

const Registeration = () => {
  const [user , setUser] = useState({
    name :"", email:"", phone :"",prof : "" , password :"",cpassword:""
  });

  let nam , value;  //type of nam and value is string;
  const navigate = useNavigate();

const handleInput =(e)=>{
  nam = e.target.name;
  value = e.target.value;
  setUser({...user , [nam] : value});
}

const postData = async (e)=>{
  e.preventDefault();
  const{name , email , phone ,work, password , cpassword} = user;
  const res = await fetch('/register' , {
    method : "POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body:JSON.stringify({
      name , email , phone , work, password , cpassword
    })

  });
  console.log(res);
  const data = await res.json();  //stored response in json formate to data variable

  if(res.status === 200 && data){
    window.alert('registration successfull');
    console.log('registration successfull');
    navigate('/login');
  }else{
    window.alert('registration invalid');
    console.log('registration invalid');
    navigate('/registration');
  }
    

}

  return (
    <form method='POST'>
    <div className='container con1 bg-primary my-5 py-5'>
      <div className="row row1 mediarow" style={{borderRadius :"10px 10px 0 0"}}>
        <div className="col-md-12">
            <img className='header' src={header} alt="" />
        </div>
      </div>
      <div className="row mediarow">
        <div className="col-md-1"></div>
            <div className="col-md-10 mt-5 mb-5">
            <h3 className='h3'>Registaration Information </h3>
            </div>
        <div className="col-md-1"></div>
      </div>

      <div className="row mediarow">
        <div className="col-md-1"></div>
        <div className="col-md-10 mb-4">
            <input type="text" name="name" id="" placeholder='Name' onChange={handleInput}/>
        </div>
        <div className="col-md-1"></div>
      </div>

      <div className="row mediarow">
        <div className="col-md-1"></div>
        <div className="col-md-4 mb-4">
            <input type="text" name="email" id="" placeholder='Email' onChange={handleInput}/>
        </div>
        
        <div className="col-md-2"></div>
        <div className="col-md-4 mb-4">
            <input type="text" name="phone" id="" placeholder='Phone' onChange={handleInput}/>
        </div>
        <div className="col-md-1"></div>
      </div>

      <div className="row mediarow">
        <div className="col-md-1"></div>
        <div className="col-md-10 mb-4">
            <input type="text" name="work" id="" placeholder='Profession' onChange={handleInput}/>
        </div>
        <div className="col-md-1"></div>
      </div>

      <div className="row mediarow">
        <div className="col-md-1"></div>
        <div className="col-md-4 mb-4">
            <input type="text" name="password" id="" placeholder='Password' onChange={handleInput}/>
        </div>

        <div className="col-md-2"></div>
        <div className="col-md-4 mb-4">
            <input type="text" name="cpassword" id="" placeholder='Confirm Password' onChange={handleInput}/>
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="row mediarow" style={{borderRadius :"0 0 10px 10px"}}>
        <div className="col-md-3 my-4" id='button'>
            <button type="button" className="btn btn-outline-primary" onClick={postData}>Register</button>
      </div>
      </div>
      <div style={{color:"white" , display:"flex", justifyContent:"center" , marginTop:"1%"}}>
        <Link to="/login" style={{color:"white" , textAlign: "center"}} >Login in</Link>&nbsp;&nbsp;<p>If already exist</p>
      </div>
    </div>
    </form>
  )
}

export default Registeration;
