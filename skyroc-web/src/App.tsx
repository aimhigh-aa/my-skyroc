import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { RouterProvider } from 'react-router-dom'
import { RouterProvider as MyRouterProvider } from "@/features/router/RouterProvider";
import { StrictMode } from 'react'

import "./App.css";

function App() {
  return (
    <>
      <StrictMode>
        <MyRouterProvider/>
      </StrictMode>
    </>
  );
}

export default App;
