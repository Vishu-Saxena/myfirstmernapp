import React, { useEffect, useState } from 'react';
import './Home.css';
const Home = () => {

  const [userdata , setUser] = useState({});
  useEffect(()=>{
    const homedata = async()=>{
      try{
        const res = await fetch('/getdata' , {
          method :"GET",
          headers:{
            "Content-Type" : "application/json"
          },
        });
   
        const data = await res.json();

        // console.log(data);
        setUser(data);
        if(!res.status === 200){
          const error = new Error();
          throw error;
        }
      }catch(error){
        console.log(error);
      }
    }
      
    homedata();
    // eslint-disable-next-line
  } , []);

  return (
    <form method="GET">
      <div className='d-flex justify-content-center'>
        <div className="cntr" style={{textAlign :"center" , position: "absolute" , top:'50%'}}>
          <h2>Welcome {userdata.name? userdata.name:"mern developer"} !</h2>
          <h2 style={{fontSize:"18px"}}>Happy to you</h2>
        </div>
        <div className='pbx' style={{width:"100%" , height:"92vh"}}>
          <div className="bx1"></div>
          <div className="bx2"></div>
        </div>
      </div>
    </form>
  )
}

export default Home