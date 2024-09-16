import React from 'react';
import styles from '../../../styles/about.module.css';

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <h1 className={styles.title}>About Our LMS Platform</h1>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Introduction</h2>
        <p className={styles.text}>
          Our Learning Management System (LMS) is designed to provide a comprehensive platform
          for online education and training. Whether you're a student, teacher, or administrator,
          our platform makes it easy to create, manage, and participate in learning experiences
          from anywhere.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Platform Features</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>User-friendly interface for students and instructors</li>
          <li className={styles.listItem}>Support for a wide range of course formats</li>
          <li className={styles.listItem}>Real-time analytics and reporting</li>
          <li className={styles.listItem}>Customizable learning paths</li>
          <li className={styles.listItem}>Mobile-responsive for learning on the go</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Benefits</h2>
        <p className={styles.text}>
          Our LMS enhances the learning experience by providing easy access to courses and resources,
          enabling collaboration, and offering tools for both synchronous and asynchronous learning.
          Whether you’re a large institution or an individual learner, our platform can be tailored
          to meet your needs.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Our Mission</h2>
        <p className={styles.text}>
          We aim to bridge the gap between educators and learners, offering flexible and innovative
          solutions to empower individuals through education. Our goal is to create an environment
          that fosters continuous learning, personal growth, and academic success.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Contact Us</h2>
        <p className={styles.text}>
          For more information, feel free to reach out to our support team at
          <a href="mailto:support@lmsplatform.com" className={styles.link}> support@forthai.com</a>.
        </p>
      </section>
    </div>
  );
};

export default About;
