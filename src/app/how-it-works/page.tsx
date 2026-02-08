'use client';

import React, { useState, useEffect } from 'react';
import HowItWorks from '@/components/HowItWorks';
import Navbar from '@/components/Navbar';


export default function HowItWorksPage() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    // Apply theme to document
    useEffect(() => {
        // On mount, check if there is a saved theme in localStorage
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.className = savedTheme;
        } else {
            // Default to dark if no saved theme
            document.documentElement.className = 'dark';
        }
    }, []);

    // Update document class when theme changes
    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleToggleTheme = () => {
        setTheme(prev => {
            const newTheme = prev === 'light' ? 'dark' : 'light';
            return newTheme;
        });
    };

    return (
        <div className="min-h-screen transition-all duration-200">
            <Navbar
                theme={theme}
                onToggleTheme={handleToggleTheme}
                hasSearched={false}
                isLoading={false}
                onSearch={() => { window.location.href = '/'; }}
                onReset={() => { window.location.href = '/'; }}
            />
            <HowItWorks />

        </div>
    );
}
