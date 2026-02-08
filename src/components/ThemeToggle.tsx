'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
    theme: 'light' | 'dark';
    toggle: () => void;
}

export default function ThemeToggle({ theme, toggle }: ThemeToggleProps) {
    return (
        <button
            onClick={toggle}
            className="p-2.5 rounded-xl border border-border bg-card hover:bg-secondary/80 transition-all duration-300 active:scale-95 group backdrop-blur-sm shadow-sm hover:shadow-md"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun className="w-[18px] h-[18px] transition-all duration-500 text-muted-foreground group-hover:text-primary group-hover:rotate-90" />
            ) : (
                <Moon className="w-[18px] h-[18px] transition-all duration-500 text-muted-foreground group-hover:text-primary group-hover:-rotate-12" />
            )}
        </button>
    );
}
