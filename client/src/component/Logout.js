import React, { useEffect , useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from "../App";


const Logout = () => {
    const {state , dispatch} = useContext(userContext);
    

    const navigate= useNavigate();
    useEffect(()=>{
        const logoutPage = async ()=>{
            try {
                const res = await fetch('/logout' , {
                    method :"GET",
                    headers:{
                    Accept :"application/json",
                    "Content-Type":"application/json"
                    },
                    credential : "include"
                } )

                dispatch({type : 'USER',payload : false});

                if(!res.status===200){
                    const error = new Error();
                    throw error;
                }else{
                    window.alert('user logout');
                    navigate('/');
                    
                }
            } catch (error) {
                console.log(error);
            }
            
        }

        logoutPage();
    } ,[]);

  return (
   <></>
  )
}

export default Logout
