'use client';

import React from 'react';
import styles from '../../../../styles/course.module.css'
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  title: string;
  description: string;
  provider: string;
  type: string;
  courseId: string;
}


const CourseCard: React.FC<CourseCardProps> = ({ title, description, provider, type, courseId }) => {
    const router = useRouter();
  
    const handleCardClick = () => {
        router.push(`/lessons/${courseId}`);
    };
  
    return (
      <div className={styles.coursecard} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <div className={`coursetype ${type.toLowerCase().replace(/\s+/g, '-')}`}>
          {type}
        </div>
        <h3 className={styles.coursetitle}>{title}</h3>
        <p className={styles.coursedescription}>{description}</p>
        <div className={styles.coursefooter}>
          <span className={styles.providername}>{provider}</span>
        </div>
      </div>
    );
  };
  
  export default CourseCard;