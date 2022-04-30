import React from "react";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import ProfileContent from "../../components/ProfileContent";

export default function Profile() {
  return (
    <div>
      <NavigationBar />
      <ProfileContent />
      <Footer />
    </div>
  );
}
