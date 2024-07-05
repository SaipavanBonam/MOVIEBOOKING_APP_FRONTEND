import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { CToast, CToastHeader, CToastBody } from "@coreui/react";
import Movie from "./Movie";
import { useSelector } from 'react-redux'
import Nav from "./Nav";
function Home() {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState([]);
  const [found, setNotFound] = useState(null);
  const [datatip, settip] = useState(null);
  const user = useSelector((state) => state.user);
  const [name, setName] = useState();
  const [mail, setMail] = useState();
  const [city, setCity] = useState();
  
  useEffect(() => {
    setName(user.name);
    setCity(user.city);
    setMail(user.email);
  }, [user]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=bee8ce9f0d5a33ee50837d31a61a64eb&language=en-US&sort_by=popularity.desc&region=US&page=1https://api.themoviedb.org/3/discover/movie?api_key=bee8ce9f0d5a33ee50837d31a61a64eb&language=en-US&sort_by=popularity.desc&page=2`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data.results))
      .catch((err) => {
        setNotFound(true);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  var sortedmovies = [...movie].sort((p1, p2) =>
    p1.title > p2.title ? 1 : p1.title < p2.title ? -1 : 0
  );
  var releasedmovie = [...movie].sort((p1, p2) =>
    p1.release_date < p2.release_date
      ? 1
      : p1.release_date > p2.release_date
      ? -1
      : 0
  );

  function handleClick() {
    setCount((count + 1) % 3);
  }

  function tool() {
    if (count === 0) {
      settip("Sort by Latest Releases");
    } else if (count === 1) {
      settip("Sort by Title");
    } else {
      settip("Sort by Popularity");
    }
  }

  return (
    <><Nav/>
    
    <div className="bg-gray-900 text-bg-gray min-h-screen">
      <CToast
        animation={true}
        autohide={true}
        visible={true}
        placement="top-end"
      >
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill="#green"></rect>
          </svg>
          <div className="fw-bold me-auto text-bg-gray ">Hello, {name}</div>
          <small></small>
        </CToastHeader>
        <CToastBody>Welcome to Movie Time</CToastBody>
      </CToast>

      <div className="latestmovies flex justify-between p-8">
        <div className="text-white font-bold text-3xl">Latest Movies</div>
        <div className="space-x-4">
          <a
            data-tooltip-id="my-tooltip2"
            data-tooltip-content={datatip}
            data-tooltip-place="top"
          >
            <button
              onMouseEnter={tool}
              onClick={handleClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Sort By
            </button>
          </a>
          <Tooltip id="my-tooltip2" />
        </div>
      </div>

      {count === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 mt-8">
          {movie.map((data) => (
            <Movie
              key={data.id}
              name={name}
              mail={mail}
              city={city}
              id={data.id}
              tmdata={data}
              year={data.release_date}
              release={data.release_date}
              title={data.title}
              poster={data.poster_path}
            />
          ))}
        </div>
      )}

      {count === 1 && releasedmovie && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 mt-8">
          {releasedmovie.map((data) => (
            <Movie
              key={data.id}
              name={name}
              mail={mail}
              city={city}
              id={data.id}
              tmdata={data}
              year="2023"
              release={data.release_date}
              title={data.title}
              poster={data.poster_path}
            />
          ))}
        </div>
      )}

      {sortedmovies && count === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 mt-8">
          {sortedmovies.map((data) => (
            <Movie
              key={data.id}
              name={name}
              mail={mail}
              city={city}
              year="2023"
              id={data.id}
              tmdata={data}
              release={data.release_date}
              title={data.title}
              poster={data.poster_path}
            />
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default Home;
