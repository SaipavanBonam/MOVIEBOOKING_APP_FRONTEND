import React, { useState, useEffect } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux } from "../redux/userSlice";

export default function Nav() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [name, setName] = useState();
  const [mail, setMail] = useState();
  const [city, setCity] = useState();
  const [centredModal, setCentredModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setName(user.name);
    setCity(user.city);
    setMail(user.email);
  }, [user]);

  const toggleShow = () => setCentredModal(!centredModal);

  const handleSubmit = async () => {
    const result = await fetch("https://moviebooking-app-backend.onrender.com/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const response = await result.json();
    alert(response.message);
    dispatch(logoutRedux());
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const handleUnload = (event) => {
      event.preventDefault();
      navigate("/");
      // Perform logout actions
      handleSubmit();
    };
  }, []);

  return (
    <>
      <div className="  bg-gray-800 px-8 py-2">
    <div className=" flex flex-row justify-between ">
      <Link to="/home" className="text-xl text-white font-bold pt-2 ">
        MovieTime
      </Link>

            <div className="flex p-2 justify-between">
                <div>
                <Link
                  to={`/${city}/movie`}
                  className="text-white hover:text-gray-300"
                >
                  Home
                </Link>
                </div>
                <div>
                <Link
                  to="/about"
                  state={{ name: name, mail: mail, city: city }}
                  className="text-white hover:text-gray-300 mx-10"
                >
                  About
                </Link>
                </div>
                <div>
                <Link
                  to="/bookings"
                  className="text-white hover:text-gray-300"
                >
                  Bookings
                </Link>
                </div>
            </div>

            <div className="flex items-center space-x-4 p-2">
              <div className="flex items-center">
                <div className="data-container bg-white rounded-full p-2 text-sm">
                  <span className="text-gray-900">
                    <i className="fas fa-map-marker-alt"></i> {city}
                  </span>
                  <Link
                    to="/home"
                    className="text-blue-500 hover:text-blue-700 ml-1"
                    data-tooltip-content="Change city"
                    data-tooltip-place="bottom"
                  >
                    <i
                      className="fas fa-caret-down cursor-pointer"
                      onClick={toggleShow}
                    ></i>
                  </Link>
                </div>
                <Tooltip id="my-tooltip3" />
              </div>

              <div>
                <Link
                  className="text-blue-500 hover:text-blue-700"
                  data-tooltip-content="User Details"
                  data-tooltip-place="bottom"
                >
                  <button
                    className="circle border-radius-1 bg-gray-200 text-white p-1 rounded-full focus:outline-none"
                    onClick={toggleShow}
                  >
                    <img
                      src="https://media.geeksforgeeks.org/img-practice/user_web-1598433228.svg"
                      alt="User"
                      className="h-8"
                    />
                  </button>
                </Link>
                <Tooltip id="my-tooltip2" />
                <MDBModal
                  tabIndex="-1"
                  show={centredModal}
                  setShow={setCentredModal}
                >
                  <MDBModalDialog centered size="lg">
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>User Details</MDBModalTitle>
                      </MDBModalHeader>
                      <MDBModalBody>
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              src="https://media.geeksforgeeks.org/img-practice/user_web-1598433228.svg"
                              alt="User"
                              className="h-32 w-32 object-cover rounded-full"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-lg font-semibold">{name}</p>
                            <p className="text-gray-700">{mail}</p>
                          </div>
                        </div>
                      </MDBModalBody>
                      <MDBModalFooter>
                        <button
                          className="text-blue-500 hover:text-blue-700 ml-auto"
                          onClick={toggleShow}
                        >
                          Close
                        </button>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                          onClick={handleSubmit}
                        >
                          Log Out
                        </button>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              </div>
            </div>
          </div>
        </div>

      <Outlet />
    </>
  );
}
