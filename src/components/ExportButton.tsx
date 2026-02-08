'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Download, FileJson, FileSpreadsheet, Check, ChevronDown, Loader2 } from 'lucide-react';
import { GithubRepo } from '@/types/github';

interface ExportButtonProps {
    data: GithubRepo[];
    username: string;
}

export default function ExportButton({ data, username }: ExportButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'exporting' | 'success'>('idle');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const downloadFile = (content: string, fileName: string, contentType: string) => {
        setStatus('exporting');

        // Brief delay for professional "processing" feel
        setTimeout(() => {
            const blob = new Blob([content], { type: contentType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');

            // Sanitize filename: remove characters that might cause issues
            const safeUsername = username.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const safeFileName = fileName.replace(username, safeUsername);

            a.href = url;
            a.download = safeFileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setStatus('success');
            setIsOpen(false);

            // Reset status after a few seconds
            setTimeout(() => setStatus('idle'), 3000);
        }, 800);
    };

    const exportJSON = () => {
        const json = JSON.stringify(data, null, 2);
        downloadFile(json, `starscan-${username}.json`, 'application/json');
    };

    const exportCSV = () => {
        const headers = ['Name', 'Owner', 'URL', 'Stars', 'Language', 'Description'];
        const rows = data.map(repo => [
            repo.name,
            repo.owner?.login || 'unknown',
            repo.html_url,
            repo.stargazers_count,
            repo.language || 'Unknown',
            (repo.description || '').replace(/"/g, '""')
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\r\n');

        downloadFile(csvContent, `starscan-${username}.csv`, 'text/csv;charset=utf-8;');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => status === 'idle' && setIsOpen(!isOpen)}
                disabled={status !== 'idle'}
                className={`
                    group relative flex items-center gap-2.5 px-6 py-2.5 rounded-xl
                    text-[12px] font-bold tracking-wide transition-all duration-300
                    active:scale-[0.97] disabled:opacity-80
                    ${status === 'success'
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-card border border-border text-foreground hover:border-primary/50 hover:bg-secondary/80 shadow-sm hover:shadow-md backdrop-blur-sm'
                    }
                `}
            >
                {status === 'idle' && (
                    <>
                        <Download className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'translate-y-0.5' : 'group-hover:-translate-y-0.5'} ${isOpen ? 'text-primary' : ''}`} />
                        <span>Export</span>
                        <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground/60'}`} />
                    </>
                )}
                {status === 'exporting' && (
                    <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Processing...</span>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <Check className="w-3.5 h-3.5 animate-in zoom-in duration-300" />
                        <span>Ready</span>
                    </>
                )}
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-3 w-80 rounded-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 border border-slate-200 dark:border-white/[0.15] bg-white dark:bg-[#0f1115] shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-black/5 dark:ring-white/5"
                >
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-blue-400/60 text-center">
                            Export Repositories
                        </p>
                    </div>

                    <div className="p-2">
                        <button
                            onClick={exportJSON}
                            className="w-full p-4 text-left transition-all duration-200 flex items-center gap-4 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] group"
                        >
                            <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                                <FileJson className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-[14px] font-bold block text-foreground mb-0.5 group-hover:text-primary transition-colors">
                                    JSON Format
                                </span>
                                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight block">
                                    Clean, structured data format
                                </span>
                            </div>
                        </button>

                        <button
                            onClick={exportCSV}
                            className="w-full p-4 text-left transition-all duration-200 flex items-center gap-4 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] group"
                        >
                            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-300">
                                <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-[14px] font-bold block text-foreground mb-0.5 group-hover:text-emerald-500 transition-colors">
                                    CSV Spreadsheet
                                </span>
                                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight block">
                                    Excel & Google Sheets compatible
                                </span>
                            </div>
                        </button>
                    </div>


                </div>
            )}
        </div>
    );
}
