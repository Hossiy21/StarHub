'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import { GithubRepo, GithubUser, SortOption } from '@/types/github';
import ExportButton from './ExportButton';
import { Search, ChevronDown, ListFilter, SlidersHorizontal } from 'lucide-react';

interface DashboardHeaderProps {
    username: string;
    user: GithubUser | null;
    languages: string[];
    filterLang: string;
    sortBy: SortOption;
    onFilterChange: (lang: string) => void;
    onSortChange: (sort: SortOption) => void;
    filteredData: GithubRepo[];
    allRepos: GithubRepo[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export default function DashboardHeader({
    username,
    user,
    languages,
    filterLang,
    sortBy,
    onFilterChange,
    onSortChange,
    filteredData,
    allRepos,
    searchTerm,
    onSearchChange,
}: DashboardHeaderProps) {
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Handle Cmd+K / Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Calculate counts per language
    const languageCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        allRepos.forEach(repo => {
            const lang = repo.language || 'Uncategorized';
            counts[lang] = (counts[lang] || 0) + 1;
        });
        return counts;
    }, [allRepos]);

    // Combine languages with counts, ensure 'All' and 'Uncategorized' are handled
    const categories = useMemo(() => {
        const uniqueLangs = Array.from(new Set(allRepos.map(r => r.language || 'Uncategorized')));
        const cats = uniqueLangs.sort().map(lang => ({
            name: lang,
            count: languageCounts[lang] || 0
        }));

        // Add 'All' to the beginning
        return [
            { name: 'All', count: allRepos.length },
            ...cats
        ];
    }, [allRepos, languageCounts]);

    return (
        <div className="space-y-6 animate-slide-up font-sans">
            {/* Row 1: Meta + Export */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xs font-semibold text-muted-foreground tracking-wide">
                    <span className="text-foreground">{allRepos.length}</span> repositories across <span className="text-foreground">{categories.length - 1}</span> categories
                </h2>
                <div className="flex-shrink-0">
                    <ExportButton data={filteredData} username={username} />
                </div>
            </div>

            {/* Row 2: Search + Sort */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">

                {/* Search Input - Center & Professional */}
                <div className="relative flex-1 group transition-all duration-300">
                    <div className="relative flex items-center h-11 w-full bg-white dark:bg-white/[0.03] rounded-full border border-slate-300 dark:border-white/10 shadow-sm hover:border-slate-400 dark:hover:border-white/20 group-focus-within:border-orange-500/50 group-focus-within:ring-4 group-focus-within:ring-orange-500/10 transition-all duration-300">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
                            <Search className="w-4 h-4 text-muted-foreground/40 group-focus-within:text-orange-500 transition-colors duration-300" />
                        </div>

                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search repositories..."
                            className="w-full h-full bg-transparent border-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 text-[13px] font-medium text-center px-14 placeholder:text-muted-foreground/30"
                            style={{ color: 'var(--foreground)' }}
                        />

                        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
                            <div className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest bg-secondary/30 px-1.5 py-0.5 rounded border border-border/20">
                                ⌘K
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sort Dropdown - Professional & Clean */}
                <div className="relative h-11 md:w-64 shrink-0 group">
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as SortOption)}
                        className="w-full h-full appearance-none bg-white dark:bg-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.05] border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300 rounded-xl pl-4 pr-10 text-[13px] font-bold focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus-visible:outline-none focus:border-orange-500/50 cursor-pointer shadow-sm text-foreground"
                    >
                        <option value="stars">Stars (High to Low)</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="recent">Recently Updated</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-orange-500 transition-colors pointer-events-none" />
                </div>
            </div>

            {/* Row 3: Category Grid - Minimalist 5-Column (Improved Visibility) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((cat) => {
                    const isActive = filterLang === cat.name;
                    return (
                        <button
                            key={cat.name}
                            onClick={() => onFilterChange(cat.name)}
                            className={`
                                flex flex-col items-start justify-center p-5 rounded-2xl border transition-all duration-300 text-left h-[84px] relative group overflow-hidden
                                ${isActive
                                    ? 'border-orange-500/50 bg-orange-500/[0.05] dark:bg-orange-500/[0.08] shadow-[0_0_20px_rgba(249,115,22,0.1)] ring-1 ring-orange-500/20'
                                    : 'border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05] hover:shadow-md hover:border-slate-300 dark:hover:border-white/10'
                                }
                            `}
                        >
                            <span className={`
                                text-[13px] font-bold truncate w-full leading-tight mb-1 transition-colors duration-300
                                ${isActive ? 'text-orange-500 dark:text-orange-400' : 'text-slate-600 dark:text-slate-400 group-hover:text-foreground'}
                            `} title={cat.name}>
                                {cat.name}
                            </span>

                            <span className={`
                                text-[11px] font-medium transition-colors duration-300
                                ${isActive ? 'text-orange-500/70 dark:text-orange-400/70' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-400'}
                            `}>
                                {cat.count.toLocaleString()} {cat.count === 1 ? 'repo' : 'repos'}
                            </span>

                            {/* Refined Active Indicator */}
                            {isActive && (
                                <div className="absolute top-3 right-4 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Spacer for visual breathing room before content */}
            <div className="h-2" />
        </div>
    );
}
