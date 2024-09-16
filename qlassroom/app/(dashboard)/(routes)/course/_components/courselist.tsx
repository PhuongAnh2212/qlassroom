'use client';
import React, { useEffect, useState } from 'react';
import CourseCard from '../_components/coursecard';
import styles from '../../../../styles/course.module.css';

interface Course {
    id: string;
    title: string;
    description: string;
    provider: string;
    type: string;
    courseId: string;
}

const CourseList: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await fetch('/api/course');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchCourses();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Available Courses</h1>
            <div className={styles.courseslist}>
                {courses.map((course) => (
                    <CourseCard
                        key={course.id} 
                        title={course.title}
                        description={course.description}
                        provider={course.provider}
                        type={course.type}
                        courseId={course.courseId}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseList;
