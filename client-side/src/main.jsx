import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./LandingPage/Home.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import MainHome from "./HomePage/MainHome.jsx";
import About from "./components/About/About.jsx";
import ReportForm from "./ReportForm/ReportForm.jsx";
import LostPersonDetail from "./components/LostPersonCard/LostPersonDetails.jsx";
import FindPerson from "./ML_call/ML.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/lostPerson-detail/:id", element: <LostPersonDetail /> },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <MainHome />,
  },
  {
    path: "/report",
    element: <ReportForm />,
  },
  {
    path: "/find",
    element: <FindPerson />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
