import React from "react";

export default function AboutContent() {
  return (
    <div className="aboutContent__container">
      <div className="aboutContent__description" data-aos="fade-right">
        <div className="title-border"></div>
        <div className="aboutContent__description-title">
          <h1>Our Mission</h1>
        </div>
        <div className="aboutContent__description-parag1">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="aboutContent__description-parag2">
          <p>
            The passage experienced a surge in popularity during the 1960s when
            Letraset used it on their dry-transfer sheets, and again during the
            90s as desktop publishers bundled the text with their software.
            Today it's seen all around the web; on templates, websites, and
            stock designs. Use our generator to get your own, or read on for the
            authoritative history of lorem ipsum.
          </p>
        </div>
      </div>
      <div className="aboutContent__image" data-aos="fade-left">
        <div className="aboutContent__image-box">
          <img src="images/about-us.jpeg" alt="about" />
        </div>
      </div>
    </div>
  );
}
