import React from "react";
import Products from "./Products";

function Home() {
  console.log("process.env", process.env);
  return (
    <>
      <Products />
    </>
  );
}

export default Home;
