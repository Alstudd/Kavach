import React, { useState, useEffect, use } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddDisasterPage() {
  // location, disasterType, description, help_id, status
  const [location, setLocation] = useState("");
  const [disasterType, setDisasterType] = useState("");
  const [description, setDescription] = useState("");
  const [help_id, setHelpId] = useState("");
  const [status, setStatus] = useState("");
  const [helpData, setHelpData] = useState([]);

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

  useEffect(() => {
    try {
      const getHelpData = async () => {
        const response = await axios.get("http://localhost:3000/api/help");
        setHelpData(response.data);
      };
      getHelpData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const submitReq = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/disaster", {
        location: location,
        disasterType: disasterType,
        description: description,
        help_id: help_id,
        status: status,
      });
      console.log(res.data);

      alert("Disaster submitted successfully");
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
                <div className="text-2xl font-semibold mb-6">Add Disaster</div>
                {/* {loading ? <Spinner /> : ""} */}
                <div className="form">
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
                    Disaster Type
                  </label>
                  <select
                    id="type"
                    value={disasterType}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    onChange={(e) => setDisasterType(e.target.value)}
                  >
                    <option defaultValue="Default">
                      Choose a disaster type
                    </option>
                    <option value="earthquake">Earthquake</option>
                    <option value="tsunami">Tsunami</option>
                    <option value="flood">Flood</option>
                    <option value="landslide">Landslide</option>
                    <option value="forest_fire">Forest Fire</option>
                    <option value="hurricane">Hurricane</option>
                    <option value="tornado">Tornado</option>
                    <option value="volcano_eruption">Volcano Eruption</option>
                    <option value="chemical_leak">Chemical Leak</option>
                    <option value="nuclear_accident">Nuclear Accident</option>
                    <option value="oil_spill">Oil Spill</option>
                    <option value="industrial_fire">Industrial Fire</option>
                    <option value="transport_accident">
                      Transport Accident
                    </option>
                    <option value="disease_outbreak">Disease Outbreak</option>
                    <option value="building_collapse">Building Collapse</option>
                    <option value="dam_failure">Dam Failure</option>
                    <option value="bomb_explosion">Bomb Explosion</option>
                    <option value="hostage_crisis">Hostage Crisis</option>
                    <option value="armed_conflict">Armed Conflict</option>
                  </select>
                  <label className="text-gray-800 text-sm font-semibold">
                    Description
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required={true}
                  />
                  <label className="text-gray-800 text-sm font-semibold">
                    Choose Help ID
                  </label>
                  <select
                    id="help_id"
                    value={help_id}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    onChange={(e) => setHelpId(e.target.value)}
                  >
                    <option defaultValue="Default">Choose a help ID</option>
                    {helpData.map((help) => (
                      <option key={help._id} value={help._id}>
                        {help.description + " - " + help.location}
                      </option>
                    ))}
                  </select>
                  <label className="text-gray-800 text-sm font-semibold">
                    Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option defaultValue="Default">Choose a status</option>
                    <option value="rescued">Rescued</option>
                    <option value="on-going">On-going</option>
                  </select>
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

export default AddDisasterPage;
