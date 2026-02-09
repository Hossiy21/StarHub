'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="
                        group flex items-center justify-center w-12 h-12 
                        bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl
                        border border-zinc-200 dark:border-zinc-800
                        rounded-2xl shadow-2xl transition-all duration-300
                        hover:scale-110 hover:border-blue-500/50 hover:bg-white dark:hover:bg-zinc-900
                        active:scale-95 animate-fade-in
                    "
                    aria-label="Back to top"
                >
                    <ArrowUp className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-blue-500 transition-colors" />

                    {/* Tooltip */}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        BACK TO TOP
                    </span>

                    {/* Outer Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-blue-500/0 group-hover:bg-blue-500/10 blur-xl transition-all duration-300 -z-10" />
                </button>
            )}
        </div>
    );
}
