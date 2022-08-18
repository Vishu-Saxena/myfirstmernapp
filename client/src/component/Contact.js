import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

function Contact() {

  const navigate = useNavigate();
  const [userdata , setUser] = useState({});
  

  useEffect(()=>{
    const callContact = async()=>{

      try {
        const res = await fetch('/getdata' , {
          method : "GET",
          headers:{
            "Content-Type" : "application/json"
          }
        });
        const data = await res.json();
        // console.log(data);
        setUser(data); 
        if(!res.status === 200){
          const error = new Error(res.error);
          throw error;
        }
        // console.log(res.status);     
      } catch (error) {
        // console.log(error);
        navigate('/login')
      } 
    }

    callContact();
    // eslint-disable-next-line 
  } , []);

  let nam , value;
  const [msgData , setmsgData] = useState({name  : "" , email:"" , phone :"" , message:""});


  const handleInput =(e)=>{
    nam = e.target.name;
    value = e.target.value;
    setmsgData({...msgData , [nam]:value});

    // console.log(msgData);
  }

  const sendMsg = async(e) =>{
    e.preventDefault();
    // console.log(msgData);
    const{name , email , phone  , message} = msgData;
    // console.log(name);

    const res = await fetch('/contact' , {
      method : "POST",
      headers:{
        "Content-Type" :"application/json",
      },
      body:JSON.stringify({
        name , email , phone , message
    })
    })

    console.log(res.status);

    const data = await res.json();
    // console.log(data);
    // console.log(msgData);
    if(!data){
      window.alert("message not sent");
      
    }else{
      // console.log("msg not sent");
      // setmsgData({...msgData , message : "jfljajflaj fkjadlfj ;a"});
      console.log("your page is working");
      console.log(msgData);
      setmsgData({...msgData , "message":""});
      console.log("done");
      window.alert("message sent");

    }
  }

  return (
    <div className='container bgbx' style={{width:"100%"}}>

    <h2 className='text-center mt-3'>Contact Us</h2>

    <div className='my-5'>
    <ul className="list-group list-group-horizontal topList">
      <li className="list-group-item text-center scroller"style={{width : '30%' , borderLeftWidth : '1px' , borderRadius : '5px' , overflowX :"scroll" , overflowY:"hidden"}}>Email:<span>{userdata.email}</span></li>
      <li className="list-group-item text-center"style={{width : '30%' , borderLeftWidth : '1px' , borderRadius : '5px' ,overflowX :"scroll" , overflowY:"hidden"}} >Phone:<span>{userdata.phone}</span> </li>
      <li className="list-group-item text-center" style={{width : '30%' , borderLeftWidth : '1px' , borderRadius : '5px' , overflowX :"scroll" , overflowY:"hidden"}}>Name:<span>{userdata.name}</span></li>
    </ul>
    </div>

    <div className="container my-5 bgbx" style={{ width : "80%" , boxShadow: '0px 2px 10px' , padding:"0.8rem" , borderRadius:"10px"}}>
    <form method="POST">
        <div className="row mt-5" style={{width :"100%"}}>
          <div className="col">
            <input onChange={handleInput} type="number" style={{width : '100%'}} className="form-control py-2" name='phone' placeholder="Phone"/>
          </div>
          <div className="col">
            <input onChange={handleInput} type="email" style={{width : '100%'}} className="form-control py-2" name='email'  placeholder="email"/>
          </div>
          <div className="col">
            <input type="text" onChange={handleInput} style={{width : '100%'}} className="form-control py-2" name='name' placeholder="Name of reciever"/>
          </div>
        </div>

        <div>
          <textarea onChange={handleInput} className="form-control mt-5 mb-3" id="exampleFormControlTextarea1" name='message' placeholder='message' rows="9" value={msgData.message} cols='20'></textarea>
        </div>

        <button type="submit" onClick={sendMsg} className="btn btn-primary">Send</button>

    </form>
    </div>
  </div>
  )
}

export default Contact
