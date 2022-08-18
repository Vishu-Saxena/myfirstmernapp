
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import {Routes , Route} from 'react-router-dom';
import Login from './component/Login';
import About from './component/About';
import Contact from './component/Contact';
import Registeration from './component/Registeration';
import Errorpage from './component/Errorpage';
import Logout from './component/Logout';
import { createContext, useReducer } from 'react';
// import { init } from '../../server/modals/userSchema';
import { initialState , reducer } from './reducer/UseReducer';



export const userContext = createContext();

const Routing = ()=>{
  return <Routes>
  <Route path='/' element = {<Home/>}/>
  <Route path='/registration' element = {<Registeration/>}/>
  <Route path='login' element = {<Login/>}/>
  <Route path='/about' element = {<About/>}/>
  <Route path='/contact' element = {<Contact/>}/>
  <Route path='/logout' element = {<Logout/>}/>
  <Route path='*' element = {<Errorpage/>}/>
</Routes>
}

function App() {

  const [state , dispatch] = useReducer(reducer , initialState)

  return (
    <>
      <userContext.Provider value={{state , dispatch}}>

        <Navbar/>
        <Routing/>

      </userContext.Provider>
    </>
  );
}

// export { createContext }
export default App;
