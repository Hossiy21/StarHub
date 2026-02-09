'use client';

import React from 'react';
import { GithubRepo } from '@/types/github';
import { getLanguageColor } from '@/lib/language-colors';
import RepoCard from './RepoCard';

interface LanguageGroupProps {
    language: string;
    repos: GithubRepo[];
}

export default function LanguageGroup({ language, repos }: LanguageGroupProps) {
    return (
        <div className="scroll-mt-24" id={`lang-${language}`}>
            <div className="bg-background/80 backdrop-blur-xl py-4 mb-4 border-b border-border/50 transition-all">
                <div className="w-full flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className={`w-3 h-3 rounded-full ${getLanguageColor(language)} shadow-[0_0_15px_currentColor] opacity-80`} />
                        </div>
                        <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-foreground">
                            {language || 'Unidentified'}
                        </h2>
                        <div className="h-px w-8 bg-border/50 mx-2" />
                        <span className="text-[10px] font-black tabular-nums px-2.5 py-1 rounded-lg bg-secondary/50 text-muted-foreground border border-border/50">
                            {repos.length} REPOS
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
                {repos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    );
}
