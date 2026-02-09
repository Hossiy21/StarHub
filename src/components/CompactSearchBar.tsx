'use client';

import { Github, Key, Activity, Clock } from 'lucide-react';
import SearchInput from './SearchInput';
import { RateLimit } from '@/types/github';

interface CompactSearchBarProps {
    onSearch: (username: string) => void;
    isLoading: boolean;
    initialValue?: string;
    rateLimit?: RateLimit | null;
}

export default function CompactSearchBar({
    onSearch,
    isLoading,
    initialValue = '',
    rateLimit
}: CompactSearchBarProps) {

    const minutesRemaining = rateLimit ? Math.ceil((rateLimit.reset - Math.floor(Date.now() / 1000)) / 60) : 0;
    const isLow = rateLimit ? rateLimit.remaining < 10 : false;

    return (
        <div className="w-full max-w-2xl mx-auto mb-6 animate-fade-in">
            {/* Search Input */}
            <div className="relative">
                <SearchInput
                    onSearch={onSearch}
                    isLoading={isLoading}
                    initialValue={initialValue}
                    compact={true}
                    placeholder="Search another user..."
                    leftIcon={<Github className="w-4 h-4" />}
                />
            </div>

            {/* Rate Limit Info Bar - Professional & Minimal */}
            {rateLimit && (
                <div className="mt-4 flex items-center justify-center gap-6 px-5 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm">
                    {/* Status Badge */}
                    <div className="flex items-center gap-2 pr-6 border-r border-slate-200 dark:border-white/10">
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLow ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                            {isLow ? 'Status: Low' : 'Status: Healthy'}
                        </span>
                    </div>

                    {/* Usage Stats */}
                    <div className={`flex items-center gap-2 text-[11px] font-bold tracking-tight ${isLow ? 'text-orange-600 dark:text-orange-400' : 'text-slate-600 dark:text-zinc-300'}`}>
                        <Activity className="w-3.5 h-3.5 opacity-70" />
                        <span>
                            <span>{rateLimit.remaining}</span>
                            <span className="opacity-40 mx-0.5">/</span>
                            <span className="opacity-40">{rateLimit.limit}</span>
                            <span className="ml-1.5 text-[9px] font-black uppercase tracking-wider opacity-50">Requests</span>
                        </span>
                    </div>

                    {/* Reset Timer */}
                    {minutesRemaining > 0 && (
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 dark:text-zinc-500">
                            <Clock className="w-3.5 h-3.5 opacity-60" />
                            <span className="uppercase tracking-wide text-[9px] font-black">Resets in {minutesRemaining}m</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
