import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();

  const cost = location.state.totalcost;
  const count = location.state.counts;
  const theater = location.state.theatre;
  const time = location.state.time;
  const date = location.state.date;
  const name = location.state.name;
  const title = location.state.title;
  const app = location.state.payoption;
  const photo = location.state.photo;
  const mail = location.state.mail;
  const city = location.state.city;
  const number = location.state.number;

  useEffect(() => {
    window.scrollTo(0, 0);
    saveTicketBackend();
  }, []);

  const getRan = (size) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
  const bookingId = getRan(20);

  const saveTicketBackend = async () => {
    try {
      const response = await fetch("https://moviebooking-app-backend.onrender.com/user/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingId,
          userName: name,
          userEmail: mail,
          movieTitle: title,
          numberOfTickets: count,
          totalCost: cost,
          theatreName: theater,
          showTime: time,
          bookingDate: date,
          paymentMethod: app,
          phoneNumber: number,
          city: city,
          photo: photo,
        }),
      });
      const res = await response.json();
      alert(res.message);
    } catch (error) {
      console.error("Error saving ticket information:", error.message);
    }
  };

  return (
    <>
     <div className="bg-gray-800">
      <div className="bg-gray-800 flex flex-wrap justify-center items-center my-0 mx-auto rounded-lg shadow-md">
        <div>
          <figure>
            <img
              className="w-96 h-auto"
              src={`https://image.tmdb.org/t/p/w500/${photo}`}
              alt="Movie Poster"
            />
            {/* <figcaption className="text-white">Booking id: &nbsp;&nbsp; #{bookingId} </figcaption> */}
          </figure>
        </div>

        <div className="w-96 ml-8 text-white">
          <div className="flex flex-wrap justify-between mb-4">
            <p>
              <span>{name}</span>
              <strong>,&nbsp;Your Tickets are successfully booked</strong>
              <i className="fa-solid fa-circle-check text-pink-500"></i>
            </p>
          </div>
          <div className="flex flex-wrap justify-between mb-4">
            <p>Payment through:</p>
            <p>{app}</p>
          </div>
          <div className="flex flex-wrap justify-between mb-4">
            <p>Mobile Number:</p>
            <p>{number}</p>
          </div>
          <div className="flex flex-wrap justify-between mb-4">
            <p>Booking id:</p>
            <p>#{bookingId}</p>
          </div>

          <div className="flex flex-wrap justify-between mb-4">
            <p>Movie Name :</p>
            <p>{title}</p>
          </div>
          <div className="flex flex-wrap justify-between mb-4">
            <p>No.of Tickets :</p>
            <p>{count}</p>
          </div>
          <div className="flex flex-wrap justify-between mb-4">
            <p>Total Cost :</p>
            <p>{cost}/-</p>
          </div>
          <div className="flex flex-wrap justify-between mb-4">
            <p>Theatre :</p>
            <p>{theater}</p>
          </div>
          <div className="flex flex-wrap justify-between mb-4">
            <p>Date :</p>
            <p>{date}</p>
          </div>
          <div className="flex flex-wrap justify-between mb-4">
            <p>Show Time :</p>
            <p>{time}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-12 bg-gray-800 ">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mr-4"
          state={{ name: name, city: city, mail: mail }}
          to={`/${city}/movie`}
        >
          <i className="fa-solid fa-house "></i> Home
        </Link>

        <Link
          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
          state={{
            photo: photo,
            payoption: app,
            title: title,
            totalcost: cost,
            counts: count,
            theatre: theater,
            time: time,
            date: date,
            name: name,
            mail: mail,
            number: number,
          }}
          to="feedback"
        >
          <i className="fa-solid fa-comment"></i> Feedback
        </Link>
      </div>
      <Outlet />
      </div>
    </>
  );
}

export default Success;
