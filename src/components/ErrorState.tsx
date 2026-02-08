'use client';

import React from 'react';
import { AlertCircle, RefreshCcw, ArrowLeft } from 'lucide-react';

interface ErrorStateProps {
    message: string;
    onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
    const isNotFound = message.toLowerCase().includes('not found') || message.toLowerCase().includes('404');

    return (
        <div
            className="max-w-md mx-auto mt-20 p-10 rounded-3xl text-center space-y-8 animate-slide-up bg-card border border-border shadow-2xl relative overflow-hidden"
        >
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-destructive/20" />

            {/* Icon */}
            <div className="flex justify-center">
                <div className={`p-5 rounded-2xl ${isNotFound ? 'bg-secondary' : 'bg-destructive/10'} shadow-inner`}>
                    <AlertCircle
                        className={`w-10 h-10 ${isNotFound ? 'text-muted-foreground' : 'text-destructive'}`}
                    />
                </div>
            </div>

            {/* Message */}
            <div className="space-y-3">
                <h2 className="text-2xl font-black tracking-tighter text-foreground uppercase italic">
                    {isNotFound ? "Target Not Found" : "System Alert"}
                </h2>
                <p className="text-[13px] font-bold leading-relaxed text-muted-foreground uppercase tracking-wide">
                    {isNotFound
                        ? "The specified GitHub profile could not be located in our star systems."
                        : message
                    }
                </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                    onClick={onRetry}
                    className="flex-1 group relative px-6 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 bg-primary text-primary-foreground shadow-lg hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                >
                    <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                    Retry Sync
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className="flex-1 px-6 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 bg-secondary/50 text-foreground border border-border/50 hover:bg-secondary hover:border-border"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                </button>
            </div>
        </div>
    );
}
