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

const ResourceList = ({ showSort }) => {
  const [userAuth, setUserAuth] = useState(null);
  const [userName, setUserName] = useState("");
  const [resources, setResources] = useState([]);
  const [actionOpen, setActionOpen] = useState(
    Array(resources.length).fill(false)
  );
  const [allocateLoading, setAllocateLoading] = useState(false);
  const [volunteerLoading, setVolunteerLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

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
      const getResources = async () => {
        const response = await axios.get("http://localhost:3000/api/resource");
        setResources(response.data);
        console.log(response.data);
      };
      getResources();
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

  return (
    <div>
      <div className={`w-full grid md:grid-cols-4 gap-5 ${showSort && "p-5"}`}>
        <Card className="col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Resource List
            </h3>
            <Filter onClick={openModal} className="md:hidden block" />
          </div>
          <table role="list" className="w-full divide-y divide-gray-200">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="md:px-6 px-2 py-3">
                  Resource Name
                </th>
                <th scope="col" className="md:px-6 px-2 py-3">
                  Resource Type
                </th>
                <th scope="col" className="md:px-6 px-6 py-3">
                  Location
                </th>
                <th scope="col" className="md:px-6 px-2 py-3">
                  Quantity
                </th>
              </tr>
            </thead>
            {resources && !showSort
              ? resources.slice(0, 5).map((values, i) => {
                  return (
                    <tr key={i} className="w-full bg-white border-b">
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-sm font-light text-gray-500">
                          {values.resourceName}
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-sm font-light text-gray-500">
                          {values.type}
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-base font-light text-gray-900">
                          {values.location}
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-base font-light text-gray-900">
                          {values.quantity}
                        </p>
                      </td>
                    </tr>
                  );
                })
              : resources &&
                resources.map((values, i) => {
                  return (
                    <tr key={i} className="w-full bg-white border-b">
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-sm font-light text-gray-500">
                          {values.resourceName}
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-sm font-light text-gray-500">
                          {values.type}
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-base font-light text-gray-900">
                          {values.location}
                        </p>
                      </td>
                      <td className="md:px-6 px-0 py-4">
                        <p className="text-base font-light text-gray-900">
                          {values.quantity}
                        </p>
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
                Select a Resource Category
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option selected>Choose a Category</option>
                <option value="medical">Medical</option>
                <option value="rescue">Rescue</option>
                <option value="shelter">Shelter</option>
                <option value="food_water">Food and Water</option>
                <option value="communication">Communication</option>
                <option value="transportation">Transportation</option>
                <option value="protective_gear">Protective Gear</option>
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

export default ResourceList;
