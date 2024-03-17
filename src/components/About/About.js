import React from "react";
import "./About.css";
import headShot from "../../images/Avatar.svg"; // Adjust the path as per your file structure

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img src={headShot} alt="Author" className="about__image" />
        <div className="about__text">
          <h2 className="about__title">About the author</h2>
          <p className="about__description">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
            <br /><br />
            You can also talk about your experience with Practicum, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
