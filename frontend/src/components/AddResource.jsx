import React, { useState, useEffect } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddResource() {
  // resourceName, type, quantity, location
  const [resourceName, setResourceName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("");

  const [userAuth, setUserAuth] = useState(null);
  const [userName, setUserName] = useState("");

  const redirect = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === "alstudd17@gmail.com") {
          setUserAuth(user);
          setUserName(user.email);
        } else {
          redirect("/");
          setTimeout(() => {
            alert("You are not authorized to access this page!");
          }, 500);
          setUserAuth(null);
        }
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
      const res = await axios.post("http://localhost:3000/api/resource", {
        resourceName: resourceName,
        type: type,
        quantity: quantity,
        location: location,
      });
      console.log(res.data);

      alert("Resource submitted successfully");
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
                <div className="text-2xl font-semibold mb-6">Add Resource</div>
                {/* {loading ? <Spinner /> : ""} */}
                <div className="form">
                  <label className="text-gray-800 text-sm font-semibold">
                    Resource Name
                  </label>
                  <input
                    className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
                    type="text"
                    placeholder="Enter resource name"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                    required={true}
                  />
                  <label className="text-gray-800 text-sm font-semibold">
                    Resource Type
                  </label>
                  <select
                    id="resourceType"
                    value={type}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option defaultValue="Default">Choose a resource type</option>
                    <option value="medical">Medical</option>
                    <option value="rescue">Rescue</option>
                    <option value="shelter">Shelter</option>
                    <option value="food_water">Food and Water</option>
                    <option value="communication">Communication</option>
                    <option value="transportation">Transportation</option>
                    <option value="protective_gear">Protective Gear</option>
                  </select>
                  <label className="text-gray-800 text-sm font-semibold">
                    Quantity
                  </label>
                  <input
                    className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
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
      <img className="fixed bottom-0" src="/wave.svg" alt="" />
    </div>
  );
}

export default AddResource;
