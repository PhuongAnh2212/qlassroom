// components/Sidebar.js
'use client';

import React from 'react';
import { Logo } from './logo';
import Link from 'next/link';
import styles from '../../styles/sidebar.module.css';
import { NavbarRoutes } from '../../../components/ui/navbar-routes';
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from "@clerk/nextjs";
import { SidebarRoutes } from './sidebar-routes';

export const Sidebar = () => {
    return (
        <nav className={styles.navbar}>
          <div className={styles['navbar-container']}>
            <div>
              <Link href="/" aria-label="Home">
                <Logo />
              </Link>
            </div>
            <div className="flex space-x-4">
              <SidebarRoutes />
            </div>
            <div className={styles['personal']}>
            <NavbarRoutes />    
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton
                    afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </nav>
      );
    };