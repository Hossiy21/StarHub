'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, X, Command, ArrowRight } from 'lucide-react';

interface SearchInputProps {
    onSearch: (username: string) => void;
    isLoading: boolean;
    compact?: boolean;
    initialValue?: string;
    placeholder?: string;
    showShortcut?: boolean;
    leftIcon?: React.ReactNode;
}

export default function SearchInput({
    onSearch,
    isLoading,
    compact = false,
    initialValue = '',
    placeholder = 'GitHub username',
    showShortcut = true,
    leftIcon,
}: SearchInputProps) {
    const [value, setValue] = useState(initialValue);
    const [isWindows, setIsWindows] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        setIsWindows(navigator.platform.indexOf('Win') > -1);
    }, []);

    // Handle keyboard shortcut (Ctrl+K or /)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === '/' && document.activeElement !== inputRef.current) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim() && !isLoading) {
            onSearch(value.trim());
        }
    };

    const handleClear = () => {
        setValue('');
        inputRef.current?.focus();
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full group">
            <div
                className={`
                relative flex items-center gap-3 transition-all duration-300
                ${compact ? 'h-11 pl-4 pr-3' : 'h-12 pl-4 pr-3'}
                bg-white dark:bg-zinc-900/80 
                rounded-xl border border-zinc-200 dark:border-zinc-800
                hover:border-zinc-300 dark:hover:border-zinc-700
                group-focus-within:border-zinc-400 dark:group-focus-within:border-zinc-600
                group-focus-within:shadow-lg group-focus-within:shadow-zinc-200/50 dark:group-focus-within:shadow-black/20
                shadow-sm
            `}
            >
                {/* Left Icon */}
                <div className="flex-shrink-0 text-zinc-400 dark:text-zinc-500 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-400 transition-colors">
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        leftIcon || <Search className="w-5 h-5" />
                    )}
                </div>

                {/* Main Input */}
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    disabled={isLoading}
                    className={`
                        flex-1 bg-transparent border-none outline-none 
                        text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500
                        ${compact ? 'text-sm' : 'text-base'}
                        font-normal
                        selection:bg-zinc-200 dark:selection:bg-zinc-700
                        disabled:cursor-not-allowed
                    `}
                />

                {/* Right Actions Area */}
                <div className="flex items-center gap-2">
                    {/* Clear Button */}
                    {value && !isLoading && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all duration-200"
                            aria-label="Clear search"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}

                    {/* Submit Button - Minimal */}
                    <button
                        type="submit"
                        disabled={isLoading || !value.trim()}
                        className={`
                            flex items-center justify-center transition-all duration-200
                            ${compact ? 'w-7 h-7' : 'w-8 h-8'}
                            rounded-lg
                            bg-zinc-900 dark:bg-zinc-100
                            text-white dark:text-zinc-900
                            hover:bg-zinc-700 dark:hover:bg-zinc-300
                            active:scale-95
                            disabled:opacity-0 disabled:scale-90 disabled:pointer-events-none
                        `}
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <ArrowRight className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>

            {/* Keyboard shortcut hint below input */}
            {showShortcut && !value && !isLoading && (
                <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 dark:text-zinc-600 select-none">
                        <span>Press</span>
                        <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-sans font-medium">
                            {isWindows ? 'Ctrl K' : '⌘ K'}
                        </kbd>
                        <span>to search</span>
                    </div>
                </div>
            )}
        </form>
    );
}