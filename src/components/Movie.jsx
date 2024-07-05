import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Movie(props) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="relative group rounded-lg shadow-lg bg-white overflow-hidden"
      style={{ maxWidth: "250px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300/` + props.poster}
        alt={props.title}
        className="w-full h-72 object-cover transition-transform duration-300 ease-in-out group-hover:translate-y-[-0px]"
      />
      {isHovered && (
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-75 opacity-100 transition-opacity duration-300 ease-in-out">
          <h2 className="text-xl font-semibold mb-2 text-white">{props.title}</h2>
          <p className="text-gray-300 mb-4">Release Date: {props.release}</p>
          <Link
            state={{
              name: props.name,
              data: props.tmdata,
              title: props.title,
              year: props.year,
              mail: props.mail,
              city: props.city,
            }}
            to={`${props.tmdata.id}`}
            className="inline-block mt-2"
          >
            <button
              className={`bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-1100 transition duration-300 ease-in-out ${isHovered ? "animate-shake" : ""}`}
            >
              Book Ticket
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Movie;
