import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import Contact from "./Contact";
 import About from "./About";
import Ticket from "./Ticket";
import Home from "./Home";
import City from "./City";
import Booking from "./Booking";
import Success from "./Sucess";
import Feedback from "./Feedback";
// import Signup from "./Signup";
import Nav from "./Nav";
import Payment from "./Payment" 
import Signup from "./Signup";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice.js";
function App() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector((state) => state.user)
  useEffect(() =>{
    const loggedinuser=localStorage.getItem("user");
    if(loggedinuser)
    {
      const founduser=JSON.parse(loggedinuser);
      dispatch(loginRedux(founduser));
      navigate('/home');
      
    }
  },[])
  useEffect(() =>{
    if(user.email!="")
      {
        localStorage.setItem("user",JSON.stringify(user));
      }
    
  },[user])
  return (
    <>
      <Routes>
    
        <Route path="/" element={<Contact />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<City />}></Route>
        <Route path="/bookings" element={<Dashboard />}></Route>
        <Route path="/about" element={<About />}></Route>
        {/* <Route path="/:cityname" element={<Nav />}> */}
          <Route path="/:cityname/movie" element={<Home />}></Route>
          <Route path="/:cityname/movie/:userId" element={<Ticket />}></Route>
          <Route path="/:cityname/movie/:movie/booking" element={<Booking />}></Route>
          <Route path="/:cityname/movie/:movie/booking/payment" element={<Payment />}></Route>
          <Route path="/:cityname/movie/:movie/booking/payment/success" element={<Success />}>
            <Route path="feedback" element={<Feedback />}></Route>
          </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
