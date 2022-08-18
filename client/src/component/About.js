import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import aboutimg from '../images/profile.jpg'


const About = () => {

  const [userdata , setUser] = useState({});
  const [editName , setName] = useState("");
  const [editWork , setWork] = useState("");
  const [userID , setId] = useState();


  // const [editUser , setEdit] = useState({name : "" , work :""});


  const navigate = useNavigate();

  useEffect (()=>{
    const callAboutPage = async() =>{
      try {
        const res = await fetch('/about' , {
          method :"GET",
          headers:{
            Accept :"application/json",
            "Content-Type" : "application/json"
          },
          credentials :"include"
        });

        const data = await res.json();
        console.log(data);
        setUser(data);
        setName(data.name);
        setWork(data.work);
        setId(data._id);

        // setEdit({name : data.name , work : data.work});
        if(!res.status===200){
          const error = new Error(res.error);
          throw error;
        }

      } catch (error) {
        // console.log(error);
        console.log("there is error");
        navigate('/login');
      }
    }

    callAboutPage();
  }, []);

  const handleName = (e) => {

    setName(e.target.value);

  }

  const handleWork = (e) => {

    setWork(e.target.value);

  }

  const editProfile = async (e)=>{
    e.preventDefault();
    const name = editName;
    const work = editWork;

    const id = userID;
    if(name === userdata.name && work === userdata.work){
      return window.alert("No change is found in profile to updata .")
    }

    const res = await fetch('/editProf' ,  {
      method : "POST",
      headers:{
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({
        name , work  , id
      })
    });

    const data = await res.json();
    console.log(data);
    if(res.status===200){
      window.alert("profile updated , refresh the page to see the changes.");
    }
    else{
      window.alert("profile not updated! due to some errors. plz try again later.")
    }
  }

  return (
  <div className='container my-5 bg-light bdabox' style={ {padding :'10px',   boxShadow: '0px 0px 10px gray' , borderRadius : "15px"}}>
    <form method="POST">
      <div className="row bg-light" style={{width : "100%"}} >
        <div className="col-md-4" >
          <img src={aboutimg} alt="jlkjhfd"/>
        </div>
        <div className="col-md-4 mt-5">
          <input type="text" name="edname" id='mansi' placeholder='name' value={editName} onChange={handleName} style ={{background : "none" , border :"none" , marginBottom:"10px" }} />
          <input type="text" name="edwork" id='mansi2' placeholder='work' value={editWork} onChange={handleWork} style ={{background : "none" , border :"none" , marginBottom:"10px" }} />
          <p>Ranking : <span>1/10</span></p>
        </div>
        <div className="col-md-2 mt-5">
          <button className='btn btn-primary mt-4' onClick={editProfile}>edit profile</button>
        </div>        
      </div>
    </form>

      <div className="row bg-light" style={{width : "100%"}}>

        <div className="col-md-3 mt-5">
          <h4 className='mb-4 mt-4 text-center' style={{color:'blue'}}>WORK LINKS</h4>
          <a className='mx-5' href="https:/youtube.com" style={{color : "black"}}>youtube</a> <br />
          <a className='mx-5' href="https:/youtube.com" style={{color : "black"}}>Instagram</a> <br />
          <a className='mx-5' href="https:/youtube.com" style={{color : "black"}}>Mansi Saxena</a> <br />
          <a className='mx-5' href="https:/youtube.com" style={{color : "black"}}>Web Developer</a> <br />
          <a className='mx-5' href="https:/youtube.com" style={{color : "black"}}>SoftwareEngineer</a> <br />
          <a className='mx-5' href="https:/youtube.com" style={{color : "black"}}>Figma</a>
        </div>

        <div className="col-md-8 mt-5 pt-3" style={ { backgroundColor : "white" , borderRadius : "15px"}}>
          <h2 className='text-center' style={{color:'blue'}}>About User</h2>
          <div className="row" style={{width : "100%"}}>
            <div className="col-sm-6">
              <p className='text-center'>Name</p>
            </div>
            <div className="col-sm-6">
              <p className='text-center'>{userdata.name}</p>
            </div>

            <div className="col-sm-6">
              <p className='text-center'>Phone</p>
            </div>
            <div className="col-sm-6">
              <p className='text-center'>{userdata.phone}</p>
            </div>
            <div className="col-sm-6">
              <p className='text-center'>Age</p>
            </div>
            <div className="col-sm-6">
              <p className='text-center'>19 years</p>
            </div>
            
            <div className="col-sm-6">
              <p className='text-center'>Email</p>
            </div>
            <div className="col-sm-6">
              <p className='text-center'>{userdata.email}</p>
            </div>
            <div className="col-sm-6">
              <p className='text-center'>Proffesion</p>
            </div>
            <div className="col-sm-6">
              <p className='text-center'>{userdata.work}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
