import React, { useState } from "react";
import cities from "../cities";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCityval } from "../redux/userSlice";
import bgImage from '../images/photo_city.avif';

export default function Ticket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [city, setCity] = useState(user.city);

  const handleCitySelect = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    dispatch(setCityval({ city: selectedCity }));
    localStorage.setItem("user", JSON.stringify({
      ...user,
      city: selectedCity
    }));
  };

  const handleConfirm = () => {
    if (city) {
      navigate(`/${city}/movie`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen"style={{ backgroundImage: `url( ${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',minHeight : 'screen'}} >
      <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Select a city:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {cities.map((data, index) => (
            <label key={index} className="relative flex items-center justify-center  rounded-lg p-2 bg-gray-800 cursor-pointer transition-all duration-200">
              <input
                type="radio"
                className="hidden"
                name="rad"
                value={data.name}
                checked={city === data.name}
                onChange={handleCitySelect}
              />
              <div className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full border-2 border-transparent ${city === data.name ? 'border-blue-500' : 'border-gray-500'}`}>
                {city === data.name && (
                  <div className="w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-pink-800"></div>
                )}
              </div>
              <div className="text-white text-sm sm:text-base ml-2">{data.name}</div>
            </label>
          ))}
        </div>
        <button
          type="button"
          className={`mt-4 mb-0 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${!city ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleConfirm}
          disabled={!city}
        >
          Confirm city
        </button>
      </div>
    </div>
  );
}
