'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Github, Book } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchInput from './SearchInput';

interface NavbarProps {
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    hasSearched: boolean;
    isLoading: boolean;
    onSearch: (username: string) => void;
    onReset: () => void;
}

export default function Navbar({
    theme,
    onToggleTheme,
    hasSearched,
    isLoading,
    onSearch,
    onReset,
}: NavbarProps) {
    const pathname = usePathname();

    return (
        <nav className=" top-0 w-full z-50 nav-glass">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                {/* Logo Section */}
                <button
                    onClick={onReset}
                    className="flex items-center gap-2 group transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
                    aria-label="Return to home"
                >

                    <span className="text-xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
                        Star<span className="text-blue-600 dark:text-blue-500">Hub</span>
                    </span>
                </button>

                {/* Navigation & Actions */}
                <div className="flex items-center gap-6">
                    {/* Desktop Search */}


                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pl-6 border-l border-border/50">
                        {/* How It Works Link - Only show when not searched */}
                        {!hasSearched && pathname !== '/how-it-works' && (
                            <a
                                href="/how-it-works"
                                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 border border-transparent hover:border-border/30"
                                aria-label="Learn how StarHub works"
                            >
                                <Book className="w-4 h-4" />
                                <span className="hidden md:inline">Guide</span>
                            </a>
                        )}

                        {/* GitHub Link - Only show when not searched */}


                        {/* Theme Toggle - Always visible */}
                        <ThemeToggle theme={theme} toggle={onToggleTheme} />

                        {/* Reset Button - Only show when searched */}
                        {hasSearched && (
                            <button
                                onClick={onReset}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 active:scale-95 shadow-lg"
                                aria-label="Reset search and return to home"
                            >
                                <LayoutGrid className="w-4 h-4" />
                                <span>NEW SEARCH</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
