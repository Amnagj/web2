import React from 'react';
import './Courses.css';
import im1 from './img/react2.jpg';
import im2 from './img/course2.jpg';
import im3 from './img/cours3.jpg';
import im4 from './img/cours4.jpg';
import im5 from './img/cours5.jpg';
import im6 from './img/cours6.webp';
import im7 from './img/cours7.webp';
import im8 from './img/cours8.webp';


function Courses() {
  return (
    <section className="courses">
      <h2>Our Online Courses</h2>
      <div className="course-container">
        <div className="course">
          <img src={im1} alt="Course 1" />
          <h3>Course 1: Introduction to React</h3>
          <p>Learn the basics of React with hands-on exercises and real-life examples.</p>
          <a href="#course1" className="btn">Learn More</a>
        </div>
        <div className="course">
          <img src={im2} alt="Course 2" />
          <h3>Course 2: Web Development with Django</h3>
          <p>Master web application development using the Django framework.</p>
          <a href="#course2" className="btn">Learn More</a>
        </div>
        <div className="course">
          <img src={im3} alt="Course 3" />
          <h3>Course 3: Python for Data Science</h3>
          <p>A complete training on Python for data processing and AI applications.</p>
          <a href="#course3" className="btn">Learn More</a>
        </div>
        <div className="course">
          <img src={im4} alt="Course 4" />
          <h3>Course 4: Cybersecurity Basics</h3>
          <p>Understand the fundamentals of digital security, ethical hacking, and protecting sensitive data.</p>
          <a href="#course4" className="btn">Learn More</a>
        </div>
        <div className="course">
          <img src={im5} alt="Course 5" />
          <h3>Course 5: Cloud Computing with AWS</h3>
          <p>Master cloud deployment, storage solutions, and server management on Amazon Web Services.</p>
          <a href="#course5" className="btn">Learn More</a>
        </div>
        <div className="course">
          <img src={im6} alt="Course 6" />
          <h3>Course 6: Big Data Analytics with Spark</h3>
          <p>An in-depth course on processing massive datasets with Apache Spark and Hadoop.</p>
          <a href="#course6" className="btn">Learn More</a>
        </div>
        <div className="course">
          <img src={im7} alt="Course 7" />
          <h3>Course 7 : UI/UX Design Foundations</h3>
          <p>Learn the principles of user-centric design with practical projects using Figma and Adobe XD.</p>
          <a href="#course7" className="btn">Learn More</a>
        </div>
        <div className="course">
          <img src={im8} alt="Course 8" />
          <h3>Course 8: Mobile App Development with Flutter</h3>
          <p>Create cross-platform mobile applications with a focus on usability and functionality using Flutter and Dart.</p>
          <a href="#course8" className="btn">Learn More</a>
        </div>
      </div>
    </section>
  );
}

export default Courses;
