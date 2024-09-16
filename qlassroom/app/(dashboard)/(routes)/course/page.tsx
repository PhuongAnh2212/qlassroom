import styles from '../../../styles/course.module.css';
import CoursesList from './_components/courselist';

const CoursePage = () => {
    return (
        <div className={styles.container}>
            <h1>Available Courses</h1>
            <CoursesList /> 
        </div>
    );
}

export default CoursePage;