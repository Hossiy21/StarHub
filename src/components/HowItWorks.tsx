
'use client';

import React from 'react';
import { Shield, Zap, Lock, Globe, ArrowLeft, Terminal, Database, Send } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorks() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-6 max-w-5xl mx-auto animate-slide-up">
            {/* Header */}
            <div className="mb-20 text-center relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-8 text-muted-foreground hover:text-primary transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Return to Dashboard
                </Link>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">
                        How StarHub Works
                    </span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                    transparent, secure, and built for privacy.<br />
                    <span className="text-foreground/80 font-normal">Zero data retention.</span>
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 relative z-10">
                {/* Direct Browser Fetching */}
                <section className="bg-card border border-border/40 rounded-3xl p-8 hover:border-orange-500/20 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 group md:col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-orange-500/5 blur-[80px] rounded-full group-hover:bg-orange-500/10 transition-colors" />

                    <div className="flex flex-col md:flex-row items-start gap-8 relative">
                        <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20 shadow-sm shrink-0">
                            <Globe className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">Direct Client-Side Fetching</h2>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                When you enter a username, the request is sent directly from your browser to GitHub's API.
                                StarHub acts as a stateless viewing layer. Your data never touches a database.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Rate Limits */}
                <section className="bg-card border border-border/40 rounded-3xl p-8 hover:border-orange-500/20 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 group relative overflow-hidden">
                    <div className="flex items-center gap-4 mb-8 relative">
                        <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">API Limits</h2>
                    </div>

                    <div className="space-y-6 relative">
                        <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Unauthenticated</span>
                                <span className="text-orange-500 font-mono font-bold">60 / hr</span>
                            </div>
                            <div className="h-1.5 w-full bg-border/40 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500/50 w-[10%]" />
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs uppercase tracking-widest text-emerald-500 font-bold">Authenticated</span>
                                <span className="text-emerald-500 font-mono font-bold">5,000 / hr</span>
                            </div>
                            <div className="h-1.5 w-full bg-border/40 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-full" />
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground/60 italic">
                            *Limits reset hourly. Add a personal token for maximum speed.
                        </p>
                    </div>
                </section>

                {/* Privacy */}
                <section className="bg-card border border-border/40 rounded-3xl p-8 hover:border-orange-500/20 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 group relative overflow-hidden">
                    <div className="flex items-center gap-4 mb-8 relative">
                        <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Privacy First</h2>
                    </div>

                    <ul className="space-y-4 relative">
                        {[
                            "No user tracking or analytics",
                            "Source code is 100% open",
                            "Tokens are stored in browser memory only",
                            "Refresh the page to wipe everything"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                <Lock className="w-4 h-4 mt-1 text-orange-500/60 shrink-0" />
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}
