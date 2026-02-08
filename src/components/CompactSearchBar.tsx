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
        <div className="w-full max-w-2xl mx-auto mb-12 animate-fade-in">
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
                <div className="mt-4 flex items-center justify-center gap-6 px-4 py-3 rounded-xl bg-card/30 border border-border/30">
                    {/* Usage Stats */}
                    <div className={`flex items-center gap-2 text-xs font-medium ${isLow ? 'text-orange-500' : 'text-muted-foreground'}`}>
                        <Activity className="w-3.5 h-3.5" />
                        <span>
                            <span className={isLow ? 'font-bold' : 'font-semibold'}>{rateLimit.remaining}</span>
                            <span className="opacity-60">/{rateLimit.limit}</span>
                            <span className="ml-1 opacity-50">requests</span>
                        </span>
                    </div>

                    {/* Reset Timer */}
                    {minutesRemaining > 0 && rateLimit.remaining < rateLimit.limit && (
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/60">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Resets in {minutesRemaining}m</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
