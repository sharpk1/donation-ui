import React from "react";
import Navbar from "./Navbar";
import Example from "./Example";

const Home = () => {
  return (
    <>
      {/* TODO: Can the navbar be in a more central place? Yes. Look out how to add a ternary around it for authcontext */}
      <Navbar />
      <Example />
    </>
  );
};

export default Home;
