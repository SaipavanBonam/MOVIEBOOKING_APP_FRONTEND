import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { CToast, CToastHeader, CToastBody, CToaster } from "@coreui/react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

function Payment() {
  const location = useLocation();

  const cost = location.state.totalcost;
  const count = location.state.counts;
  const theater = location.state.theatre;
  const time = location.state.time;
  const date = location.state.date;
  const name = location.state.name;
  const title = location.state.title;
  const photo = location.state.photo;
  const mail = location.state.mail;
  const city = location.state.city;

  const [activeb, setactiveb] = useState(null);
  const [app, setApp] = useState(null);
  const [centredModal, setCentredModal] = useState(false);
  const [number, setNumber] = useState("");
  const [tar, setTarget] = useState(false);
  const [centredModal1, setCentredModal1] = useState(false);
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const num = cost / count;
  const num1 = cost + 20;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleSelect(data) {
    setactiveb(data);
  }

  const exampleToast = (
    <CToast>
      <CToastHeader autohide={true}>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="black"></rect>
        </svg>
        <div className="fw-bold me-auto">Wait {name}</div>
        <small></small>
      </CToastHeader>
      <CToastBody>
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        &nbsp;Payment is processing....
      </CToastBody>
    </CToast>
  );
  // const [number, setNumber] = useState("");
  // const [tar, setTarget] = useState(false);
  const [error, setError] = useState("");

  const handleNumberChange = (e) => {
    const inputNumber = e.target.value;
    setNumber(inputNumber);
    if (inputNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
    } else {
      setError("");
    }
  };
  return (
    <div id="payment" className="bg-gray-800 flex flex-col items-center justify-center min-h-screen text-white">
      <div className="payment bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between mb-8 w-full max-w-4xl">
        <div className="pay-photo mr-4 px-8">
          <img
            className="rounded-lg"
            src={`https://image.tmdb.org/t/p/w500/${photo}`}
            alt={title}
            height="300"
            width="300"
          />
        </div>
        <div className="pay-content">
          <p className="text-white font-bold text-lg mb-2">{title}</p>
          <p className="text-white text-sm mb-2">
            {date} - {time}
          </p>
          <div className="pay-cost grid grid-cols-2 gap-4">
            <div>
              <p className="text-white text-sm">Cost of each ticket</p>
              <p className="text-white font-bold text-lg">
                <i className="fas fa-rupee-sign"></i> {num}.00
              </p>
            </div>
            <div>
              <p className="text-white text-sm">No. of tickets</p>
              <p className="text-white font-bold text-lg">{count}</p>
            </div>
            <div>
              <p className="text-white text-sm">Sub Total</p>
              <p className="text-white font-bold text-lg">
                <i className="fas fa-rupee-sign"></i> {cost}.00
              </p>
            </div>
            <div>
              <p className="text-white text-sm">Commission Fee</p>
              <p className="text-white font-bold text-lg">
                <i className="fas fa-rupee-sign"></i> 20.00
              </p>
            </div>
            <div className="col-span-2">
              <hr className="my-4 border-white" />
            </div>
            <div>
              <p className="text-white text-sm">Total Amount:</p>
              <p className="text-white font-bold text-lg">
                <i className="fas fa-rupee-sign"></i> {num1}.00
              </p>
            </div>
          </div>
        </div>
      </div>

    <div className="payment-cost bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
  <h1 className="font-bold text-white">Select payment method</h1>
  <div className="pay-cost flex justify-between mt-4">
    <button
      className={`paycost-button ${activeb === "button1" ? "border-black transform scale-125" : "border-gray-200"} flex items-center justify-center rounded-full p-4 focus:outline-none mr-2`}
      onClick={() => {
        handleSelect("button1");
        setApp("Google-pay");
      }}
    >
      <i className="fab fa-google-pay fa-2x text-red-500"></i>
    </button>
    <button
      className={`paycost-button ${activeb === "button2" ? "border-blue transform scale-125" : "border-gray-200"} flex items-center justify-center rounded-full p-4 focus:outline-none mr-2`}
      onClick={() => {
        handleSelect("button2");
        setApp("Amazon-pay");
      }}
    >
      <i className="fab fa-amazon-pay fa-2x text-gray-700"></i>
    </button>
    <button
      className={`paycost-button ${activeb === "button3" ? "border-black transform scale-125" : "border-gray-200"} flex items-center justify-center rounded-full p-4 focus:outline-none mr-2`}
      onClick={() => {
        handleSelect("button3");
        setApp("Visa");
      }}
    >
      <i className="fab fa-cc-visa fa-2x text-indigo-600"></i>
    </button>
    <button
      className={`paycost-button ${activeb === "button4" ? "border-white transform scale-150" : "border-gray-00"} flex items-center justify-center rounded-full p-4 focus:outline-solid`}
      onClick={() => {
        handleSelect("button4");
        setApp("Apple-pay");
      }}
    >
      <i className="fab fa-cc-apple-pay fa-2x text-black"></i>
    </button>
  </div>
        {activeb && (
          <div className="payconfirm mt-4">
            <button
              className="payconfirm-button bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg focus:outline-none"
              onClick={() =>
                setTimeout(() => setCentredModal(!centredModal), 100)
              }
            >
              Pay &nbsp;
              <i className="fas fa-rupee-sign"></i>
              &nbsp;
              {num1}.00
            </button>
          </div>
        )}
        <CToaster ref={toaster} push={toast} placement="top-end" />
        <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
          <MDBModalDialog top size="md">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle></MDBModalTitle>
              </MDBModalHeader>
              <MDBModalBody>
      <div className="p-6 bg-white rounded-lg text-black">
        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter mobile number"
            onChange={handleNumberChange}
            value={number}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            onClick={() => setTarget(!tar)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700">
            &nbsp;I am not a Robot
          </label>
        </div>
      </div>
    </MDBModalBody>

              <MDBModalFooter>
                {tar && number?.length === 10 && (
                  <div className="payconfirm">
                    <button
                      className="payconfirm-button bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg focus:outline-none"
                      onClick={() => {
                        addToast(exampleToast);
                        setTimeout(() => setCentredModal1(!centredModal1), 5000);
                      }}
                    >
                      Add payment
                    </button>
                  </div>
                )}
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        <MDBModal tabIndex="-1" show={centredModal1} setShow={setCentredModal1}>
          <MDBModalDialog top size="md">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle></MDBModalTitle>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="gfg">
                  <div className="gfg-content" id="gfg-content">
                    <div className="pay-details flex items-center justify-center mb-4">
                      <i className="fas fa-check-circle fa-3x text-black"></i>
                    </div>
                    <div className="pay-details text-center">
                      <b className="text-lg font-bold text-black">
                        Your payment is successful .....
                      </b>
                      <div className="payconfirm mt-4">
                       {  /*<Link
                          state={{ name: name, city: city, mail: mail }}
                          to={`/${city}/movie`}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg focus:outline-none mr-2"
                        >
                          Back to Movies
                        </Link> */}
                        <Link
                          state={{
                            totalcost: cost,
                            counts: count,
                            theatre: theater,
                            time: time,
                            date: date,
                            name: name,
                            title: title,
                            photo: photo,
                            payoption: app,
                            mail: mail,
                            city: city,
                            number: number,
                          }}
                          to="success"
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg focus:outline-none"
                        >
                          Check Ticket
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </MDBModalBody>
              <MDBModalFooter></MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    </div>
  );
}

export default Payment;
