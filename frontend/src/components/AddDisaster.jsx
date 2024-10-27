import React, { useState, useEffect } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function AddDisaster() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [type, setType] = useState("");

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
      const res = await addDoc(collection(db, "issue"), {
        title: title,
        desc: desc,
        location: loc,
        owner: userName,
        type: type,
        count: 1,
        status: false,
        revStat: false,
      });

      await addDoc(collection(db, `Departments/${type}/issues`), {
        title: title,
        desc: desc,
        location: loc,
        owner: userName,
        type: type,
        count: 1,
        status: false,
        revStat: false,
      });

      // const newRef = collection(db, "Departments", {type});
      // await updateDoc(washingtonRef, {
      //   count: count += 1,
      // });

      alert("Project submitted successfully");
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
                  Add a Disaster{" "}
                  <span className="text-gray-600 font-normal text-xl">
                    and get help and resources {""}
                  </span>
                  from Kavach
                </div>
                {/* {loading ? <Spinner /> : ""} */}
                <div className="form">
                  <label className="text-gray-800 text-sm font-semibold">
                    Disaster Title
                  </label>
                  <input
                    className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required={true}
                  />

                  <label className="text-gray-800 text-sm font-semibold">
                    Disaster Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
                    type="text"
                    placeholder="Enter description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required={true}
                  />

                  <label className="text-gray-800 text-sm font-semibold">
                    Disaster Location
                  </label>
                  <input
                    className="w-full border-2 border-gray-800 rounded-md px-4 py-3 mt-1 text-xs"
                    type="text"
                    placeholder="Enter the area of disaster"
                    value={loc}
                    onChange={(e) => setLoc(e.target.value)}
                    required={true}
                  />

                  <label className="text-gray-800 text-sm font-semibold">
                    Disaster Category
                  </label>
                  <select
                    id="category"
                    value={type}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option defaultValue="Default">Choose a Category</option>
                    <option value="YU3EJbpcs7lTo7Pqbgow">
                      Natural Disasters
                    </option>
                    <option value="Ang7eN63LnIbkKPTcPvx">
                      Technological Disasters
                    </option>
                    <option value="fnsyV6Ze7Ufhkxcqnq20">
                      Biological Disasters
                    </option>
                    <option value="iIntcTRGv0z8mIRXvYtL">
                      Environmental Disasters
                    </option>
                    <option value="pkAk0iVIgtzd6Y4rEWvw">
                      Human-Induced Disasters
                    </option>
                  </select>
                  <button
                    className="w-full text-center bg-gray-900 cursor-pointer font-medium hover:bg-slate-600 text-white rounded-full px-4 py-3 mt-4 text-sm"
                    type="submit"
                  >
                    Add Disaster
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

export default AddDisaster;
