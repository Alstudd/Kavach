import { Filter, Ellipsis, Sliders, Loader2 } from "lucide-react";
import { Card } from "@tremor/react";
import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Fragment, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DisasterList = ({ showSort }) => {
  const [userAuth, setUserAuth] = useState(null);
  const [userName, setUserName] = useState("");
  const [disasters, setDisasters] = useState([]);
  const [actionOpen, setActionOpen] = useState(
    Array(disasters.length).fill(false)
  );
  const [allocateLoading, setAllocateLoading] = useState(false);
  const [volunteerLoading, setVolunteerLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [donationLoading, setDonationLoading] = useState(false);

  const handleActionOpen = (index) => {
    const newActionOpen = [...actionOpen];
    newActionOpen[index] = !newActionOpen[index];
    setActionOpen(newActionOpen);
  };

  const redirect = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(
      auth,
      (user) => {
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
      },
      (error) => {
        console.error("Auth state change error:", error);
      }
    );
    return () => {
      listen();
    };
  }, []);

  const colRef = collection(db, "issue");
  const [arr, setArr] = useState([]);

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let issues = [];
        snapshot.docs.forEach((doc) => {
          issues.push({ ...doc.data(), id: doc.id });
        });
        setArr(issues);
        console.log(issues);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    try {
      const getDisasters = async () => {
        const response = await axios.get("http://localhost:3000/api/disaster");
        setDisasters(response.data);
        console.log(response.data);
      };
      getDisasters();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const allocateResources = async (id) => {
    setAllocateLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/resource-allocation",
        {
          disaster_id: id,
        }
      );
      alert("Resources Allocated Successfully for Disaster ID: " + id);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setActionOpen(Array(disasters.length).fill(false));
      setAllocateLoading(false);
    }
  };

  const informVolunteer = async (id) => {
    setVolunteerLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/notifyvolunteer",
        {
          disaster_id: id,
          message: "Hello This is an emergency",
        }
      );
      alert("Volunteer Informed Successfully for Disaster ID: " + id);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setActionOpen(Array(disasters.length).fill(false));
      setVolunteerLoading(false);
    }
  };

  const changeStatus = async (id) => {
    setStatusLoading(true);
    try {
      const res = await axios.patch("http://localhost:3000/api/disaster", {
        disaster_id: id,
        status: "rescued",
      });
      alert("Status Changed Successfully for Disaster ID: " + id);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setActionOpen(Array(disasters.length).fill(false));
      setStatusLoading(false);
    }
  };

  const donation = async (id) => {
    setDonationLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/donation", {
        disaster_id: id,
      });
      alert("Donation link: " + res.data.link);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setActionOpen(Array(disasters.length).fill(false));
      setDonationLoading(false);
    }
  };

  return (
    <div>
      <div className={`w-full grid md:grid-cols-4 gap-5 ${showSort && "p-5"}`}>
        <Card className="col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Disaster List
            </h3>
            <Filter onClick={openModal} className="md:hidden block" />
          </div>
          <table role="list" className="w-full divide-y divide-gray-200">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="md:px-6 px-2 py-3">
                  Description
                </th>
                <th scope="col" className="md:px-6 px-2 py-3">
                  Disaster Type
                </th>
                <th scope="col" className="md:px-6 px-6 py-3">
                  Location
                </th>
                <th scope="col" className="md:px-6 px-2 py-3">
                  Status
                </th>
                <th scope="col" className="md:px-6 px-2 py-3">
                  Help ID
                </th>
                <th scope="col" className="md:px-6 px-2 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {disasters && !showSort
              ? disasters.slice(0, 5).map((values, i) => {
                  return (
                    <tr key={i} className="w-full bg-white border-b">
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-sm font-light text-gray-500">
                          {values.description.substring(0, 50)}...
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-sm font-light text-gray-500">
                          {values.disasterType}
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-base font-semibold text-gray-900">
                          {values.location}
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p
                          className={`text-sm font-light text-gray-500 ${
                            values.status === "rescued"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {values.status}
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-sm font-light text-gray-500">
                          {values.help_id}
                        </p>
                      </td>
                      <td className="relative md:px-6 px-0 py-4">
                        <button
                          onClick={() => handleActionOpen(i)}
                          className="md:inline-flex py-2 items-center text-base font-light text-blue-700"
                        >
                          <Ellipsis />
                        </button>
                        {actionOpen[i] && (
                          <div className="bg-white w-[200px] z-10 absolute -right-20 flex flex-col rounded-xl shadow-md">
                            <button
                              onClick={() => allocateResources(values._id)}
                              className="border-b-[1px] border-b-black p-2 flex gap-2 justify-center"
                            >
                              Allocate Resources
                              {allocateLoading && (
                                <Loader2 className="animate-spin" />
                              )}
                            </button>
                            <button
                              onClick={() => informVolunteer(values._id)}
                              className="border-b-[1px] border-b-black p-2 flex gap-2 justify-center"
                            >
                              Inform Volunteer
                              {volunteerLoading && (
                                <Loader2 className="animate-spin" />
                              )}
                            </button>
                            <button
                              onClick={() => changeStatus(values._id)}
                              className="p-2 flex gap-2 justify-center"
                            >
                              Change Status
                              {statusLoading && (
                                <Loader2 className="animate-spin" />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              : disasters && disasters.map((values, i) => {
                  return (
                    <tr key={i} className="w-full bg-white border-b">
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-sm font-light text-gray-500">
                          {values.description.substring(0, 50)}...
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-sm font-light text-gray-500">
                          {values.disasterType}
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-base font-semibold text-gray-900">
                          {values.location}
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p
                          className={`text-sm font-light text-gray-500 ${
                            values.status === "rescued"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {values.status}
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-sm font-light text-gray-500">
                          {values.help_id}
                        </p>
                      </td>
                      <td className="relative md:px-6 px-0 py-4">
                        <button
                          onClick={() => handleActionOpen(i)}
                          className="md:inline-flex py-2 items-center text-base font-light text-blue-700"
                        >
                          <Ellipsis />
                        </button>
                        {actionOpen[i] && (
                          <div className="bg-white w-[200px] z-10 absolute -right-20 flex flex-col rounded-xl shadow-md">
                            <button
                              onClick={() => allocateResources(values._id)}
                              className="border-b-[1px] border-b-black p-2 flex gap-2 justify-center"
                            >
                              Allocate Resources
                              {allocateLoading && (
                                <Loader2 className="animate-spin" />
                              )}
                            </button>
                            <button
                              onClick={() => informVolunteer(values._id)}
                              className="border-b-[1px] border-b-black p-2 flex gap-2 justify-center"
                            >
                              Inform Volunteer
                              {volunteerLoading && (
                                <Loader2 className="animate-spin" />
                              )}
                            </button>
                            <button
                              onClick={() => changeStatus(values._id)}
                              className="border-b-[1px] border-b-black p-2 flex gap-2 justify-center"
                            >
                              Change Status
                              {statusLoading && (
                                <Loader2 className="animate-spin" />
                              )}
                            </button>
                            <button
                              onClick={() => donation(values._id)}
                              className="p-2 flex gap-2 justify-center"
                            >
                              Web3 Donation
                              {donationLoading && (
                                <Loader2 className="animate-spin" />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
          </table>
        </Card>
        {showSort && (
          <Card className="md:block hidden relative max-h-[50vh]">
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Sorting Categories
            </h3>

            <form className="max-w-sm mx-auto">
              <label
                for="countries"
                className="block mt-3 mb-1 text-sm font-medium text-gray-900"
              >
                Select a Location
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option selected>Choose a Location</option>
                <option value="NSP">Nallasopara</option>
                <option value="Malad">Malad</option>
                <option value="Andheri">Andheri</option>
              </select>

              <label
                for="countries"
                className="block mt-3 mb-1 text-sm font-medium text-gray-900"
              >
                Select a Disaster Category
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option selected>Choose a Category</option>
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
                <option value="transport_accident">Transport Accident</option>
                <option value="disease_outbreak">Disease Outbreak</option>
                <option value="building_collapse">Building Collapse</option>
                <option value="dam_failure">Dam Failure</option>
                <option value="bomb_explosion">Bomb Explosion</option>
                <option value="hostage_crisis">Hostage Crisis</option>
                <option value="armed_conflict">Armed Conflict</option>
              </select>

              <button
                type="button"
                className="flex my-3 gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <Sliders size={20} />
                Sort by Count
              </button>

              <div className="absolute bottom-5 right-5 rounded-full p-3 bg-gray-200">
                <Filter />
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DisasterList;
