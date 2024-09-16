'use client';
import React from "react";
import styles from '../../../../styles/course.module.css';

interface CourseType {
  id: number;
  title: string;
  description: string;
  instructor: string;
}

interface CourseProps {
  course: CourseType;
}

const Course: React.FC<CourseProps> = ({ course }) => {
    return (
    <div className={styles.coursecard}>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p><strong>Instructor:</strong> {course.instructor}</p>
    </div>
  );
};

export default Course;
