import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

//components
import Home from "./App.jsx";
import ChatGPT from "./chat/ChatGPT.jsx";
import Record from "./pages/Record.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/record",
    element: <Record />,
  },
  {
    path: "/chatgpt",
    element: <ChatGPT />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
