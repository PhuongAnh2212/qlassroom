'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useMemo } from 'react';
import styles from '../../../../styles/lessonpage.module.css'; // Update the path according to your structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Notebook from './_components/notebook';

interface Lesson {
  title: string;
  description: string;
  content: string;
  videoUrl: string;
}

interface Lessons {
  [key: string]: Lesson[];
}

const LessonPage: React.FC = () => {
  const { push } = useRouter(); // Use push for navigation
  const pathname = usePathname(); // Get the current path
  const courseId = pathname?.split('/')[2] || ''; // Extract courseId from path

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isListCollapsed, setIsListCollapsed] = useState<boolean>(false);

  const lessons: Lessons = {
    'course-1': [
      {
        title: 'Lesson 1: Introduction to Course 1',
        description: 'This is the first lesson of Course 1, covering the basics.',
        content: 'https://natsun08.github.io/test/notebooks/index.html?path=pyodide%2Faltair.ipynb',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        title: 'Lesson 2: Deep Dive into Course 1',
        description: 'This lesson takes a deeper look...',
        content: 'https://natsun08.github.io/test/notebooks/index.html?path=pyodide%2Ffolium.ipynb',
        videoUrl: 'https://www.youtube.com/embed/K1RUTC0oUn8'
      }
    ],
    // Define other courses similarly
  };

  const currentLessons = useMemo(() => {
    return courseId && lessons[courseId] ? lessons[courseId] : [];
  }, [courseId, lessons]);

  useEffect(() => {
    console.log('Course ID:', courseId);
    console.log('Current Lessons:', currentLessons);
  }, [courseId, currentLessons]);

  const handleLessonClick = (lesson: Lesson) => {
    console.log('Lesson clicked:', lesson);
    setSelectedLesson(lesson);
  };

  const toggleSidebar = () => {
    console.log('Toggling sidebar:', isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleList = () => {
    console.log('Toggling list:', isListCollapsed);
    setIsListCollapsed(!isListCollapsed);
  };

  return (
    <div className={styles.lessonPage}>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isSidebarOpen ? faChevronLeft : faChevronRight} />
      </button>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
        <h1 className={styles.lesson}>Lessons</h1>
        <ul className={`${styles.lessonList} ${isListCollapsed ? styles.collapsed : styles.expanded}`}>
          {currentLessons.map((lesson, index) => (
            <li
              key={index}
              onClick={() => handleLessonClick(lesson)}
              className={selectedLesson?.title === lesson.title ? styles.selected : ''}
            >
              {lesson.title}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.content}>
        {selectedLesson ? (
          <div className={styles.splitView}>
            <div className={styles.codeSection}>
              <h2>Content</h2>
              <Notebook src={selectedLesson.content}></Notebook>
            </div>
            <div className={styles.videoSection}>
              <h2>Video</h2>
              <iframe
                title="Lesson Video"
                src={selectedLesson.videoUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
              ></iframe>
                {/* <pre>{selectedLesson.content}</pre> */}
            </div>
          </div>
        ) : (
          <h2>Select a lesson to see details</h2>
        )}
      </div>
    </div>
  );
};

export default LessonPage;