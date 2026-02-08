'use client';

import React from 'react';
import { Loader2, Star } from 'lucide-react';

interface LoadingStateProps {
    step: string;
}

export default function LoadingState({ step }: LoadingStateProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 animate-fade-in py-20">
            {/* Advanced Spinner */}
            <div className="relative w-40 h-40">
                {/* Outer Glow */}
                <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-2xl animate-pulse" />

                {/* Outer ring */}
                <div
                    className="absolute inset-0 rounded-full border-[1px] border-amber-500/20"
                />

                {/* Spinning rings */}
                <div
                    className="absolute inset-2 rounded-full animate-spin border-x-2 border-transparent border-t-amber-500/60 border-b-amber-500/60"
                    style={{ animationDuration: '3s' }}
                />
                <div
                    className="absolute inset-6 rounded-full animate-spin border-y-2 border-transparent border-l-amber-500/40 border-r-amber-500/40"
                    style={{ animationDuration: '2s', animationDirection: 'reverse' }}
                />

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-pulse">
                        <Star className="w-8 h-8 text-amber-500" fill="currentColor" />
                    </div>
                </div>
            </div>

            {/* Status */}
            <div className="space-y-4 max-w-md mx-auto">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black tracking-[0.2em] text-amber-500 uppercase mb-2">
                    System Scanning
                </div>
                <h2 className="text-3xl font-black tracking-tight text-white">
                    {step || 'Processing...'}
                </h2>
                <p className="text-sm font-medium text-gray-500 tracking-wide">
                    Synchronizing with GitHub's global repository network...
                </p>

                {/* Progress bar */}
                <div className="pt-6">
                    <div className="h-1 w-48 mx-auto rounded-full overflow-hidden bg-gray-800/50">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400 animate-gradient-shift"
                            style={{
                                width: '100%',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
