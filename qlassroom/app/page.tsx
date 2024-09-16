'use client';

import DashboardLayout from "./(dashboard)/layout";
import { Logo } from "./(dashboard)/_components/logo";
import styles from './styles/home.module.css';
import {Button} from '@nextui-org/button';
export default function Home() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.heading}>Welcome to the</h1>
        <div className={styles.logo}>
          <Logo width={200} height={200} />
        </div>
        <p className={styles.subheading}>We're glad to have you here!</p>
        <Button className="bg-[#01AF3E] hover:bg-[#004F2A] text-white font-bold py-2 px-4 rounded-full shadow-lg text-lg"
            variant="ghost"
            onClick={handleClick}>
        Take a tour
        </Button>
      </div>
    </DashboardLayout>
  );
}
