import React ,{ useContext } from 'react';
import logo from '../images/profile.jpg';
import { Link } from 'react-router-dom';
import { userContext } from "../App";

const Navbar = () => {

    const {state , dispatch} = useContext(userContext);

    const RenderMenue = ()=>{
            if(state){
                return(
                    <>
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active"  to="/about">About-Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active"  to="/contact">Contact-Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active"  to="/logout">Log Out</Link>
                    </li>
                    </>
                )
            }else{
                return(
                    
                <>
                
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active"  to="/registration">Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active"  to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active"  to="/about">About-Us</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active"  to="/contact">Contact-Us</Link>
                </li>
                </>

                )
            }
    }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><img className='logo' src={logo} alt="" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
                <RenderMenue/>
            </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
