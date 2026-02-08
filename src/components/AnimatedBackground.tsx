'use client';

import React, { useMemo } from 'react';

const GithubIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

export default function AnimatedBackground() {
    const icons = useMemo(() => {
        return Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            size: Math.random() * 40 + 30,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * -20,
            duration: 25 + Math.random() * 15,
            type: i % 3 === 0 ? 'star' : 'github'
        }));
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Base gradient mesh */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, transparent 0%, var(--background) 100%)'
                }}
            />

            {/* Premium ambient blobs - More subtle */}
            <div
                className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-[0.15] animate-pulse"
                style={{
                    background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.4) 0%, transparent 70%)',
                    animationDuration: '8s'
                }}
            />
            <div
                className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.12] animate-pulse"
                style={{
                    background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%)',
                    animationDuration: '10s',
                    animationDelay: '2s'
                }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-[0.08] animate-pulse"
                style={{
                    background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.2) 0%, transparent 70%)',
                    animationDuration: '12s',
                    animationDelay: '4s'
                }}
            />

            {/* Refined grid pattern */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                    opacity: 'var(--bg-grid-opacity)',
                    color: 'var(--bg-grid-color)',
                    maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 90%)'
                }}
            />

            {/* Subtle top spotlight */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] blur-[80px]"
                style={{
                    background: 'radial-gradient(ellipse, var(--bg-glow-color) 0%, transparent 65%)',
                    opacity: 'calc(var(--bg-glow-opacity) * 1.5)'
                }}
            />

            {/* Floating decorative icons - More subtle */}
            {icons.map((icon) => (
                <div
                    key={icon.id}
                    className="absolute animate-float"
                    style={{
                        left: `${icon.left}%`,
                        top: `${icon.top}%`,
                        width: `${icon.size}px`,
                        height: `${icon.size}px`,
                        animationDelay: `${icon.delay}s`,
                        animationDuration: `${icon.duration}s`,
                        color: 'var(--foreground)',
                        opacity: 'calc(var(--bg-icon-opacity) * 0.8)'
                    }}
                >
                    {icon.type === 'star' ? (
                        <StarIcon className="w-full h-full" />
                    ) : (
                        <GithubIcon className="w-full h-full" />
                    )}
                </div>
            ))}

            {/* Vignette effect for depth */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 50% 40%, transparent 0%, var(--background) 100%)',
                    opacity: 0.6
                }}
            />
        </div>
    );
}
