'use client';

import React, { useState, useMemo } from 'react';
import styles from '../../../../styles/analytics.module.css';
import { FaTable, FaUser, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface Student {
    name: string;
    progress: string;
    cohort: string;
    major: string;
    achievements: string;
    totalTime: string;
    grade: string;
    coursesTaken: string;
    details: string;
  }
  
  // Mock data for the table
  const mockData: Student[] = [
    {
      name: 'Alice Johnson',
      progress: '75%',
      cohort: '2024',
      major: 'Computer Science',
      achievements: 'Top 10 in class',
      totalTime: '120 hours',
      grade: 'A',
      coursesTaken: '5',
      details: 'Alice has shown exceptional performance in all her courses, especially in Data Structures and Algorithms. She has been an active participant in coding competitions.'
    },
    {
      name: 'Bob Smith',
      progress: '60%',
      cohort: '2023',
      major: 'Mathematics',
      achievements: 'Scholarship recipient',
      totalTime: '100 hours',
      grade: 'B',
      coursesTaken: '4',
      details: 'Bob has excelled in Mathematics courses and received a scholarship for his academic performance. He is also involved in research projects.'
    },
    {
      name: 'Carol Davis',
      progress: '80%',
      cohort: '2022',
      major: 'Physics',
      achievements: 'Research paper published',
      totalTime: '150 hours',
      grade: 'A',
      coursesTaken: '6',
      details: 'Carol has published a research paper in a reputed journal and has been a top performer in her Physics courses. She is currently working on her thesis.'
    },
    {
      name: 'David Brown',
      progress: '45%',
      cohort: '2024',
      major: 'Engineering',
      achievements: 'Dean’s list',
      totalTime: '80 hours',
      grade: 'C',
      coursesTaken: '3',
      details: 'David is on the Dean’s list and has shown improvement in his engineering coursework. He is focusing on catching up with his studies.'
    },
    {
      name: 'Emily White',
      progress: '90%',
      cohort: '2023',
      major: 'Biology',
      achievements: 'Internship completed',
      totalTime: '130 hours',
      grade: 'A',
      coursesTaken: '5',
      details: 'Emily has completed an internship with a leading biotech company and has been a high achiever in her Biology courses. She plans to pursue a career in research.'
    },
    {
      name: 'Frank Green',
      progress: '70%',
      cohort: '2024',
      major: 'Chemistry',
      achievements: 'Chemistry Olympiad finalist',
      totalTime: '110 hours',
      grade: 'B',
      coursesTaken: '4',
      details: 'Frank was a finalist in the Chemistry Olympiad and has performed well in his Chemistry courses. He is involved in a chemical research project.'
    },
    {
      name: 'Grace Lee',
      progress: '85%',
      cohort: '2022',
      major: 'Economics',
      achievements: 'Top student award',
      totalTime: '140 hours',
      grade: 'A',
      coursesTaken: '6',
      details: 'Grace has received the Top Student Award for her outstanding performance in Economics. She is currently working on a major project related to economic modeling.'
    },
    {
      name: 'Hannah Martinez',
      progress: '50%',
      cohort: '2024',
      major: 'Political Science',
      achievements: 'Student government president',
      totalTime: '90 hours',
      grade: 'B',
      coursesTaken: '4',
      details: 'Hannah has been the president of the student government and is actively involved in political science research. She is working on improving her academic performance.'
    },
    {
      name: 'Ian Taylor',
      progress: '65%',
      cohort: '2023',
      major: 'History',
      achievements: 'Published historian',
      totalTime: '105 hours',
      grade: 'B',
      coursesTaken: '5',
      details: 'Ian has published articles on historical events and has a strong performance record in History. He is preparing for a graduate program.'
    },
    {
      name: 'Jack Wilson',
      progress: '55%',
      cohort: '2024',
      major: 'Philosophy',
      achievements: 'Philosophy debate champion',
      totalTime: '85 hours',
      grade: 'C',
      coursesTaken: '3',
      details: 'Jack won the Philosophy Debate Championship and is actively participating in philosophy discussions. He is focusing on improving his course grades.'
    }
  ];

  
  const AnalyticsPage: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(mockData);
    const [view, setView] = useState<'table' | 'profile'>('table');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Student; direction: 'asc' | 'desc' } | null>(null);

  
    const handleViewChange = (viewType: 'table' | 'profile') => {
      setView(viewType);
      if (viewType === 'table') {
        setSelectedStudent(null); // Clear selected student when switching to table view
      }
    };

    const handleSort = (key: keyof Student) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
        }
        setSortConfig({ key, direction });
      };
  
    const handleStudentClick = (student: Student) => {
      setSelectedStudent(student);
      setView('profile');
    };
  
    const sortedData = useMemo(() => {
        if (sortConfig !== null) {
          const { key, direction } = sortConfig;
          return [...mockData].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
          });
        }
        return mockData;
      }, [sortConfig]);

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Student Analytics</h1>
          <div className={styles.viewIcons}>
            <button onClick={() => handleViewChange('table')} className={view === 'table' ? styles.activeIcon : ''}>
              <FaTable />
            </button>
            <button onClick={() => handleViewChange('profile')} className={view === 'profile' ? styles.activeIcon : ''}>
              <FaUser />
            </button>
          </div>
        </div>
  
        {view === 'table' ? (
          <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              {/* <tr>
                <th onClick={() => handleSort('name')}>Name {sortConfig?.key === 'name' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}</th>
                <th onClick={() => handleSort('progress')}>Progress {sortConfig?.key === 'progress' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}</th>
                <th onClick={() => handleSort('cohort')}>Cohort {sortConfig?.key === 'cohort' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}</th>
                <th onClick={() => handleSort('major')}>Major {sortConfig?.key === 'major' ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}</th>
              </tr> */}
              <tr>
                {['name', 'progress', 'cohort', 'major', 'achievements', 'totalTime', 'grade', 'coursesTaken', 'details'].map((column) => (
                  <th key={column} onClick={() => handleSort(column as keyof Student)}>
                    {column.charAt(0).toUpperCase() + column.slice(1)} 
                    {sortConfig?.key === column ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {sortedData.map((student, index) => (
                <tr key={index} onClick={() => handleStudentClick(student)}>
                  <td>{student.name}</td>
                  <td>{student.progress}</td>
                  <td>{student.cohort}</td>
                  <td>{student.major}</td>
                  <td>{student.achievements}</td>
                  <td>{student.totalTime}</td>
                  <td>{student.grade}</td>
                  <td>{student.coursesTaken}</td>
                  <td>{student.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        ) : (
          selectedStudent && (
            <div className={styles.profileView}>
              <h1 className={styles.title}>{selectedStudent.name}</h1>
              <p><strong>Progress:</strong> {selectedStudent.progress}</p>
              <p><strong>Cohort:</strong> {selectedStudent.cohort}</p>
              <p><strong>Major:</strong> {selectedStudent.major}</p>
              <p><strong>Achievements:</strong> {selectedStudent.achievements}</p>
              <p><strong>Total Time:</strong> {selectedStudent.totalTime}</p>
              <p><strong>Grade:</strong> {selectedStudent.grade}</p>
              <p><strong>Courses Taken:</strong> {selectedStudent.coursesTaken}</p>
            </div>
          )
        )}
      </div>
    );
  };
  
  export default AnalyticsPage;