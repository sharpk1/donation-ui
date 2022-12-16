import React from "react";
import Navbar from "./Navbar";
import Donation from "./Donation";

const Home = () => {
  return (
    <>
      {/* TODO: Can the navbar be in a more central place? Yes. Look out how to add a ternary around it for authcontext */}
      <Navbar />
      <Donation />
    </>
  );
};

export default Home;
