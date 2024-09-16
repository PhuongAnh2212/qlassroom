'use client';
import React from 'react';
import styles from "../../../../../styles/lessonpage.module.css";


interface NotebookSrc {
  src: string;
}


const Notebook: React.FC<NotebookSrc> = ({ src }) => {
  return (
    <div className={styles.notebook}>
    <iframe
      src= {src? src : ""}
      width="100%"
      height="100%"
    ></iframe>
    </div>
  );
};

export default Notebook;
