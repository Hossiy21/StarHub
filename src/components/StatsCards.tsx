'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Library, Code2, Users, Calendar } from 'lucide-react';
import { GithubRepo, GithubUser, SortOption, StatsData, RateLimit } from '@/types/github';

interface StatsCardsProps {
    totalRepos: number;
    topLanguage: string;
    user: GithubUser | null;
    rateLimit?: RateLimit | null;
}

export default function StatsCards({ totalRepos, topLanguage, user, rateLimit }: StatsCardsProps) {
    if (!user) return null;

    const minutesRemaining = rateLimit ? Math.ceil((rateLimit.reset - Math.floor(Date.now() / 1000)) / 60) : 0;

    return (
        <div className="w-full max-w-5xl mx-auto mb-12 px-4 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">

                {/* 1. Medium Profile Card (Spans 5 columns) */}
                <div className="md:col-span-5 bg-card rounded-[1.5rem] p-6 border border-border/60 shadow-sm flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition-all duration-500">

                    {/* Ambient Glow */}
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-secondary/40 to-transparent pointer-events-none" />

                    {/* Medium Avatar */}
                    <div className="relative mb-5 mt-1 group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="w-24 h-24 rounded-full p-1 bg-card ring-1 ring-border/50 shadow-lg relative z-10">
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="relative z-10 space-y-3 w-full">
                        <div className="flex flex-col items-center gap-1.5">
                            <h2 className="text-xl font-black tracking-tight text-foreground">{user.name || user.login}</h2>
                        </div>

                        {user.bio && (
                            <p className="text-xs text-foreground/70 leading-relaxed font-medium max-w-[240px] mx-auto text-balance border-t border-border/40 pt-3 mt-1">
                                {user.bio}
                            </p>
                        )}

                        {/* Meta Info */}
                        <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-1.5 bg-secondary/40 px-2.5 py-1 rounded-lg">
                                <Users className="w-3 h-3" />
                                <span>{user.followers.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-secondary/40 px-2.5 py-1 rounded-lg">
                                <Calendar className="w-3 h-3" />
                                <span>Since {new Date(user.created_at).getFullYear()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Stats Stack (Spans 7 columns) */}
                <div className="md:col-span-7 flex flex-col gap-5">

                    {/* Starred Repos Card */}
                    <div className="flex-1 bg-card rounded-[1.5rem] p-6 border border-border/60 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                        <div className="flex justify-between items-start mb-1 relative z-10">
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                                Total Starred
                            </span>
                            <div className="p-2 bg-secondary/30 rounded-full group-hover:bg-primary/10 transition-colors duration-300">
                                <Library className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary" />
                            </div>
                        </div>

                        <div className="relative z-10 flex items-baseline gap-2.5 mt-1">
                            <span className="text-5xl md:text-6xl font-black tracking-tighter text-foreground group-hover:scale-105 origin-left transition-transform duration-500">
                                {totalRepos}
                            </span>
                            <span className="text-[10px] font-black text-muted-foreground/40 tracking-[0.15em] uppercase mb-1">
                                Repos
                            </span>
                        </div>

                        {/* Background Decor */}
                        <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 transform rotate-12 scale-125 pointer-events-none">
                            <Library className="w-32 h-32" />
                        </div>
                    </div>

                    {/* Top Language Card */}
                    <div className="flex-1 bg-card rounded-[1.5rem] p-6 border border-border/60 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                        <div className="flex justify-between items-start mb-1 relative z-10">
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                                Top Language
                            </span>
                            <div className="p-2 bg-secondary/30 rounded-full group-hover:bg-primary/10 transition-colors duration-300">
                                <Code2 className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary" />
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-col mt-0.5">
                            <span className="text-4xl md:text-5xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors duration-300 truncate leading-tight">
                                {topLanguage}
                            </span>
                            <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-wider mt-0.5 pl-0.5">
                                Most Preferred
                            </span>
                        </div>

                        {/* Background Decor */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 transform -rotate-12 translate-x-8 pointer-events-none">
                            <Code2 className="w-40 h-40" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
