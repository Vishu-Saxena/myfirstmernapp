import React from 'react'

import { Link } from 'react-router-dom';

function Errorpage() {
  return (
    <div>
        <h1 className='text-center' style={{fontSize:'100px' , color:'rgb(179, 179, 179)' , position:'absolute' , top:'40%' , left:'45%'}}>404</h1>
            <p style={{fontSize:'20px' , position:'absolute' , top:'48%' , left:'28%'}}>This page doesnot exist! Make sure that you have entered the correct URL . </p>
            <button type="button" className="btn btn-primary" style={{position:'absolute' , top:'55%' , left:'47%'}}>
                <Link to= '/' style={ { color : 'white'}}> Back to Home </Link>
            </button>
      </div>
  )
}

export default Errorpage
