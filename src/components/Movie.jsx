import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Movie(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="group flex flex-col h-full rounded-lg shadow-lg bg-white overflow-hidden transition-transform duration-300 ease-in-out active:scale-95 sm:hover:-translate-y-1 sm:hover:shadow-2xl">
      <div className="overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w300/` + props.poster}
          alt={props.title}
          className="w-full h-40 xs:h-48 sm:h-64 md:h-72 object-cover transition-transform duration-300 ease-in-out sm:group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 p-2 sm:p-4">
        <h2 className="text-xs sm:text-base md:text-lg font-semibold text-gray-900 line-clamp-2">
          {props.title}
        </h2>
        <p className="text-[10px] sm:text-sm text-gray-500 mt-1 mb-2 sm:mb-4">
          {props.release}
        </p>
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
          className="mt-auto"
        >
          <button className="w-full bg-green-500 text-white py-1.5 sm:py-2 px-2 rounded-lg text-[11px] sm:text-sm font-medium hover:bg-green-600 active:scale-95 transition duration-200">
            Book Ticket
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Movie;
