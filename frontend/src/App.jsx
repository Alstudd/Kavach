import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Main from "./layouts/Main";
import SpeechChatbot from "./components/SpeechChatbot";
import TTS from "./components/TTS";
import Chatbot from "./components/Chatbot";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import DisasterList from "./components/DisasterList";
import Nav from "./components/Nav";
import Disaster from "./components/Disaster";
import DummyData from "./components/DummyData";
import UserDisasterList from "./components/UserDisasterList";
import UserDisaster from "./components/UserDisaster";
import Contact from "./components/Contact";
import WeatherData from "./components/WeatherData";
import AddDisaster from "./components/AddDisaster";
import AddHelp from "./components/AddHelp";
import AddResource from "./components/AddResource";
import AddDisasterPage from "./components/AddDisasterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <div>
            <Nav />
            <Login />
          </div>
        ),
      },
      {
        path: "/joytest",
        element: (
          <div>
            <Nav />
            <SpeechChatbot />
          </div>
        ),
      },
      {
        path: "/chatbot",
        element: (
          <div>
            <Nav />
            <Chatbot />
          </div>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <div>
            <Nav />
            <div className="bg-gray-100 ">
              <Dashboard />
            </div>
          </div>
        ),
      },
      {
        path: "/weather-data",
        element: (
          <div>
            <Nav />
            <div className="bg-gray-100 ">
              <WeatherData />
            </div>
          </div>
        ),
      },
      {
        path: "/disasters",
        element: (
          <div className="md:min-h-[100vh] min-h-full bg-gray-100 ">
            <Nav />
            <DisasterList />
          </div>
        ),
      },
      {
        path: "/add-disaster",
        element: (
          <div className="md:min-h-[100vh] min-h-full bg-gray-100 ">
            <Nav />
            <AddDisaster />
          </div>
        ),
      },
      {
        element: (
          <div className="md:min-h-[100vh] min-h-full bg-gray-100 ">
            <Nav />
            <Disaster />
          </div>
        ),
        path: "disasters/:disasterId",
      },
      {
        path: "/user-dashboard",
        element: (
          <div className="md:min-h-[100vh] min-h-full bg-gray-100 ">
            <Nav />
            <DummyData />
          </div>
        ),
      },
      {
        path: "/user-disaster",
        element: (
          <div className="md:min-h-[100vh] min-h-full bg-gray-100 ">
            <Nav />
            <UserDisasterList />
          </div>
        ),
      },
      {
        element: (
          <div className="md:min-h-[100vh] min-h-full bg-gray-100 ">
            <Nav />
            <UserDisaster />
          </div>
        ),
        path: "user-disaster/:disasterId",
      },
      {
        path: "/contact",
        element: (
          <div>
            <Nav />
            <Contact />
          </div>
        ),
      },
      {
        path: "/add-help",
        element: (
          <div className="md:min-h-[100vh] min-h-full bg-gray-100 ">
            <Nav />
            <AddHelp />
          </div>
        ),
      },
      {
        path: "/add-resource",
        element: (
          <div className="md:min-h-[100vh] min-h-full bg-gray-100 ">
            <Nav />
            <AddResource />
          </div>
        ),
      },
      {
        path: "/add-disaster-page",
        element: (
          <div className="md:min-h-[100vh] min-h-full bg-gray-100 ">
            <Nav />
            <AddDisasterPage />
          </div>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
