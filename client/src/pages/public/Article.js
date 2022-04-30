import React from "react";
import ArticleContent from "../../components/ArticleContent";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";

export default function Article() {
  return (
    <div>
      <NavigationBar />
      <ArticleContent />
      <Footer />
    </div>
  );
}
