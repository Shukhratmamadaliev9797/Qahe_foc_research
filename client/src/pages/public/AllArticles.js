import React from "react";
import Allarticles from "../../components/Allarticles";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";

export default function AllArticles() {
  return (
    <div>
      <NavigationBar />
      <Allarticles />
      <Footer />
    </div>
  );
}
