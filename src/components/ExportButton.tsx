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

        downloadFile(csvContent, `StarHub-${username}.csv`, 'text/csv;charset=utf-8;');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => status === 'idle' && setIsOpen(!isOpen)}
                disabled={status !== 'idle'}
                className={`
                    group relative flex items-center gap-2 px-4 py-2 rounded-lg
                    text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300
                    active:scale-[0.97] disabled:opacity-80
                    ${status === 'success'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-secondary text-secondary-foreground border border-border/50 hover:border-blue-500/30 hover:bg-secondary/80'
                    }
                `}
            >
                {status === 'idle' && (
                    <>
                        <Download className={`w-3.5 h-3.5 transition-all duration-300 ${isOpen ? 'translate-y-0.5' : 'group-hover:-translate-y-0.5'}`} />
                        <span>Export</span>
                        <div className="h-2 w-px bg-current opacity-20 mx-0.5" />
                        <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                    </>
                )}
                {status === 'exporting' && (
                    <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Generating...</span>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <Check className="w-3.5 h-3.5 animate-in zoom-in duration-300" />
                        <span>Exported</span>
                    </>
                )}
            </button>

            {isOpen && (
                <div
                    className="absolute left-full top-0 ml-3 w-64 rounded-xl z-50 overflow-hidden animate-fade-in border border-border bg-card shadow-xl ring-1 ring-black/5 dark:ring-white/5"
                >
                    <div className="px-4 py-3 border-b border-border/50 bg-secondary/30">
                        <h4 className="text-[10px] font-black text-foreground uppercase tracking-widest leading-none mb-0.5">
                            Data Portability
                        </h4>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                            {data.length} records available
                        </p>
                    </div>

                    <div className="p-1.5 space-y-1">
                        <button
                            onClick={exportJSON}
                            className="w-full p-2.5 text-left transition-all duration-300 flex items-center gap-3 rounded-lg hover:bg-blue-500/5 dark:hover:bg-blue-500/10 group relative overflow-hidden active:scale-[0.98]"
                        >
                            <div className="relative p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all duration-500">
                                <FileJson className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-[11px] font-black text-foreground block mb-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                    JSON Format
                                </span>
                                <span className="text-[9px] font-bold text-muted-foreground leading-tight block uppercase tracking-wide">
                                    Full Definition
                                </span>
                            </div>
                        </button>

                        <button
                            onClick={exportCSV}
                            className="w-full p-2.5 text-left transition-all duration-300 flex items-center gap-3 rounded-lg hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10 group relative overflow-hidden active:scale-[0.98]"
                        >
                            <div className="relative p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all duration-500">
                                <FileSpreadsheet className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-[11px] font-black text-foreground block mb-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                                    CSV Format
                                </span>
                                <span className="text-[9px] font-bold text-muted-foreground leading-tight block uppercase tracking-wide">
                                    Sheet Ready
                                </span>
                            </div>
                        </button>
                    </div>


                </div>
            )}
        </div>
    );
}
