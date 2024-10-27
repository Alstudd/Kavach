import React, { useState, useEffect } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddHelp() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [userAuth, setUserAuth] = useState(null);
  const [userName, setUserName] = useState("");

  const redirect = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(user);
        setUserName(user.email);
      } else {
        redirect("/");
        setTimeout(() => {
          alert("Please login to continue!");
        }, 500);
        setUserAuth(null);
      }
    });
    return () => {
      listen();
    };
  });

  const submitReq = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/help", {
        phoneNumber: phoneNumber,
        description: description,
        image_url: imageUrl,
        location: location,
        State: state,
        City: city,
      });
      console.log(res.data);

      alert("Help submitted successfully");
    } catch (e) {
      alert("Project not submitted");
      console.log(e);
    }
    e.target.reset();
  };
  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-center">
        {/* <img src="" alt="some dumb image" /> */}
        <div>
          <form
            onSubmit={submitReq}
            className="flex items-center justify-center p-8"
          >
            <div className="w-[400px] bg-white border border-gray-300 shadow-2xl rounded-lg h-fit p-4">
              <div className="border-gray-300 px-4 py-4">
                <div className="text-2xl font-semibold mb-6">
                  Get help from Kavach
                </div>
                {/* {loading ? <Spinner /> : ""} */}
                <div className="form">
                  <label className="text-gray-800 text-sm font-semibold">
                    Phone number
                  </label>
                  <input
                    className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
                    type="number"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required={true}
                  />

                  <label className="text-gray-800 text-sm font-semibold">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required={true}
                  />

                  <label className="text-gray-800 text-sm font-semibold">
                    Image URL
                  </label>
                  <input
                    className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
                    type="text"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required={true}
                  />

                  <label className="text-gray-800 text-sm font-semibold">
                    Location
                  </label>
                  <input
                    className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required={true}
                  />

                  <label className="text-gray-800 text-sm font-semibold">
                    State
                  </label>
                  <input
                    className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
                    type="text"
                    placeholder="Enter state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required={true}
                  />

                  <label className="text-gray-800 text-sm font-semibold">
                    City
                  </label>
                  <input
                    className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required={true}
                  />
                  <button
                    className="w-full text-center bg-gray-900 cursor-pointer font-medium hover:bg-slate-600 text-white rounded-full px-4 py-3 mt-4 text-sm"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <img src="/wave.svg" alt="" />
    </div>
  );
}

export default AddHelp;
