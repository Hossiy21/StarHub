'use client';

import React, { useState } from 'react';
import { Github, Star, Sparkles, ShieldCheck } from 'lucide-react';
import { RateLimit } from '@/types/github';

interface HeroSectionProps {
    onSearch: (username: string) => void;
    isLoading: boolean;
    rateLimit?: RateLimit | null;
}

export default function HeroSection({ onSearch, isLoading, rateLimit }: HeroSectionProps) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSearch(inputValue.trim());
        }
    };

    return (
        <div className="w-full flex-1 flex flex-col items-center justify-center relative z-10 py-16 md:py-28 px-4 overflow-hidden">

            {/* Background Spotlight Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Top Badge - Refined & Professional */}
            <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Secure API Access
                    </span>
                </div>
            </div>

            {/* Main Hero Content */}
            <div className="max-w-4xl mx-auto text-center space-y-8 mb-14 relative">
                {/* Headline - High Impact */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 uppercase">
                    Your GitHub Library, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                        Perfectly Organized.
                    </span>
                </h1>

                {/* Subheadline - Elegant */}
                <p className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed font-medium">
                    Clean up your starred repositories and export them in seconds. <br className="hidden md:block" />
                    <span className="inline-flex items-center gap-2 text-foreground/90 font-bold mt-1">
                        <ShieldCheck className="w-5 h-5 text-blue-500" />
                        Private by default.
                    </span>
                </p>
            </div>

            {/* Search Area - Professional & Refined */}
            <div className="w-full max-w-2xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 items-stretch justify-center relative z-10 p-2 bg-slate-100/50 dark:bg-white/[0.03] backdrop-blur-3xl rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl">

                    {/* Input Container */}
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none z-20">
                            <Github className="w-5 h-5 text-slate-400 dark:text-slate-500 transition-all duration-300 group-focus-within:text-blue-500 group-focus-within:scale-110" />
                        </div>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter a GitHub username..."
                            disabled={isLoading}
                            autoFocus
                            className="w-full h-14 pl-14 pr-6 bg-white/80 dark:bg-black/20 rounded-xl transition-all duration-300 outline-none text-slate-900 dark:text-white text-[15px] placeholder:text-slate-400 dark:placeholder:text-slate-500 font-bold"
                        />
                    </div>

                    {/* Action Button - Premium Heavyweight */}
                    <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="h-14 px-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-[12px] uppercase tracking-[0.15em] rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                <span>Scan Profile</span>
                            </>
                        )}
                        <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                    </button>
                </form>

                {/* Rate Limit Info - Live Status */}
                {rateLimit && (
                    <div className="mt-8 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-700 delay-500">
                        <div className="flex items-center gap-4 px-5 py-2 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                                    {rateLimit.remaining}/{rateLimit.limit} REQUESTS
                                </span>
                            </div>
                            <div className="h-3 w-px bg-slate-200 dark:bg-white/10" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                RESETS IN {Math.ceil((rateLimit.reset - Math.floor(Date.now() / 1000)) / 60)}M
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
