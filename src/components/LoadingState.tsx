'use client';

import React from 'react';
import { Loader2, Star, Sparkles } from 'lucide-react';

interface LoadingStateProps {
    step: string;
}

export default function LoadingState({ step }: LoadingStateProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12 animate-fade-in py-20 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

            {/* Advanced Scanning Animation */}
            <div className="relative w-48 h-48">
                {/* Outer Pulse Rings */}
                <div className="absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-2xl animate-pulse" />
                <div className="absolute -inset-4 rounded-full border border-blue-500/5 animate-[ping_3s_linear_infinite]" />

                {/* Rotating Geometric Layers */}
                <div
                    className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-blue-500/20 animate-[spin_10s_linear_infinite]"
                />

                {/* Fast Inner Rings */}
                <div
                    className="absolute inset-4 rounded-full border-t-2 border-b-2 border-transparent border-t-blue-500 border-b-indigo-400 opacity-60 animate-[spin_1.5s_cubic-bezier(0.4,0.1,0.6,0.9)_infinite]"
                />
                <div
                    className="absolute inset-8 rounded-full border-l-2 border-r-2 border-transparent border-l-blue-400 border-r-indigo-500 opacity-40 animate-[spin_2s_linear_infinite_reverse]"
                />

                {/* Core Scanner Node */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative bg-white/80 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl flex flex-col items-center justify-center group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-50" />

                        <div className="relative">
                            <Star className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-[bounce_2s_ease-in-out_infinite]" fill="currentColor" />
                            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-indigo-500 animate-pulse" />
                        </div>

                        {/* Scanning Line Effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-[scan_2s_ease-in-out_infinite]" />
                    </div>
                </div>
            </div>

            {/* Information Display */}
            <div className="space-y-6 max-w-md mx-auto relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Deep Scanning GitHub Network
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                        {step || 'Processing...'}
                    </h2>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide">
                        Aggregating repository metadata & influence metrics
                    </p>
                </div>

                {/* Professional Progress Bar */}
                <div className="w-64 mx-auto space-y-2">
                    <div className="h-1.5 w-full rounded-full overflow-hidden bg-slate-200 dark:bg-white/5 border border-slate-300/20 dark:border-white/5">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 animate-gradient-shift shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                        <span>Stabilizing Link</span>
                        <span>100% Signal</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
