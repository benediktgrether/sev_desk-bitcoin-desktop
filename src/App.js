import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import "./css/main.css";

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
