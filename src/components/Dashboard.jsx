import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
const BookingDashboard = () => {
  const user = useSelector((state) => state.user); // Assuming you have user data in Redux store
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // Correctly using useNavigate

  // Correctly defined handleBack function
  const handleBack = () => {
    navigate(`/home`);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("https://moviebooking-app-backend.onrender.com/user/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
          }),
        });
        const res = await response.json();
        if (res.alert) {
          setBookings(res.data);
        } else {
          alert(res.message);
          setBookings([]);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };

    if (user.email) {
      fetchBookings();
    }
  }, [user.email]);

 
  return (
    <>
    <Nav/>
    <div className="bg-gray-900 text-white min-h-screen py-8">
    
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Your Bookings</h1>
        {bookings && bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-103"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w400/${booking.photo}`}
                  alt="Movie Poster"
                  className=" w-80 h-60"
                />
                <div className="p-4">
                  <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                  <p><strong>Theatre:</strong> {booking.theatreName}</p>
                  <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <p><strong>Tickets:</strong> {booking.numberOfTickets}</p>
                  <p><strong>Total Cost:</strong> {booking.totalCost}</p>
                  <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
                  <p><strong>City:</strong> {booking.city}</p> 
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No bookings found.</p>
        )}
        <div className="flex justify-center mx-auto">
          <button
            type="button"
            onClick={handleBack}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mt-7"
          >
            Back
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default BookingDashboard;
