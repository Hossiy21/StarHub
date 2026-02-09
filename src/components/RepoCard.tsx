'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { GithubRepo } from '@/types/github';
import { getLanguageColor } from '@/lib/language-colors';
import { formatNumber } from '@/lib/utils';

interface RepoCardProps {
    repo: GithubRepo;
}

export default function RepoCard({ repo }: { repo: GithubRepo }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    };

    return (
        <div
            className={`group bg-card rounded-[1.5rem] border border-border/40 transition-all duration-300 flex flex-col relative ${isExpanded ? 'shadow-lg' : 'hover:shadow-md hover:border-border/80'}`}
        >
            {/* Header: Avatar + Name + Toggle */}
            <div className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-border/50 flex-shrink-0 bg-secondary/30">
                            <Image
                                src={repo.owner.avatar_url}
                                alt={repo.owner.login}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-[15px] font-bold text-foreground group-hover:text-primary transition-colors truncate leading-tight">
                                {repo.full_name}
                            </h3>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-muted-foreground/30 hover:text-primary transition-colors mt-1 p-1 hover:bg-secondary/50 rounded-lg"
                    >
                        <svg
                            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>
                </div>

                {/* Description */}
                <p className="text-[13px] text-muted-foreground/70 line-clamp-2 mb-6 font-medium leading-relaxed">
                    {repo.description || 'A remarkable repository waiting for your exploration.'}
                </p>

                {/* Main Stats Row */}
                <div className="flex items-center gap-4 text-[12px] font-medium text-muted-foreground mb-4">
                    {repo.language && (
                        <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                            <span>{repo.language}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-500/80 fill-current" />
                        <span className="tabular-nums font-bold text-foreground/80">{formatNumber(repo.stargazers_count)}</span>
                    </div>
                </div>

                {/* Expandable Content */}
                {isExpanded && (
                    <div className="space-y-6 pt-6 border-t border-border/10 animate-in fade-in slide-in-from-top-2 duration-300">
                        {/* Topics/Tags */}
                        {repo.topics && repo.topics.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {repo.topics.map(topic => (
                                    <span
                                        key={topic}
                                        className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 text-[11px] font-bold border border-slate-200 dark:border-white/5 transition-colors"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            {/* Date */}
                            <div className="text-[12px] font-semibold text-muted-foreground/50">
                                Updated {formatDate(repo.pushed_at)}
                            </div>

                            {/* GitHub Button - Professional Absolute Contrast */}
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-premium-github inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl transition-all duration-300 font-bold text-[12px] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] border border-white/10 dark:border-black/10 group/github"
                            >
                                <svg
                                    className="w-3.5 h-3.5 transition-transform group-hover/github:scale-110"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
