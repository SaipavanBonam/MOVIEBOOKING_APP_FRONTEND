import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { useSelector } from 'react-redux'

import Nav from "./Nav";

function Ticket() {
  // const user = useSelector((state) => state.user);
  // const [namee, setName] = useState();
  // const [maill, setMail] = useState();
  // const [cityy, setCity] = useState();
   

  const img_300 = "https://image.tmdb.org/t/p/w300";
  const noPicture =
    "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

  const location = useLocation();

  // const { name, data: mvedata, title, mail, city, year } = location.state || {};

  const name = location.state?.name;
  const mvedata = location.state?.data;
  const title = location.state?.title;
  const mail = location.state?.mail;
  const city = location.state?.city;
  const year = location.state?.year;
  
  // useEffect(() => {
  //   setName(user.name);
  //   setCity(user.city);
  //   setMail(user.emai);
  // }, [user]);

  var days = [
    {
      id: 0,
      name: "button-1",
      date: moment().add(1, "days").format("ddd, MMM D"),
    },
    {
      id: 1,
      name: "button-2",
      date: moment().add(2, "days").format("ddd, MMM D"),
    },
    {
      id: 2,
      name: "button-3",
      date: moment().add(3, "days").format("ddd, MMM D"),
    },
  ];

  var theatres = [
    { name: "PVR" },
    { name: "PVP" },
    { name: "INOX" },
    { name: "IMAX" },
  ];

  var costs = [
    { cost: "300", value: "300 -Reclinear" },
    { cost: "200", value: "200 -Balcony" },
    { cost: "150", value: "150 -Normal" },
  ];
  
  const [movie, setmovieData] = useState([]);
  const [cost, setCost] = useState(null);
  const [found, setNotFound] = useState(null);
  const [credits, setCredits] = useState(null);
  const [centredModal, setCentredModal] = useState(false);
  const [centredModal1, setCentredModal1] = useState(false);
  const [activebutton, setactive] = useState(null);
  const [activeb, setactiveb] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [review, setReview] = useState(null);

  const toggleShow = () => setCentredModal(!centredModal);
  const toggleShow1 = () => setCentredModal1(!centredModal1);

  function handlecost(data) {
    setCost(data);
  }

  function dateclick(data) {
    setactive(data);
  }

  function theatreclick(data) {
    setactiveb(data.name);
  }

  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?t=${title}&y=2023&plot=full&apikey=961ea94b`
    )
      .then((res) => res.json())
      .then((data) => setmovieData(data))
      .catch((err) => {
        setNotFound(true);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${mvedata.id}/credits?api_key=bee8ce9f0d5a33ee50837d31a61a64eb`
    )
      .then((res) => res.json())
      .then((data) => setCredits(data.cast))
      .catch((err) => {
        setNotFound(true);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${mvedata.id}/videos?api_key=bee8ce9f0d5a33ee50837d31a61a64eb`
    )
      .then((res) => res.json())
      .then((data) => setTrailer(data.results))
      .catch((err) => {
        setNotFound(true);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${mvedata.id}/reviews?api_key=bee8ce9f0d5a33ee50837d31a61a64eb`
    )
      .then((res) => res.json())
      .then((data) => setReview(data.results))
      .catch((err) => {
        setNotFound(true);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  var credit = null;

  if (credits !== null) {
    credit = credits.slice(0, 6);
  }

  var num = 0;

  if (movie.imdbVotes !== undefined) {
    for (var i = 0; i < movie.imdbVotes.length; i++) {
      if (movie.imdbVotes[i] !== ",") {
        num += movie.imdbVotes[i];
      }
    }
  }

  var num3 = parseInt(mvedata?.vote_average);
  var imdb = movie.imdbRating === "N/A" ? num3 : movie.imdbRating;
  var num1 = parseInt(num);
  num1 = num1 / 1000;
  num1 = Math.ceil(num1);
  var num2 = parseInt(mvedata?.vote_count);
  num2 = num2 / 1000;
  num2 = Math.ceil(num2);
  var t = parseInt(movie.Runtime);
  var h = Math.floor(t / 60);
  var min = Math.floor(t % 60);
  var plot =
    movie.Plot?.length > mvedata?.overview?.length
      ? movie.Plot
      : mvedata?.overview;
  var votes = movie.imdbRating === "N/A" ? num2 : num1;

  return (
    <>
     {/* <Nav/> */}
      <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="relative group">
      <img
        src={`https://image.tmdb.org/t/p/w500/${mvedata?.poster_path}`}
        className="w-600 pl-40 rounded-lg shadow-lg "
        style={{ height: 400}} 
        alt={title}
      />
    </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold">{movie?.Title}</h1>
              <div className="flex items-center mt-4">
                <div className="flex items-center">
                  <i className="fas fa-star text-pink-500"></i>
                  <span className="ml-2">{imdb}/10</span>
                </div>
                <span className="ml-4">{votes}k votes</span>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  <span>
                    {h}hr {min}min
                  </span>
                  <span className="ml-4">{movie?.Genre}</span>
                </div>
              </div>
              <div className="mt-4">
                <ul className="flex">
                  {days.map((data) => (
                    <li key={data.id} className="mr-4">
                      <button
                        type="button"
                        className={`py-2 px-4 rounded-lg ${
                          activebutton === data.date
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-800"
                        }`}
                        onClick={() => dateclick(data.date)}
                      >
                        {data.date}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <ul className="flex">
                  {theatres.map((data) => (
                    <li key={data.name} className="mr-4">
                      <button
                        type="button"
                        className={`py-2 px-4 rounded-lg ${
                          activeb === data.name
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-800"
                        }`}
                        onClick={() => theatreclick(data)}
                      >
                        {data.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              {activebutton && activeb && (
                <div className="mt-4">
                  <ul className="flex">
                    {costs.map((data) => (
                      <li key={data.cost} className="mr-4">
                        <button
                          type="button"
                          className={`py-2 px-4 rounded-lg ${
                            cost === data.cost
                              ? "bg-blue-500 text-white"
                              : "bg-gray-300 text-gray-800"
                          }`}
                          onClick={() => handlecost(data.cost)}
                        >
                          {data.value}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activebutton && activeb && cost && (
                <div className="mt-4">
                <Link
                className="book-ticket"
                state={{
                  data: activeb,
                  cost: cost,
                  date: activebutton,
                  name: name,
                  photo: mvedata.poster_path,
                  title: title,
                  mail: mail,
                  city: city,
                }}
                to="booking"
              >
               <button type="button"  className="bg-pink-500 text-white py-2 px-4 rounded-lg">
                  Book tickets
                </button>
              </Link>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
                <h2 className="text-3xl font-bold mb-4">About the Movie</h2>
                <p>{plot}</p>
              </div>
              <div className="mt-8">
  <h2 className="text-3xl font-bold">Top Billed Cast</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-4">
    {credits && credits.length > 0 ? (
      credits.slice(0, Math.min(credits.length, 10)).map((c) => (
        <div
          key={c.id}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src={c.profile_path ? `${img_300}${c.profile_path}` : noPicture}
            className="w-full object-cover"
            style={{ height: 200 }}
            alt={c.name}
          />
          <div className="p-2">
            <h3 className="text-lg font-bold text-white">{c.name}</h3>
            <p className="text-gray-400">{c.character}</p>
          </div>
        </div>
                ))
              ) : (
                <p>No cast information available.</p>
              )}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-bold">Trailers</h2>
            <div className="flex overflow-x-auto mt-4 space-x-4">
              {trailer && trailer.length > 0 ? (
                trailer.slice(0, Math.min(trailer.length, 3)).map((t) => (
                  <div key={t.id} className="w-96 bg-gray-800 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="200"
                      src={`https://www.youtube.com/embed/${t.key}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={t.name}
                    ></iframe>
                    <div className="p-2">
                      <h3 className="text-lg font-bold">{t.name}</h3>
                    </div>
                  </div>
                ))
              ) : (
                <p>No trailers available.</p>

              )}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-bold">Reviews</h2>
            <div className="flex flex-col mt-4 space-y-4">
              {review && review.length > 0 ? (
                review.map((r) => (
                  <div key={r.id} className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-bold">{r.author}</h3>
                    <p className="text-gray-400">{r.content}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ticket;
