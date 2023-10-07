import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

//components
import App from "./App.jsx";
import Entry from "./chat/Entry.jsx";
import Record from "./pages/Record.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/record",
    element: <Record />,
  },
  {
    path: "/entry",
    element: <Entry />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
