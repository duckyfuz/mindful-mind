import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

//components
import Home from "./App.jsx";
import chatGPT from "./chatGPT/chatGPT.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/record",
    element: <div>Change the component here! </div>,
  },
  {
    path: "/chatgpt",
    element: <chatGPT />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
