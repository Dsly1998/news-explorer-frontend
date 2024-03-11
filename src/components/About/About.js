import React from "react";
import "./About.css";
import headShot from "../../images/Headshot .png"; // Adjust the path as per your file structure

function About() {
  return (
    <div className="about">
      <img src={headShot} alt="Author" className="about__image" />
      <div className="about__text">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          Hello! I'm Dallin Sly, an aspiring software engineer with a deep
          enthusiasm for technology and crafting interactive web experiences.
          With a solid grounding in HTML, CSS, JavaScript, and React, my focus
          is on building dynamic, user-friendly web applications that engage and
          inspire.
          <br />
          <br />
          At Practicum, I honed essential software engineering skills, focusing
          on practical problem-solving and clean coding practices. This training
          has equipped me to effectively address clients' needs, ensuring both
          efficient project execution and clear, communicative collaboration.
        </p>
      </div>
    </div>
  );
}

export default About;
