import React from "react";
import AllEvents from "../../components/AllEvents";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";

export default function UpcomingEvents() {
  return (
    <>
      <NavigationBar />
      <AllEvents />
      <Footer />
    </>
  );
}
