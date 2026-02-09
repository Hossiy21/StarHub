'use client';

import React from 'react';
import { Loader2, Github, Cpu, Shield } from 'lucide-react';

interface LoadingStateProps {
    step: string;
}

export default function LoadingState({ step }: LoadingStateProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-16 animate-fade-in py-20 relative overflow-hidden">
            {/* Background Ambient Depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.03] dark:bg-blue-600/[0.07] rounded-full blur-[160px] pointer-events-none" />

            {/* Premium Unified Core Animation */}
            <div className="relative">
                {/* Outer Glow Halo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow" />

                {/* Multi-layered Glass Core */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                    {/* Pulsing Orbitals */}
                    <div className="absolute inset-0 rounded-full border border-blue-500/10 dark:border-white/5 animate-[spin_8s_linear_infinite]" />
                    <div className="absolute -inset-4 rounded-full border border-dashed border-blue-500/5 dark:border-white/[0.02] animate-[spin_12s_linear_infinite_reverse]" />

                    {/* The Core Orb */}
                    <div className="relative w-24 h-24 rounded-[2rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none flex items-center justify-center group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 opacity-50 rounded-[2rem]" />
                        <Github className="w-10 h-10 text-slate-800 dark:text-white/90 relative z-10 opacity-80" />

                        {/* Elegant Scan Line */}
                        <div className="absolute top-0 inset-x-0 h-0.5 bg-blue-500/30 dark:bg-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-[scan_3s_ease-in-out_infinite]" />
                    </div>
                </div>

                {/* Satellite Nodes - Telemetry style */}
                <div className="absolute -top-6 -right-12 animate-in fade-in slide-in-from-left-4 duration-1000">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md">
                        <Cpu className="w-3 h-3 text-blue-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-500">Processing Node</span>
                    </div>
                </div>

                <div className="absolute -bottom-8 -left-12 animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md">
                        <Shield className="w-3 h-3 text-emerald-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-500">Secure Protocol</span>
                    </div>
                </div>
            </div>

            {/* Content Display */}
            <div className="max-w-md mx-auto space-y-6 relative z-10 transition-all duration-500">
                <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2.5">
                        <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-zinc-500">
                            System Telemetry Active
                        </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">
                        {step || 'Initializing...'}
                    </h2>

                    <p className="text-[12px] font-medium text-slate-500 dark:text-zinc-400 tracking-tight max-w-[280px] mx-auto opacity-70">
                        Synchronizing with GitHub for real-time metadata extraction.
                    </p>
                </div>

                {/* Minimalist Professional Progress */}
                <div className="w-64 mx-auto">
                    <div className="h-1 w-full bg-slate-100 dark:bg-white/[0.03] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 dark:bg-blue-500 w-1/4 animate-[loading-progress_2s_ease-in-out_infinite]" />
                    </div>
                    <div className="mt-2 flex justify-between items-center px-1">
                        <span className="text-[9px] font-black text-slate-400 dark:text-zinc-600 uppercase tracking-widest">Network Scan</span>
                        <span className="text-[9px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-widest animate-pulse">Live Link</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
