import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {router} from './router/index'

import { RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'

import "./App.css";

function App() {
  return (
    <>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </>
  );
}

export default App;
