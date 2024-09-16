import styles from '../../../../styles/course.module.css';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

const CoursePage = () => {
    return (
        <div className={styles.container}>
            Edit Course Page!
            <div>
                <Link href="/teacher/create">
                    <Button>New Course</Button>
                </Link>
            </div>
        </div>
    );
}

export default CoursePage;