"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { motion } from 'framer-motion';

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav className={styles.navbar}>
                <Link href="/" className={styles.logo}>
                    StudentPortal
                </Link>

                <div className={styles.navLinks}>
                    <Link href="/opportunities">
                        <motion.div
                            className={styles.liquidLink}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Opportunities
                        </motion.div>
                    </Link>
                    <Link href="/dashboard">
                        <motion.div
                            className={styles.liquidLink}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Dashboard
                        </motion.div>
                    </Link>
                    <ThemeToggle />
                    <Link href="/login">
                        <Button variant="filled">Login</Button>
                    </Link>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className={styles.mobileThemeToggle}>
                        <ThemeToggle />
                    </div>
                    <motion.button
                        className={styles.mobileMenuBtn}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.button>
                </div>
            </nav>

            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                <Link href="/opportunities" className={styles.liquidLink} onClick={toggleMenu}>Opportunities</Link>
                <Link href="/dashboard" className={styles.liquidLink} onClick={toggleMenu}>Dashboard</Link>
                <ThemeToggle />
                <Link href="/login" onClick={toggleMenu}>
                    <Button variant="filled" style={{ width: '100%' }}>Login</Button>
                </Link>
            </div>
        </>
    );
};
