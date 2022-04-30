import React from "react";
import Articles from "../../components/Articles";
import Events from "../../components/Events";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Members from "../../components/Members";
import NavigationBar from "../../components/NavigationBar";
import Partners from "../../components/Partners";

export default function Home() {
  return (
    <div className="home">
      <NavigationBar />
      <Header />
      <Events />
      <Members />
      <Articles />
      <Partners />
      <Footer />
    </div>
  );
}
