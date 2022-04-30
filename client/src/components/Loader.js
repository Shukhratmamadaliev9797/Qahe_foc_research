import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Loader() {
  return (
    <div className="loader">
      <ScaleLoader size={20} />
    </div>
  );
}
