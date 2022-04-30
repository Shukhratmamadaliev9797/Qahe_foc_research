import React from "react";
import AboutContent from "../../components/AboutContent";
import AboutHeader from "../../components/AboutHeader";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import Partners from "../../components/Partners";

export default function About() {
  return (
    <div className="about">
      <NavigationBar />
      <AboutHeader />
      <AboutContent />
      <Partners />
      <Footer />
    </div>
  );
}
