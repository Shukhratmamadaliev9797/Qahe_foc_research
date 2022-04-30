import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
export default function SmallLoader() {
  return (
    <div className="smallLoader">
      <FadeLoader size={5} />
    </div>
  );
}
