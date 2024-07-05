import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Nav from "./Nav";

function Booking(props) {
  const location = useLocation();
  // const { name, data: mvedata, title, mail, city, year } = location.state || {};

  const mail = location.state.mail;
  const data = location.state.data;
  const date = location.state.date;
  const cost = location.state.cost;
  const name = location.state.name;
  const photo = location.state.photo;
  const title = location.state.title;
  const city = location.state.city;

  var c = parseInt(cost);

  const [count, setCount] = useState([0, false]);
  const [movie, setMovieData] = useState([]);
  const [found, setNotFound] = useState(null);
  const [activeb, setActiveb] = useState(null);
  const [timeSelected, setTimeSelected] = useState(false); // Track if time is selected

  var timings = [
    { value: "11", name: "11:30 A.M" },
    { value: "14", name: "2:30 P.M" },
    { value: "17", name: "6:15 P.M" },
    { value: "20", name: "9:30 P.M" },
    { value: "24", name: "12:30 A.M" },
  ];

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?t=${title}&y=2023&apikey=961ea94b`)
      .then((res) => res.json())
      .then((data) => setMovieData(data))
      .catch((err) => {
        setNotFound(true);
      });

    AOS.init({
      duration: 1000,
      once: true,
    });
    window.scrollTo(0, 0);
  }, [title]);

  useEffect(() => {
    markRandomOccupiedSeats();
  }, []);

  function markRandomOccupiedSeats() {
    const seatsToMarkOccupied = 15; 
    const occupiedSeats = new Set();

    while (occupiedSeats.size < seatsToMarkOccupied) {
      const rowIndex = Math.floor(Math.random() * 7); 
      const seatIndex = Math.floor(Math.random() * 12); 
      occupiedSeats.add(`seat-${rowIndex}-${seatIndex}`);
    }

    
    Array.from(occupiedSeats).forEach((seatId) => {
      const seatElement = document.getElementById(seatId);
      if (seatElement) {
        seatElement.classList.add("occupied");
      }
    });
  }

  function handleSelect(data) {
    setActiveb(data.name);
    setTimeSelected(true); // Set time selected to true
  }

  function handleClick(data) {
    if (!timeSelected) {
      alert("Please select a show time.");
      return;
    }

    if (data.target.classList.contains("seat") && !data.target.classList.contains("occupied")) {
      data.target.classList.toggle("selected");
      setCount([count[0] + (data.target.classList.contains("selected") ? 1 : -1), count[0] > 0]);
    }
  }

  var d = parseInt(count[0]);
  var tc = c * d;

  return (
    <>
    {/* <Nav/> */}
    <div className="bg-gray-800 min-h-screen text-white">
      <div className="booking bg-blue-900 p-5 flex justify-between">
        <div>
          <h4 className="userId1">{title}</h4>
          <p>{movie.Genre}</p>
        </div>
        <div className="title2">
          <h4>Theatre :{data}</h4>
          <p>Cost : {cost}</p>
        </div>
      </div>
      
      <div className=" p-5 ">
        {timings.map((data) => (
          <button
            key={data.value}
            type="button"
            name={data.name}
            value={data.value}
            className={`${
              activeb === data.name ? "bg-blue-500 text-white" : " bg-gray-800 text-white"
            } border border-blue-500 rounded px-3 py-1 m-1`}
            onClick={() => handleSelect(data)}
          >
            {data.name}
          </button>
        ))}
      </div>

      { (
        <div className="Booking mt-10 p-5">
          <p className="text" data-aos="fade-out">
            Book tickets on <span>{date}</span>
          </p>
          <ul className="showcase grid grid-cols-3 gap-4 mt-4" data-aos="fade-out">
            <li>
              <div className="seat border  border-gray-200"></div>
              <small className="status">Available</small>
            </li>
            <li>
              <div className="seat selected border border-gray-200"></div>
              <small className="status">Selected</small>
            </li>
            <li>
              <div className="seat occupied border border-gray-200"></div>
              <small className="status">Occupied</small>
            </li>
          </ul>
          <div className="container mt-6 color-gray text-gray" data-aos="flip-up">
            {[...Array(12)].map((_, rowIndex) => (
              <div key={rowIndex} className="row1 grid grid-cols-8 gap-2 color-gray text-gray">
                {[...Array(6)].map((_, seatIndex) => (
                  <div key={seatIndex}>
                    <div
                      className={`seat border border-gray-200 ${rowIndex === 1 && seatIndex === 2 ? 'occupied' : ''}`}
                      onClick={handleClick}
                      id={`seat-${rowIndex}-${seatIndex}`}
                    ></div>
                    <div
                      className={`seat border border-gray-200 ${rowIndex === 4 && seatIndex === 5 ? 'occupied' : ''}`}
                      onClick={handleClick}
                      id={`seat-${rowIndex}-${seatIndex}`}
                    ></div>
                  </div>
                ))}
              </div>
            ))}
            <div className="screen bg-gray-200 transform rotate-x-60">
              <h3 className="content-screen text-center">SCREEN THIS WAY</h3>
            </div>
          </div>

          <div className="text-center">
            {activeb && (
              <Link
              state={{
                totalcost: tc,
                counts: count[0],
                theatre: data,
                time: activeb,
                date: date,
                name: name,
                title: title,
                photo: photo,
                mail: mail,
                city: city,
              }}
              to="payment"
            
                className="mt-6 inline-block"
              >
                <button
                  type="button"
                  className={`px-6 py-3 bg-pink-500 text-white rounded hover:bg-pink-600 ${
                    count[0] === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={count[0] === 0}
                >
                  Confirm {count[0]} tickets
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Booking;
