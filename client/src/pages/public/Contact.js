import React from "react";
import ContactContent from "../../components/ContactContent";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import Partners from "../../components/Partners";

export default function Contact() {
  return (
    <div>
      <NavigationBar />
      <ContactContent />
      <Partners />
      <Footer />
    </div>
  );
}
